import { useState } from 'react';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { availabilityQuery } from '@/lib/availability.query';
import { refreshAvailability } from '@/lib/availability.functions';
import { refreshDisplayTime } from '@/lib/availability';

export function useAvailabilityRefresh() {
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
  return {
    data,
    refresh,
    refreshing: isFetching || refresh.isPending,
    displaySyncedAt: data.status === 'ready' ? refreshedDisplayAt ?? data.syncedAt : data.syncedAt,
  };
}