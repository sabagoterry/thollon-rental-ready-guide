import { Body, Container, Head, Heading, Html, Preview, Text, Link, Hr } from '@react-email/components';
import type { TemplateEntry } from './registry';

interface Props { name?: string; email?: string; checkIn?: string; checkOut?: string; guests?: number }
function Receipt({ name, email, checkIn, checkOut, guests }: Props) {
  return <Html lang="en"><Head /><Preview>New Direct Booking request for Les Cyclamens</Preview>
    <Body style={{ backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif', color: '#28535a' }}>
      <Container style={{ padding: '32px 24px', maxWidth: '560px' }}>
        <Heading>Les Cyclamens</Heading><Heading as="h2">Direct Booking request received</Heading>
        <Text>A guest has submitted a request. This confirms receipt only, not a reservation.</Text>
        <Text><strong>Name:</strong> {name || 'Not provided'}<br /><strong>Email:</strong> {email || 'Not provided'}<br /><strong>Check-in:</strong> {checkIn || 'Not provided'}<br /><strong>Check-out:</strong> {checkOut || 'Not provided'}<br /><strong>Guests:</strong> {guests ?? 'Not provided'}</Text>
        <Text>Reply to this email to contact the guest and confirm availability and price.</Text><Hr />
        <Link href="https://thollon-rental-ready-guide.lovable.app/owner">Open your private owner inbox</Link>
      </Container>
    </Body></Html>;
}
export const terryTemplate = { component: Receipt, subject: 'Les Cyclamens — Direct Booking request received', displayName: 'Direct Booking receipt — Terry', to: 'Terry@thekavanaghs.co.uk', previewData: { name: 'Example guest', email: 'guest@example.com', checkIn: '2026-12-20', checkOut: '2026-12-23', guests: 4 } } satisfies TemplateEntry;
export const lesleyTemplate = { ...terryTemplate, displayName: 'Direct Booking receipt — Lesley', to: 'lesley@thekavanaghs.co.uk' } satisfies TemplateEntry;