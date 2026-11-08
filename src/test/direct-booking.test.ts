import { expect, it } from 'vitest';
import { directBookingSchema, directBookingMessage } from '@/lib/direct-booking';
const valid = { id: '7cc91ae6-85a9-4389-866b-9d48358a60c2', name: ' Guest ', email: 'guest@example.com', checkIn: '2026-12-20', checkOut: '2026-12-27', guests: 4, website: '' };
it('captures the name, dates and guests in the owner request', () => {
  const data = directBookingSchema.parse(valid);
  expect(data.name).toBe('Guest');
  const message = directBookingMessage(data);
  expect(message).toContain('Check-in: 2026-12-20');
  expect(message).toContain('Check-out: 2026-12-27');
  expect(message).toContain('Guests: 4');
});
it('requires a name', () => { expect(directBookingSchema.safeParse({ ...valid, name: ' ' }).success).toBe(false); });
it('requires valid dates in arrival/departure order', () => {
  expect(directBookingSchema.safeParse({ ...valid, checkIn: '2026-02-30' }).success).toBe(false);
  expect(directBookingSchema.safeParse({ ...valid, checkOut: '2026-12-19' }).success).toBe(false);
});
it('allows up to six guests and rejects seven', () => {
  expect(directBookingSchema.safeParse({ ...valid, guests: 6 }).success).toBe(true);
  expect(directBookingSchema.safeParse({ ...valid, guests: 7 }).success).toBe(false);
});
it('requires a valid reply email and rejects the bot trap', () => {
  expect(directBookingSchema.safeParse({ ...valid, email: 'invalid' }).success).toBe(false);
  expect(directBookingSchema.safeParse({ ...valid, website: 'spam' }).success).toBe(false);
});