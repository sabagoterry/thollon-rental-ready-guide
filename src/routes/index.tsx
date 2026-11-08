import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, BedDouble, ShowerHead, Sofa, Ruler, Mountain } from "lucide-react";
import { BunkBeds, BathWithShower } from '@/components/accommodation-icons';
import { FloorplanCompass } from '@/components/floorplan-compass';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { LogoMark } from '@/components/logo-mark';
import { SiteFooter } from '@/components/site-footer';
import { AvailabilityCalendar } from '@/components/availability-calendar';
import { availabilityQuery } from '@/lib/availability.query';
import { balconies } from '@/lib/apartment';
import { GuestChat } from '@/components/guest-chat';
import { WhatsAppEnquiry } from '@/components/whatsapp-enquiry';
import { HomeHeader } from '@/components/home-header';
import { FindUs } from '@/components/find-us';
import { useLang } from '@/lib/i18n';
import exterior from "@/assets/photos/exterior.jpg.asset.json";
import living from "@/assets/photos/living.jpg.asset.json";
import building from "@/assets/photos/cyclamens-building.png.asset.json";
import master from "@/assets/photos/master.jpg.asset.json";
import bunks from "@/assets/photos/bunks-sharp.jpg.asset.json";
import kitchen from "@/assets/photos/kitchen.jpg.asset.json";
import shower from "@/assets/photos/shower-sharp.jpg.asset.json";
import bath from "@/assets/photos/bath-sharp.jpg.asset.json";
import heroVideo from "@/assets/videos/thollon-slopes.mp4.asset.json";
import floorplan3d from "@/assets/photos/floorplan-3d-v13.jpg";
import parkingIcon from '@/assets/icons/apartment-parking.png.asset.json';
import towelsIcon from '@/assets/icons/apartment-towels.png.asset.json';
import skiingIcon from '@/assets/icons/apartment-skiing.png.asset.json';
import hikingIcon from '@/assets/icons/apartment-hiking.png.asset.json';

const AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1300151240294300447";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(availabilityQuery),
  head: () => ({
    meta: [
      { title: "Les Cyclamens — Holiday apartment in Thollon-les-Memises" },
      {
        name: "description",
        content:
          "Charming 39 m² 2-bedroom apartment in Thollon-les-Memises, above Lake Geneva. Sleeps 6, two balconies: south-facing front and north-facing rear.",
      },
      { property: "og:title", content: "Les Cyclamens — Thollon-les-Memises apartment" },
      {
        property: "og:description",
        content: "2 bedrooms, 1 full-size bathroom and 1 shower ensuite, two balconies: south-facing front and north-facing rear. Open all year.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const rooms = [
  { name: "Living & dining room", nameFr: "Séjour et salle à manger", size: "10.9 m²", img: living.url, text: "Big picture window onto the balcony, dining table for four, armchairs, TV and a sofa bed for two extra guests.", textFr: "Grande baie vitrée sur le balcon, table pour quatre, fauteuils, TV et canapé-lit pour deux personnes supplémentaires." },
  { name: "Kitchen", nameFr: "Cuisine", size: "", img: kitchen.url, text: "Microwave oven, 2 hobs, 2 fridge/freezers, slow cooker, air fryer, toaster, coffee machine and kettle.", textFr: "Four micro-ondes, 2 plaques, 2 réfrigérateurs-congélateurs, mijoteuse, friteuse à air, grille-pain, cafetière et bouilloire." },
  { name: "Double bedroom", nameFr: "Chambre double", size: "8.9 m²", img: master.url, text: "Double bed and built-in wardrobes, next to the shower room.", textFr: "Lit double et placards intégrés, à côté de la salle d’eau." },
  { name: "Bunk room", nameFr: "Chambre à lits superposés", size: "5.6 m²", img: bunks.url, tall: true, text: "Cosy wood-panelled room with bunk beds — kids love it.", textFr: "Chambre douillette lambrissée avec lits superposés — les enfants adorent." },
  { name: "Shower ensuite", nameFr: "Salle d’eau attenante", size: "2.75 m²", img: shower.url, tall: true, text: "Walk-in shower, washbasin, toilet and lit mirror.", textFr: "Douche à l’italienne, lavabo, WC et miroir éclairé." },
  { name: "Full-size bathroom", nameFr: "Salle de bains complète", size: "", img: bath.url, tall: true, text: "Bathtub with shower, washbasin and toilet.", textFr: "Baignoire avec douche, lavabo et WC." },
];

const facts = [
  { icon: BedDouble, en: '1 Double bedroom', fr: '1 Chambre double' },
  { icon: BunkBeds, en: '1 Bunk room', fr: '1 Chambre à lits superposés' },
  { icon: ShowerHead, en: '1 Shower ensuite', fr: '1 Salle d’eau attenante' },
  { icon: BathWithShower, en: '1 Bathroom with overhead shower', fr: '1 Salle de bains avec douche' },
  { icon: Sofa, en: '4 Beds and Sofa Bed', fr: '4 lits et canapé-lit' },
  { icon: Mountain, en: `${balconies.length} Balconies`, fr: `${balconies.length} Balcons` },
  { icon: Ruler, en: '39 m² Living space', fr: '39 m² de surface' },
];




function Gallery() {
  const { tr } = useLang();
  const rows = [
    {
      kicker: tr('Location', 'Situation'),
      title: tr('Location and views', 'Situation et vues'),
      text: tr('The views, the lake and the slopes have their own page.', 'Les vues, le lac et les pistes ont leur propre page.'),
      to: '/location',
    },
  ] as const;
  return (
    <section className="mx-auto w-full max-w-[calc(50%+36rem)] px-6 py-24">
      {rows.map((row) => (
        <div key={row.to} className="grid items-center gap-6 border-b border-primary/10 py-12 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-[2fr_1fr]">
          <Button asChild className="h-auto min-w-0 flex-col items-start gap-3 whitespace-normal p-8 text-left">
            <Link to={row.to}>
              <span className="text-sm uppercase">{row.kicker}</span>
              <span className="text-3xl md:text-4xl">{row.title}</span>
              <span className="flex items-center gap-2">{tr('Take a look', 'Jeter un œil')} <ArrowRight className="size-4" /></span>
            </Link>
          </Button>
          <p className="max-w-xl text-muted-foreground">{row.text}</p>
        </div>
      ))}
    </section>
  );
}

function Index() {
  const { lang, tr } = useLang();
  const fr = lang === 'fr';
  return (
    <main>
      <HomeHeader />
      <section className="relative flex min-h-[92vh] items-end pt-44">
        <video
          src={heroVideo.url}
          poster={exterior.url}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 text-primary-foreground">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sunshine">Thollon-les-Memises · Haute-Savoie</p>
          <h1 className="max-w-3xl text-5xl leading-tight md:text-7xl">{tr("Les Cyclamens, your home above Lake Geneva", "Les Cyclamens, votre chez-vous au-dessus du Léman")}</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">
            {tr('A charming apartment close to the cable car, restaurants and all village amenities — open for stays all year round.', 'Un charmant appartement près de la télécabine, des restaurants et de tous les commerces du village — ouvert toute l’année.')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppEnquiry />
          </div>
        </div>
      </section>

      <section className="border-b band-soft">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-center text-4xl text-rainbow">{tr('Accommodation', 'Hébergement')}</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {facts.map(({ icon: Icon, en, fr: french }) => (
              <div key={en} className="flex flex-col items-center gap-3 text-center">
                <Icon aria-hidden="true" className="size-9 text-primary" strokeWidth={1.8} />
                <span className="text-sm text-foreground">{tr(en, french)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        <img src={building.url} alt={tr('Les Cyclamens apartment building', 'La résidence Les Cyclamens')} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-primary-foreground">
          <div className="max-w-xl">
            <div className="flex items-center gap-4 md:gap-5">
              <LogoMark />
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sunshine">{tr("The apartment", "L’appartement")}</p>
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl">{tr("Furnished to a high standard", "Aménagé avec soin")}</h2>
            <div className="mt-4 h-1.5 w-40 rounded-full bg-sunshine" />
            <p className="mt-6 text-lg leading-relaxed opacity-95">
              {tr('On the second floor of the Les Cyclamens building, the apartment is a cosy base for ski days in winter and hiking, paragliding and lake trips in summer.', 'Au deuxième étage de la résidence Les Cyclamens, l’appartement est un nid douillet pour skier l’hiver, randonner, voler en parapente et profiter du lac l’été.')}
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-primary-foreground/40 pt-8 sm:grid-cols-4">
            {[
              { icon: parkingIcon.url, title: tr('Parking', 'Stationnement'), detail: tr('Free', 'Gratuit') },
              { icon: towelsIcon.url, title: tr('Towels', 'Serviettes'), detail: tr('Available on request', 'Sur demande') },
              { icon: skiingIcon.url, title: tr('Skiing', 'Ski'), detail: tr('5 minutes', '5 minutes') },
              { icon: hikingIcon.url, title: tr('Hiking', 'Randonnée'), detail: tr('Right outside', 'Juste à la porte') },
            ].map(item => <div key={item.title} className="flex flex-col items-center gap-2 text-center slideshow-caption">
              <img src={item.icon} alt="" aria-hidden="true" className="h-20 w-28 object-contain" />
              <span className="text-lg font-semibold">{item.title}</span>
              <span className="text-base">{item.detail}</span>
            </div>)}
          </div>
        </div>
      </section>

      <section className="rooms-showcase overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading kicker={tr("Rooms", "Pièces")}>{tr("Inside the apartment", "À l’intérieur")}</SectionHeading>
        </div>
        <div>
          {rooms.map((r, index) => (
            <article key={r.name} className={`relative flex items-center overflow-hidden ${'tall' in r && r.tall ? 'min-h-[92vh]' : 'min-h-[60vh]'}`}>
              <img src={r.img} alt={fr ? r.nameFr : r.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
              <div className="bg-overlay absolute inset-0" />
              <div className={`relative mx-auto flex w-full max-w-6xl px-6 py-20 text-primary-foreground ${index % 2 ? 'md:justify-end' : ''}`}>
                <div className={`max-w-xl ${r.name === 'Kitchen' ? 'translate-y-12' : ''}`}>
                  <h3 className="text-3xl md:text-5xl">{fr ? r.nameFr : r.name}</h3>
                  <div className="mt-4 h-1.5 w-32 rounded-full bg-sunshine" />
                  <p className="mt-5 text-lg leading-relaxed opacity-95">{fr ? r.textFr : r.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Gallery />

      <section className="band-soft">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading>{tr("Floor plan", "Plan")}</SectionHeading>
            <p className="mt-5 text-lg text-muted-foreground">{tr("Two balconies.", "Deux balcons.")}</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {balconies.map(b => <li key={b.position} className="first-letter:uppercase">{fr ? `Balcon ${b.position === 'front' ? 'avant' : 'arrière'} — exposé ${b.facing === 'south' ? 'sud' : 'nord'}` : `${b.position} balcony — ${b.facing}-facing`}</li>)}
            </ul>
          </div>
           <figure>
             <div className="relative mx-auto aspect-[3/4] w-full max-w-[480px]">
               <img src={floorplan3d} alt={tr("3D illustration of the apartment floor plan with two balconies", "Illustration 3D du plan de l’appartement avec deux balcons")} loading="lazy" className="h-full w-full object-contain" />
               <FloorplanCompass />
             </div>
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">{tr('Illustrative 3D view — not a measured architectural drawing.', 'Vue 3D illustrative — ce n’est pas un plan architectural coté.')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
           <SectionHeading kicker={tr("A Resort for All Passions", "Une station pour toutes les passions")}>{tr("Your Alpine Escape", "Votre escapade alpine")}</SectionHeading>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
             <li><span className="font-medium text-primary">{tr("Winter:", "Hiver :")}</span> {tr("Ski the pristine Mémises slopes with the main cable car just a short walk away.", "Skiez sur les pistes immaculées des Mémises, avec la télécabine principale à quelques pas.")}</li>
             <li><span className="font-medium text-primary">{tr("Spring:", "Printemps :")}</span> {tr("Catch early mountain hikes as the snow melts.", "Profitez des premières randonnées en montagne à la fonte des neiges.")}</li>
             <li><span className="font-medium text-accent">{tr("Summer:", "Été :")}</span> {tr("Discover alpine ridges, panoramic paragliding, and Lake Geneva's beaches below.", "Découvrez les crêtes alpines, le parapente panoramique et les plages du Léman en contrebas.")}</li>
             <li><span className="font-medium text-lake">{tr("Nearby:", "À proximité :")}</span> {tr("Unwind anytime with quick trips to Évian-les-Bains, the Swiss Riviera, and Geneva.", "Détendez-vous en toute saison avec des escapades à Évian-les-Bains, sur la Riviera suisse et à Genève.")}</li>
          </ul>
        </div>
        <Button asChild className="group h-auto min-h-64 flex-col items-start justify-between gap-6 whitespace-normal p-8 text-left">
          <Link to="/local-area">
            <span className="text-xs uppercase">{tr('Local Area', 'Les environs')}</span>
            <span className="font-display text-3xl leading-snug">{tr('Your Alpine Escape', 'Votre escapade alpine')}</span>
            <span className="inline-flex items-center gap-2">{tr('Explore the Region', 'Explorez la région')} <ArrowRight /></span>
          </Link>
        </Button>
      </section>

       <section id="local-guide" className="band-ice">
         <div className="mx-auto max-w-6xl px-6 py-20">
           <SectionHeading><span className="lg:whitespace-nowrap lg:text-[0.75em]">{tr('Hiking, Skiing, Boarding and More on offer', 'Randonnée, ski, snowboard et bien plus encore')}</span></SectionHeading>
           <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4">
             {[
               { label: tr('Hiking', 'Randonnée'), url: 'https://www.komoot.com/guide/1459249/hiking-around-thollon-les-memises' },
               { label: tr('Skiing and Boarding', 'Ski et snowboard'), url: 'https://www.leman-mountains-explore.com/decouvrir/les-stations/station-de-thollon-les-memises/' },
             ].map(activity => (
                 <Button key={activity.label} asChild variant="link" className="h-auto min-h-11 max-w-full whitespace-normal px-0 text-base">
                   <a href={activity.url} target="_blank" rel="noopener noreferrer">{activity.label}<ArrowUpRight className="shrink-0" /></a>
                 </Button>
             ))}
             <Button asChild variant="link" className="h-auto min-h-11 max-w-full whitespace-normal px-0 text-left text-base"><Link to="/local-area">{tr('Take a look at the local area', 'Découvrez les environs')}<ArrowRight className="shrink-0" /></Link></Button>
           </div>
         </div>
       </section>
      <GuestChat />
      <AvailabilityCalendar />
      <FindUs />

      <SiteFooter />
    </main>
  );
}
