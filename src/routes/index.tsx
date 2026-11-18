import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BedDouble,
  ShowerHead,
  Sofa,
  Ruler,
  Mountain,
  Car,
  Footprints,
  Bike,
  Bus,
  ShoppingCart,
  Martini,
  UtensilsCrossed,
  Wifi,
  Heart,
  Award,
  Star,
  TowelRack,
  Layers,
  WavesLadder,
  LoaderPinwheel,
  Projector,
  Kayak,
  type LucideIcon,
} from "lucide-react";

import bowlingIcon from "@/assets/icons/bowling.png.asset.json";
import cinemaIcon from "@/assets/icons/cinema.png.asset.json";
import golfIcon from "@/assets/icons/golf.png.asset.json";
import lidoIcon from "@/assets/icons/lido.png.asset.json";
import waterparkIcon from "@/assets/icons/waterpark.png.asset.json";

import aquaParcImg from "@/assets/photos/Aqua Parc.png";
import bernexImg from "@/assets/photos/Bernex.png";
import bowlingImg from "@/assets/photos/Bowling.png";
import evianImg from "@/assets/photos/Evian.png";
import genevaImg from "@/assets/photos/Geneva.png";
import montreuxImg from "@/assets/photos/Montreux.png";
import morzineImg from "@/assets/photos/Morzine.png";
import yvoireImg from "@/assets/photos/Yvoire.png";
import veveyImg from "@/assets/photos/vevey.png";
import genericBunazImg from "@/assets/photos/generic Bunaz.png";
import genericCinemaImg from "@/assets/photos/generic Cinema.png";
import genericBowlingImg from "@/assets/photos/generic bowling.png";
import genericWaterparkImg from "@/assets/photos/generic waterpark.png";
import bunazImg from "@/assets/photos/generic Bunaz.png";
import cinemaImg from "@/assets/photos/generic Cinema.png";

import { FaBowlingBall } from "react-icons/fa";
import { BunkBeds, BathWithShower } from "@/components/accommodation-icons";
import { FloorplanCompass } from "@/components/floorplan-compass";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { LogoMark } from "@/components/logo-mark";
import { SiteFooter } from "@/components/site-footer";
import { AvailabilityCalendar } from "@/components/availability-calendar";
import { availabilityQuery } from "@/lib/availability.query";
import { balconies, apartmentAmenities, amenityList } from "@/lib/apartment";
import { dayTrips } from "@/lib/local-links";
import { GuestChat } from "@/components/guest-chat";
import { GalleryLink } from "@/components/gallery-link";
import { airbnbReviews } from "@/lib/airbnb-reviews";
import { WhatsAppEnquiry } from "@/components/whatsapp-enquiry";
import { HomeHeader } from "@/components/home-header";
import { FindUs } from "@/components/find-us";
import { useLang } from "@/lib/i18n";
import exterior from "@/assets/photos/exterior.jpg.asset.json";
import living from "@/assets/photos/living.jpg.asset.json";
import building from "@/assets/photos/cyclamens-building.png.asset.json";
import master from "@/assets/photos/master.jpg.asset.json";
import bunks from "@/assets/photos/bunks-sharp.jpg.asset.json";
import kitchen from "@/assets/photos/kitchen.jpg.asset.json";
import shower from "@/assets/photos/shower-without-air-freshener.jpg";
import bath from "@/assets/photos/bath-sharp.jpg.asset.json";
import heroVideo from "@/assets/videos/thollon-slopes.mp4.asset.json";
import floorplan3d from "@/assets/photos/floorplan-3d-v13.jpg";
import parkingIcon from "@/assets/icons/apartment-parking.png.asset.json";
import skiingIcon from "@/assets/icons/apartment-skiing-clean.png.asset.json";
import hikingIcon from "@/assets/icons/apartment-hiking.png.asset.json";
import telecabineWalkMap from "@/assets/photos/telecabine-walk-map.jpg.asset.json";

