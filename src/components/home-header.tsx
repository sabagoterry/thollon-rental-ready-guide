import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/logo-mark";
import { LanguageToggle } from "@/components/language-toggle";
import { Button } from "@/components/ui/button";
import { House, MessageCircle, Ticket } from "lucide-react";
import { DEFAULT_AIRBNB_BOOKING_URL } from "@/lib/booking";
import directionsIcon from "@/assets/navigation-directions.png";
import localIcon from "@/assets/navigation-local-area.png";
import calendarIcon from "@/assets/navigation-availability.png";
import galleryIcon from "@/assets/navigation-gallery.png";
import locationIcon from "@/assets/navigation-location.png";
import { useLang } from "@/lib/i18n";

export function HomeHeader() {
  const { tr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 100);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const sections = [
    { href: "#availability", en: "Availability", fr: "Disponibilités", image: calendarIcon },
    { to: "/gallery", en: "Gallery", fr: "Galerie", image: galleryIcon },
    { to: "/location", en: "Location", fr: "Situation", image: localIcon },
    { to: "/getting-here", en: "Getting here", fr: "Venir", image: directionsIcon },
    { to: "/local-area", en: "Local area", fr: "Le coin", image: locationIcon },
    { href: "#ask", en: "Ask us", fr: "Questions", image: null },
  ] as const;

  return (
    <>
      <header className="home-navigation pointer-events-none absolute inset-x-0 top-0 z-40 px-3 py-5">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-4 px-3">
          <LogoMark />
          <nav
            aria-label={tr("Main", "Navigation principale")}
            className="flex items-center gap-4 text-sm text-primary-foreground"
          >
            {sections.map((s) => {
              const label = tr(s.en, s.fr);
              const content = (
                <>
                  <span>{label}</span>
                  <span className="flex size-9 items-center justify-center rounded-full bg-background text-primary">
                    {s.image ? (
                      <img src={s.image} alt="" className="size-8 rounded-full object-contain" />
                    ) : (
                      <MessageCircle aria-hidden="true" className="size-6!" />
                    )}
                  </span>
                </>
              );
              return (
                <Button
                  key={s.en}
                  asChild
                  variant="ghost"
                  className="hidden h-auto flex-col gap-2 px-1 py-2 text-inherit hover:text-inherit md:inline-flex"
                >
                  {"to" in s ? <Link to={s.to}>{content}</Link> : <a href={s.href}>{content}</a>}
                </Button>
              );
            })}
            <Button asChild className="hidden h-auto flex-col gap-2 px-3 py-2 md:inline-flex">
              <a href={DEFAULT_AIRBNB_BOOKING_URL} target="_blank" rel="noopener noreferrer">
                <span>{tr("Book", "Réserver")}</span>
                <Ticket aria-hidden="true" className="size-7!" />
              </a>
            </Button>
            <LanguageToggle />
          </nav>
        </div>
      </header>

      {scrolled && (
        <nav
          aria-label={tr("Sections", "Sections")}
          className="fixed right-3 top-24 z-40 hidden flex-col items-end gap-2 md:flex"
        >
          <Button asChild variant="outline" size="icon" className="size-12 rounded-full shadow-lg">
            <Link to="/" aria-label={tr("Home", "Accueil")} title={tr("Home", "Accueil")}>
              <House aria-hidden="true" className="size-7!" />
            </Link>
          </Button>
          {sections.map((s) => {
            const label = tr(s.en, s.fr);
            const icon = s.image ? (
              <img src={s.image} alt="" className="size-11 rounded-full object-contain" />
            ) : (
              <MessageCircle aria-hidden="true" className="size-7!" />
            );
            return (
              <Button key={s.en} asChild variant="outline" size="icon" className="size-12 rounded-full shadow-lg">
                {"to" in s ? (
                  <Link to={s.to} aria-label={label} title={label}>
                    {icon}
                  </Link>
                ) : (
                  <a href={s.href} aria-label={label} title={label}>
                    {icon}
                  </a>
                )}
              </Button>
            );
          })}
          <Button asChild size="icon" className="size-12 rounded-full shadow-lg">
            <a
              href={DEFAULT_AIRBNB_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tr("Book", "Réserver")}
              title={tr("Book", "Réserver")}
            >
              <Ticket aria-hidden="true" className="size-7!" />
            </a>
          </Button>
        </nav>
      )}
    </>
  );
}
