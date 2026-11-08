import { useRef, useState } from 'react';
import { useServerFn } from '@tanstack/react-start';
import { Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLang } from '@/lib/i18n';
import { directBookingSchema } from '@/lib/direct-booking';
import { submitDirectBooking } from '@/lib/direct-booking.functions';

export function DirectBookingForm({ checkIn, checkOut, guests, disabled }: { checkIn: string; checkOut: string; guests: number; disabled: boolean }) {
  const { tr } = useLang();
  const send = useServerFn(submitDirectBooking);
  const requestId = useRef<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<'queued' | 'saved' | null>(null);
  const [error, setError] = useState('');
  if (result) return <div role="status" className="space-y-3 border-t pt-4">
    <CheckCircle className="size-7 text-primary" aria-hidden="true" />
    <h3 className="text-xl">{tr('Booking request saved', 'Demande de réservation enregistrée')}</h3>
    <p className="text-sm">{tr('Your name, dates and guest count have been saved for the owner. This is not a confirmed reservation; the owner will contact you by email.', 'Votre nom, vos dates et le nombre de voyageurs ont été enregistrés pour le propriétaire. Il ne s’agit pas d’une réservation confirmée ; le propriétaire vous contactera par e-mail.')}</p>
    <p className="text-sm text-muted-foreground">{result === 'queued' ? tr('WhatsApp notification accepted into the queue; delivery is not yet confirmed.', 'Notification WhatsApp mise en file d’attente ; la livraison n’est pas encore confirmée.') : tr('WhatsApp notification could not be confirmed. Your request is still saved in the owner’s inbox.', 'La notification WhatsApp n’a pas pu être confirmée. Votre demande reste enregistrée dans la boîte du propriétaire.')}</p>
  </div>;
  return <form className="space-y-4 border-t pt-4" onSubmit={async e => {
    e.preventDefault();
    if (busy || disabled) return;
    const form = new FormData(e.currentTarget);
    requestId.current ??= crypto.randomUUID();
    const parsed = directBookingSchema.safeParse({ id: requestId.current, name: form.get('name'), email: form.get('email'), website: form.get('website'), checkIn, checkOut, guests });
    if (!parsed.success) { setError(tr('Please enter your name, a valid email, dates and guest count.', 'Indiquez votre nom, un e-mail valide, vos dates et le nombre de voyageurs.')); return; }
    setBusy(true); setError('');
    try {
      const response = await send({ data: parsed.data });
      if (response.status === 'saved' || response.status === 'queued') setResult(response.status);
      else setError(response.status === 'unavailable' ? tr('These dates could not be verified as available. Refresh the calendar and choose available dates.', 'Ces dates n’ont pas pu être confirmées comme disponibles. Actualisez le calendrier et choisissez des dates disponibles.') : tr('Your request could not be saved. Please try again.', 'Votre demande n’a pas pu être enregistrée. Réessayez.'));
    } catch { setError(tr('We could not confirm whether your request was saved. Try again without changing the details.', 'Nous n’avons pas pu confirmer l’enregistrement de votre demande. Réessayez sans modifier les informations.')); }
    finally { setBusy(false); }
  }}>
    <div className="space-y-2"><Label htmlFor="booking-name">{tr('Name', 'Nom')}</Label><Input id="booking-name" name="name" autoComplete="name" required maxLength={80} disabled={busy} /></div>
    <div className="space-y-2"><Label htmlFor="booking-email">{tr('Email', 'E-mail')}</Label><Input id="booking-email" name="email" type="email" autoComplete="email" required maxLength={160} disabled={busy} /></div>
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" defaultValue="" />
    <p className="text-xs text-muted-foreground">{tr('A request only. Dates and price must be confirmed by the owner; no payment is taken.', 'Il s’agit d’une demande. Les dates et le prix doivent être confirmés par le propriétaire ; aucun paiement n’est prélevé.')}</p>
    {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
    <Button type="submit" size="lg" className="w-full" disabled={busy || disabled}><Send />{busy ? tr('Sending…', 'Envoi…') : tr('Send booking request', 'Envoyer la demande')}</Button>
  </form>;
}