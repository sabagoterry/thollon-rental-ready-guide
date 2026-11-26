import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { format, parseISO, addMonths } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { DEFAULT_AIRBNB_BOOKING_URL } from '@/lib/booking';
import { SectionHeading } from '@/components/section-heading';
import { availabilityQuery } from '@/lib/availability.query';
import { refreshAvailability } from '@/lib/availability.functions';
import { isBlocked, refreshDisplayTime } from '@/lib/availability';
import { useLang } from '@/lib/i18n';
import { enGB, fr as frLocale } from 'date-fns/locale';

export function AvailabilityCalendar() {
  const { lang, tr } = useLang();
  const locale = lang === 'fr' ? frLocale : enGB;
  const queryClient = useQueryClient();
  const { data, isFetching } = useSuspenseQuery(availabilityQuery);
  const [refreshedDisplayAt, setRefreshedDisplayAt] = useState<string | null>(null);
  const refresh = useMutation({
    mutationFn: async (_clickedAt: number) => {
      await queryClient.cancelQueries({ queryKey: availabilityQuery.queryKey });
      return refreshAvailability();
    },
    onSuccess: (updated, clickedAt) => {
      queryClient.setQueryData(availabilityQuery.queryKey, updated);
      const displayTime = refreshDisplayTime(updated, clickedAt);
      if (displayTime) setRefreshedDisplayAt(displayTime);
    },
  });
  const refreshing = isFetching || refresh.isPending;
  const today = parseISO(data.today);
  const [month, setMonth] = useState(today);
  const ready = data.status === 'ready';
  const displaySyncedAt = ready ? refreshedDisplayAt ?? data.syncedAt : data.syncedAt;
  return (
    <section id="availability" className="border-t band-soft">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-start gap-x-8 gap-y-6">
          <SectionHeading>{tr("Current Availability", "Disponibilités actuelles")}</SectionHeading>
          <div className="flex flex-col items-center gap-3 md:ml-8" role="status">
            <p className="text-base text-muted-foreground">{displaySyncedAt ? `${tr('Last synced at', 'Dernière synchronisation le')} ${format(parseISO(displaySyncedAt), 'd MMM yyyy, HH:mm:ss', { locale })}` : tr('No confirmed calendar update yet.', 'Aucune mise à jour confirmée pour le moment.')}</p>
            <div className="flex items-center justify-center gap-3">
              <Button asChild size="lg" className="h-auto max-w-full whitespace-normal py-3 text-center">
                <a href={DEFAULT_AIRBNB_BOOKING_URL} target="_blank" rel="noopener noreferrer">{tr('Book Direct Now Through AirBnB', 'Réservez directement sur AirBnB')}<ArrowRight className="shrink-0" /></a>
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-muted-foreground">{tr('Check the calendar below for up-to-date availability.', 'Consultez le calendrier ci-dessous pour connaître les disponibilités à jour.')}</p>
          <Button variant="outline" disabled={refreshing} onClick={() => refresh.mutate(Date.now())}>
            {refreshing ? tr('Refreshing…', 'Actualisation…') : tr('Refresh', 'Actualiser')}
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap gap-6 text-base md:text-lg" aria-label={tr('Calendar legend', 'Légende')}>
          <span className="flex items-center gap-2"><span className="size-3 rounded-sm border-2 border-primary bg-background" />{ready ? tr('Available', 'Disponible') : tr('Availability unconfirmed', 'Disponibilité non confirmée')}</span>
          <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-coral/70" />{tr('Unavailable', 'Indisponible')}</span>
        </div>
        <div className="mt-6" role="status">
          {(!ready || refresh.isError) && <div className="mb-4 flex flex-wrap items-center gap-3">
            <p className="text-sm text-destructive">{tr('Availability could not be updated.', 'Les disponibilités n’ont pas pu être mises à jour.')}</p>
            <Button asChild variant="outline" className="h-auto max-w-full whitespace-normal py-2">
              <a href={DEFAULT_AIRBNB_BOOKING_URL} target="_blank" rel="noopener noreferrer">{tr('Please check dates on Airbnb', 'Vérifiez les dates sur Airbnb')}<ArrowRight /></a>
            </Button>
          </div>}
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