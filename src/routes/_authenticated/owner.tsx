import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import { LogOut, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';

export const Route = createFileRoute('/_authenticated/owner')({
  head: () => ({
    meta: [
      { title: 'Enquiries & guest questions — Les Cyclamens owner' },
      { name: 'description', content: 'Private owner inbox for Les Cyclamens enquiries and guest questions.' },
      { property: 'og:title', content: 'Les Cyclamens owner inbox' },
      { property: 'og:description', content: 'Private owner inbox.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'robots', content: 'noindex' },
    ],
  }),
  component: OwnerPage,
});

const statusLabel: Record<string, string> = { queued: 'Sent to WhatsApp', failed: 'WhatsApp failed', unknown: 'WhatsApp unconfirmed', pending: 'Not sent yet' };
const when = (s: string) => format(parseISO(s), 'd MMM yyyy, HH:mm');

function OwnerPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const inbox = useQuery({
    queryKey: ['owner-inbox'],
    queryFn: async () => {
      const { data: user } = await supabase.auth.getUser();
      const { data: isAdmin, error: roleError } = await supabase.rpc('has_role', { _user_id: user.user!.id, _role: 'admin' });
      if (roleError) throw roleError;
      if (!isAdmin) return { isAdmin: false as const, email: user.user?.email ?? '' };
      const [enq, chat] = await Promise.all([
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(500),
        supabase.from('guest_chat_messages').select('*').order('created_at', { ascending: true }).limit(2000),
      ]);
      if (enq.error) throw enq.error;
      if (chat.error) throw chat.error;
      const convs = new Map<string, typeof chat.data>();
      for (const m of chat.data) convs.set(m.conversation_id, [...(convs.get(m.conversation_id) ?? []), m]);
      const conversations = [...convs.entries()].map(([id, messages]) => ({ id, messages, last: messages[messages.length - 1]!.created_at })).sort((a, b) => b.last.localeCompare(a.last));
      return { isAdmin: true as const, enquiries: enq.data, conversations };
    },
  });
  async function signOut() {
    await qc.cancelQueries(); qc.clear();
    await supabase.auth.signOut();
    navigate({ to: '/', replace: true });
  }
  return <main className="min-h-screen bg-background">
    <header className="border-b bg-card">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-xl text-primary">Les Cyclamens · Owner</Link>
        <Button variant="ghost" size="sm" onClick={() => void signOut()}><LogOut />Sign out</Button>
      </div>
    </header>
    <div className="mx-auto max-w-5xl px-6 py-10">
      {inbox.isPending && <p className="text-muted-foreground">Loading…</p>}
      {inbox.isError && <p role="alert" className="text-destructive">Couldn't load your inbox. Please refresh.</p>}
      {inbox.data && !inbox.data.isAdmin && <div className="rounded-md border bg-card p-6">
        <h1 className="text-2xl">Not authorised yet</h1>
        <p className="mt-2 text-muted-foreground">You're signed in as {inbox.data.email}, but this account doesn't have owner access.</p>
      </div>}
      {inbox.data?.isAdmin && <Tabs defaultValue="enquiries">
        <TabsList>
          <TabsTrigger value="enquiries"><Mail />Enquiries ({inbox.data.enquiries.length})</TabsTrigger>
          <TabsTrigger value="questions"><MessageCircle />Guest questions ({inbox.data.conversations.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="enquiries" className="mt-6 space-y-4">
          {inbox.data.enquiries.length === 0 && <p className="text-muted-foreground">No enquiries yet.</p>}
          {inbox.data.enquiries.map(e => <article key={e.id} className="rounded-md border bg-card p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-xl">{e.name}</h2>
              <span className="text-xs text-muted-foreground">{when(e.created_at)}</span>
            </div>
            <a href={`mailto:${e.email}`} className="text-sm text-primary underline">{e.email}</a>
            <span className={`ml-3 rounded-sm px-2 py-0.5 text-xs ${e.status === 'queued' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>{statusLabel[e.status] ?? e.status}</span>
            <pre className="mt-3 whitespace-pre-wrap font-sans text-sm">{e.message}</pre>
          </article>)}
        </TabsContent>
        <TabsContent value="questions" className="mt-6 space-y-4">
          {inbox.data.conversations.length === 0 && <p className="text-muted-foreground">No guest questions yet.</p>}
          {inbox.data.conversations.map(c => <details key={c.id} className="rounded-md border bg-card p-5">
            <summary className="cursor-pointer">
              <span className="font-medium">{c.messages.find(m => m.role === 'user')?.content.slice(0, 90) ?? 'Conversation'}</span>
              <span className="ml-2 text-xs text-muted-foreground">{when(c.last)} · {c.messages.length} messages</span>
            </summary>
            <div className="mt-4 space-y-3">
              {c.messages.map(m => <div key={m.id} className={m.role === 'user' ? 'rounded-md bg-muted p-3' : 'rounded-md border p-3'}>
                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">{m.role === 'user' ? 'Guest' : 'Assistant'}</p>
                <p className="whitespace-pre-wrap text-sm">{m.content}</p>
              </div>)}
            </div>
          </details>)}
        </TabsContent>
      </Tabs>}
    </div>
  </main>;
}
