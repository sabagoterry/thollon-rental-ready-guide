import { createFileRoute, Link } from '@tanstack/react-router';
import { Car, MapPin, Navigation } from 'lucide-react';
import { LogoMark } from '@/components/logo-mark';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { SiteFooter } from '@/components/site-footer';
import { SectionHeading } from '@/components/section-heading';
import { FindUs } from '@/components/find-us';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';
import { apartmentLocation, apartmentDirectionsUrl } from '@/lib/apartment-location';
import exterior from '@/assets/photos/exterior.jpg.asset.json';

export const Route = createFileRoute('/getting-here')({
  head: () => ({ meta: [
    { title: 'Getting here — Travel to Les Cyclamens, Thollon-les-Mémises' },
    { name: 'description', content: 'Plan your journey to Les Cyclamens in Thollon-les-Mémises with the apartment map, GPS coordinates, directions and official transport links.' },
    { property: 'og:title', content: 'Getting to Les Cyclamens — Thollon-les-Mémises' },
    { property: 'og:description', content: 'Find the apartment, get driving directions and plan your journey to Thollon-les-Mémises.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: GettingHerePage,
});

function GettingHerePage() {
  const { tr } = useLang();
  return <main>
    <header className="sticky top-0 z-40 border-b border-primary/10 bg-card/90 backdrop-blur">
      <div className="bar-flow h-1.5" />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <LogoMark />
        <nav aria-label={tr('Main', 'Navigation principale')} className="flex items-center gap-6 text-sm">
          <Link to="/" className="hidden text-muted-foreground hover:text-primary md:inline">{tr('The apartment', 'L’appartement')}</Link>
          <Link to="/location" className="hidden text-muted-foreground hover:text-primary md:inline">{tr('Location & views', 'Situation et vues')}</Link>
          <LanguageToggle /><MobileMenu />
        </nav>
      </div>
    </header>
    <section className="relative flex min-h-[48vh] items-end">
      <img src={exterior.url} alt={tr('The Les Cyclamens building', 'La résidence Les Cyclamens')} className="absolute inset-0 h-full w-full object-cover" />
      <div className="bg-overlay absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl px-6 pb-12 text-primary-foreground">
        <p className="mb-4 text-sm font-semibold text-sunshine">Les Cyclamens · Thollon-les-Mémises</p>
        <h1 className="text-5xl md:text-6xl">{tr('Getting here', 'Venir aux Cyclamens')}</h1>
        <p className="mt-5 max-w-xl text-lg">{tr('Your journey to the apartment above Lake Geneva.', 'Votre voyage vers l’appartement au-dessus du Léman.')}</p>
      </div>
    </section>
    <FindUs />
    <section className="mx-auto max-w-6xl px-6 py-16">
      <SectionHeading kicker={tr('Plan your journey', 'Préparez votre voyage')}>{tr('Driving & GPS', 'En voiture et GPS')}</SectionHeading>
      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="flex items-center gap-3 text-2xl text-primary"><Car className="size-6 shrink-0" />{tr('By car', 'En voiture')}</h3>
          <p className="mt-4 text-muted-foreground">{tr('Use the apartment coordinates as your destination. Open directions to plan a route from your starting point.', 'Utilisez les coordonnées de l’appartement comme destination. Ouvrez l’itinéraire pour préparer votre trajet depuis votre point de départ.')}</p>
          <Button asChild className="mt-5"><a href={apartmentDirectionsUrl} target="_blank" rel="noopener noreferrer"><Navigation />{tr('Driving directions', 'Itinéraire en voiture')}</a></Button>
        </div>
        <div>
          <h3 className="flex items-center gap-3 text-2xl text-primary"><MapPin className="size-6 shrink-0" />{tr('Apartment coordinates', 'Coordonnées de l’appartement')}</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div><dt className="text-muted-foreground">{tr('GPS / satnav', 'GPS')}</dt><dd className="mt-1 font-medium">{apartmentLocation.display}</dd></div>
            <div><dt className="text-muted-foreground">{tr('Decimal coordinates', 'Coordonnées décimales')}</dt><dd className="mt-1 font-medium">{apartmentLocation.latitude}, {apartmentLocation.longitude.toFixed(6)}</dd></div>
          </dl>
        </div>
      </div>
    </section>
    <SiteFooter />
  </main>;
}