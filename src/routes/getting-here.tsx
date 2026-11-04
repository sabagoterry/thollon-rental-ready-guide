import { createFileRoute, Link } from '@tanstack/react-router';
import { Car, MapPin, Navigation, Plane, TrainFront, Bus, Snowflake, ArrowUpRight } from 'lucide-react';
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
    <section className="band-soft">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading kicker={tr('Travel options', 'Options de transport')}>{tr('Transport links', 'Liaisons de transport')}</SectionHeading>
        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2">
          <article>
            <h3 className="flex items-center gap-3 text-2xl text-primary"><Plane className="size-6 shrink-0" />{tr('Flying to Geneva', 'En avion via Genève')}</h3>
            <p className="mt-4 text-muted-foreground">{tr('Geneva Airport is an option for international arrivals. Its railway station is beneath the terminal, with trains to Genève-Cornavin. Arrange your onward journey to Thollon separately.', 'L’aéroport de Genève est une option pour les arrivées internationales. Sa gare est située sous le terminal, avec des trains vers Genève-Cornavin. Prévoyez séparément la suite du trajet vers Thollon.')}</p>
            <Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-left"><a href="https://www.gva.ch/en/passengers/access-and-transport/trains/train-access" target="_blank" rel="noopener noreferrer">{tr('Geneva Airport transport', 'Transports de l’aéroport de Genève')}<ArrowUpRight /></a></Button>
          </article>
          <article>
            <h3 className="flex items-center gap-3 text-2xl text-primary"><TrainFront className="size-6 shrink-0" />{tr('By train to Évian', 'En train via Évian')}</h3>
            <p className="mt-4 text-muted-foreground">{tr('Évian-les-Bains has an SNCF railway station. Look up trains for your travel date, then plan the final journey up to Thollon by bus or an arranged transfer.', 'Évian-les-Bains possède une gare SNCF. Consultez les trains pour votre date de voyage, puis prévoyez le dernier trajet vers Thollon en bus ou avec un transfert organisé.')}</p>
            <Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-left"><a href="https://www.sncf-connect.com/gares/evian-les-bains" target="_blank" rel="noopener noreferrer">{tr('Évian station & trains', 'Gare et trains d’Évian')}<ArrowUpRight /></a></Button>
          </article>
          <article>
            <h3 className="flex items-center gap-3 text-2xl text-primary"><Bus className="size-6 shrink-0" />{tr('Évian to Thollon', 'D’Évian à Thollon')}</h3>
            <p className="mt-4 text-muted-foreground">{tr('EVA’D lists line 11 T between Évian SNCF station and Thollon-les-Mémises Lajoux. Check the current timetable, operating days and your stop; the bus does not necessarily drop you at the apartment.', 'EVA’D propose la ligne 11 T entre la gare SNCF d’Évian et Thollon-les-Mémises Lajoux. Vérifiez les horaires, les jours de circulation et votre arrêt ; le bus ne vous dépose pas nécessairement devant l’appartement.')}</p>
            <Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-left"><a href="https://www.evad.fr/ligne/ligne-11-t/" target="_blank" rel="noopener noreferrer">{tr('Bus route & timetable', 'Ligne et horaires du bus')}<ArrowUpRight /></a></Button>
          </article>
          <article>
            <h3 className="flex items-center gap-3 text-2xl text-primary"><Snowflake className="size-6 shrink-0" />{tr('Winter travel', 'Voyager en hiver')}</h3>
            <p className="mt-4 text-muted-foreground">{tr('Check the weather, road conditions and current winter-equipment requirements before driving into the mountains. Allow extra time when snow is forecast.', 'Vérifiez la météo, l’état des routes et les obligations d’équipement hivernal avant de prendre la route en montagne. Prévoyez davantage de temps si de la neige est annoncée.')}</p>
            <Button asChild variant="link" className="mt-3 h-auto whitespace-normal px-0 text-left"><a href="https://www.haute-savoie.gouv.fr/Actions-de-l-Etat/Prevenir-le-risque-et-se-proteger/Securite-routiere/Equipements-hivernaux-obligatoires" target="_blank" rel="noopener noreferrer">{tr('Official winter-driving guidance', 'Conseils officiels pour l’équipement hivernal')}<ArrowUpRight /></a></Button>
          </article>
        </div>
      </div>
    </section>
    <SiteFooter />
  </main>;
}