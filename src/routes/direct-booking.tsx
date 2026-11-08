import { createFileRoute } from '@tanstack/react-router';
import { StayPlanner } from '@/components/stay-planner';
import { parseBookingSelection } from '@/lib/booking-selection';
import { availabilityQuery } from '@/lib/availability.query';

export const Route = createFileRoute('/direct-booking')({
  validateSearch: parseBookingSelection,
  loader: ({ context }) => context.queryClient.ensureQueryData(availabilityQuery),
  head: () => ({ meta: [
    { title: 'Direct Booking — Les Cyclamens' },
    { name: 'description', content: 'Request a direct stay at Les Cyclamens with your name, dates and guest count, for owner confirmation.' },
    { property: 'og:title', content: 'Direct Booking — Les Cyclamens' },
    { property: 'og:description', content: 'Send your selected dates and guests to the owner of Les Cyclamens for confirmation.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: () => <StayPlanner direct selection={Route.useSearch()} />,
});