import { ArrowUpRight, MountainSnow, MapPin, Utensils, ShoppingBasket, Video, CloudSnow, Newspaper, PartyPopper, Car, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { useLang } from '@/lib/i18n';
import { diningDirectory, venues, essentials as baseEssentials, liveLinks, dayTrips } from '@/lib/local-links';

const liveIcons = { webcam: Video, forecast: CloudSnow, news: Newspaper, events: PartyPopper } as const;
const tripKinds = {
  summer: { icon: Sun, label: 'Summer trip', labelFr: 'Sortie estivale', band: 'band-sunset text-accent-foreground' },
  winter: { icon: MountainSnow, label: 'Ski resort', labelFr: 'Station de ski', band: 'band-lake text-primary-foreground' },
} as const;

const icons = { 'ESF Thollon': MountainSnow, 'Tourist office': MapPin, 'Lift passes': MountainSnow, Sherpa: ShoppingBasket } as const;
const essentials = baseEssentials.map(e => ({ ...e, icon: icons[e.name as keyof typeof icons] ?? MapPin }));

export function LocalGuide({ standalone = false }: { standalone?: boolean }) {
  const { tr } = useLang();
  const nameFr: Record<string, string> = { 'Tourist office': 'Office de tourisme', 'Lift passes': 'Forfaits de ski', 'Snow forecast': 'Prévisions neige', 'Télécabine news': 'Actualités Télécabine', 'What’s on in Thollon': 'Agenda de Thollon', 'Telecabine webcam': 'Webcam télécabine', 'Parchet summit webcam': 'Webcam du sommet du Parchet' };
  const n = (name: string) => tr(name, nameFr[name] ?? name);
  return (
    <section id="local-guide" className="band-ice">
      <div className="mx-auto max-w-6xl px-6 py-20">
        {standalone ? <h1 className="text-4xl text-primary md:text-5xl">{tr('Local Area', 'Le coin')}</h1> : <SectionHeading>{tr('Local Area', 'Le coin')}</SectionHeading>}
        <h4 className="mt-8 text-2xl text-primary">{tr('Key Info', 'Infos clés')}</h4>
        <div className="mt-6 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {essentials.map(item => (
            <div key={item.name} className="flex items-start gap-4 border-b border-accent/30 pb-5">
              <span className="band-lake mt-1 grid size-9 shrink-0 place-items-center rounded-full text-primary-foreground"><item.icon className="size-4" /></span>
              <div className="min-w-0">
                <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base">
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{n(item.name)}<ArrowUpRight className="size-4 shrink-0" /></a>
                </Button>
                <p className="mt-1 text-sm text-muted-foreground">{tr(item.detail, item.detailFr)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: tr('Hiking', 'Randonnée'), url: 'https://www.komoot.com/guide/1459249/hiking-around-thollon-les-memises' },
            { label: tr('Skiing and Boarding', 'Ski et snowboard'), url: 'https://www.leman-mountains-explore.com/decouvrir/les-stations/station-de-thollon-les-memises/' },
          ].map(activity => (
            <Button key={activity.label} asChild className="group h-auto flex-col items-start gap-6 whitespace-normal p-6 text-left">
              <a href={activity.url} target="_blank" rel="noopener noreferrer"><span className="font-display text-2xl leading-snug">{activity.label}</span><span className="inline-flex items-center gap-2">{tr('Take a look', 'Jeter un œil')}<ArrowUpRight className="shrink-0" /></span></a>
            </Button>
          ))}
        </div>
        {[
          { en: 'Live from the mountain', fr: 'En direct de la montagne', links: liveLinks.slice(0, 3) },
          { en: 'Latest', fr: 'Actualités', links: liveLinks.slice(3) },
        ].map(group => (
          <div key={group.en} className="mt-10">
            <h3 className="flex items-center gap-3 text-4xl text-rainbow md:text-5xl">{tr(group.en, group.fr)}</h3>
            <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.links.map(item => { const Icon = liveIcons[item.kind]; return (
                <div key={item.name} className="flex items-start gap-4 border-b border-accent/30 pb-5">
                  <span className="band-lake mt-1 grid size-9 shrink-0 place-items-center rounded-full text-primary-foreground"><Icon className="size-4" /></span>
                  <div className="min-w-0">
                    <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{n(item.name)}<ArrowUpRight className="size-4 shrink-0" /></a>
                    </Button>
                    <p className="mt-1 text-sm text-muted-foreground">{tr(item.detail, item.detailFr)}</p>
                  </div>
                </div>); })}
            </div>
          </div>
        ))}
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4">
          <h3 className="flex items-center gap-3 text-4xl text-rainbow md:text-5xl"><Utensils className="size-5" />{tr('Bars & restaurants', 'Bars et restaurants')}</h3>
          <Button asChild variant="outline"><a href={diningDirectory} target="_blank" rel="noopener noreferrer">{tr('Tourist office dining directory', 'Guide des restaurants de l’office de tourisme')}<ArrowUpRight /></a></Button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">{tr('Opening days and seasonal service vary; check with each venue.', 'Les jours d’ouverture varient selon la saison ; renseignez-vous auprès de chaque établissement.')}</p>
        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map(venue => (
            <div key={venue.name} className="border-b border-accent/30 pb-5">
              <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base text-foreground hover:text-accent">
                <a href={venue.url} target="_blank" rel="noopener noreferrer">{venue.name}<ArrowUpRight className="size-4 shrink-0" /></a>
              </Button>
              <p className="mt-1 text-sm text-muted-foreground">{tr(venue.type, venue.typeFr)}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-14 flex items-center gap-3 text-4xl text-rainbow md:text-5xl"><Car className="size-5" />{tr('Day trips', 'Excursions')}</h3>
        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {dayTrips.map(t => { const kind = tripKinds[t.kind]; return (
            <div key={t.name} className="flex items-start gap-4 border-b border-accent/30 pb-5">
              <span title={tr(kind.label, kind.labelFr)} aria-label={tr(kind.label, kind.labelFr)} className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full ${kind.band}`}><kind.icon className="size-4" /></span>
              <div className="min-w-0">
                <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base text-foreground hover:text-accent">
                  <a href={t.url} target="_blank" rel="noopener noreferrer">{t.name}<ArrowUpRight className="size-4 shrink-0" /></a>
                </Button>
                <p className="mt-1 text-sm text-muted-foreground">{tr(t.detail, t.detailFr)}</p>
              </div>
            </div>); })}
        </div>
      </div>
    </section>
  );
}