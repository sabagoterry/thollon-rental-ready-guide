import { expect, it } from 'vitest';
import { enquirySchema, enquiryMessage } from '@/lib/enquiries';

const input = { id: 'd645fe87-2acb-4fc5-939c-573cb3074e41', name: 'Test guest', email: 'guest@example.com', message: 'Are dates available in December?', website: '' };
it('includes the guest’s reply address and enquiry in the owner notification', () => {
  expect(enquiryMessage(input)).toContain('Reply to: guest@example.com');
  expect(enquiryMessage(input)).toContain('Are dates available in December?');
});
it('requires a valid reply email', () => {
  expect(enquirySchema.safeParse({ ...input, email: 'invalid' }).success).toBe(false);
});
it('rejects honeypot submissions', () => {
  expect(enquirySchema.safeParse({ ...input, website: 'spam' }).success).toBe(false);
});