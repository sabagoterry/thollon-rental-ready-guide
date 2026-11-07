import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Bath, Users, Ruler, Mountain } from "lucide-react";
import { Button } from '@/components/ui/button';
import { GalleryLightbox, type GalleryPhoto } from '@/components/gallery-lightbox';
import { SectionHeading } from '@/components/section-heading';
import { LogoMark } from '@/components/logo-mark';
import { SiteFooter } from '@/components/site-footer';
import { AvailabilityCalendar } from '@/components/availability-calendar';
import { availabilityQuery } from '@/lib/availability.query';
import { balconies, washingFacilities } from '@/lib/apartment';
import { LocalGuide } from '@/components/local-guide';
import { GuestChat } from '@/components/guest-chat';
import { WhatsAppEnquiry } from '@/components/whatsapp-enquiry';
import { HomeHeader } from '@/components/home-header';
import { ApartmentSlideshow } from '@/components/apartment-slideshow';
import { FindUs } from '@/components/find-us';
import { useLang } from '@/lib/i18n';
import exterior from "@/assets/photos/exterior.jpg.asset.json";
import living from "@/assets/photos/living.jpg.asset.json";
import sofabed from "@/assets/photos/sofabed.jpg.asset.json";
import lounge from "@/assets/photos/lounge.jpg.asset.json";
import master from "@/assets/photos/master.jpg.asset.json";
import bunks from "@/assets/photos/bunks.jpg.asset.json";
import bunks2 from "@/assets/photos/bunks2.jpg.asset.json";
import kitchen from "@/assets/photos/kitchen.jpg.asset.json";
import shower from "@/assets/photos/shower.jpg.asset.json";
import bath from "@/assets/photos/bath.jpg.asset.json";
import heroVideo from "@/assets/videos/thollon-slopes.mp4.asset.json";
import floorplan3d from "@/assets/photos/floorplan-3d-v10.jpg";

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
  { name: "Bunk room", nameFr: "Chambre à lits superposés", size: "5.6 m²", img: bunks.url, text: "Cosy wood-panelled room with bunk beds — kids love it.", textFr: "Chambre douillette lambrissée avec lits superposés — les enfants adorent." },
  { name: "Shower ensuite", nameFr: "Salle d’eau attenante", size: "2.75 m²", img: shower.url, text: "Walk-in shower, washbasin, toilet and lit mirror.", textFr: "Douche à l’italienne, lavabo, WC et miroir éclairé." },
  { name: "Full-size bathroom", nameFr: "Salle de bains complète", size: "", img: bath.url, text: "Bathtub with shower, washbasin and toilet.", textFr: "Baignoire avec douche, lavabo et WC." },
];

const facts = [
  { icon: BedDouble, en: '2 Bedrooms', fr: '2 Chambres' },
  { icon: Bath, en: washingFacilities.description, fr: washingFacilities.descriptionFr },
  { icon: Users, en: 'Up to 6 Guests', fr: 'Jusqu’à 6 voyageurs' },
  { icon: Mountain, en: `${balconies.length} Balconies`, fr: `${balconies.length} Balcons` },
  { icon: Ruler, en: '39 m² Living space', fr: '39 m² de surface' },
];

// Only photos taken inside the apartment. Outdoor views live on the /location page.
const photos: GalleryPhoto[] = [
  { src: living.url, alt: "Living and dining room", altFr: 'Séjour et salle à manger' },
  { src: lounge.url, alt: "Armchairs and dresser", altFr: 'Fauteuils et commode' },
  { src: sofabed.url, alt: "Sofa bed made up", altFr: 'Canapé-lit déplié' },
  { src: kitchen.url, alt: "Kitchen", altFr: 'Cuisine' },
  { src: master.url, alt: "Double bedroom", altFr: 'Chambre double' },
  { src: bunks2.url, alt: "Bunk beds", altFr: 'Lits superposés' },
  { src: shower.url, alt: "Shower ensuite", altFr: 'Salle d’eau attenante' },
  { src: bath.url, alt: "Full-size bathroom", altFr: 'Salle de bains complète' },
];


