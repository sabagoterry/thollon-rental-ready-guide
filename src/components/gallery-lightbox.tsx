import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useLang } from '@/lib/i18n';

export type GalleryPhoto = { src: string; alt: string; altFr: string };

export function GalleryLightbox({ photos, startIndex, onClose }: { photos: GalleryPhoto[]; startIndex: number; onClose: () => void }) {
  const { tr } = useLang();
  const [index, setIndex] = useState(startIndex);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || photos.length < 2) return;
    const timer = window.setTimeout(() => setIndex(i => (i + 1) % photos.length), 4000);
    return () => window.clearTimeout(timer);
  }, [index, paused, photos.length]);
  const photo = photos[index];
  if (!photo) return null;
  const move = (direction: number) => setIndex(i => (i + direction + photos.length) % photos.length);
  return <Dialog open onOpenChange={open => { if (!open) onClose(); }}>
    <DialogContent aria-describedby={undefined} className="gallery-lightbox max-w-[min(96vw,1200px)] border-0 bg-foreground p-2 text-gallery-caption" onKeyDown={event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
    }}>
      <DialogTitle className="sr-only">{tr('Apartment photo gallery', 'Galerie de l’appartement')}</DialogTitle>
      <div className="relative flex h-[min(75vh,800px)] items-center justify-center">
        <img src={photo.src} alt={tr(photo.alt, photo.altFr)} className="h-full w-full object-contain" />
        <p className="slideshow-caption pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 px-16 text-center font-gallery text-2xl md:text-5xl">{tr(photo.alt, photo.altFr)}</p>
        <Button variant="outline" size="icon" aria-label={tr('Previous gallery photo', 'Photo précédente de la galerie')} title={tr('Previous photo', 'Photo précédente')} onClick={() => move(-1)} className="absolute left-2 text-foreground"><ChevronLeft /></Button>
        <Button variant="outline" size="icon" aria-label={tr('Next gallery photo', 'Photo suivante de la galerie')} title={tr('Next photo', 'Photo suivante')} onClick={() => move(1)} className="absolute right-2 text-foreground"><ChevronRight /></Button>
      </div>
      <div className="flex items-center justify-center gap-4 pb-2">
        <span className="text-sm tabular-nums">{index + 1} / {photos.length}</span>
        <Button variant="outline" size="icon" className="text-foreground" onClick={() => setPaused(p => !p)} aria-label={paused ? tr('Resume gallery', 'Reprendre la galerie') : tr('Pause gallery', 'Mettre la galerie en pause')} title={paused ? tr('Resume gallery', 'Reprendre la galerie') : tr('Pause gallery', 'Mettre la galerie en pause')}>{paused ? <Play /> : <Pause />}</Button>
      </div>
    </DialogContent>
  </Dialog>;
}