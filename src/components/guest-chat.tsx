import { useEffect, useRef, useState, type FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowUp, LoaderCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from '@/components/section-heading';
import { LogoMark } from '@/components/logo-mark';
import { useLang } from '@/lib/i18n';
import { activeConversation, CHAT_IDLE_MS, CHAT_SESSION_KEY } from '@/lib/guest-chat-session';

type Msg = { role: 'user' | 'assistant'; content: string; error?: boolean };
const suggestions = { en: ['How many people can stay?', 'What’s in the kitchen?', 'Where can we eat nearby?', 'Is there skiing close by?'], fr: ['Combien de personnes peuvent séjourner ?', 'Qu’y a-t-il dans la cuisine ?', 'Où manger à proximité ?', 'Peut-on skier près d’ici ?'] };

export function GuestChat() {
  const { lang, tr } = useLang();
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const request = useRef<AbortController | null>(null);

  function endChat() {
    request.current?.abort();
    request.current = null;
    if (idleTimer.current) clearTimeout(idleTimer.current);
    sessionStorage.removeItem(CHAT_SESSION_KEY);
    setConversationId(crypto.randomUUID());
    setMessages([]);
    setInput('');
    setBusy(false);
  }

  function touchChat(id: string) {
    sessionStorage.setItem(CHAT_SESSION_KEY, JSON.stringify({ id, updatedAt: Date.now() }));
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(endChat, CHAT_IDLE_MS);
  }

  useEffect(() => {
    const activeId = activeConversation(sessionStorage.getItem(CHAT_SESSION_KEY), Date.now());
    const id = activeId ?? crypto.randomUUID();
    localStorage.removeItem('les-cyclamens-guest-chat');
    setConversationId(id);
    const controller = new AbortController();
    if (activeId) {
      request.current = controller;
      touchChat(id);
      fetch(`/api/guest-chat?id=${id}`, { signal: controller.signal }).then(r => r.json()).then(d => { if (!controller.signal.aborted && Array.isArray(d.messages)) setMessages(d.messages); }).catch(() => {});
    } else sessionStorage.removeItem(CHAT_SESSION_KEY);
    return () => {
      controller.abort();
      request.current?.abort();
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, []);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }); }, [messages]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy || !conversationId) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    touchChat(conversationId);
    setInput('');
    setBusy(true);
    setMessages(m => [...m, { role: 'user', content: question }, { role: 'assistant', content: '' }]);
    const update = (fn: (last: Msg) => Msg) => {
      if (controller.signal.aborted) return;
      setMessages(m => {
        const last = m.at(-1);
        return last ? [...m.slice(0, -1), fn(last)] : m;
      });
    };
    try {
      const res = await fetch('/api/guest-chat', { signal: controller.signal, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ conversationId, message: question }) });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        update(l => ({ ...l, content: err.error ?? tr('Sorry, the assistant could not answer.', 'Désolé, l’assistant n’a pas pu répondre.'), error: true }));
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        const [answer, failure] = acc.split('\u0000');
        update(l => failure !== undefined ? { ...l, content: answer || failure, error: !answer } : { ...l, content: answer ?? '' });
      }
    } catch {
      update(l => ({ ...l, content: l.content || tr('Connection lost. Please try again.', 'Connexion perdue. Veuillez réessayer.'), error: !l.content }));
    } finally { if (!controller.signal.aborted) { setBusy(false); touchChat(conversationId); } }
  }

  function submit(e: FormEvent) { e.preventDefault(); void ask(input); }

  return (
    <section id="ask" className="band-soft">
      <div className="mx-auto grid max-w-6xl items-start gap-x-12 gap-y-8 px-6 py-20 lg:grid-cols-2">
        <div className="min-w-0">
        <SectionHeading kicker={tr("Ask us anything", "Posez-nous vos questions")}>{tr("Questions about your stay?", "Des questions sur votre séjour ?")}</SectionHeading>
        <p className="mt-4 text-muted-foreground">{tr('Our AI-powered assistant answers from the apartment details and our local recommendations. For anything it can’t answer, send an enquiry.', 'Notre assistant IA répond à partir des informations sur l’appartement et de nos recommandations locales. Pour tout le reste, envoyez-nous une demande.')}</p>
        </div>
        <div className="min-w-0">
        <div className="card-vivid overflow-hidden rounded-md bg-card">
          {messages.length > 0 && <div className="flex items-center justify-between border-b px-5 py-2">
            <span className="text-sm text-muted-foreground">{busy ? tr('Answering…', 'Réponse en cours…') : tr('Chat in progress', 'Discussion en cours')}</span>
            <Button variant="ghost" size="sm" onClick={endChat}><X />{tr('End chat', 'Terminer')}</Button>
          </div>}
          <div ref={scroller} className="max-h-[28rem] min-h-48 space-y-5 overflow-y-auto p-5" aria-live="polite">
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestions[lang].map(s => <Button key={s} variant="outline" size="sm" className="h-auto min-h-8 max-w-full whitespace-normal text-left hover:border-accent hover:text-accent" onClick={() => ask(s)} disabled={busy || !conversationId}>{s}</Button>)}
              </div>
            )}
            {messages.map((m, i) => m.role === 'user'
              ? <div key={i} className="ml-auto w-fit max-w-[85%] rounded-md band-lake px-4 py-2 text-primary-foreground">{m.content}</div>
              : <div key={i} className="flex gap-3">
                  <LogoMark compact />
                  <div className={`prose prose-sm max-w-none pt-1 ${m.error ? 'text-destructive' : 'text-foreground'}`}>
                    {m.content ? <ReactMarkdown components={{ a: props => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline" /> }}>{m.content}</ReactMarkdown>
                      : <LoaderCircle className="size-4 animate-spin text-muted-foreground motion-reduce:animate-none" aria-label={tr('Thinking', 'Réflexion')} />}
                  </div>
                </div>)}
          </div>
          <form onSubmit={submit} className="flex items-end gap-2 border-t p-3">
            <Textarea value={input} onChange={e => { setInput(e.target.value); if (messages.length) touchChat(conversationId); }} maxLength={1000} rows={1} placeholder={tr('Ask about the apartment or Thollon…', 'Une question sur l’appartement ou Thollon…')} aria-label={tr('Your question', 'Votre question')}
              className="min-h-10 resize-none border-0 shadow-none focus-visible:ring-0"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void ask(input); } }} />
            <Button type="submit" size="icon" className="band-lake text-primary-foreground" disabled={busy || !input.trim() || !conversationId} aria-label={tr('Send question', 'Envoyer la question')}>
              {busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <ArrowUp />}
            </Button>
          </form>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{tr('Answers may be imperfect — please confirm important details with the owner. Questions are saved so the owner can read them.', 'Les réponses peuvent être imparfaites — confirmez les détails importants avec le propriétaire. Les questions sont enregistrées pour que le propriétaire puisse les lire.')}</p>
        </div>
      </div>
    </section>
  );
}