const AIRBNB_URL = "https://www.airbnb.co.uk/rooms/1300151240294300447";

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(availabilityQuery),
  head: () => ({
    meta: [
      { title: "Les Cyclamens — Holiday apartment in Thollon-les-Memises" },
      {
        name: "description",
        content:
          "Charming 39 m² 2-bedroom apartment in Thollon-les-Memises, above Lake Geneva. Comfortably sleeps 4, with a sofa bed; two balconies: south-facing front and north-facing rear.",
      },
      { property: "og:title", content: "Les Cyclamens — Thollon-les-Memises apartment" },
      {
        property: "og:description",
        content:
          "2 bedrooms, 1 full-size bathroom and 1 shower ensuite, two balconies: south-facing front and north-facing rear. Open all year.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const rooms = [
  {
    name: "Living & dining room",
    nameFr: "Séjour et salle à manger",
    size: "10.9 m²",
    img: living.url,
    text: "Big picture window onto the balcony, dining table for four, armchairs, TV and a sofa bed.",
    textFr: "Grande baie vitrée sur le balcon, table pour quatre, fauteuils, TV et canapé-lit.",
  },
  {
    name: "Kitchen",
    nameFr: "Cuisine",
    size: "",
    img: kitchen.url,
    text: "Microwave oven, 2 hobs, 2 fridge/freezers, slow cooker, air fryer, toaster, coffee machine and kettle.",
    textFr:
      "Four micro-ondes, 2 plaques, 2 réfrigérateurs-congélateurs, mijoteuse, friteuse à air, grille-pain, cafetière et bouilloire.",
  },
  {
    name: "Double bedroom",
    nameFr: "Chambre double",
    size: "8.9 m²",
    img: master.url,
    text: "Double bed and built-in wardrobes, with ensuite shower room.",
    textFr: "Lit double et placards intégrés, à côté de la salle de douche.",
  },
  {
    name: "Bunk room",
    nameFr: "Chambre à lits superposés",
    size: "5.6 m²",
    img: bunks.url,
    tall: true,
    text: "Cosy wood-panelled room with full-size bunk beds, each with privacy curtain — kids love it.",
    textFr:
      "Chambre chaleureuse lambrissée, équipée de lits superposés de taille standard, chacun doté d’un rideau occultant — les enfants adorent.",
  },
  {
    name: "Shower ensuite",
    nameFr: "Salle d’eau attenante",
    size: "2.75 m²",
    img: shower,
    tall: true,
    text: "Walk-in shower, washbasin, toilet and lit mirror.",
    textFr: "Douche à l’italienne, lavabo, WC et miroir éclairé.",
  },
  {
    name: "Full-size bathroom",
    nameFr: "Salle de bains complète",
    size: "",
    img: bath.url,
    tall: true,
    text: "Full size Bathtub with shower, washbasin and toilet.",
    textFr: "Baignoire de taille standard avec douche, lavabo et wc.",
  },
];

const facts = [
  { icon: BedDouble, en: "1 Double bedroom", fr: "1 Chambre double" },
  { icon: BunkBeds, en: "1 Bunk room", fr: "1 Chambre à lits superposés" },
  { icon: ShowerHead, en: "1 Shower ensuite", fr: "1 Salle d’eau attenante" },
  { icon: BathWithShower, en: "1 Bathroom with overhead shower", fr: "1 Salle de bains avec douche" },
  { icon: Sofa, en: "Living Room with Sofa Bed", fr: "Séjour avec canapé-lit" },
  { icon: Mountain, en: `${balconies.length} Balconies`, fr: `${balconies.length} Balcons` },
  { icon: Ruler, en: "39 m² Living space", fr: "39 m² de surface" },
  { icon: Wifi, en: "Fibre Optic", fr: "Fibre optique" },
];

const LocalIcons = [
  {
    icon: ShoppingCart,
    en: "Supermarket",
    fr: "Supermarché",
    modes: [
      { icon: Car, minutes: 5 },
      { icon: Footprints, minutes: 15 },
      { icon: Bike, minutes: 8 },
    ],
  },
  { icon: Martini, en: "Bars", fr: "Bars", modes: [{ icon: Footprints, minutes: 5 }] },
  { icon: UtensilsCrossed, en: "Restaurants", fr: "Restaurants", modes: [{ icon: Footprints, minutes: 5 }] },
];

const OtherActivitiesIcons: Array<{
  icon: string | LucideIcon;
  en: string;
  fr: string;
  modes: Array<{ icon: LucideIcon; minutes: number }>;
}> = [
  { icon: genericBowlingImg, en: "10 pin bowling", fr: "Bowling à 10 quilles", modes: [{ icon: Car, minutes: 20 }] },
  { icon: cinemaImg, en: "Cinema", fr: "Cinéma", modes: [{ icon: Footprints, minutes: 5 }] },
  { icon: golfIcon.url, en: "Golf", fr: "Golf", modes: [{ icon: Car, minutes: 15 }] },
  { icon: bunazImg, en: "La Plage de la Beunaz", fr: "La Plage de la Beunaz", modes: [{ icon: Car, minutes: 15 }] },
  { icon: lidoIcon.url, en: "Lido", fr: "piscine", modes: [{ icon: Car, minutes: 15 }] },
  { icon: waterparkIcon.url, en: "Waterpark", fr: "Parc Aquatique", modes: [{ icon: Car, minutes: 15 }] },
];

const AboutImages: Array<{
  image: string;
  en: string;
  fr: string;
  modes?: Array<{ icon: LucideIcon; minutes: number }>;
}> = [
  {
    image: evianImg,
    en: "Évian-les-Bains",
    fr: "Évian-les-Bains",
    modes: [
      { icon: Car, minutes: 15 },
      { icon: Bus, minutes: 25 },
    ],
  },
  {
    image: veveyImg,
    en: "Vevey",
    fr: "Vevey",
    modes: [{ icon: Car, minutes: 50 }],
  },
  {
    image: genevaImg,
    en: "Geneva",
    fr: "Genève",
    modes: [
      { icon: Car, minutes: 70 },
      { icon: Bus, minutes: 100 },
    ],
  },
  {
    image: montreuxImg,
    en: "Montreux",
    fr: "Montreux",
    modes: [{ icon: Car, minutes: 45 }],
  },
  {
    image: yvoireImg,
    en: "Yvoire",
    fr: "Yvoire",
    modes: [
      { icon: Car, minutes: 38 },
      { icon: Bus, minutes: 75 },
    ],
  },
  {
    image: bernexImg,
    en: "Bernex",
    fr: "Bernex",
    modes: [
      { icon: Car, minutes: 10 },
      { icon: Bus, minutes: 35 },
    ],
  },
  {
    image: morzineImg,
    en: "Morzine",
    fr: "Morzine",
    modes: [
      { icon: Car, minutes: 55 },
      { icon: Bus, minutes: 135 },
    ],
  },
  {
    image: aquaParcImg,
    en: "Aqua Parc",
    fr: "Aqua Parc",
    modes: [{ icon: Car, minutes: 45 }],
  },
  {
    image: genericBunazImg,
    en: "Lake Bunaz",
    fr: "Lac de la Beunaz",
    modes: [{ icon: Car, minutes: 10 }],
  },
  {
    image: genericCinemaImg,
    en: "Cinema",
    fr: "Cinéma",
    modes: [{ icon: Footprints, minutes: 5 }],
  },
  {
    image: genericBowlingImg,
    en: "10 Pin Bowling",
    fr: "Bowling",
    modes: [{ icon: Car, minutes: 20 }],
  },
  {
    image: genericWaterparkImg,
    en: "Waterpark",
    fr: "Parc Aquatique",
    modes: [{ icon: Car, minutes: 15 }],
  },
];

const dayOutTowns = ["Évian-les-Bains", "Vevey", "Geneva", "Montreux", "Yvoire"];
const skiingTowns = ["Bernex", "Leysin–Les Mosses", "Châtel", "Morzine", "Portes du Soleil"];

// Owner-supplied travel times from the apartment; no bus icon means no practical bus route.
const townTimes: Record<string, { car?: string; bus?: string }> = {
  "Évian-les-Bains": { car: "15 min", bus: "25 min" },
  Montreux: { car: "45 min" },
  Geneva: { car: "1h 10", bus: "1h 40 (x2)" },
  Vevey: { car: "50 min" },
  Yvoire: { car: "38 min", bus: "1h 15 (x2)" },
  Bernex: { car: "10 min", bus: "35 min" },
  "Leysin–Les Mosses": { car: "1h 15" },
  Châtel: { car: "45–50 min", bus: "1h 45 (x2)" },
  Morzine: { car: "55 min", bus: "2h 15" },
};

function TownGroup({ title, names, left = false }: { title: string; names: string[]; left?: boolean }) {
  const towns = names
    .map((name) => dayTrips.find((t) => t.name === name))
    .filter((t): t is (typeof dayTrips)[number] => Boolean(t));
  return (
    <div className={left ? "text-left" : "text-center"}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{title}</p>
      <div className={`mt-6 flex w-full flex-col gap-5 ${left ? "" : "mx-auto"}`}>
        {towns.map((town) => {
          const times = "carMinutes" in town ? { car: `${town.carMinutes} min` } : (townTimes[town.name] ?? {});
          const modes = [{ icon: Car, time: times.car }, ...(times.bus ? [{ icon: Bus, time: times.bus }] : [])];
          return (
            <div key={town.name} className={`flex items-center gap-4 ${left ? "justify-start" : "justify-center"}`}>
              <a
                href={town.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`min-w-0 text-sm font-medium text-foreground underline-offset-4 transition hover:text-accent hover:underline ${left ? "text-left" : "text-right"}`}
              >
                {town.name}
              </a>
              <span className="flex shrink-0 items-start gap-3 text-primary">
                {modes.map(({ icon: Mode, time }) => (
                  <span key={Mode.displayName ?? Mode.name} className="flex flex-col items-center gap-1">
                    <Mode aria-hidden="true" className="size-6" strokeWidth={1.8} />
                    {time && <span className="text-xs text-foreground">{time}</span>}
                  </span>
                ))}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Gallery() {
  const { tr } = useLang();
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 py-24">
      {/* Location Link Button Banner */}
      <Button asChild className="h-auto w-full min-w-0 flex-col items-start gap-3 whitespace-normal p-8 text-left">
        <Link to="/location">
          <span className="text-sm uppercase">{tr("Location", "Situation")}</span>
          <span className="text-3xl md:text-4xl">{tr("Location and views", "Situation et vues")}</span>
          <span className="flex items-center gap-2">
            {tr("Take a look", "Jeter un œil")} <ArrowRight className="size-4" />
          </span>
        </Link>
      </Button>

      {/* 1. NEW FULL-WIDTH WHIZZY BENTO ROW */}
      <div className="mt-14 w-full max-w-[1200px] mx-auto">
        <h2 className="mb-6 border-b-2 border-[rgba(120,153,158,0.08)] pb-3 text-[14px] font-bold uppercase tracking-[0.18em] text-[#4a6b77]">
          {tr("Other Activities", "Autres Activites")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
          {OtherActivitiesIcons.map(({ en, fr, modes, icon: Icon }, index) => {
            const gridSpans = [
              "md:col-span-4 h-56",
              "md:col-span-2 h-56",
              "md:col-span-2 h-56",
              "md:col-span-4 h-56",
              "md:col-span-6 h-48",
            ];
            const layoutClass = gridSpans[index] || "md:col-span-2 h-56";

            return (
              <div
                key={en}
                className={`group relative overflow-hidden rounded-2xl bg-slate-900 col-span-1 sm:col-span-1 ${layoutClass} transition-all duration-500 ease-out hover:shadow-xl hover:-translate-y-1`}
              >
                {/* Dynamically uses your 'icon' string value as the image source URL */}
                <img
                  src={typeof Icon === "string" ? Icon : "/images/placeholder-activity.jpg"}
                  alt={tr(en, fr)}
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition-transform duration-500 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                <div className="absolute bottom-0 left-0 p-6 w-full flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 z-10">
                  <div>
                    <h3 className="text-xl font-black tracking-wide text-white uppercase drop-shadow-sm">
                      {tr(en, fr)}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-1.5 self-start sm:self-end">
                    {modes.map(({ icon: Mode, minutes }, mIdx) => (
                      <span
                        key={mIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-white border border-white/10"
                      >
                        <Mode aria-hidden="true" className="size-4 text-white" strokeWidth={2.5} />
                        {minutes != null && <span>{minutes} min</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. RESPONSIVE SIDE-BY-SIDE GRID FOR ORIGINAL LOWER SECTIONS */}
      <div className="mt-10 mx-auto grid max-w-[1200px] grid-cols-1 gap-6 md:grid-cols-2">
        {/* COLUMN 1: DAYS OUT */}
        <div className="rounded-xl border border-[rgba(120,153,158,0.2)] bg-white p-6 shadow-[0_4px_12px_rgba(74,107,119,0.04)]">
          <h2 className="mb-6 border-b-2 border-[rgba(120,153,158,0.08)] pb-3 text-[14px] font-bold uppercase tracking-[0.18em] text-[#4a6b77]">
            {tr("Days out", "Excursions")}
          </h2>
          <div className="flex flex-col gap-1">
            {dayOutTowns.map((name) => {
              const town = dayTrips.find((t) => t.name === name);
              if (!town) return null;
              const times = "carMinutes" in town ? { car: `${town.carMinutes} min` } : (townTimes[town.name] ?? {});
              return (
                <div
                  key={town.name}
                  className="flex flex-col gap-2 rounded-md p-3 transition hover:bg-[rgba(120,153,158,0.08)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <a
                    href={town.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium text-[#2c3e44] underline-offset-4 transition hover:text-[#4a6b77] hover:underline"
                  >
                    {town.name}
                  </a>
                  <div className="flex items-center gap-4">
                    {times.car && (
                      <span className="flex items-center gap-1.5 text-[13px] text-[#657e85]">
                        <Car aria-hidden="true" className="size-[18px]" strokeWidth={2} />
                        {times.car}
                      </span>
                    )}
                    {times.bus && (
                      <span className="flex items-center gap-1.5 text-[13px] text-[#657e85]">
                        <Bus aria-hidden="true" className="size-[18px]" strokeWidth={2} />
                        {times.bus}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: SKIING CLOSE BY */}
        <div className="rounded-xl border border-[rgba(120,153,158,0.2)] bg-white p-6 shadow-[0_4px_12px_rgba(74,107,119,0.04)]">
          <h2 className="mb-6 border-b-2 border-[rgba(120,153,158,0.08)] pb-3 text-[14px] font-bold uppercase tracking-[0.18em] text-[#4a6b77]">
            {tr("Skiing close by", "Ski à proximité")}
          </h2>
          <div className="flex flex-col gap-1">
            {skiingTowns.map((name) => {
              const town = dayTrips.find((t) => t.name === name);
              if (!town) return null;
              const times = "carMinutes" in town ? { car: `${town.carMinutes} min` } : (townTimes[town.name] ?? {});
              return (
                <div
                  key={town.name}
                  className="flex flex-col gap-2 rounded-md p-3 transition hover:bg-[rgba(120,153,158,0.08)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <a
                    href={town.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium text-[#2c3e44] underline-offset-4 transition hover:text-[#4a6b77] hover:underline"
                  >
                    {town.name}
                  </a>
                  <div className="flex items-center gap-4">
                    {times.car && (
                      <span className="flex items-center gap-1.5 text-[13px] text-[#657e85]">
                        <Car aria-hidden="true" className="size-[18px]" strokeWidth={2} />
                        {times.car}
                      </span>
                    )}
                    {times.bus && (
                      <span className="flex items-center gap-1.5 text-[13px] text-[#657e85]">
                        <Bus aria-hidden="true" className="size-[18px]" strokeWidth={2} />
                        {times.bus}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Index() {
  const { lang, tr } = useLang();
  const fr = lang === "fr";
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sunshine">
            Thollon-les-Memises · Haute-Savoie
          </p>
          <h1 className="max-w-3xl text-5xl leading-tight md:text-7xl">
            {tr("Les Cyclamens, your home above Lake Geneva", "Les Cyclamens, votre chez-vous au-dessus du Léman")}
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">
            {tr(
              "A charming two bedroom, two bathroom apartment close to the cable car, restaurants and all village amenities — open for stays all year round.",
              "Un charmant appartement près de la télécabine, des restaurants et de tous les commerces du village — ouvert toute l’année.",
            )}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <WhatsAppEnquiry />
            <GalleryLink />
          </div>
        </div>
      </section>

      <section className="relative flex min-h-[70vh] overflow-hidden">
        <img
          src={building.url}
          alt={tr("Les Cyclamens apartment building", "La résidence Les Cyclamens")}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-between px-6 py-24 text-primary-foreground">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="max-w-xl">
              <div className="flex items-center gap-4 md:gap-5">
                <LogoMark />
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sunshine">
                  {tr("The apartment", "L’appartement")}
                </p>
              </div>
              <h2 className="mt-4 text-4xl md:text-5xl">{tr("Overview", "aperçu")}</h2>
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm font-semibold">
                <span className="inline-flex items-center gap-2">
                  <Heart className="size-5" aria-hidden="true" />
                  Airbnb {tr("Guest Favourite", "Coup de cœur voyageurs")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Award className="size-5" aria-hidden="true" />
                  Airbnb Superhost
                </span>
                <span className="inline-flex items-center gap-2">
                  <Star className="size-5 fill-current" aria-hidden="true" />
                  {airbnbReviews.rating.toLocaleString(lang, { minimumFractionDigits: 2 })}/5
                </span>
              </div>
              <div className="mt-4 h-1.5 w-40 rounded-full bg-sunshine" />
              <p className="mt-6 text-lg leading-relaxed opacity-95">
                {tr(
                  "On the second floor of Les Cyclamens building, the apartment is furnished to a high standard and is a cosy base for ski days in winter and hiking, paragliding and lake trips in summer.",
                  "Situé au deuxième étage de l’immeuble Les Cyclamens, cet appartement bénéficie d’un aménagement de grande qualité ; il constitue un pied-à-terre chaleureux pour vos journées de ski en hiver, ainsi que pour la randonnée, le parapente et les excursions au bord du lac en été.",
                )}
              </p>
              <GalleryLink className="mt-6" />
            </div>

            {/* Right Column */}
            <div className="max-w-lg lg:ml-auto lg:mt-20">
              <p className="text-lg italic leading-relaxed opacity-95">
                {tr(
                  "We bought this apartment as an Alpine base for our growing family and have enjoyed wonderful ski holidays on the slopes and summer holidays walking and on the lake with our children.  The resort is extremely family friendly and we particularly like having two bathrooms in the apartment which makes getting ready as a group much easier!  Thank you for looking at our listing and we hope to welcome you to our mountain apartment soon!",
                  "Nous avons acheté cet appartement comme pied-à-terre dans les Alpes pour notre famille, qui s'est agrandie au fil du temps. Nous y avons passé de merveilleux séjours, profitant des pistes de ski en hiver, ainsi que de randonnées et d'activités au bord du lac en été, avec nos enfants. La station est parfaitement adaptée aux familles, et nous apprécions tout particulièrement la présence de deux salles de bain dans l'appartement, ce qui facilite grandement les préparatifs lorsque l'on est en groupe ! Merci de vous intéresser à notre annonce ; nous espérons avoir le plaisir de vous accueillir très bientôt dans notre appartement à la montagne !",
                )}
              </p>
            </div>
          </div>

          <div className="mt-28 flex flex-wrap items-end justify-center gap-x-10 gap-y-6">
            {[
              { id: "parking", icon: parkingIcon.url, detail: tr("Free", "Gratuit") },
              {
                id: "skiing",
                icon: skiingIcon.url,
                detail: `${apartmentAmenities.skiingMinutes} minutes`,
                subIcon: Footprints,
              },
              { id: "hiking", icon: hikingIcon.url, detail: tr("Right outside", "Juste à la porte") },
              {
                id: "bars",
                Icon: Martini,
                detail: tr("5 minutes", "5 minutes"),
                subIcon: Footprints,
              },
              {
                id: "restaurants",
                Icon: UtensilsCrossed,
                detail: tr("5 minutes", "5 minutes"),
                subIcon: Footprints,
              },
              {
                id: "supermarket",
                Icon: ShoppingCart,
                detail: tr("10 minutes", "10 minutes"),
                subIcon: Footprints,
              },
            ].map((item) => (
              <div key={item.id} className="flex flex-col items-center gap-1.5 text-center slideshow-caption">
                {item.icon ? (
                  <img src={item.icon} alt="" aria-hidden="true" className="h-14 w-20 object-contain" />
                ) : (
                  item.Icon && (
                    <div className="flex h-14 w-20 items-center justify-center">
                      <item.Icon className="size-11" strokeWidth={1.6} aria-hidden="true" />
                    </div>
                  )
                )}
                <span className="inline-flex items-center gap-1.5 text-sm">
                  {item.subIcon && <item.subIcon className="size-4" aria-hidden="true" />}
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rooms-showcase overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center justify-between gap-4">
            <SectionHeading>{tr("Inside the apartment", "À l’intérieur")} </SectionHeading>
            <GalleryLink />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {facts.map(({ icon: Icon, en, fr: french }) => (
              <div key={en} className="flex flex-col items-center gap-3 text-center">
                <Icon aria-hidden="true" className="size-9 text-primary" strokeWidth={1.8} />
                <span className="text-sm text-foreground">{tr(en, french)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          {rooms.map((r, index) => (
            <article
              key={r.name}
              className={`relative flex items-center overflow-hidden ${"tall" in r && r.tall ? "min-h-[92vh]" : "min-h-[60vh]"}`}
            >
              <img
                src={r.img}
                alt={fr ? r.nameFr : r.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="bg-overlay absolute inset-0" />
              <div
                className={`relative mx-auto flex w-full max-w-6xl px-6 py-20 text-primary-foreground ${index % 2 ? "md:justify-end" : ""}`}
              >
                <div className={`max-w-xl ${r.name === "Kitchen" ? "translate-y-12" : ""}`}>
                  <h3 className="text-3xl md:text-5xl">{fr ? r.nameFr : r.name}</h3>
                  <div className="mt-4 h-1.5 w-32 rounded-full bg-sunshine" />
                  <p className="mt-5 text-lg leading-relaxed opacity-95">{fr ? r.textFr : r.text}</p>
                  <GalleryLink className="mt-6" />
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
              {balconies.map((b) => (
                <li key={b.position} className="first-letter:uppercase">
                  {fr
                    ? `Balcon ${b.position === "front" ? "avant" : "arrière"} — exposé ${b.facing === "south" ? "sud" : "nord"}`
                    : `${b.position} balcony — ${b.facing}-facing`}
                </li>
              ))}
            </ul>
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {tr("Amenities", "Équipements")}
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-muted-foreground">
              {amenityList.map((a) => (
                <li key={a.en}>{fr ? a.fr : a.en}</li>
              ))}
            </ul>
          </div>
          <figure>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[480px]">
              <img
                src={floorplan3d}
                alt={tr(
                  "3D illustration of the apartment floor plan with two balconies",
                  "Illustration 3D du plan de l’appartement avec deux balcons",
                )}
                loading="lazy"
                className="h-full w-full object-contain"
              />
              <FloorplanCompass />
            </div>
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              {tr(
                "Illustrative 3D view — not a measured architectural drawing.",
                "Vue 3D illustrative — ce n’est pas un plan architectural coté.",
              )}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <SectionHeading kicker={tr("A Resort for All Passions", "Une station pour toutes les passions")}>
            {tr("Your Alpine Escape", "Votre escapade alpine")}
          </SectionHeading>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
            <li>
              <span className="font-medium text-primary">{tr("Winter:", "Hiver :")}</span>{" "}
              {tr(
                "Ski the pristine Mémises slopes with the main cable car just a short walk away.",
                "Skiez sur les pistes immaculées des Mémises, avec la télécabine principale à quelques pas.",
              )}
            </li>
            <li>
              <span className="font-medium text-primary">{tr("Spring:", "Printemps :")}</span>{" "}
              {tr(
                "Catch early mountain hikes as the snow melts.",
                "Profitez des premières randonnées en montagne à la fonte des neiges.",
              )}
            </li>
            <li>
              <span className="font-medium text-accent">{tr("Summer:", "Été :")}</span>{" "}
              {tr(
                "Discover alpine ridges, panoramic paragliding, and Lake Geneva's beaches below.",
                "Découvrez les crêtes alpines, le parapente panoramique et les plages du Léman en contrebas.",
              )}
            </li>
            <li>
              <span className="font-medium text-lake">{tr("Nearby:", "À proximité :")}</span>{" "}
              {tr(
                "Unwind anytime with quick trips to Évian-les-Bains, the Swiss Riviera, and Geneva.",
                "Détendez-vous en toute saison avec des escapades à Évian-les-Bains, sur la Riviera suisse et à Genève.",
              )}
            </li>
          </ul>
        </div>
        <Button
          asChild
          className="group h-auto min-h-64 flex-col items-start justify-between gap-6 whitespace-normal p-8 text-left"
        >
          <Link
            to="/local-area"
            className="flex w-full flex-col justify-between rounded-2xl bg-[#669297] p-6 text-white shadow-sm transition hover:opacity-95"
          >
            <h3 className="text-xl font-bold">{tr("Local Area", "Environs")}</h3>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
              {tr("Take a look", "Découvrir")} <ArrowRight className="size-4" />
            </span>
          </Link>
        </Button>
      </section>

      <AvailabilityCalendar />
      <GuestChat />
      <FindUs />

      <SiteFooter />
    </main>
  );
}
