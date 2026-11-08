import { createFileRoute } from '@tanstack/react-router';
import { StayPlanner } from '@/components/stay-planner';
import { parseBookingSelection } from '@/lib/booking-selection';
import { availabilityQuery } from '@/lib/availability.query';

export const Route = createFileRoute('/direct-booking')({
  validateSearch: parseBookingSelection,
  loader: ({ context }) => context.queryClient.ensureQueryData(availabilityQuery),
  head: () => ({ meta: [
    { title: 'Direct Booking — Les Cyclamens' },
    { name: 'description', content: 'Review your selected dates and guests for Les Cyclamens. Direct booking is not yet open.' },
    { property: 'og:title', content: 'Direct Booking — Les Cyclamens' },
    { property: 'og:description', content: 'Your selected stay at Les Cyclamens, Thollon-les-Mémises. Direct booking coming later.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: () => <StayPlanner direct selection={Route.useSearch()} />,
});