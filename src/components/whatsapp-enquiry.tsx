import { useId, useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { LoaderCircle, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { sendEnquiry } from '@/lib/enquiries.functions';

export function WhatsAppEnquiry() {
  const prefix = useId();
  const send = useServerFn(sendEnquiry);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ status: string; message: string } | null>(null);
  const [requestId, setRequestId] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || result?.status === 'queued' || result?.status === 'unknown') return;
    const values = new FormData(event.currentTarget);
    setBusy(true);
    try {
      const response = await send({ data: { id: requestId, name: String(values.get('name') ?? ''), email: String(values.get('email') ?? ''), message: String(values.get('message') ?? ''), website: String(values.get('website') ?? '') } });
      setResult(response);
    } catch {
      setResult({ status: 'unknown', message: 'We could not confirm your enquiry was sent. Please contact the owner through Airbnb rather than resending.' });
    } finally { setBusy(false); }
  }
  return <Dialog open={open} onOpenChange={next => {
    if (busy) return;
    if (next) { setRequestId(crypto.randomUUID()); setResult(null); }
    setOpen(next);
  }}>
    <DialogTrigger asChild><Button variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><MessageCircle />Send an enquiry</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-md">
      <DialogHeader><DialogTitle>Enquire about Les Cyclamens</DialogTitle><DialogDescription>Your enquiry is sent to the owner on WhatsApp via CallMeBot. Include your preferred dates; the owner can reply by email.</DialogDescription></DialogHeader>
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-2"><Label htmlFor={`${prefix}-name`}>Name</Label><Input id={`${prefix}-name`} name="name" autoComplete="name" required maxLength={80} disabled={busy || result?.status === 'queued'} /></div>
        <div className="grid gap-2"><Label htmlFor={`${prefix}-email`}>Email</Label><Input id={`${prefix}-email`} name="email" type="email" autoComplete="email" required maxLength={160} disabled={busy || result?.status === 'queued'} /></div>
        <div className="grid gap-2"><Label htmlFor={`${prefix}-message`}>Message & preferred dates</Label><Textarea id={`${prefix}-message`} name="message" required minLength={10} maxLength={1000} rows={5} disabled={busy || result?.status === 'queued'} /></div>
        <div className="hidden" aria-hidden="true"><Label htmlFor={`${prefix}-website`}>Website</Label><Input id={`${prefix}-website`} name="website" tabIndex={-1} autoComplete="off" /></div>
        {result && <p role="status" className={result.status === 'queued' ? 'text-sm text-primary' : 'text-sm text-destructive'}>{result.message}</p>}
        <Button type="submit" disabled={busy || result?.status === 'queued' || result?.status === 'unknown' || result?.status === 'failed'}>{busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <MessageCircle />}{busy ? 'Sending…' : result?.status === 'queued' ? 'Enquiry queued' : 'Send enquiry'}</Button>
      </form>
    </DialogContent>
  </Dialog>;
}