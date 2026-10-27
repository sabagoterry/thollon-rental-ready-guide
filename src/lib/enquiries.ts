import { z } from 'zod';

export const enquirySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(160),
  message: z.string().trim().min(10).max(1000),
  website: z.string().max(0),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
export function enquiryMessage(input: EnquiryInput): string {
  return `Les Cyclamens enquiry\nFrom: ${input.name}\nReply to: ${input.email}\n\n${input.message}`;
}