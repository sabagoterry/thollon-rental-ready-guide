import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { format, parseISO, addMonths } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { availabilityQuery } from '@/lib/availability.query';
import { isBlocked } from '@/lib/availability';

export function AvailabilityCalendar() {
  const { data, refetch, isFetching } = useSuspenseQuery(availabilityQuery);
  const today = parseISO(data.today);
  const [month, setMonth] = useState(today);
  const ready = data.status === 'ready';
  return (
    <section id="availability" className="border-t band-soft">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionHeading kicker="Before you book">Availability</SectionHeading>
          <Button variant="outline" size="icon" title="Refresh availability" aria-label="Refresh availability" disabled={isFetching} onClick={() => void refetch()}>
            <RefreshCw className={isFetching ? 'animate-spin motion-reduce:animate-none' : ''} />
          </Button>
        </div>
        <p className="mt-4 text-muted-foreground">Final availability and prices are confirmed on Airbnb.</p>
        <div className="mt-8 flex flex-wrap gap-6 text-sm" aria-label="Calendar legend">
          <span className="flex items-center gap-2"><span className="size-3 rounded-sm border-2 border-primary bg-background" />{ready ? 'Not blocked on Airbnb' : 'Availability unconfirmed'}</span>
          <span className="flex items-center gap-2"><span className="size-3 rounded-sm bg-coral/70" />Unavailable</span>
        </div>
        <div className="mt-6" role="status">
          {!ready && <p className="mb-4 text-sm text-destructive">Availability could not be updated. Please check dates on Airbnb.</p>}
          <p className="text-sm text-muted-foreground">{data.syncedAt ? `Last synced ${format(parseISO(data.syncedAt), 'd MMM yyyy, HH:mm')}` : 'No confirmed calendar update yet.'}</p>
        </div>
        <div className="card-vivid mt-6 overflow-hidden rounded-lg bg-card p-4">
          <Calendar
            aria-label="Apartment availability calendar"
            month={month} onMonthChange={setMonth} startMonth={today} endMonth={addMonths(today, 23)}
            numberOfMonths={2} weekStartsOn={1} showOutsideDays={false}
            className="availability-calendar max-w-full bg-card p-0 [--cell-size:2.25rem]"
            modifiers={{ blocked: day => isBlocked(format(day, 'yyyy-MM-dd'), data.ranges), past: { before: today } }}
            modifiersClassNames={{ blocked: 'bg-coral/15 text-muted-foreground line-through', past: 'text-muted-foreground opacity-40' }}
            labels={{ labelDay: day => `${format(day, 'd MMMM yyyy')}: ${day < today ? 'past date' : isBlocked(format(day, 'yyyy-MM-dd'), data.ranges) ? 'unavailable' : ready ? 'not blocked on Airbnb' : 'availability unconfirmed'}` }}
          />
        </div>
      </div>
    </section>
  );
}