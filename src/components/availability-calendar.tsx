import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format, parseISO, addMonths } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { SectionHeading } from '@/components/section-heading';
import { availabilityQuery } from '@/lib/availability.query';
import { isBlocked } from '@/lib/availability';
import { useLang } from '@/lib/i18n';
import { enGB, fr as frLocale } from 'date-fns/locale';

export function AvailabilityCalendar() {
  const { lang, tr } = useLang();
  const locale = lang === 'fr' ? frLocale : enGB;
  const { data, refetch, isFetching } = useSuspenseQuery(availabilityQuery);
  const today = parseISO(data.today);
  const [month, setMonth] = useState(today);
  const ready = data.status === 'ready';
  return (
    <section id="availability" className="border-t band-soft">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
          <SectionHeading kicker={tr("Before you book", "Avant de réserver")}>{tr("Current Availability", "Disponibilités actuelles")}</SectionHeading>
          <div className="flex flex-col items-start gap-3" role="status">
            <p className="text-base text-muted-foreground">{data.syncedAt ? `${tr('Last synced', 'Dernière synchro')} ${format(parseISO(data.syncedAt), 'd MMM yyyy, HH:mm', { locale })}` : tr('No confirmed calendar update yet.', 'Aucune mise à jour confirmée pour le moment.')}</p>
            <div className="flex items-center gap-3">
              <Button asChild size="lg" className="h-auto flex-col gap-1 py-3">
                <Link to="/book"><span className="text-xs uppercase tracking-wide">{tr('Interested?', 'Intéressé ?')}</span><span className="inline-flex items-center gap-2">{tr('Book', 'Réserver')}<ArrowRight /></span></Link>
              </Button>
              <Button variant="outline" size="icon" title={tr('Refresh availability', 'Actualiser')} aria-label={tr('Refresh availability', 'Actualiser')} disabled={isFetching} onClick={() => void refetch()}>
                <RefreshCw className={isFetching ? 'animate-spin motion-reduce:animate-none' : ''} />
              </Button>
            </div>
          </div>
        </div>
        <p className="mt-4 text-muted-foreground">{tr('Final availability and prices are confirmed on Airbnb.', 'Les disponibilités et tarifs définitifs sont confirmés sur Airbnb.')}</p>
        <div className="mt-8 flex flex-wrap gap-6 text-base md:text-lg" aria-label={tr('Calendar legend', 'Légende')}>
          <span className="flex items-center gap-2"><span className="size-3 rounded-sm border-2 border-primary bg-background" />{ready ? tr('Available', 'Disponible') : tr('Availability unconfirmed', 'Disponibilité non confirmée')}</span>
          <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-coral/70" />{tr('Unavailable', 'Indisponible')}</span>
        </div>
        <div className="mt-6" role="status">
          {!ready && <p className="mb-4 text-sm text-destructive">{tr('Availability could not be updated. Please check dates on Airbnb.', 'Les disponibilités n’ont pas pu être mises à jour. Vérifiez les dates sur Airbnb.')}</p>}
        </div>
         <div className="card-vivid mt-6 overflow-hidden rounded-lg bg-card p-4">
          <Calendar
            aria-label={tr('Apartment availability calendar', 'Calendrier des disponibilités')}
            locale={locale}
            month={month} onMonthChange={setMonth} startMonth={today} endMonth={addMonths(today, 23)}
            numberOfMonths={3} weekStartsOn={1} showOutsideDays={false}
            className="availability-calendar max-w-full bg-card p-0 [--cell-size:2.25rem]"
            modifiers={{ blocked: day => isBlocked(format(day, 'yyyy-MM-dd'), data.ranges), past: { before: today } }}
            modifiersClassNames={{ blocked: 'bg-coral/15 text-muted-foreground line-through', past: 'text-muted-foreground opacity-70' }}
            labels={{ labelDay: day => `${format(day, 'd MMMM yyyy', { locale })}: ${day < today ? tr('past date', 'date passée') : isBlocked(format(day, 'yyyy-MM-dd'), data.ranges) ? tr('unavailable', 'indisponible') : ready ? tr('not blocked on Airbnb', 'libre sur Airbnb') : tr('availability unconfirmed', 'disponibilité non confirmée')}` }}
          />
        </div>
      </div>
    </section>
  );
}