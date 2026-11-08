import { createFileRoute, Link } from '@tanstack/react-router';
import { LogoMark } from '@/components/logo-mark';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { LocalGuide } from '@/components/local-guide';
import { SiteFooter } from '@/components/site-footer';
import { useLang } from '@/lib/i18n';

export const Route = createFileRoute('/local-area')({
  head: () => ({ meta: [
    { title: 'Local area — Les Cyclamens, Thollon-les-Mémises' },
    { name: 'description', content: 'Mountain webcams, news, essential visitor information, bars, restaurants and day trips around Les Cyclamens in Thollon-les-Mémises.' },
    { property: 'og:title', content: 'Local area — Les Cyclamens, Thollon-les-Mémises' },
    { property: 'og:description', content: 'Explore mountain updates, visitor information, restaurants and day trips around Thollon-les-Mémises.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary' },
  ] }),
  component: LocalAreaPage,
});

function LocalAreaPage() {
  const { tr } = useLang();
  return (
    <main>
      <header className="sticky top-0 z-40 border-b border-primary/10 bg-card/90 backdrop-blur">
        <div className="bar-flow h-1.5" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <LogoMark />
          <nav aria-label={tr('Main', 'Navigation principale')} className="flex items-center gap-6 text-sm">
            <Link to="/" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('The apartment', 'L’appartement')}</Link>
            <Link to="/gallery" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('Gallery', 'Galerie')}</Link>
            <Link to="/location" className="hidden text-muted-foreground transition hover:text-primary md:inline">{tr('Location & views', 'Situation et vues')}</Link>
            <LanguageToggle /><MobileMenu />
          </nav>
        </div>
      </header>
      <LocalGuide standalone />
      <SiteFooter />
    </main>
  );
}