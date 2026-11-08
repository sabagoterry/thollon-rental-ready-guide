import { Link } from '@tanstack/react-router';
import { CalendarCheck } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function FloatingBookButton() {
  const { tr } = useLang();
  return (
    <Button asChild size="icon" className="fixed right-3 top-1/2 z-50 size-12 -translate-y-1/2 rounded-full shadow-lg">
    <Link
      to="/book"
      aria-label={tr('Check dates and book', 'Voir les dates et réserver')}
      title={tr('Check dates and book', 'Voir les dates et réserver')}
    >
      <CalendarCheck className="size-6!" aria-hidden="true" />
    </Link>
    </Button>
  );
}
