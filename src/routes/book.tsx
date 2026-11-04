import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { addMonths, format, parseISO } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { ArrowLeft, ArrowUpRight, Minus, Plus, Zap } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { WhatsAppEnquiry } from '@/components/whatsapp-enquiry';
import { SiteFooter } from '@/components/site-footer';
import { availabilityQuery } from '@/lib/availability.query';
import { isBlocked } from '@/lib/availability';
import { MAX_GUESTS, addNights, airbnbBookingUrl, countNights, stayOverlapsBlocked } from '@/lib/booking';
import { LogoMark } from '@/components/logo-mark';
import { LanguageToggle } from '@/components/language-toggle';
import { useLang } from '@/lib/i18n';
import { enGB, fr as frLocale } from 'date-fns/locale';

export const Route = createFileRoute('/book')({
  loader: ({ context }) => context.queryClient.ensureQueryData(availabilityQuery),
  head: () => ({
    meta: [
      { title: 'Book Les Cyclamens — Choose your dates in Thollon-les-Memises' },
      { name: 'description', content: 'Pick your dates, nights and guests for Les Cyclamens, then book instantly on Airbnb.' },
      { property: 'og:title', content: 'Book Les Cyclamens, Thollon-les-Memises' },
      { property: 'og:description', content: 'Choose dates and guests and book the apartment instantly on Airbnb.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  errorComponent: () => <p role="alert" className="p-10 text-center">Booking dates could not load. Please try again.</p>,
  notFoundComponent: () => <p className="p-10 text-center">Page not found.</p>,
  component: BookPage,
});

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

function BookPage() {
  const { lang, tr } = useLang();
  const locale = lang === 'fr' ? frLocale : enGB;
  const { data } = useSuspenseQuery(availabilityQuery);
  const today = parseISO(data.today);
  const [range, setRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
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
      <SectionHeading kicker={tr("Plan your stay", "Préparez votre séjour")}>{tr("Book Les Cyclamens", "Réserver Les Cyclamens")}</SectionHeading>
      <p className="mt-4 max-w-2xl text-muted-foreground">{tr('Choose your arrival and departure days, then book instantly on Airbnb. Greyed-out dates are already taken.', 'Choisissez vos dates d’arrivée et de départ, puis réservez directement sur Airbnb. Les dates grisées sont déjà prises.')}</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="card-vivid overflow-hidden rounded-md bg-card p-4">
          {!ready && <p className="mb-3 text-sm text-destructive">{tr("Availability couldn't be updated just now. Airbnb will confirm your dates.", 'Les disponibilités n’ont pas pu être actualisées. Airbnb confirmera vos dates.')}</p>}
          <Calendar
            mode="range" selected={range} onSelect={setRange}
            aria-label={tr('Choose your stay dates', 'Choisissez vos dates')}
            locale={locale}
            defaultMonth={today} startMonth={today} endMonth={addMonths(today, 23)}
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
          {checkIn && checkOut && !clash ? (
            <Button asChild size="lg" className="w-full band-sunset text-accent-foreground glow-accent">
              <a href={airbnbBookingUrl(checkIn, checkOut, guests)} target="_blank" rel="noopener noreferrer"><Zap />{tr('Book', 'Réserver')} {nights} {nights === 1 ? tr('night', 'nuit') : tr('nights', 'nuits')} {tr('on Airbnb', 'sur Airbnb')}<ArrowUpRight /></a>
            </Button>
          ) : (
            <Button size="lg" className="w-full" disabled><Zap />{clash ? tr('Dates unavailable', 'Dates indisponibles') : tr('Choose your dates', 'Choisissez vos dates')}</Button>
          )}
          <p className="text-xs text-muted-foreground">{tr('Instant booking — price and final availability are confirmed on Airbnb.', 'Réservation instantanée — tarif et disponibilité confirmés sur Airbnb.')}</p>
          <div className="border-t pt-4 text-sm">
            <p className="mb-2 text-muted-foreground">{tr('Have a question first?', 'Une question avant de réserver ?')}</p>
            <div className="[&_button]:w-full [&_button]:border-transparent [&_button]:bg-accent/15 [&_button]:text-accent-foreground"><WhatsAppEnquiry /></div>
          </div>
        </aside>
      </div>
    </div>
    <SiteFooter />
  </main>;
}