function Gallery() {
  const { tr } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading kicker={tr("Gallery", "Galerie")}>{tr("Inside the apartment", "À l’intérieur")}</SectionHeading>
        <Link
          to="/location"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary underline-offset-4 transition hover:underline"
        >
          {tr('See the location & views', 'Voir la situation et les vues')} <ArrowRight className="size-4" />
        </Link>
      </div>
      <p className="mt-4 max-w-xl text-muted-foreground">
        {tr('Every photo below is taken inside the apartment. The views, the lake and the slopes have their own page.', 'Toutes ces photos sont prises dans l’appartement. Les vues, le lac et les pistes ont leur propre page.')}
      </p>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {photos.map((p, index) => (
          <span key={p.src} className="block rounded-md bar-flow p-[3px] transition hover:-translate-y-1 hover:glow-accent">
            <Button variant="ghost" onClick={() => setOpen(index)} aria-label={tr(p.alt, p.altFr)} className="block aspect-[4/3] h-auto w-full overflow-hidden rounded-sm p-0">
              <img src={p.src} alt={tr(p.alt, p.altFr)} loading="lazy" className="h-full w-full object-cover transition hover:scale-105" />
            </Button>
          </span>
        ))}
      </div>
      {open !== null && <GalleryLightbox photos={photos} startIndex={open} onClose={() => setOpen(null)} />}
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

      <ApartmentSlideshow />

      <section className="border-b band-soft">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="text-center text-4xl text-rainbow">{tr('Accommodation', 'Hébergement')}</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5">
            {facts.map(({ icon: Icon, en, fr: french }) => (
              <div key={en} className="flex flex-col items-center gap-3 text-center">
                <Icon aria-hidden="true" className="size-9 text-primary" strokeWidth={1.8} />
                <span className="text-sm text-foreground">{tr(en, french)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading kicker={tr("The apartment", "L’appartement")}>{tr("Furnished to a high standard", "Aménagé avec soin")}</SectionHeading>
          <p className="mt-5 text-lg text-muted-foreground">
            {tr('On the second floor of the Les Cyclamens building, the apartment is a cosy base for ski days in winter and hiking, paragliding and lake trips in summer.', 'Au deuxième étage de la résidence Les Cyclamens, l’appartement est un nid douillet pour skier l’hiver, randonner, voler en parapente et profiter du lac l’été.')}
          </p>
        </div>
        <img src={living.url} alt="Living and dining room" loading="lazy" className="rounded-sm shadow-xl" />
      </section>

      <section className="rooms-showcase overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading kicker={tr("Rooms", "Pièces")}>{tr("Inside the apartment", "À l’intérieur")}</SectionHeading>
          <div className="mt-16 space-y-16 md:space-y-24">
            {rooms.map((r, index) => (
              <article key={r.name} className="room-story group grid items-center gap-6 md:grid-cols-12 md:gap-12">
                <div className={`relative md:col-span-7 ${index % 2 ? 'md:order-2' : ''}`}>
                  <div className="bar-flow absolute -inset-2 rounded-md opacity-80 transition duration-500 group-hover:-rotate-1" />
                  <img src={r.img} alt={fr ? r.nameFr : r.name} loading="lazy" className="relative aspect-[4/3] w-full rounded-sm object-cover transition duration-700 motion-safe:group-hover:scale-[1.02]" />
                </div>
                <div className="md:col-span-5">
                  <h3 className="mt-2 text-3xl text-rainbow md:text-4xl">{fr ? r.nameFr : r.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{fr ? r.textFr : r.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Gallery />

      <section className="band-soft">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading kicker="39 m²">{tr("Floor plan", "Plan")}</SectionHeading>
            <p className="mt-5 text-lg text-muted-foreground">{tr("39 m² in total, with two balconies.", "39 m² au total, avec deux balcons.")}</p>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {balconies.map(b => <li key={b.position} className="first-letter:uppercase">{fr ? `Balcon ${b.position === 'front' ? 'avant' : 'arrière'} — exposé ${b.facing === 'south' ? 'sud' : 'nord'}` : `${b.position} balcony — ${b.facing}-facing`}</li>)}
            </ul>
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li>{tr("Living room", "Séjour")} — 10.9 m²</li>
              <li>{tr("Double bedroom", "Chambre double")} — 8.9 m²</li>
              <li>{tr("Bunk room", "Chambre à lits superposés")} — 5.6 m²</li>
              <li>{tr("Hall", "Entrée")} — 4 m² · {tr("Shower ensuite", "Salle d’eau attenante")} — 2.75 m²</li>
            </ul>
          </div>
          <figure>
            <img src={floorplan3d} alt={tr("3D illustration of the apartment floor plan with two balconies", "Illustration 3D du plan de l’appartement avec deux balcons")} loading="lazy" className="mx-auto max-h-[640px] w-full object-contain" />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">{tr('Illustrative 3D view — not a measured architectural drawing.', 'Vue 3D illustrative — ce n’est pas un plan architectural coté.')}</figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <Link
          to="/location"
          className="group relative flex min-h-64 flex-col justify-between gap-6 overflow-hidden rounded-md band-day p-8 glow-primary transition hover:brightness-110"
        >
          <span className="relative text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground/85">{tr("Location", "Situation")}</span>
          <span className="relative font-display text-3xl leading-snug text-primary-foreground">{tr("See the views, the lake and the slopes", "Découvrez les vues, le lac et les pistes")}</span>
          <span className="relative inline-flex items-center gap-2 text-sm font-medium text-primary-foreground">
            {tr('Open the location page', 'Ouvrir la page situation')} <ArrowRight className="size-4 transition group-hover:translate-x-1" />
          </span>
        </Link>
        <div>
          <SectionHeading kicker={tr("Four seasons", "Quatre saisons")}>{tr("Every season in Thollon", "Thollon en toute saison")}</SectionHeading>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
            <li><span className="font-medium text-primary">{tr("Winter —", "Hiver —")}</span> {tr("ski the Mémises slopes, the cable car is just a short walk away.", "skiez sur les pistes des Mémises, la télécabine est à deux pas.")}</li>
            <li><span className="font-medium text-accent">{tr("Summer —", "Été —")}</span> {tr("alpine hikes, paragliding and Lake Geneva beaches below.", "randonnées alpines, parapente et plages du Léman en contrebas.")}</li>
            <li><span className="font-medium text-lake">{tr("Nearby —", "À proximité —")}</span> {tr("Évian-les-Bains, the Swiss Riviera and Geneva.", "Évian-les-Bains, la Riviera suisse et Genève.")}</li>
          </ul>
        </div>
      </section>

      <LocalGuide />
      <GuestChat />
      <AvailabilityCalendar />
      <FindUs />

      <section className="band-deep text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <LogoMark />
            <div>
            <h2 className="text-4xl">{tr("Check dates & book", "Dates et réservation")}</h2>
            <p className="mt-2 opacity-80">{tr("See availability and prices on Airbnb.", "Disponibilités et tarifs sur Airbnb.")}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <WhatsAppEnquiry />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
