import { MapPin, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { useLang } from '@/lib/i18n';
import { apartmentLocation, apartmentMapQuery, apartmentDirectionsUrl } from '@/lib/apartment-location';

export function FindUs() {
  const { lang, tr } = useLang();
  const key = import.meta.env['VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY'];
  const params = new URLSearchParams({ key: key ?? '', q: apartmentMapQuery, zoom: '15', language: lang });
  return (
    <section aria-label={tr('Find us', 'Nous trouver')} className="band-ice">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-8">
        <div className="grid items-start gap-x-6 gap-y-3 md:grid-cols-[1fr_auto]">
          <div>
            <SectionHeading kicker="Thollon-les-Mémises">{tr('Find us', 'Nous trouver')}</SectionHeading>
          </div>
          <p className="flex items-center justify-end gap-2 text-sm text-muted-foreground md:pt-2"><MapPin className="size-4 shrink-0" />{apartmentLocation.display}</p>
          <Button asChild variant="outline" className="w-fit"><a href={apartmentDirectionsUrl} target="_blank" rel="noopener noreferrer"><Navigation />{tr('Get directions', 'Itinéraire')}</a></Button>
        </div>
        <div className="mt-4 overflow-hidden rounded-md border border-primary/20 bg-muted">
          {key ? <iframe title={tr('Les Cyclamens location on Google Maps', 'Situation des Cyclamens sur Google Maps')} src={`https://www.google.com/maps/embed/v1/place?${params}`} loading="lazy" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="block h-[320px] w-full border-0 md:h-[420px]" /> : <div className="flex h-[320px] items-center justify-center"><Button asChild variant="outline"><a href={apartmentDirectionsUrl} target="_blank" rel="noopener noreferrer"><MapPin />{tr('Open in Google Maps', 'Ouvrir dans Google Maps')}</a></Button></div>}
        </div>
      </div>
    </section>
  );
}