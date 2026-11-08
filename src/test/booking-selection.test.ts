import { expect, it } from 'vitest';
import { parseBookingSelection } from '@/lib/booking-selection';

it('preserves selected check-in, check-out and guests for Direct Booking and Change', () => {
  expect(parseBookingSelection({ checkIn: '2026-12-20', checkOut: '2026-12-27', guests: '4' }))
    .toEqual({ checkIn: '2026-12-20', checkOut: '2026-12-27', guests: 4 });
});
it('rejects impossible or reversed dates', () => {
  expect(parseBookingSelection({ checkIn: '2026-02-30', checkOut: '2026-03-07', guests: 4 })).toEqual({});
  expect(parseBookingSelection({ checkIn: '2026-12-27', checkOut: '2026-12-20', guests: 4 })).toEqual({});
});
it('rejects guest numbers outside the apartment limit', () => {
  expect(parseBookingSelection({ checkIn: '2026-12-20', checkOut: '2026-12-27', guests: 7 })).toEqual({});
});