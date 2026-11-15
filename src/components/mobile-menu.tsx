import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { DEFAULT_AIRBNB_BOOKING_URL } from "@/lib/booking";

export function MobileMenu({ includeSections = false }: { includeSections?: boolean }) {
  const { tr } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: tr("Home", "Accueil") },
    { to: "/gallery", label: tr("Photo gallery", "Galerie photos") },
    { to: "/location", label: tr("Location & views", "Situation et vues") },
    { to: "/getting-here", label: tr("Getting here", "Venir aux Cyclamens") },
    { to: "/local-area", label: tr("Local area", "Le coin") },
    { to: "/book", label: tr("Check dates & book", "Dates et réservation") },
  ] as const;

  return (
    <div className="relative lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? tr("Close menu", "Fermer le menu") : tr("Open menu", "Ouvrir le menu")}
        className="inline-flex size-12 items-center justify-center rounded-full border border-primary/20 bg-white text-primary shadow-lg transition hover:border-accent hover:bg-white/90 hover:text-accent"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </Button>

      {open && (
        <nav
          aria-label={tr("Mobile pages", "Pages")}
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
          {includeSections && (
            <Button asChild className="mt-2 w-full">
              <a
                href={DEFAULT_AIRBNB_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                {tr("Book", "Réserver")}
              </a>
            </Button>
          )}
          {includeSections &&
            [
              { href: "#availability", label: tr("Availability", "Disponibilités") },
              { href: "#ask", label: tr("Ask us", "Questions") },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-sm px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent/15"
              >
                {l.label}
              </a>
            ))}
        </nav>
      )}
    </div>
  );
}
