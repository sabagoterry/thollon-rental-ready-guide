import { createFileRoute } from '@tanstack/react-router';
import { availabilityQuery } from '@/lib/availability.query';
import { parseBookingSelection } from '@/lib/booking-selection';
import { StayPlanner } from '@/components/stay-planner';

export const Route = createFileRoute('/book')({
  validateSearch: parseBookingSelection,
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
  component: () => <StayPlanner selection={Route.useSearch()} />,
});

