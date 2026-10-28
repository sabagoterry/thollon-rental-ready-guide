import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { LogoMark } from '@/components/logo-mark';
import { Button } from '@/components/ui/button';
import exterior from "@/assets/photos/exterior.jpg.asset.json";
import lake from "@/assets/photos/lake.jpg.asset.json";
import ski from "@/assets/photos/ski.jpg.asset.json";
import snowView from "@/assets/photos/snow-view.jpg.asset.json";
import balconyWinter from "@/assets/photos/balcony-winter.jpg.asset.json";
import balconyDusk from "@/assets/photos/balcony-dusk.jpg.asset.json";
import lakeBeach from "@/assets/photos/lake-beach.jpg.asset.json";
import sunsetMeadow from "@/assets/photos/sunset-meadow.jpg.asset.json";
import sunsetLake from "@/assets/photos/sunset-lake.jpg.asset.json";
import cliffsGolden from "@/assets/photos/cliffs-golden.jpg.asset.json";
import villageChalets from "@/assets/photos/village-chalets.jpg.asset.json";
import paragliders from "@/assets/photos/paragliders.jpg.asset.json";
import twinPeaks from "@/assets/photos/twin-peaks.jpg.asset.json";
import cliffsSummer from "@/assets/photos/cliffs-summer.jpg.asset.json";
import forestPath from "@/assets/photos/forest-path.jpg.asset.json";
import mountainForest from "@/assets/photos/mountain-forest.jpg.asset.json";
import lakePanorama from "@/assets/photos/lake-panorama.jpg.asset.json";
import balconyForest from "@/assets/photos/balcony-forest.jpg.asset.json";
import balconyTrees from "@/assets/photos/balcony-trees.jpg.asset.json";
import lakeWater from "@/assets/photos/lake-water.jpg.asset.json";
import pisteChairlift from "@/assets/photos/piste-chairlift.jpg.asset.json";
import skiersLake from "@/assets/photos/skiers-lake.jpg.asset.json";
import pisteLake from "@/assets/photos/piste-lake.jpg.asset.json";
import widePiste from "@/assets/photos/wide-piste.jpg.asset.json";
import balconySunset from "@/assets/photos/balcony-sunset.jpg.asset.json";
import winterCliffs from "@/assets/photos/winter-cliffs.jpg.asset.json";
import meadowCliffs from "@/assets/photos/meadow-cliffs.jpg.asset.json";
import valleyRidge from "@/assets/photos/valley-ridge.jpg.asset.json";

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
  { src: exterior.url, alt: "The Les Cyclamens building", caption: "The building", season: "summer" },
  { src: lake.url, alt: "Lake Geneva seen from Thollon", caption: "Lake Geneva below", season: "summer" },
  { src: ski.url, alt: "The ski slopes at Thollon", caption: "The slopes above the village", season: "winter" },
  { src: snowView.url, alt: "Snow outside the apartment", caption: "Snow outside the door", season: "winter" },
  { src: balconyWinter.url, alt: "The balcony in the snow", caption: "The balcony in winter", season: "winter" },
  { src: balconyDusk.url, alt: "The view from the balcony at dusk", caption: "Dusk from the balcony", season: "winter" },
  { src: lakeBeach.url, alt: "Sunbathers on the grass by Lake Geneva", caption: "Beach & lido on the lake", season: "summer" },
  { src: sunsetMeadow.url, alt: "Sunset over Lake Geneva seen from a meadow", caption: "Sunset over the lake", season: "summer" },
  { src: sunsetLake.url, alt: "Evening sun setting beyond Lake Geneva", caption: "Evening over Lake Geneva", season: "summer" },
  { src: cliffsGolden.url, alt: "Limestone cliffs lit gold at sunset", caption: "The cliffs at sunset", season: "summer" },
  { src: villageChalets.url, alt: "Wooden chalets in the village beneath the cliffs", caption: "Chalets in the village", season: "summer" },
  { src: paragliders.url, alt: "Paragliders above the mountain slopes", caption: "Paragliders overhead", season: "summer" },
  { src: twinPeaks.url, alt: "Rocky peaks above forest and meadow", caption: "Peaks above the forest", season: "summer" },
  { src: cliffsSummer.url, alt: "Summer cliffs and pine forest", caption: "Summer on the cliffs", season: "summer" },
  { src: forestPath.url, alt: "Walkers on a path through the forest", caption: "A walk from the door", season: "summer" },
  { src: mountainForest.url, alt: "Evergreen forest below the mountain cliffs", caption: "Woodland under the cliffs", season: "summer" },
  { src: lakePanorama.url, alt: "Lake Geneva seen from high on the mountain", caption: "The lake from up high", season: "summer" },
  { src: balconyForest.url, alt: "Trees and a paraglider seen from the balcony", caption: "From the balcony", season: "summer" },
  { src: balconyTrees.url, alt: "Evening clouds above the forest from the balcony", caption: "Evening from the balcony", season: "summer" },
  { src: lakeWater.url, alt: "Out on Lake Geneva with mountains beyond", caption: "Out on the lake", season: "summer" },
  { src: balconySunset.url, alt: "Pink and orange evening sky seen from the balcony", caption: "Sunset from the balcony", season: "summer" },
  { src: pisteChairlift.url, alt: "Ski slope with chairlift and Lake Geneva behind", caption: "Skiing above the lake", season: "winter" },
  { src: skiersLake.url, alt: "Skiers on the piste with the lake behind", caption: "Skiers with a lake view", season: "winter" },
  { src: pisteLake.url, alt: "The piste running down past snowy trees", caption: "Down the piste", season: "winter" },
  { src: widePiste.url, alt: "Wide open snow slope under a blue sky", caption: "Open slopes", season: "winter" },
  { src: winterCliffs.url, alt: "Snow-covered cliffs above the forest", caption: "Snow on the cliffs", season: "winter" },
  { src: meadowCliffs.url, alt: "Green meadow beneath the limestone cliffs", caption: "Meadow under the cliffs", season: "summer" },
  { src: valleyRidge.url, alt: "A walking trail through green valley pastures", caption: "A valley walk", season: "summer" },
];

