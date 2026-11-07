import { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { LogoMark } from '@/components/logo-mark';
import { LanguageToggle } from '@/components/language-toggle';
import { MobileMenu } from '@/components/mobile-menu';
import { useLang } from '@/lib/i18n';

export function HomeHeader() {
  const { tr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 100);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <header className={`home-navigation pointer-events-none fixed inset-x-0 top-0 z-40 px-3 ${scrolled ? 'is-scrolled py-3' : 'home-integrated-header py-5'}`}>
      <div className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 ${scrolled ? 'home-navigation-dock w-fit max-w-full rounded-full border px-4 py-2' : 'max-w-6xl px-3'}`}>
        <LogoMark compact={scrolled} />
        <nav aria-label={tr('Main', 'Navigation principale')} className="flex items-center gap-4 text-sm">
          <a href="#availability" className="hidden transition hover:text-accent md:inline">{tr('Availability', 'Disponibilités')}</a>
          <Link to="/location" className="hidden transition hover:text-accent md:inline">{tr('Location', 'Situation')}</Link>
          <Link to="/getting-here" className="hidden transition hover:text-accent md:inline">{tr('Getting here', 'Venir')}</Link>
          <a href="#local-guide" className="hidden transition hover:text-accent md:inline">{tr('Local area', 'Le coin')}</a>
          <a href="#ask" className="hidden transition hover:text-accent md:inline">{tr('Ask us', 'Questions')}</a>
          <LanguageToggle />
          <MobileMenu includeSections />
        </nav>
      </div>
    </header>
  );
}