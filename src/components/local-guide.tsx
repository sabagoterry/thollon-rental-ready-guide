import { ArrowUpRight, MountainSnow, MapPin, Utensils, ShoppingBasket, Video, CloudSnow, Newspaper, PartyPopper, Car, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { diningDirectory, venues, essentials as baseEssentials, liveLinks, dayTrips } from '@/lib/local-links';

const liveIcons = { webcam: Video, forecast: CloudSnow, news: Newspaper, events: PartyPopper } as const;

const icons = { 'ESF Thollon': MountainSnow, 'Tourist office': MapPin, 'Lift passes': MountainSnow, Sherpa: ShoppingBasket } as const;
const essentials = baseEssentials.map(e => ({ ...e, icon: icons[e.name as keyof typeof icons] ?? MapPin }));

export function LocalGuide() {
  return (
    <section id="local-guide" className="band-ice">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeading kicker="Local area">Around Thollon</SectionHeading>
        <div className="card-vivid mt-10 rounded-lg bg-card p-6">
          <h3 className="flex items-center gap-3 text-2xl text-rainbow">
            <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75 motion-reduce:animate-none" /><span className="relative inline-flex size-2.5 rounded-full bg-accent" /></span>
            Live from the mountain
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {liveLinks.map(item => { const Icon = liveIcons[item.kind]; return (
              <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-md border border-primary/15 bg-background p-4 transition hover:-translate-y-0.5 hover:border-accent hover:glow-accent">
                <span className="band-sunset mt-0.5 grid size-9 shrink-0 place-items-center rounded-full text-accent-foreground"><Icon className="size-4" /></span>
                <span className="min-w-0"><span className="flex items-center gap-1 font-medium text-primary">{item.name}<ArrowUpRight className="size-3.5 opacity-60 transition group-hover:opacity-100" /></span><span className="mt-1 block text-sm text-muted-foreground">{item.detail}</span></span>
              </a>); })}
          </div>
        </div>
        <div className="mt-10 grid gap-x-12 gap-y-6 md:grid-cols-2">
          {essentials.map(item => (
            <div key={item.name} className="flex items-start gap-4 border-b border-accent/30 pb-5">
              <span className="band-lake mt-1 grid size-9 shrink-0 place-items-center rounded-full text-primary-foreground"><item.icon className="size-4" /></span>
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
          <h3 className="flex items-center gap-3 text-2xl text-rainbow"><Utensils className="size-5" />Bars & restaurants</h3>
          <Button asChild variant="outline"><a href={diningDirectory} target="_blank" rel="noopener noreferrer">Tourist office dining directory<ArrowUpRight /></a></Button>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Opening days and seasonal service vary; check with each venue.</p>
        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {venues.map(venue => (
            <div key={venue.name} className="border-b border-accent/30 pb-5">
              <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base text-foreground hover:text-accent">
                <a href={venue.url} target="_blank" rel="noopener noreferrer">{venue.name}<ArrowUpRight className="size-4 shrink-0" /></a>
              </Button>
              <p className="mt-1 text-sm text-muted-foreground">{venue.type}</p>
            </div>
          ))}
        </div>
        <h3 className="mt-14 flex items-center gap-3 text-2xl text-rainbow"><Car className="size-5" />Day trips</h3>
        <div className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
          {dayTrips.map(t => (
            <div key={t.name} className="border-b border-accent/30 pb-5">
              <Button asChild variant="link" className="h-auto max-w-full justify-start whitespace-normal p-0 text-base text-foreground hover:text-accent">
                <a href={t.url} target="_blank" rel="noopener noreferrer">{t.name}<ArrowUpRight className="size-4 shrink-0" /></a>
              </Button>
              <p className="mt-1 text-sm text-muted-foreground">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}