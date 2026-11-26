import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { addMonths, format, parseISO } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { ArrowLeft, ArrowUpRight, Minus, Plus, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { BookingSelection } from '@/lib/booking-selection';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { WhatsAppEnquiry } from '@/components/whatsapp-enquiry';
import { SiteFooter } from '@/components/site-footer';
import { useAvailabilityRefresh } from '@/lib/use-availability-refresh';
import { isBlocked } from '@/lib/availability';
import { DEFAULT_AIRBNB_BOOKING_URL, MAX_GUESTS, addNights, airbnbBookingUrl, countNights, stayOverlapsBlocked } from '@/lib/booking';
import { LogoMark } from '@/components/logo-mark';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { useLang } from '@/lib/i18n';
import { enGB, fr as frLocale } from 'date-fns/locale';
import { DirectBookingForm } from '@/components/direct-booking-form';

const iso = (d: Date) => format(d, 'yyyy-MM-dd');

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (n: number) => void }) {
  const { tr } = useLang();
  return <div className="flex items-center justify-between gap-4 rounded-md border bg-background p-3">
    <span className="font-medium">{label}</span>
    <div className="flex items-center gap-3">
      <Button type="button" variant="outline" size="icon" aria-label={`${tr('Fewer', 'Moins de')} ${label.toLowerCase()}`} disabled={value <= min} onClick={() => onChange(value - 1)}><Minus /></Button>
      <span className="w-6 text-center tabular-nums" aria-live="polite">{value}</span>
      <Button type="button" variant="outline" size="icon" aria-label={`${tr('More', 'Plus de')} ${label.toLowerCase()}`} disabled={value >= max} onClick={() => onChange(value + 1)}><Plus /></Button>
    </div>
  </div>;
}

