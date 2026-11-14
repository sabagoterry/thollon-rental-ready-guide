import { Link } from '@tanstack/react-router';
import { Images } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';

export function GalleryLink({ className = '' }: { className?: string }) {
  const { tr } = useLang();
  const label = tr('Open photo gallery', 'Ouvrir la galerie photos');
  return (
    <Button asChild variant="outline" size="icon" className={`size-12 shrink-0 bg-card/95 text-card-foreground ${className}`}>
      <Link to="/gallery" aria-label={label} title={label}><Images aria-hidden="true" className="size-6" /></Link>
    </Button>
  );
}