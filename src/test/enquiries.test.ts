import { expect, it } from 'vitest';
import { enquirySchema, enquiryMessage } from '@/lib/enquiries';

const input = { id: 'd645fe87-2acb-4fc5-939c-573cb3074e41', name: 'Test guest', email: 'guest@example.com', phone: '+44 7700 900000', checkIn: '2026-12-20', checkOut: '2026-12-27', guests: 4, message: 'Are dates available in December?', website: '' };
it('includes the guest’s contact details, dates and enquiry in the owner notification', () => {
  const text = enquiryMessage(enquirySchema.parse(input));
  expect(text).toContain('Reply to: guest@example.com');
  expect(text).toContain('Phone: +44 7700 900000');
  expect(text).toContain('Dates: 2026-12-20 to 2026-12-27');
  expect(text).toContain('Guests: 4');
  expect(text).toContain('Are dates available in December?');
});
it('requires a valid reply email', () => {
  expect(enquirySchema.safeParse({ ...input, email: 'invalid' }).success).toBe(false);
});
it('rejects check-out on or before check-in', () => {
  expect(enquirySchema.safeParse({ ...input, checkOut: '2026-12-20' }).success).toBe(false);
});
it('rejects more than six guests', () => {
  expect(enquirySchema.safeParse({ ...input, guests: 7 }).success).toBe(false);
});
it('rejects honeypot submissions', () => {
  expect(enquirySchema.safeParse({ ...input, website: 'spam' }).success).toBe(false);
});
it('accepts an enquiry with only name, email and message', () => {
  const minimal = { id: input.id, name: input.name, email: input.email, message: input.message, website: '' };
  const parsed = enquirySchema.parse(minimal);
  const text = enquiryMessage(parsed);
  expect(text).toContain('From: Test guest');
  expect(text).not.toContain('Dates:');
  expect(text).not.toContain('Guests:');
});
it('requires a message', () => {
  expect(enquirySchema.safeParse({ ...input, message: '' }).success).toBe(false);
});
