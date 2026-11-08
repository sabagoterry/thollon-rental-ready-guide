import { expect, it } from 'vitest';
import { TEMPLATES } from '@/lib/email-templates/registry';
it('sends Terry the fixed Direct Booking receipt', () => {
  expect(TEMPLATES['direct-booking-terry']?.to).toBe('Terry@thekavanaghs.co.uk');
});
it('sends Lesley the fixed Direct Booking receipt', () => {
  expect(TEMPLATES['direct-booking-lesley']?.to).toBe('lesley@thekavanaghs.co.uk');
});