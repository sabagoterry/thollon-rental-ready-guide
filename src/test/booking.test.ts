import { expect, it } from 'vitest';
import { addNights, airbnbBookingUrl, countNights, stayOverlapsBlocked, DEFAULT_AIRBNB_BOOKING_URL } from '@/lib/booking';

it('uses the owner-requested Airbnb destination for default booking', () => {
  expect(DEFAULT_AIRBNB_BOOKING_URL).toBe('https://www.airbnb.co.uk/rooms/1300151240294300447?check_in=&check_out=&adults=2');
});

it('builds the Airbnb listing link with dates and guests', () => {
  const url = new URL(airbnbBookingUrl('2026-12-20', '2026-12-27', 4));
  expect(url.pathname).toBe('/rooms/1300151240294300447');
  expect(url.searchParams.get('check_in')).toBe('2026-12-20');
  expect(url.searchParams.get('check_out')).toBe('2026-12-27');
  expect(url.searchParams.get('adults')).toBe('4');
});
it('caps guests at six', () => {
  expect(new URL(airbnbBookingUrl('2026-12-20', '2026-12-27', 9)).searchParams.get('adults')).toBe('6');
});
it('counts nights across month ends', () => {
  expect(countNights('2026-12-28', '2027-01-04')).toBe(7);
  expect(addNights('2026-12-28', 7)).toBe('2027-01-04');
});
it('allows arriving on another guest’s checkout day', () => {
  const ranges = [{ start: '2026-12-20', end: '2026-12-27' }];
  expect(stayOverlapsBlocked('2026-12-27', '2027-01-03', ranges)).toBe(false);
  expect(stayOverlapsBlocked('2026-12-15', '2026-12-21', ranges)).toBe(true);
  expect(stayOverlapsBlocked('2026-12-13', '2026-12-20', ranges)).toBe(false);
});
