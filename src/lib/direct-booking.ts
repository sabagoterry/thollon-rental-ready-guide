import { z } from 'zod';
import { parseBookingSelection } from './booking-selection';

export const directBookingSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.coerce.number().int().min(1).max(6),
  website: z.string().max(0),
}).refine(v => Boolean(parseBookingSelection(v).checkIn), { path: ['checkOut'], message: 'Choose valid arrival and departure dates.' });
export type DirectBookingInput = z.infer<typeof directBookingSchema>;

export function directBookingMessage(v: DirectBookingInput) {
  return `Les Cyclamens direct booking request\nFrom: ${v.name}\nReply to: ${v.email}\nCheck-in: ${v.checkIn}\nCheck-out: ${v.checkOut}\nGuests: ${v.guests}\n\nRequest only — not a confirmed reservation.`;
}