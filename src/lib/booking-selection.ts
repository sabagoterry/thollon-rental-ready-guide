import { z } from 'zod';

const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
});
const selectionSchema = z.object({
  checkIn: date,
  checkOut: date,
  guests: z.coerce.number().int().min(1).max(6),
}).refine(value => value.checkOut > value.checkIn);

export type BookingSelection = { checkIn?: string; checkOut?: string; guests?: number };
export function parseBookingSelection(input: Record<string, unknown>): BookingSelection {
  const result = selectionSchema.safeParse(input);
  return result.success ? result.data : {};
}