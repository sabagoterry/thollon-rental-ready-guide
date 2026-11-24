import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { LogoMark } from '@/components/logo-mark';
import { SiteFooter } from '@/components/site-footer';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { FindUs } from '@/components/find-us';
import { useLang } from '@/lib/i18n';
import exterior from "@/assets/photos/exterior.jpg";
import lake from "@/assets/photos/lake.jpg";
import ski from "@/assets/photos/ski.jpg";
import snowView from "@/assets/photos/snow-view.jpg";
import balconyWinter from "@/assets/photos/balcony-winter.jpg";
import balconyDusk from "@/assets/photos/balcony-dusk.jpg";
import lakeBeach from "@/assets/photos/lake-beach.jpg";
import sunsetMeadow from "@/assets/photos/sunset-meadow.jpg";
import sunsetLake from "@/assets/photos/sunset-lake.jpg";
import cliffsGolden from "@/assets/photos/cliffs-golden.jpg";
import villageChalets from "@/assets/photos/village-chalets.jpg";
import paragliders from "@/assets/photos/paragliders.jpg";
import twinPeaks from "@/assets/photos/twin-peaks.jpg";
import cliffsSummer from "@/assets/photos/cliffs-summer.jpg";
import forestPath from "@/assets/photos/forest-path.jpg";
import mountainForest from "@/assets/photos/mountain-forest.jpg";
import lakePanorama from "@/assets/photos/lake-panorama.jpg";
import balconyForest from "@/assets/photos/balcony-forest.jpg";
import balconyTrees from "@/assets/photos/balcony-trees.jpg";
import lakeWater from "@/assets/photos/lake-water.jpg";
import pisteChairlift from "@/assets/photos/piste-chairlift.jpg";
import skiersLake from "@/assets/photos/skiers-lake.jpg";
import pisteLake from "@/assets/photos/piste-lake.jpg";
import widePiste from "@/assets/photos/wide-piste.jpg";
import balconySunset from "@/assets/photos/balcony-sunset.jpg";
import winterCliffs from "@/assets/photos/winter-cliffs.jpg";
import meadowCliffs from "@/assets/photos/meadow-cliffs.jpg";
import valleyRidge from "@/assets/photos/valley-ridge.jpg";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Location — Thollon-les-Mémises, above Lake Geneva | Les Cyclamens" },
      {
        name: "description",
        content:
          "Where Les Cyclamens sits: the building, the views over Lake Geneva, the ski slopes of the Mémises and the summer mountains of Thollon-les-Mémises.",
      },
      { property: "og:title", content: "Les Cyclamens — Location & views" },
      {
        property: "og:description",
        content: "The building, the lake, the slopes and the views from Thollon-les-Mémises.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LocationPage,
});

type Shot = { src: string; alt: string; caption: string; season: "summer" | "winter" };

const shots: Shot[] = [
  { src: exterior, alt: "The Les Cyclamens building", caption: "The building", season: "summer" },
  { src: lake, alt: "Lake Geneva seen from Thollon", caption: "Lake Geneva below", season: "summer" },
  { src: ski, alt: "The ski slopes at Thollon", caption: "The slopes above the village", season: "winter" },
  { src: snowView, alt: "Snow outside the apartment", caption: "Snow outside the door", season: "winter" },
  { src: balconyWinter, alt: "The balcony in the snow", caption: "The balcony in winter", season: "winter" },
  { src: balconyDusk, alt: "The view from the balcony at dusk", caption: "Dusk from the balcony", season: "winter" },
  { src: lakeBeach, alt: "Sunbathers on the grass by Lake Geneva", caption: "Beach & lido on the lake", season: "summer" },
  { src: sunsetMeadow, alt: "Sunset over Lake Geneva seen from a meadow", caption: "Sunset over the lake", season: "summer" },
  { src: sunsetLake, alt: "Evening sun setting beyond Lake Geneva", caption: "Evening over Lake Geneva", season: "summer" },
  { src: cliffsGolden, alt: "Limestone cliffs lit gold at sunset", caption: "The cliffs at sunset", season: "summer" },
  { src: villageChalets, alt: "Wooden chalets in the village beneath the cliffs", caption: "Chalets in the village", season: "summer" },
  { src: paragliders, alt: "Paragliders above the mountain slopes", caption: "Paragliders overhead", season: "summer" },
  { src: twinPeaks, alt: "Rocky peaks above forest and meadow", caption: "Peaks above the forest", season: "summer" },
  { src: cliffsSummer, alt: "Summer cliffs and pine forest", caption: "Summer on the cliffs", season: "summer" },
  { src: forestPath, alt: "Walkers on a path through the forest", caption: "A walk from the door", season: "summer" },
  { src: mountainForest, alt: "Evergreen forest below the mountain cliffs", caption: "Woodland under the cliffs", season: "summer" },
  { src: lakePanorama, alt: "Lake Geneva seen from high on the mountain", caption: "The lake from up high", season: "summer" },
  { src: balconyForest, alt: "Trees and a paraglider seen from the balcony", caption: "From the balcony", season: "summer" },
  { src: balconyTrees, alt: "Evening clouds above the forest from the balcony", caption: "Evening from the balcony", season: "summer" },
  { src: lakeWater, alt: "Out on Lake Geneva with mountains beyond", caption: "Out on the lake", season: "summer" },
  { src: balconySunset, alt: "Pink and orange evening sky seen from the balcony", caption: "Sunset from the balcony", season: "summer" },
  { src: pisteChairlift, alt: "Ski slope with chairlift and Lake Geneva behind", caption: "Skiing above the lake", season: "winter" },
  { src: skiersLake, alt: "Skiers on the piste with the lake behind", caption: "Skiers with a lake view", season: "winter" },
  { src: pisteLake, alt: "The piste running down past snowy trees", caption: "Down the piste", season: "winter" },
  { src: widePiste, alt: "Wide open snow slope under a blue sky", caption: "Open slopes", season: "winter" },
  { src: winterCliffs, alt: "Snow-covered cliffs above the forest", caption: "Snow on the cliffs", season: "winter" },
  { src: meadowCliffs, alt: "Green meadow beneath the limestone cliffs", caption: "Meadow under the cliffs", season: "summer" },
  { src: valleyRidge, alt: "A walking trail through green valley pastures", caption: "A valley walk", season: "summer" },
];

