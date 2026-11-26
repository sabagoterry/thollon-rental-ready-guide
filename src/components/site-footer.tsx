import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo-mark";
import { AIRBNB_URL } from "@/lib/guest-guide";
import { houseRules } from "@/lib/apartment";
import { essentials, liveLinks } from "@/lib/local-links";
import { useLang } from "@/lib/i18n";

const aroundLinks = [
  {
    name: "Hiking on offer",
    fr: "Randonnées proposées",
    url: "https://www.komoot.com/guide/1459249/hiking-around-thollon-les-memises",
  },
  {
    name: "Skiing on offer",
    fr: "Ski proposé",
    url: "https://www.leman-mountains-explore.com/decouvrir/les-stations/station-de-thollon-les-memises/",
  },
  { name: "Tourist office", fr: "Office de tourisme", url: essentials.find((e) => e.name === "Tourist office")?.url },
  { name: "Lift passes", fr: "Forfaits de ski", url: essentials.find((e) => e.name === "Lift passes")?.url },
  { name: "ESF ski school", fr: "École de ski ESF", url: essentials.find((e) => e.name === "ESF Thollon")?.url },
  { name: "Snow forecast", fr: "Prévisions neige", url: liveLinks.find((l) => l.name === "Snow forecast")?.url },
  {
    name: "Télécabine news",
    fr: "Actualités Télécabine",
    url: liveLinks.find((l) => l.name === "Télécabine news")?.url,
  },
  {
    name: "What’s on in Thollon",
    fr: "Agenda de Thollon",
    url: liveLinks.find((l) => l.name === "What’s on in Thollon")?.url,
  },
] as const;

const quickFacts = [
  [`Check-in ${houseRules.checkIn}`, "Arrivée à partir de 16h"],
  [`Check-out ${houseRules.checkOut}`, "Départ avant 10h"],
  ["No pets", "Animaux non admis"],
  ["No smoking, including balconies", "Non-fumeur, balcons compris"],
  [
    "Please minimize noise in the shared areas from 11:00 PM to 7:00 AM.",
    "Veuillez limiter le bruit dans les espaces communs entre 23 h 00 et 7 h 00.",
  ],
] as const;

export function SiteFooter() {
  const { tr } = useLang();
  return (
    <footer className="band-deep px-6 py-12 text-primary-foreground/90">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[auto_1fr_1fr]">
        <div className="flex flex-col items-center gap-4">
          <LogoMark />
          <Button asChild className="band-sunset text-accent-foreground">
            <a href={AIRBNB_URL} target="_blank" rel="noopener noreferrer">
              {tr("Book instantly on Airbnb", "Réserver sur Airbnb")}
            </a>
          </Button>
        </div>

        <nav
          aria-label={tr("Site pages", "Pages du site")}
          className="grid content-start gap-2 text-center md:text-left"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-sunshine">
            {tr("The apartment", "L’appartement")}
          </h3>
          <Link to="/" className="underline-offset-4 transition hover:text-white hover:underline">
            {tr("Home", "Accueil")}
          </Link>
          <Link to="/gallery" className="underline-offset-4 transition hover:text-white hover:underline">
            {tr("Photo gallery", "Galerie photos")}
          </Link>
          <Link
            to="/local-area"
            className="underline-offset-4 transition hover:text-primary-foreground hover:underline"
          >
            {tr("Local area", "Le coin")}
          </Link>
          <Link to="/location" className="underline-offset-4 transition hover:text-white hover:underline">
            {tr("Location & views", "Situation et vues")}
          </Link>
          <Link
            to="/getting-here"
            className="underline-offset-4 transition hover:text-primary-foreground hover:underline"
          >
            {tr("Getting here", "Venir aux Cyclamens")}
          </Link>
          <Link to="/book" className="underline-offset-4 transition hover:text-white hover:underline">
            {tr("Check dates & book", "Dates et réservation")}
          </Link>
          <Link
            to="/"
            hash="ask"
            className="underline-offset-4 transition hover:text-primary-foreground hover:underline"
          >
            {tr("Ask us", "Posez vos questions")}
          </Link>
        </nav>

        <nav
          aria-label={tr("Around Thollon", "Autour de Thollon")}
          className="grid content-start gap-2 text-center md:text-left"
        >
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-sunshine">
            {tr("Local Area", "Le coin")}
          </h3>
          {aroundLinks
            .filter((l) => l.url)
            .map((l) => (
              <a
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 transition hover:text-white hover:underline"
              >
                {tr(l.name, l.fr)}
              </a>
            ))}
        </nav>
      </div>

      <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        {quickFacts.map(([en, fr]) => (
          <li key={en} className="flex items-center gap-2">
            <span className="text-sunshine">✦</span>
            {tr(en, fr)}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-primary-foreground/60">
        {tr(
          "Apartment rental in Thollon-les-Mémises, Lake Léman",
          "Location d’appartement à Thollon-les-Mémises, lac Léman",
        )}{" "}
        · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
