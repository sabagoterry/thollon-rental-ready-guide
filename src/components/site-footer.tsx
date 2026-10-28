import { Link } from '@tanstack/react-router';
import { LogoMark } from '@/components/logo-mark';
import { AIRBNB_URL } from '@/lib/guest-guide';
import { houseRules } from '@/lib/apartment';
import { essentials, liveLinks } from '@/lib/local-links';

const aroundLinks = [
  { name: 'Tourist office', url: essentials.find((e) => e.name === 'Tourist office')!.url },
  { name: 'Lift passes', url: essentials.find((e) => e.name === 'Lift passes')!.url },
  { name: 'ESF ski school', url: essentials.find((e) => e.name === 'ESF Thollon')!.url },
  { name: 'Snow forecast', url: liveLinks.find((l) => l.name === 'Snow forecast')!.url },
  { name: 'Télécabine news', url: liveLinks.find((l) => l.name === 'Télécabine news')!.url },
  { name: 'What’s on in Thollon', url: liveLinks.find((l) => l.name === 'What’s on in Thollon')!.url },
] as const;

const quickFacts = [
  `Check-in ${houseRules.checkIn}`,
  `Check-out ${houseRules.checkOut}`,
  'No pets',
  'No smoking, including balconies',
] as const;

export function SiteFooter() {
  return (
    <footer className="band-deep px-6 py-12 text-primary-foreground/90">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[auto_1fr_1fr]">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <LogoMark />
          <a
            href={AIRBNB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full band-sunset px-5 py-2 text-sm font-medium text-accent-foreground glow-accent transition hover:brightness-110"
          >
            Book instantly on Airbnb
          </a>
        </div>

        <nav aria-label="Site pages" className="grid content-start gap-2 text-center md:text-left">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-sunshine">The apartment</h3>
          <Link to="/" className="underline-offset-4 transition hover:text-white hover:underline">Home</Link>
          <Link to="/location" className="underline-offset-4 transition hover:text-white hover:underline">Location & views</Link>
          <Link to="/book" className="underline-offset-4 transition hover:text-white hover:underline">Check dates & book</Link>
        </nav>

        <nav aria-label="Around Thollon" className="grid content-start gap-2 text-center md:text-left">
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-sunshine">Around Thollon</h3>
          {aroundLinks.map((l) => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 transition hover:text-white hover:underline">
              {l.name}
            </a>
          ))}
        </nav>
      </div>

      <ul className="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
        {quickFacts.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-sunshine">✦</span>
            {f}
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-xs text-primary-foreground/60">
        Apartment rental in Thollon-les-Mémises, Lake Léman · © {new Date().getFullYear()}
      </p>
    </footer>
  );
}