export function StayPlanner({ selection, direct = false }: { selection: BookingSelection; direct?: boolean }) {
  const { lang, tr } = useLang();
  const locale = lang === 'fr' ? frLocale : enGB;
  const { data, refresh, refreshing, displaySyncedAt } = useAvailabilityRefresh();
  const today = parseISO(data.today);
  const [range, setRange] = useState<DateRange | undefined>(selection.checkIn && selection.checkOut ? { from: parseISO(selection.checkIn), to: parseISO(selection.checkOut) } : undefined);
  const [guests, setGuests] = useState(selection.guests ?? 2);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const checkIn = range?.from ? iso(range.from) : '';
  const checkOut = range?.to && range.from && range.to > range.from ? iso(range.to) : '';
  const nights = checkIn && checkOut ? countNights(checkIn, checkOut) : 0;
  const clash = checkIn && checkOut ? stayOverlapsBlocked(checkIn, checkOut, data.ranges) : false;
  const ready = data.status === 'ready';

  function setNights(n: number) {
    if (!range?.from) return;
    setRange({ from: range.from, to: parseISO(addNights(iso(range.from), n)) });
  }

  return <main className="band-soft min-h-screen">
    <header className="border-b bg-card">
      <div className="bar-flow h-1.5" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <LogoMark />
        <div className="flex items-center gap-4"><Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="size-4" />{tr("Back to apartment", "Retour à l’appartement")}</Link>
        <LanguageToggle />
        <MobileMenu /></div>
      </div>
    </header>
    <div className="mx-auto max-w-6xl px-6 py-14">
      <SectionHeading kicker={tr("Plan your stay", "Préparez votre séjour")}>{direct ? tr("Direct Booking", "Réservation directe") : tr("Book Les Cyclamens", "Réserver Les Cyclamens")}</SectionHeading>
      <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
      <p className="max-w-2xl text-muted-foreground">{direct ? tr('Choose your dates and guests, then send your request to the owner for confirmation.', 'Choisissez vos dates et le nombre de voyageurs, puis envoyez votre demande au propriétaire pour confirmation.') : tr('Choose your arrival and departure days and guests. Final availability and prices are confirmed on Airbnb.', 'Choisissez vos dates d’arrivée et de départ et le nombre de voyageurs. Les disponibilités et tarifs définitifs sont confirmés sur Airbnb.')}</p>
      <div className="flex shrink-0 flex-col gap-3">
        {!direct && (
          <Button asChild size="lg" className="band-lake text-primary-foreground"><a href={airbnbBookingUrl(checkIn, checkOut, guests)} target="_blank" rel="noopener noreferrer"><Zap />{tr('Book Instantly on Airbnb', 'Réserver instantanément sur Airbnb')}<ArrowUpRight /></a></Button>
        )}
        {!direct && (
          <Button size="lg" variant="outline" disabled={!ready || !checkIn || !checkOut || clash} onClick={() => setConfirmOpen(true)}>
            {clash ? tr('Dates unavailable', 'Dates indisponibles') : tr('Book', 'Réserver')}
          </Button>
        )}
      </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3" role="status">
        <p className="text-base text-muted-foreground">{displaySyncedAt ? `${tr('Last synced at', 'Dernière synchronisation le')} ${format(parseISO(displaySyncedAt), 'd MMM yyyy, HH:mm:ss', { locale })}` : tr('No confirmed calendar update yet.', 'Aucune mise à jour confirmée pour le moment.')}</p>
        <Button variant="outline" disabled={refreshing} onClick={() => refresh.mutate(Date.now())}>
          {refreshing ? tr('Refreshing…', 'Actualisation…') : tr('Refresh', 'Actualiser')}
        </Button>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="card-vivid overflow-hidden rounded-md bg-card p-4">
          {(!ready || refresh.isError) && <div className="mb-4 flex flex-wrap items-center gap-3" role="status">
            <p className="text-sm text-destructive">{tr('Availability could not be updated.', 'Les disponibilités n’ont pas pu être mises à jour.')}</p>
            <Button asChild variant="outline" className="h-auto max-w-full whitespace-normal py-2">
              <a href={DEFAULT_AIRBNB_BOOKING_URL} target="_blank" rel="noopener noreferrer">{tr('Please check dates on Airbnb', 'Vérifiez les dates sur Airbnb')}<ArrowUpRight /></a>
            </Button>
          </div>}
          <Calendar
            mode="range" selected={range} onSelect={setRange}
            aria-label={tr('Choose your stay dates', 'Choisissez vos dates')}
            locale={locale}
            defaultMonth={range?.from ?? today} startMonth={today} endMonth={addMonths(today, 23)}
            numberOfMonths={2} weekStartsOn={1} showOutsideDays={false}
            disabled={[{ before: today }]}
            modifiers={{ blocked: day => isBlocked(iso(day), data.ranges) }}
            modifiersClassNames={{ blocked: 'line-through opacity-40' }}
            className="max-w-full p-0 [--cell-size:2.5rem]"
          />
          <p className="mt-3 text-xs text-muted-foreground">{tr('Tip: tap your arrival day, then your departure day.', 'Astuce : touchez le jour d’arrivée, puis le jour de départ.')}</p>
        </div>
        <aside className="card-vivid h-fit space-y-4 rounded-md bg-card p-5">
          <h2 className="text-2xl text-rainbow">{tr("Your stay", "Votre séjour")}</h2>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md band-ice p-3"><dt className="text-muted-foreground">{tr("Check-in", "Arrivée")}</dt><dd className="font-medium">{checkIn ? format(parseISO(checkIn), 'EEE d MMM yyyy', { locale }) : '—'}</dd></div>
            <div className="rounded-md band-ice p-3"><dt className="text-muted-foreground">{tr("Check-out", "Départ")}</dt><dd className="font-medium">{checkOut ? format(parseISO(checkOut), 'EEE d MMM yyyy', { locale }) : '—'}</dd></div>
          </dl>
          <Stepper label={tr("Nights", "Nuits")} value={nights} min={1} max={28} onChange={setNights} />
          <Stepper label={tr("Guests", "Voyageurs")} value={guests} min={1} max={MAX_GUESTS} onChange={setGuests} />
          <p className="text-xs text-muted-foreground">{tr('Sleeps up to', 'Jusqu’à')} {MAX_GUESTS}{tr('.', ' couchages.')}</p>
          {clash && <p role="alert" className="text-sm text-destructive">{tr('Some of those nights are already booked. Please pick different dates.', 'Certaines de ces nuits sont déjà réservées. Choisissez d’autres dates.')}</p>}
          {direct && (
            <>
              <DirectBookingForm checkIn={checkIn} checkOut={checkOut} guests={guests} disabled={!ready || !checkIn || !checkOut || clash || checkIn < data.today} />
              <Button asChild variant="outline" className="w-full"><Link to="/book" search={{ checkIn, checkOut, guests }}>{tr('Change', 'Modifier')}<ArrowLeft /></Link></Button>
            </>
          )}
          <div className="border-t pt-4 text-sm">
            <p className="mb-2 text-muted-foreground">{tr('Have a question first?', 'Une question avant de réserver ?')}</p>
            <div className="[&_button]:w-full [&_button]:border-transparent [&_button]:bg-accent/15 [&_button]:text-accent-foreground"><WhatsAppEnquiry /></div>
          </div>
        </aside>
      </div>
    </div>
    <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
      <DialogContent className="w-[calc(100%-2rem)] rounded-md">
        <DialogHeader><DialogTitle>{tr('Confirm your stay', 'Confirmez votre séjour')}</DialogTitle>
          <DialogDescription>{tr('You have asked for:', 'Vous avez demandé :')}</DialogDescription>
        </DialogHeader>
        <dl className="space-y-3">
          <div><dt className="text-sm text-muted-foreground">{tr('Check-in', 'Arrivée')}</dt><dd>{checkIn ? format(parseISO(checkIn), 'EEE d MMM yyyy', { locale }) : '—'}</dd></div>
          <div><dt className="text-sm text-muted-foreground">{tr('Check-out', 'Départ')}</dt><dd>{checkOut ? format(parseISO(checkOut), 'EEE d MMM yyyy', { locale }) : '—'}</dd></div>
          <div><dt className="text-sm text-muted-foreground">{tr('Guests', 'Voyageurs')}</dt><dd>{guests}</dd></div>
        </dl>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>{tr('Change', 'Modifier')}</Button>
          <Button asChild><Link to="/direct-booking" search={{ checkIn, checkOut, guests }}>{tr('Continue', 'Continuer')}<ArrowUpRight /></Link></Button>
        </div>
      </DialogContent>
    </Dialog>
    <SiteFooter />
  </main>;
}
