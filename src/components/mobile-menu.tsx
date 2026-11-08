import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useLang } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export function MobileMenu({ includeSections = false }: { includeSections?: boolean }) {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: tr('Home', 'Accueil') },
    { to: '/gallery', label: tr('Photo gallery', 'Galerie photos') },
    { to: '/location', label: tr('Location & views', 'Situation et vues') },
    { to: '/getting-here', label: tr('Getting here', 'Venir aux Cyclamens') },
    { to: '/local-area', label: tr('Local area', 'Le coin') },
    { to: '/book', label: tr('Check dates & book', 'Dates et réservation') },
  ] as const;

  return (
    <div className="relative md:hidden">
      <Button variant="ghost" size="icon"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? tr('Close menu', 'Fermer le menu') : tr('Open menu', 'Ouvrir le menu')}
        className="inline-flex items-center justify-center rounded-md border border-primary/20 bg-background/60 p-2 text-primary transition hover:border-accent hover:text-accent"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </Button>

      {open && (
        <nav
          aria-label={tr('Mobile pages', 'Pages')}
          className="card-vivid absolute right-0 top-full z-50 mt-2 w-56 rounded-md bg-card p-2 shadow-xl"
        >
          <div className="bar-flow h-1 rounded-t-md" />
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent/15 hover:text-accent-foreground"
            >
              {l.label}
            </Link>
          ))}
          {includeSections && [
            { href: '#availability', label: tr('Availability', 'Disponibilités') },
            { href: '#ask', label: tr('Ask us', 'Questions') },
          ].map(l => <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent/15">{l.label}</a>)}
        </nav>
      )}
    </div>
  );
}