const photoGroups = [
  { title: 'Views from the mountains', sources: [lake, ski, twinPeaks, cliffsSummer, mountainForest, lakePanorama, pisteChairlift, skiersLake, pisteLake, widePiste, meadowCliffs, valleyRidge] },
  { title: 'Views at the lake', sources: [lakeBeach, lakeWater] },
  { title: 'The surroundings', sources: [exterior, snowView, sunsetMeadow, sunsetLake, cliffsGolden, villageChalets, paragliders, forestPath, winterCliffs] },
  { title: 'Views from the balconies', sources: [balconyWinter, balconyDusk, balconyForest, balconyTrees, balconySunset] },
];

function LocationPage() {
  const [filter, setFilter] = useState<"all" | "summer" | "winter">("all");
  const [open, setOpen] = useState<Shot | null>(null);
  const list = filter === "all" ? shots : shots.filter((s) => s.season === filter);

  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-card/90 backdrop-blur">
        <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <Link to="/" className="group" aria-label="Les Cyclamens home">
            <LogoMark />
          </Link>
          <nav aria-label="Main" className="flex items-center gap-6 text-sm">
            <Link to="/" className="hidden text-muted-foreground transition hover:text-primary md:inline">
              The apartment
            </Link>
            <Link
              to="/book"
              className="rounded-full bg-primary px-5 py-2 font-medium text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
            >
              Book
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-[52vh] items-end">
        <img src={exterior.url} alt="The Les Cyclamens building in the village" className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-16 text-primary-foreground">
          <p className="mb-4 text-sm uppercase tracking-[0.3em]">Thollon-les-Mémises · Haute-Savoie</p>
          <h1 className="max-w-3xl text-5xl leading-tight md:text-6xl">Everything you can see from the door</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">
            The apartment is in the village itself, with the cable car, shops and restaurants a short walk away —
            and the lake spread out below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading kicker="Location">Views & surroundings</SectionHeading>
          <div className="flex gap-2">
            {(["all", "summer", "winter"] as const).map((f) => (
              <Button
                key={f}
                onClick={() => setFilter(f)}
                variant={filter === f ? 'default' : 'outline'}
                aria-pressed={filter === f}
                className="capitalize"
              >
                {f === "all" ? "All" : f}
              </Button>
            ))}
          </div>
        </div>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Photos of the village, the lake and the mountain — in summer and in winter.
        </p>

        {photoGroups.map(group => {
          const groupShots = list.filter(shot => group.sources.some(source => source.url === shot.src));
          if (!groupShots.length) return null;
          return <section key={group.title} aria-label={group.title} className="mt-14">
          <h3 className="border-b border-primary/20 pb-4 text-2xl text-primary">{group.title}</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groupShots.map((s) => (
            <Button
              key={s.src}
              onClick={() => setOpen(s)}
              variant="ghost"
              className="group block h-auto w-full overflow-hidden whitespace-normal rounded-sm border bg-card p-0 text-left"
            >
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
                <span className="text-xs uppercase tracking-[0.2em] text-accent">{s.season}</span>
              </div>
            </Button>
          ))}
        </div>
        </section>;
        })}

        <div className="mt-14 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-sm border px-5 py-3 font-medium transition hover:bg-secondary"
          >
            <ArrowLeft className="size-4" /> Back to the apartment
          </Link>
          <Link
            to="/"
            hash="local-guide"
            className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 font-medium text-primary-foreground transition hover:bg-accent hover:text-accent-foreground"
          >
            Shops, lifts & where to eat
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

      <footer className="flex justify-center border-t px-6 py-8">
        <LogoMark />
      </footer>
    </main>
  );
}
