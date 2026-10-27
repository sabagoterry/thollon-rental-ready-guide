import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WHATSAPP_URL } from '@/lib/enquiries';

export function WhatsAppEnquiry() {
  return <Button asChild variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle />Enquire on WhatsApp</a>
  </Button>;
}