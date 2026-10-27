import { createServerFn } from '@tanstack/react-start';
import { enquirySchema, enquiryMessage } from './enquiries';

type Result = { status: 'queued' | 'failed' | 'unknown'; message: string };
const queued: Result = { status: 'queued', message: 'Your enquiry has been queued for the owner on WhatsApp.' };
const failed: Result = { status: 'failed', message: 'Your enquiry could not be sent. Please contact the owner through Airbnb.' };
const unknown: Result = { status: 'unknown', message: 'Your enquiry was saved, but WhatsApp acceptance could not be confirmed. Please do not resend; contact the owner through Airbnb if needed.' };

export const sendEnquiry = createServerFn({ method: 'POST' })
  .inputValidator(input => enquirySchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    const key = process.env['CALLMEBOT_API_KEY'];
    if (!key) return failed;
    try {
      // Fixed recipient and provider; visitors never supply a destination or credentials.
      const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
      const { error: insertError } = await supabaseAdmin.from('enquiries').insert({ id: data.id, name: data.name, email: data.email, message: data.message });
      if (insertError) {
        if (insertError.code !== '23505') return failed;
        const { data: existing, error } = await supabaseAdmin.from('enquiries').select('status').eq('id', data.id).maybeSingle();
        if (error) return unknown;
        return existing?.status === 'queued' ? queued : existing?.status === 'failed' ? failed : unknown;
      }
      const url = new URL('https://api.callmebot.com/whatsapp.php');
      url.searchParams.set('phone', '447900888896');
      url.searchParams.set('text', enquiryMessage(data));
      url.searchParams.set('apikey', key);
      let status: 'queued' | 'failed' | 'unknown' = 'unknown';
      try {
        const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15_000) });
        const text = await response.text();
        // A HTTP 200 alone does not establish provider acceptance.
        status = response.ok && /message\s+queued/i.test(text) ? 'queued' : 'failed';
      } catch {
        // An ambiguous timeout must not trigger a duplicate message retry.
        status = 'unknown';
      }
      const { error: updateError } = await supabaseAdmin.from('enquiries').update({ status }).eq('id', data.id);
      if (updateError) return unknown;
      return status === 'queued' ? queued : status === 'failed' ? failed : unknown;
    } catch {
      // CallMeBot responses can echo its key and private enquiry: never log or return them.
      return failed;
    }
  });