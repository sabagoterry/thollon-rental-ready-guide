import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from '@/components/section-heading';
import { LogoMark } from '@/components/logo-mark';
import { SiteFooter } from '@/components/site-footer';
import { AvailabilityCalendar } from '@/components/availability-calendar';
import { availabilityQuery } from '@/lib/availability.query';
import { balconies } from '@/lib/apartment';
import { LocalGuide } from '@/components/local-guide';
import { GuestChat } from '@/components/guest-chat';
import { WhatsAppEnquiry } from '@/components/whatsapp-enquiry';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
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
import floorplan from "@/assets/photos/floorplan.png.asset.json";

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
        content: "2 bedrooms, 2 bathrooms, two balconies: south-facing front and north-facing rear. Open all year.",
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
  { name: "Shower room", nameFr: "Salle d’eau", size: "2.75 m²", img: shower.url, text: "Walk-in shower, washbasin, toilet and lit mirror.", textFr: "Douche à l’italienne, lavabo, WC et miroir éclairé." },
  { name: "Bathroom", nameFr: "Salle de bains", size: "", img: bath.url, text: "Bathtub with shower, washbasin and toilet.", textFr: "Baignoire avec douche, lavabo et WC." },
];

const facts = [
  ["39 m²", "Living space", "39 m²", "Surface"],
  ["Up to 6", "Guests", "Jusqu’à 6", "Voyageurs"],
  ["2", "Bathrooms", "2", "Salles d’eau"],
  [String(balconies.length), "Balconies", String(balconies.length), "Balcons"],
];

type Photo = { src: string; alt: string };
// Only photos taken inside the apartment. Outdoor views live on the /location page.
const photos: Photo[] = [
  { src: living.url, alt: "Living and dining room" },
  { src: lounge.url, alt: "Armchairs and dresser" },
  { src: sofabed.url, alt: "Sofa bed made up" },
  { src: kitchen.url, alt: "Kitchen" },
  { src: master.url, alt: "Double bedroom" },
  { src: bunks2.url, alt: "Bunk beds" },
  { src: shower.url, alt: "Shower room" },
  { src: bath.url, alt: "Bathroom" },
];


function Gallery() {
  const { tr } = useLang();
  const [open, setOpen] = useState<Photo | null>(null);
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
        {photos.map((p) => (
          <span key={p.src} className="block rounded-md bar-flow p-[3px] transition hover:-translate-y-1 hover:glow-accent">
            <button onClick={() => setOpen(p)} className="block aspect-[4/3] w-full overflow-hidden rounded-sm">
              <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition hover:scale-105" />
            </button>
          </span>
        ))}
      </div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-6" onClick={() => setOpen(null)}>
          <img src={open.src} alt={open.alt} className="max-h-full max-w-full rounded-sm" />
        </div>
      )}
    </section>
  );
}

function Index() {
  const { lang, tr } = useLang();
  const fr = lang === 'fr';
  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-card/90 backdrop-blur">
        <div className="bar-flow h-1.5" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <LogoMark />
          <nav aria-label="Main" className="flex items-center gap-6 text-sm">
            <a href="#availability" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr("Availability", "Disponibilités")}</a>
            <Link to="/location" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr("Location", "Situation")}</Link>
            <a href="#local-guide" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr("Local area", "Le coin")}</a>
            <a href="#ask" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr("Ask us", "Questions")}</a>
            <LanguageToggle />
            <MobileMenu />
          </nav>
        </div>
      </header>
      <section className="relative flex min-h-[92vh] items-end">
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
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {facts.map(([n, l, nFr, lFr]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl text-rainbow">{fr ? nFr : n}</div>
              <div className="text-sm text-muted-foreground">{fr ? lFr : l}</div>
            </div>
          ))}
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

      <section className="band-ice">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading kicker={tr("Rooms", "Pièces")}>{tr("Inside the apartment", "À l’intérieur")}</SectionHeading>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <div key={r.name} className="card-vivid overflow-hidden rounded-md bg-card transition hover:-translate-y-1 hover:glow-accent">
                <div className="bar-flow h-1.5" />
                <img src={r.img} alt={r.name} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl text-primary">{fr ? r.nameFr : r.name}</h3>
                    {r.size && <span className="band-sunset rounded-full px-3 py-1 text-xs font-medium text-accent-foreground">{r.size}</span>}
                  </div>
                  <p className="mt-2 text-muted-foreground">{fr ? r.textFr : r.text}</p>
                </div>
              </div>
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
              <li>{tr("Hall", "Entrée")} — 4 m² · {tr("Shower room", "Salle d’eau")} — 2.75 m²</li>
            </ul>
          </div>
          <img src={floorplan.url} alt={tr("Apartment floor plan", "Plan de l’appartement")} loading="lazy" className="mx-auto max-h-[640px] w-full object-contain" />
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
