import { useEffect, useRef, useState, type FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowUp, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SectionHeading } from '@/components/section-heading';
import logo from '@/assets/logo.png.asset.json';

type Msg = { role: 'user' | 'assistant'; content: string; error?: boolean };
const STORAGE_KEY = 'les-cyclamens-guest-chat';
const suggestions = ['How many people can stay?', 'What’s in the kitchen?', 'Where can we eat nearby?', 'Is there skiing close by?'];

export function GuestChat() {
  const [conversationId, setConversationId] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) { id = crypto.randomUUID(); localStorage.setItem(STORAGE_KEY, id); }
    setConversationId(id);
    fetch(`/api/guest-chat?id=${id}`).then(r => r.json()).then(d => { if (Array.isArray(d.messages)) setMessages(d.messages); }).catch(() => {});
  }, []);
  useEffect(() => { scroller.current?.scrollTo({ top: scroller.current.scrollHeight }); }, [messages]);

  async function ask(text: string) {
    const question = text.trim();
    if (!question || busy || !conversationId) return;
    setInput('');
    setBusy(true);
    setMessages(m => [...m, { role: 'user', content: question }, { role: 'assistant', content: '' }]);
    const update = (fn: (last: Msg) => Msg) => setMessages(m => [...m.slice(0, -1), fn(m[m.length - 1]!)]);
    try {
      const res = await fetch('/api/guest-chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ conversationId, message: question }) });
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}));
        update(l => ({ ...l, content: err.error ?? 'Sorry, the assistant could not answer.', error: true }));
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
      update(l => ({ ...l, content: l.content || 'Connection lost. Please try again.', error: !l.content }));
    } finally { setBusy(false); }
  }

  function submit(e: FormEvent) { e.preventDefault(); void ask(input); }

  return (
    <section id="ask" className="bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <SectionHeading kicker="Ask us anything">Questions about your stay?</SectionHeading>
        <p className="mt-4 text-muted-foreground">Our AI-powered assistant answers from the apartment details and our local recommendations. For anything it can’t answer, send an enquiry.</p>
        <div className="mt-8 rounded-md border bg-card shadow-sm">
          <div ref={scroller} className="max-h-[28rem] min-h-48 space-y-5 overflow-y-auto p-5" aria-live="polite">
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {suggestions.map(s => <Button key={s} variant="outline" size="sm" onClick={() => ask(s)} disabled={busy || !conversationId}>{s}</Button>)}
              </div>
            )}
            {messages.map((m, i) => m.role === 'user'
              ? <div key={i} className="ml-auto w-fit max-w-[85%] rounded-md bg-primary px-4 py-2 text-primary-foreground">{m.content}</div>
              : <div key={i} className="flex gap-3">
                  <img src={logo.url} alt="" className="size-8 shrink-0 rounded-full border bg-background object-contain p-0.5" />
                  <div className={`prose prose-sm max-w-none pt-1 ${m.error ? 'text-destructive' : 'text-foreground'}`}>
                    {m.content ? <ReactMarkdown components={{ a: props => <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary underline" /> }}>{m.content}</ReactMarkdown>
                      : <LoaderCircle className="size-4 animate-spin text-muted-foreground motion-reduce:animate-none" aria-label="Thinking" />}
                  </div>
                </div>)}
          </div>
          <form onSubmit={submit} className="flex items-end gap-2 border-t p-3">
            <Textarea value={input} onChange={e => setInput(e.target.value)} maxLength={1000} rows={1} placeholder="Ask about the apartment or Thollon…" aria-label="Your question"
              className="min-h-10 resize-none border-0 shadow-none focus-visible:ring-0"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void ask(input); } }} />
            <Button type="submit" size="icon" disabled={busy || !input.trim() || !conversationId} aria-label="Send question">
              {busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <ArrowUp />}
            </Button>
          </form>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Answers may be imperfect — please confirm important details with the owner. Questions are saved so the owner can read them.</p>
      </div>
    </section>
  );
}
