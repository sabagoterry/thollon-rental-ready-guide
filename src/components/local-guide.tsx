import { ArrowUpRight, MountainSnow, MapPin, Utensils, ShoppingBasket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';

const diningDirectory = 'https://www.leman-mountains-explore.com/en/discover/our-villages/thollon-les-memises/where-to-eat-in-thollon-les-memises/';
const venues = [
  { name: 'L’Ourson', type: 'Bar & restaurant', url: 'https://www.barlourson.com/en' },
  { name: 'Le Tibetan', type: 'Restaurant, pub & bar', url: 'https://tibetan-thollon.com/' },
  { name: 'Bon Séjour', type: 'Hotel restaurant', url: 'https://www.bon-sejour.com/' },
  { name: 'Les Balcons du Lac', type: 'Mountain restaurant', url: 'https://www.leman-mountains-explore.com/en/offers/restaurant-les-balcons-du-lac-thollon-les-memises-en-4978466/' },
  { name: 'Le XV', type: 'Restaurant & bar', url: 'https://www.leman-mountains-explore.com/en/offers/restaurant-bar-le-xv-thollon-les-memises-en-4977425/' },
  { name: 'Le Carnotzet', type: 'Restaurant & bar', url: 'https://www.haute-savoie-tourisme.org/6021457-restaurant-bar-le-carnotzet' },
];
const essentials = [
  { name: 'ESF Thollon', detail: 'Ski school & lessons', icon: MountainSnow, url: 'https://www.esfthollon.com/fr/' },
  { name: 'Tourist office', detail: 'Thollon-les-Mémises visitor information', icon: MapPin, url: 'https://hautesavoiemontblanc-tourisme.com/offres/bureau-dinformation-touristique-de-thollon-les-memises-thollon-les-memises-fr-5864907/' },
  { name: 'Lift passes', detail: 'Thollon-les-Mémises ski lifts', icon: MountainSnow, url: 'https://thollon.axess.shop/fr/Products/Tickets/Category?cID=2' },
  { name: 'Sherpa', detail: 'Not directly in the village — check the store location before setting off.', icon: ShoppingBasket, url: 'https://www.sherpa.net/en/stores/thollon-les-memises' },
];

export function LocalGuide() {
  return (
    <section id="local-guide" className="bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="Local area">Around Thollon</SectionHeading>
        <div className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {essentials.map(item => (
            <div key={item.name} className="flex items-start gap-4 border-b pb-5">
              <item.icon className="mt-2 size-5 shrink-0 text-primary" />
              <div className="min-w-0">
                <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}<ArrowUpRight className="size-4 shrink-0" /></a>
                </Button>
                <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <h3 className="flex items-center gap-3 text-2xl text-primary"><Utensils className="size-5" />Bars & restaurants</h3>
          <Button asChild variant="outline"><a href={diningDirectory} target="_blank" rel="noopener noreferrer">Tourist office dining directory<ArrowUpRight /></a></Button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Opening days and seasonal service vary; check with each venue.</p>
        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map(venue => (
            <div key={venue.name} className="border-b pb-5">
              <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base">
                <a href={venue.url} target="_blank" rel="noopener noreferrer">{venue.name}<ArrowUpRight className="size-4 shrink-0" /></a>
              </Button>
              <p className="mt-1 text-sm text-muted-foreground">{venue.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}