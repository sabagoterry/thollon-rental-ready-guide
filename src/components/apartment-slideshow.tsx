import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';
import living from '@/assets/photos/living.jpg.asset.json';
import lounge from '@/assets/photos/lounge.jpg.asset.json';
import sofabed from '@/assets/photos/sofabed.jpg.asset.json';
import kitchen from '@/assets/photos/kitchen.jpg.asset.json';
import master from '@/assets/photos/master.jpg.asset.json';
import bunks from '@/assets/photos/bunks2.jpg.asset.json';
import shower from '@/assets/photos/shower.jpg.asset.json';
import bath from '@/assets/photos/bath.jpg.asset.json';

const slides = [
  { src: living.url, en: 'Living and dining room', fr: 'Séjour et salle à manger' },
  { src: lounge.url, en: 'Armchairs and dresser', fr: 'Fauteuils et commode' },
  { src: sofabed.url, en: 'Sofa bed made up', fr: 'Canapé-lit déplié' },
  { src: kitchen.url, en: 'Kitchen', fr: 'Cuisine' },
  { src: master.url, en: 'Double bedroom', fr: 'Chambre double' },
  { src: bunks.url, en: 'Bunk beds', fr: 'Lits superposés' },
  { src: shower.url, en: 'Shower room', fr: 'Salle d’eau' },
  { src: bath.url, en: 'Bathroom', fr: 'Salle de bains' },
];

export function ApartmentSlideshow() {
  const { tr } = useLang();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => setIndex(current => (current + 1) % slides.length), 4000);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  function move(direction: number) {
    setIndex(current => (current + direction + slides.length) % slides.length);
  }

  return (
    <section aria-label={tr('Apartment photo slideshow', 'Diaporama de l’appartement')} aria-roledescription={tr('carousel', 'carrousel')} className="bg-foreground">
      <div className="bar-flow h-1.5" />
      <div className="relative mx-auto max-w-6xl">
        <div className="relative aspect-[4/3] max-h-[640px] overflow-hidden md:aspect-[16/9]">
          {slides.map((slide, position) => (
            <img key={slide.src} src={slide.src} alt={tr(slide.en, slide.fr)} aria-hidden={position !== index} loading={position < 2 ? 'eager' : 'lazy'} className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-700 motion-reduce:transition-none ${position === index ? 'opacity-100' : 'opacity-0'}`} />
          ))}
          <p aria-live={paused ? 'polite' : 'off'} className="slideshow-caption pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-16 text-center font-gallery text-2xl font-semibold leading-tight text-gallery-caption md:px-24 md:text-5xl">{tr(slides[index]?.en ?? '', slides[index]?.fr ?? '')}</p>
          <Button variant="outline" size="icon" onClick={() => move(-1)} aria-label={tr('Previous photo', 'Photo précédente')} title={tr('Previous photo', 'Photo précédente')} className="absolute left-3 top-1/2 size-11 -translate-y-1/2 rounded-full bg-card/95 shadow-md md:left-6"><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={() => move(1)} aria-label={tr('Next photo', 'Photo suivante')} title={tr('Next photo', 'Photo suivante')} className="absolute right-3 top-1/2 size-11 -translate-y-1/2 rounded-full bg-card/95 shadow-md md:right-6"><ChevronRight /></Button>
          <div className="absolute right-3 top-3 flex items-center gap-3 md:right-6 md:top-6">
            <span className="slideshow-caption text-sm font-semibold tabular-nums text-sunshine">{index + 1} / {slides.length}</span>
            <Button variant="outline" size="icon" onClick={() => setPaused(current => !current)} aria-label={paused ? tr('Resume slideshow', 'Reprendre le diaporama') : tr('Pause slideshow', 'Mettre le diaporama en pause')} title={paused ? tr('Resume slideshow', 'Reprendre le diaporama') : tr('Pause slideshow', 'Mettre le diaporama en pause')}>{paused ? <Play /> : <Pause />}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}