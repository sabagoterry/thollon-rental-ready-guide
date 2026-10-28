import { useId, useState, type FormEvent } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { ArrowUpRight, LoaderCircle, MessageCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { sendEnquiry } from '@/lib/enquiries.functions';
import { AIRBNB_URL } from '@/lib/guest-guide';

const today = () => new Date().toISOString().slice(0, 10);

export function WhatsAppEnquiry() {
  const prefix = useId();
  const send = useServerFn(sendEnquiry);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ status: string; message: string } | null>(null);
  const [requestId, setRequestId] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const locked = busy || result?.status === 'queued';
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || result?.status === 'queued' || result?.status === 'unknown') return;
    const v = new FormData(event.currentTarget);
    const get = (k: string) => String(v.get(k) ?? '');
    if (get('checkOut') <= get('checkIn')) { setResult({ status: 'invalid', message: 'Check-out must be after check-in.' }); return; }
    setBusy(true);
    try {
      const response = await send({ data: { id: requestId, name: get('name'), email: get('email'), phone: get('phone'), checkIn: get('checkIn'), checkOut: get('checkOut'), guests: Number(get('guests')), message: get('message'), website: get('website') } });
      setResult(response);
    } catch {
      setResult({ status: 'unknown', message: 'We could not confirm your enquiry was sent. Please contact the owner through Airbnb rather than resending.' });
    } finally { setBusy(false); }
  }
  const field = (k: string) => `${prefix}-${k}`;
  return <Dialog open={open} onOpenChange={next => {
    if (busy) return;
    if (next) { setRequestId(crypto.randomUUID()); setResult(null); }
    setOpen(next);
  }}>
    <DialogTrigger asChild><Button variant="outline" className="border-primary-foreground/50 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25 hover:text-primary-foreground"><MessageCircle />Send an enquiry</Button></DialogTrigger>
    <DialogContent className="max-h-[90dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-md">
      <DialogHeader><DialogTitle>Enquire about Les Cyclamens</DialogTitle><DialogDescription>Send your dates and contact details and the owner will get back to you.</DialogDescription></DialogHeader>
      <div className="flex items-start gap-3 rounded-md border-2 border-accent/60 bg-accent/15 p-3 text-sm">
        <Zap className="mt-0.5 size-4 shrink-0 text-accent" />
        <p>No need to wait — <span className="font-medium">you can book straight away on Airbnb</span> if your dates are free.{' '}
          <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-0.5 font-medium text-primary underline">Book on Airbnb<ArrowUpRight className="size-3.5" /></a></p>
      </div>
      <form onSubmit={submit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor={field('in')}>Check-in</Label><Input id={field('in')} name="checkIn" type="date" required min={today()} value={checkIn} onChange={e => setCheckIn(e.target.value)} disabled={locked} /></div>
          <div className="grid gap-2"><Label htmlFor={field('out')}>Check-out</Label><Input id={field('out')} name="checkOut" type="date" required min={checkIn || today()} disabled={locked} /></div>
        </div>
        <div className="grid gap-2"><Label htmlFor={field('guests')}>Guests</Label><Input id={field('guests')} name="guests" type="number" min={1} max={6} defaultValue={2} required disabled={locked} /></div>
        <div className="grid gap-2"><Label htmlFor={field('name')}>Name</Label><Input id={field('name')} name="name" autoComplete="name" required maxLength={80} disabled={locked} /></div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2"><Label htmlFor={field('email')}>Email</Label><Input id={field('email')} name="email" type="email" autoComplete="email" required maxLength={160} disabled={locked} /></div>
          <div className="grid gap-2"><Label htmlFor={field('phone')}>Phone (optional)</Label><Input id={field('phone')} name="phone" type="tel" autoComplete="tel" maxLength={30} pattern="[+\d\s()\-]*" disabled={locked} /></div>
        </div>
        <div className="grid gap-2"><Label htmlFor={field('message')}>Message (optional)</Label><Textarea id={field('message')} name="message" maxLength={1000} rows={3} disabled={locked} /></div>
        <div className="hidden" aria-hidden="true"><Label htmlFor={field('website')}>Website</Label><Input id={field('website')} name="website" tabIndex={-1} autoComplete="off" /></div>
        {result && <p role="status" className={result.status === 'queued' ? 'text-sm text-primary' : 'text-sm text-destructive'}>{result.message}</p>}
        <Button type="submit" className="band-lake text-primary-foreground" disabled={busy || result?.status === 'queued' || result?.status === 'unknown' || result?.status === 'failed'}>{busy ? <LoaderCircle className="animate-spin motion-reduce:animate-none" /> : <MessageCircle />}{busy ? 'Sending…' : result?.status === 'queued' ? 'Enquiry sent' : 'Send enquiry'}</Button>
      </form>
    </DialogContent>
  </Dialog>;
}
