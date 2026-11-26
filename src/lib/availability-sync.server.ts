import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { parseBlockedRanges, parisToday, type Availability, type BlockedRange } from './availability';

export async function syncAvailability(forceRefresh = false): Promise<Availability> {
  const today = parisToday();
  const fallback: Availability = { ranges: [], syncedAt: null, status: 'unavailable', today };
  try {
    const url = process.env['SUPABASE_URL'];
    const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
    const feed = process.env['AIRBNB_ICAL_URL'];
    if (!url || !key || !feed) return fallback;
    const publicClient = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
        headers.set('apikey', key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { data: cached, error } = await publicClient.from('availability_cache').select('*').eq('id', 'airbnb').maybeSingle();
    if (error) return fallback;
    if (cached) {
      const age = Date.now() - Date.parse(cached.checked_at);
      if (!forceRefresh && age >= 0 && age < (cached.sync_ok ? 15 : 5) * 60_000) {
        return { ranges: cached.blocked_ranges as BlockedRange[], syncedAt: cached.synced_at, status: cached.sync_ok ? 'ready' : 'unavailable', today };
      }
    }
    // The source is an encrypted secret, not a visitor-controlled URL.
    // Reject redirects so the token can never be forwarded to another host.
    const source = new URL(feed);
    if (source.protocol !== 'https:' || !['www.airbnb.co.uk', 'www.airbnb.com'].includes(source.hostname) || !/^\/calendar\/ical\/\d+\.ics$/.test(source.pathname) || source.username || source.password || source.port) return fallback;
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    try {
      const response = await fetch(source, { redirect: 'error', signal: AbortSignal.timeout(10_000), headers: { Accept: 'text/calendar' } });
      if (!response.ok || !response.body) throw new Error('Calendar request failed');
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let text = '';
      let bytes = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 1_000_000) { await reader.cancel(); throw new Error('Calendar too large'); }
        text += decoder.decode(value, { stream: true });
      }
      text += decoder.decode();
      const ranges = parseBlockedRanges(text);
      const syncedAt = new Date().toISOString();
      const { error: writeError } = await supabaseAdmin.from('availability_cache').upsert({ id: 'airbnb', blocked_ranges: ranges, synced_at: syncedAt, checked_at: syncedAt, sync_ok: true });
      if (writeError) return fallback;
      return { ranges, syncedAt, status: 'ready', today };
    } catch {
      // Never log exceptions: fetch/parser messages can contain private feed data.
      await supabaseAdmin.from('availability_cache').upsert({ id: 'airbnb', blocked_ranges: cached?.blocked_ranges ?? [], synced_at: cached?.synced_at ?? null, checked_at: new Date().toISOString(), sync_ok: false });
      return { ...fallback, ranges: (cached?.blocked_ranges ?? []) as BlockedRange[], syncedAt: cached?.synced_at ?? null };
    }
  } catch {
    return fallback;
  }
}
