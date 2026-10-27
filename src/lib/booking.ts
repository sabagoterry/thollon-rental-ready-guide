import { AIRBNB_URL } from './guest-guide';
import { isBlocked, type BlockedRange } from './availability';

export const MAX_GUESTS = 6;

function addDay(day: string): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function addNights(checkIn: string, nights: number): string {
  let day = checkIn;
  for (let i = 0; i < nights; i++) day = addDay(day);
  return day;
}

export function countNights(checkIn: string, checkOut: string): number {
  return Math.round((Date.parse(`${checkOut}T00:00:00Z`) - Date.parse(`${checkIn}T00:00:00Z`)) / 86_400_000);
}

/** Nights run from check-in up to (not including) check-out. */
export function stayOverlapsBlocked(checkIn: string, checkOut: string, ranges: BlockedRange[]): boolean {
  for (let day = checkIn; day < checkOut; day = addDay(day)) if (isBlocked(day, ranges)) return true;
  return false;
}

export function airbnbBookingUrl(checkIn: string, checkOut: string, guests: number): string {
  const url = new URL(AIRBNB_URL);
  url.searchParams.set('check_in', checkIn);
  url.searchParams.set('check_out', checkOut);
  url.searchParams.set('adults', String(Math.min(Math.max(1, Math.trunc(guests)), MAX_GUESTS)));
  return url.toString();
}
