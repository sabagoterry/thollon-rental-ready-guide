import { z } from 'zod';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);

export const enquirySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).regex(/^[+\d\s()-]*$/).optional().default(''),
  checkIn: isoDate,
  checkOut: isoDate,
  guests: z.coerce.number().int().min(1).max(6),
  message: z.string().trim().max(1000).optional().default(''),
  website: z.string().max(0),
}).refine(v => v.checkOut > v.checkIn, { message: 'Check-out must be after check-in', path: ['checkOut'] });
export type EnquiryInput = z.infer<typeof enquirySchema>;
export function enquiryMessage(input: EnquiryInput): string {
  const lines = [
    'Les Cyclamens enquiry',
    `From: ${input.name}`,
    `Reply to: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : '',
    `Dates: ${input.checkIn} to ${input.checkOut}`,
    `Guests: ${input.guests}`,
  ].filter(Boolean);
  return input.message ? `${lines.join('\n')}\n\n${input.message}` : lines.join('\n');
}
