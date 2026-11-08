import { useLang } from '@/lib/i18n';

export function FloorplanCompass() {
  const { tr } = useLang();
  return (
    <div className="absolute right-2 top-2 rounded-full bg-background/95 p-2 text-accent shadow-sm sm:right-4 sm:top-4" role="img" aria-label={tr('Compass: north towards the rear balcony, south towards the front balcony', 'Boussole : nord vers le balcon arrière, sud vers le balcon avant')}>
      <svg viewBox="0 0 100 100" className="size-20 sm:size-24" aria-hidden="true">
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M50 23 59 50 50 45 41 50Z" fill="currentColor" />
        <path d="M50 77 41 50 50 55 59 50Z" fill="none" stroke="currentColor" />
        <g fill="currentColor" textAnchor="middle" fontSize="12" fontWeight="600">
          <text x="50" y="13">N</text><text x="50" y="98">S</text><text x="94" y="54">E</text><text x="7" y="54">{tr('W', 'O')}</text>
        </g>
      </svg>
    </div>
  );
}