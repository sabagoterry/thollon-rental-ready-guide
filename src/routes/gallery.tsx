import { createFileRoute, Link } from '@tanstack/react-router';
import { LogoMark } from '@/components/logo-mark';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { SiteFooter } from '@/components/site-footer';
import { ApartmentSlideshow } from '@/components/apartment-slideshow';
import { useLang } from '@/lib/i18n';

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { title: 'Photo gallery — Les Cyclamens, Thollon-les-Mémises' },
      { name: 'description', content: 'Browse the photo gallery of Les Cyclamens: living room, kitchen, bedrooms, bathrooms and the views from the balconies above Lake Geneva.' },
      { property: 'og:title', content: 'Photo gallery — Les Cyclamens, Thollon-les-Mémises' },
      { property: 'og:description', content: 'Browse the photo gallery of Les Cyclamens: living room, kitchen, bedrooms, bathrooms and the views from the balconies above Lake Geneva.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { tr } = useLang();
  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-card/90 backdrop-blur">
        <div className="bar-flow h-1.5" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <LogoMark />
          <nav aria-label={tr('Main', 'Navigation principale')} className="flex items-center gap-6 text-sm">
            <Link to="/" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('The apartment', 'L’appartement')}</Link>
            <Link to="/location" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('Location & views', 'Situation et vues')}</Link>
            <Link to="/getting-here" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('Getting here', 'Venir')}</Link>
            <LanguageToggle />
            <MobileMenu />
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-16 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">{tr('Les Cyclamens', 'Les Cyclamens')}</p>
        <h1 className="text-5xl md:text-6xl">{tr('Photo gallery', 'Galerie photos')}</h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
          {tr('A look around the apartment — the slideshow moves on its own, or use the arrows to browse at your own pace.', 'Un aperçu de l’appartement — le diaporama avance tout seul, ou utilisez les flèches pour le parcourir à votre rythme.')}
        </p>
      </section>

      <ApartmentSlideshow />

      <SiteFooter />
    </main>
  );
}
