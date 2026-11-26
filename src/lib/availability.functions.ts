import { createServerFn } from '@tanstack/react-start';

// Neither operation accepts visitor URLs or event data.
export const getAvailability = createServerFn({ method: 'GET' }).handler(async () => {
  const { syncAvailability } = await import('./availability-sync.server');
  return syncAvailability();
});

export const refreshAvailability = createServerFn({ method: 'POST' }).handler(async () => {
  const { syncAvailability } = await import('./availability-sync.server');
  return syncAvailability(true);
});
