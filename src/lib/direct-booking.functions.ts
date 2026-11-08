import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import { directBookingSchema, directBookingMessage } from './direct-booking';
import { parisToday, type BlockedRange } from './availability';
import { stayOverlapsBlocked } from './booking';

export const submitDirectBooking = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => directBookingSchema.parse(input))
  .handler(async ({ data }): Promise<{ status: 'saved' | 'queued' | 'unavailable' | 'failed' }> => {
    try {
      if (data.checkIn < parisToday()) return { status: 'unavailable' };
      const url = process.env['SUPABASE_URL'];
      const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
      if (!url || !key) return { status: 'failed' };
      const client = createClient<Database>(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
          headers.set('apikey', key);
          return fetch(input, { ...init, headers });
        } },
      });
      const { data: cache, error } = await client.from('availability_cache').select('*').eq('id', 'airbnb').maybeSingle();
      const age = cache ? Date.now() - Date.parse(cache.checked_at) : Infinity;
      if (error || !cache?.sync_ok || age < 0 || age >= 15 * 60_000 || stayOverlapsBlocked(data.checkIn, data.checkOut, cache.blocked_ranges as BlockedRange[])) return { status: 'unavailable' };
      // A fixed, validated public submission; private reads remain owner-only.
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const message = directBookingMessage(data);
      const { error: insertError } = await supabaseAdmin.from('enquiries').insert({ id: data.id, name: data.name, email: data.email, message });
      if (insertError) return { status: insertError.code === '23505' ? 'saved' : 'failed' };
      const notificationKey = process.env['CALLMEBOT_API_KEY'];
      let status: 'queued' | 'failed' | 'unknown' = 'failed';
      if (notificationKey) {
        const target = new URL('https://api.callmebot.com/whatsapp.php');
        target.searchParams.set('phone', '447900888896');
        target.searchParams.set('apikey', notificationKey);
        target.searchParams.set('text', message);
        try {
          const response = await fetch(target, { redirect: 'error', signal: AbortSignal.timeout(15_000) });
          const body = await response.text();
          status = response.ok && /message\s+queued/i.test(body) ? 'queued' : 'failed';
        } catch { status = 'unknown'; }
      }
      const { error: updateError } = await supabaseAdmin.from('enquiries').update({ status }).eq('id', data.id);
      return { status: status === 'queued' && !updateError ? 'queued' : 'saved' };
    } catch { return { status: 'failed' }; }
  });