const photoGroups = [
  { title: 'Views from the mountains', titleFr: 'Vues depuis la montagne', sources: [lake, ski, twinPeaks, cliffsSummer, mountainForest, lakePanorama, pisteChairlift, skiersLake, pisteLake, widePiste, meadowCliffs, valleyRidge] },
  { title: 'Views at the lake', titleFr: 'Vues au bord du lac', sources: [lakeBeach, lakeWater] },
  { title: 'The surroundings', titleFr: 'Les environs', sources: [exterior, snowView, sunsetMeadow, sunsetLake, cliffsGolden, villageChalets, paragliders, forestPath, winterCliffs] },
  { title: 'Views from the balconies', titleFr: 'Vues depuis les balcons', sources: [balconyWinter, balconyDusk, balconyForest, balconyTrees, balconySunset] },
];

function LocationPage() {
  const { tr } = useLang();
  const [filter, setFilter] = useState<"all" | "summer" | "winter">("all");
  const [open, setOpen] = useState<Shot | null>(null);
  const list = filter === "all" ? shots : shots.filter((s) => s.season === filter);

  return (
    <main className="band-soft">
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-card/90 backdrop-blur">
        <div className="bar-flow h-1.5" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <LogoMark />
          <nav aria-label="Main" className="flex items-center gap-6 text-sm">
            <Link to="/" className="hidden text-muted-foreground transition hover:text-primary md:inline">
              {tr('The apartment', 'L’appartement')}
            </Link>
            <LanguageToggle />
            <Link to="/gallery" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('Gallery', 'Galerie')}</Link>
            <Link to="/getting-here" className="hidden text-muted-foreground hover:text-primary md:inline">{tr('Getting here', 'Venir')}</Link>
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[52vh] items-end">
        <img src={exterior} alt="The Les Cyclamens building in the village" className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 text-primary-foreground">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-sunshine">Thollon-les-Mémises · Haute-Savoie</p>
          <h1 className="max-w-3xl text-5xl leading-tight md:text-6xl">{tr("Everything you can see from the door", "Tout ce que l’on voit depuis la porte")}</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">
            {tr('The apartment is in the village itself, with the cable car, shops and restaurants a short walk away — and the lake spread out below.', 'L’appartement est au cœur du village, à quelques pas de la télécabine, des commerces et des restaurants — avec le lac en contrebas.')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker={tr("Location", "Situation")}>{tr("Views & surroundings", "Vues et environs")}</SectionHeading>
          <div className="flex gap-2">
            {(["all", "summer", "winter"] as const).map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? 'default' : 'outline'}
                aria-pressed={filter === f}
                className={filter === f ? 'capitalize band-sunset text-accent-foreground glow-accent' : 'capitalize'}
              >
                {f === "all" ? tr("All", "Tout") : f === "summer" ? tr("summer", "été") : tr("winter", "hiver")}
              </Button>
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-xl text-muted-foreground">
          {tr('Photos of the village, the lake and the mountain — in summer and in winter.', 'Photos du village, du lac et de la montagne — en été comme en hiver.')}
        </p>

        {photoGroups.map(group => {
          const groupShots = list.filter(shot => group.sources.some(source => source === shot.src));
          if (!groupShots.length) return null;
          return <section key={group.title} aria-label={tr(group.title, group.titleFr)} className="mt-14">
          <h3 className="border-b-2 border-accent/40 pb-4 text-2xl text-rainbow">{tr(group.title, group.titleFr)}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupShots.map((s) => (
            <Button
              key={s.src}
              onClick={() => setOpen(s)}
              variant="ghost"
              className="card-vivid group block h-auto w-full overflow-hidden whitespace-normal rounded-md bg-card p-0 text-left transition hover:-translate-y-1 hover:glow-accent"
            >
              <div className="bar-flow h-1" />
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <span className="font-medium">{s.caption}</span>
                <span className="band-sunset rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent-foreground">{s.season === "summer" ? tr("summer", "été") : tr("winter", "hiver")}</span>
              </div>
            </Button>
          ))}
        </div>
        </section>;
        })}

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-3 font-medium text-primary transition hover:border-accent hover:text-accent"
          >
            <ArrowLeft className="size-4" /> {tr("Back to the apartment", "Retour à l’appartement")}
          </Link>
          <Link
            to="/local-area"
            className="inline-flex items-center gap-2 rounded-full band-lake px-5 py-3 font-medium text-primary-foreground glow-primary transition hover:brightness-110"
          >
            {tr('Shops, lifts & where to eat', 'Commerces, remontées et restaurants')}
          </Link>
        </div>
      </section>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/85 p-6"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-label={open.caption}
        >
          <img src={open.src} alt={open.alt} className="max-h-full max-w-full rounded-sm" />
        </div>
      )}

      <FindUs />
      <SiteFooter />
    </main>
  );
}
