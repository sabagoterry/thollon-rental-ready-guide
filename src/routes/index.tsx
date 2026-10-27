import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import living from "@/assets/living.jpg";
import bedroom from "@/assets/bedroom.jpg";

// TODO: replace with the real listing links
const AIRBNB_URL = "https://www.airbnb.com";
const BOOKING_URL = "https://www.booking.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Les Cyclamens — Holiday apartment in Thollon-les-Memises" },
      {
        name: "description",
        content:
          "Charming 2-bedroom apartment near the cable car in Thollon-les-Memises, above Lake Geneva. Sleeps 6, two balconies, open all year.",
      },
      { property: "og:title", content: "Les Cyclamens — Thollon-les-Memises apartment" },
      {
        property: "og:description",
        content: "2 bedrooms, 2 bathrooms, two balconies, steps from the cable car. Available all year.",
      },
    ],
  }),
  component: Index,
});

const rooms = [
  { name: "Living room", text: "Bright and welcoming, with a comfortable sofa bed for two extra guests." },
  {
    name: "Open kitchen",
    text: "Microwave oven, 2 hobs, 2 fridge/freezers, slow cooker, air fryer, toaster, coffee machine and kettle.",
  },
  { name: "Master bedroom", text: "Double bed with its own en-suite shower room and toilet." },
  { name: "Second bedroom", text: "Bunk beds — perfect for children or friends." },
  { name: "Bathroom", text: "A full family bathroom with toilet." },
  { name: "Two balconies", text: "Morning coffee or an evening drink in the mountain air." },
];

const facts = [
  ["2", "Bedrooms"],
  ["Up to 6", "Guests"],
  ["2", "Bathrooms"],
  ["2", "Balconies"],
];

function BookButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={AIRBNB_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded-sm bg-accent px-6 py-3 font-medium text-accent-foreground transition hover:opacity-90"
      >
        Book on Airbnb
      </a>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noreferrer"
        className="rounded-sm border border-current px-6 py-3 font-medium transition hover:opacity-80"
      >
        Book on Booking.com
      </a>
    </div>
  );
}

function Index() {
  return (
    <main>
      <section className="relative flex min-h-[92vh] items-end">
        <img src={hero} alt="Balcony view over Lake Geneva from Thollon-les-Memises" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 text-primary-foreground">
          <p className="mb-4 text-sm uppercase tracking-[0.3em]">Thollon-les-Memises · Haute-Savoie</p>
          <h1 className="max-w-3xl text-5xl leading-tight md:text-7xl">Les Cyclamens, your home above Lake Geneva</h1>
          <p className="mt-6 max-w-xl text-lg opacity-90">
            A charming apartment close to the cable car, shops and restaurants — open for stays all year round.
          </p>
          <div className="mt-8">
            <BookButtons />
          </div>
        </div>
      </section>

      <section className="border-b bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4">
          {facts.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="font-display text-3xl text-primary">{n}</div>
              <div className="text-sm text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-4xl text-primary">Furnished to a high standard</h2>
          <p className="mt-5 text-lg text-muted-foreground">
            On the second floor of the Les Cyclamens building, the apartment is a cosy base for ski days in winter
            and hiking, paragliding and lake trips in summer.
          </p>
        </div>
        <img src={living} alt="Living room and open kitchen" width={1200} height={912} loading="lazy" className="rounded-sm shadow-xl" />
      </section>

      <section className="bg-secondary">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-4xl text-primary">Inside the apartment</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-sm border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r) => (
              <div key={r.name} className="bg-card p-8">
                <h3 className="text-xl">{r.name}</h3>
                <p className="mt-2 text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2 md:items-center">
        <img src={bedroom} alt="Bedroom with bunk beds" width={1200} height={912} loading="lazy" className="rounded-sm shadow-xl md:order-none" />
        <div>
          <h2 className="text-4xl text-primary">Every season in Thollon</h2>
          <ul className="mt-6 space-y-3 text-lg text-muted-foreground">
            <li><span className="text-foreground font-medium">Winter —</span> ski the Mémises slopes, the cable car is just a short walk away.</li>
            <li><span className="text-foreground font-medium">Summer —</span> alpine hikes, paragliding and Lake Geneva beaches below.</li>
            <li><span className="text-foreground font-medium">Nearby —</span> Évian-les-Bains, the Swiss Riviera and Geneva.</li>
          </ul>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl">Check dates & book</h2>
            <p className="mt-2 opacity-80">See availability and prices on your favourite platform.</p>
          </div>
          <BookButtons />
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        Les Cyclamens · Thollon-les-Memises, France
      </footer>
    </main>
  );
}
