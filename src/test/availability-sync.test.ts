import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({ maybeSingle: vi.fn(), upsert: vi.fn() }));
vi.mock('@supabase/supabase-js', () => ({
  createClient: () => ({ from: () => ({ select: () => ({ eq: () => ({ maybeSingle: mocks.maybeSingle }) }) }) }),
}));
vi.mock('@/integrations/supabase/client.server', () => ({
  supabaseAdmin: { from: () => ({ upsert: mocks.upsert }) },
}));
import { syncAvailability } from '@/lib/availability-sync.server';

describe('Manual calendar sync', () => {
  const oldTime = '2026-11-26T08:07:00.000Z';
  const now = '2026-11-26T08:09:20.000Z';
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(now));
    vi.stubEnv('SUPABASE_URL', 'https://example.invalid');
    vi.stubEnv('SUPABASE_PUBLISHABLE_KEY', 'test-public-key');
    vi.stubEnv('AIRBNB_ICAL_URL', 'https://www.airbnb.com/calendar/ical/123.ics');
    mocks.maybeSingle.mockResolvedValue({ data: { checked_at: oldTime, synced_at: oldTime, sync_ok: true, blocked_ranges: [] }, error: null });
    mocks.upsert.mockResolvedValue({ error: null });
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });
  it('manual Refresh bypasses a fresh cache and returns today’s actual sync time', async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response('BEGIN:VCALENDAR\r\nVERSION:2.0\r\nEND:VCALENDAR'));
    vi.stubGlobal('fetch', fetcher);
    const result = await syncAvailability(true);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(result.syncedAt).toBe('2026-11-26T08:09:20.000Z');
    expect(result.status).toBe('ready');
    expect(mocks.upsert).toHaveBeenCalledWith(expect.objectContaining({ synced_at: now, sync_ok: true }));
  });
  it('a failed manual sync retains the previous time and marks availability unconfirmed', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Unavailable')));
    const result = await syncAvailability(true);
    expect(result.syncedAt).toBe('2026-11-26T08:07:00.000Z');
    expect(result.status).toBe('unavailable');
  });
  it('ordinary cached reads do not pretend a new upstream sync occurred', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    const result = await syncAvailability();
    expect(result.syncedAt).toBe(oldTime);
    expect(fetcher).not.toHaveBeenCalled();
  });
});