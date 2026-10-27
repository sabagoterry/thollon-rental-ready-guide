import { expect, it } from 'vitest';
import { WHATSAPP_URL } from '@/lib/enquiries';

it('opens the owner’s chosen WhatsApp number', () => {
  const url = new URL(WHATSAPP_URL);
  expect(url.origin).toBe('https://wa.me');
  expect(url.pathname).toBe('/447900888896');
});