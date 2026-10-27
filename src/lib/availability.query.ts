import { queryOptions } from '@tanstack/react-query';
import { getAvailability } from './availability.functions';

export const availabilityQuery = queryOptions({
  queryKey: ['airbnb-availability'],
  queryFn: () => getAvailability(),
  staleTime: 60_000,
  refetchInterval: 5 * 60_000,
});