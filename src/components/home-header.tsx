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

  const sections = [
    { href: '#availability', en: 'Availability', fr: 'Disponibilités' },
    { to: '/gallery', en: 'Gallery', fr: 'Galerie' },
    { to: '/location', en: 'Location', fr: 'Situation' },
    { to: '/getting-here', en: 'Getting here', fr: 'Venir' },
    { href: '#local-guide', en: 'Local area', fr: 'Le coin' },
    { href: '#ask', en: 'Ask us', fr: 'Questions' },
  ] as const;

  return (
    <>
      <header className={`home-navigation pointer-events-none fixed inset-x-0 top-0 z-40 px-3 ${scrolled ? 'py-3' : 'home-integrated-header py-5'}`}>
        <div className={`pointer-events-auto mx-auto flex items-center justify-between gap-4 ${scrolled ? 'w-fit max-w-full rounded-full border bg-background/95 px-4 py-2 shadow-lg backdrop-blur' : 'max-w-6xl px-3'}`}>
          <LogoMark compact={scrolled} />
          <nav aria-label={tr('Main', 'Navigation principale')} className="flex items-center gap-4 text-sm">
            {!scrolled && sections.map((s) =>
              'to' in s ? (
                <Link key={s.en} to={s.to} className="hidden transition hover:text-accent md:inline">{tr(s.en, s.fr)}</Link>
              ) : (
                <a key={s.en} href={s.href} className="hidden transition hover:text-accent md:inline">{tr(s.en, s.fr)}</a>
              ),
            )}
            <LanguageToggle />
            <MobileMenu includeSections />
          </nav>
        </div>
      </header>

      {scrolled && (
        <nav
          aria-label={tr('Sections', 'Sections')}
          className="fixed right-0 top-24 z-40 hidden flex-col items-end gap-2 md:flex"
        >
          {sections.map((s) => {
            const className =
              'rounded-l-full bg-primary py-2 pl-4 pr-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lg transition hover:pr-5 hover:brightness-110';
            return 'to' in s ? (
              <Link key={s.en} to={s.to} className={className}>{tr(s.en, s.fr)}</Link>
            ) : (
              <a key={s.en} href={s.href} className={className}>{tr(s.en, s.fr)}</a>
            );
          })}
        </nav>
      )}
    </>
  );
}
