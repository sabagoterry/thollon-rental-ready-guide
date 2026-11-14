import { ArrowUpRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';
import { airbnbReviews } from '@/lib/airbnb-reviews';

export function AirbnbReviews() {
  const { lang, tr } = useLang();
  return (
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="text-xl">{tr('Airbnb guest reviews', 'Avis des voyageurs Airbnb')}</h3>
      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
        <Star className="size-5 fill-current text-primary" aria-hidden="true" />
        {airbnbReviews.rating.toLocaleString(lang, { minimumFractionDigits: 2 })}/5 · {airbnbReviews.count} {tr('reviews', 'avis')}
      </p>
      <div className="mt-5 space-y-6">
        {airbnbReviews.excerpts.map(review => (
          <figure key={review.name} className="border-l-2 border-primary pl-4">
            <blockquote className="text-sm leading-relaxed">“{tr(review.text, review.textFr)}”</blockquote>
            <figcaption className="mt-2 text-xs text-muted-foreground">
              {review.name} · {tr(review.date, review.dateFr)} · {review.rating}/5
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-5 text-xs text-muted-foreground">{tr('Selected Airbnb review excerpts · checked 14 November 2026.', 'Extraits d’avis Airbnb sélectionnés · vérifiés le 14 novembre 2026.')}</p>
      <Button asChild variant="link" className="mt-2 h-auto px-0 text-accent">
        <a href={airbnbReviews.url} target="_blank" rel="noopener noreferrer">{tr('Read all reviews on Airbnb', 'Lire tous les avis sur Airbnb')}<ArrowUpRight /></a>
      </Button>
    </div>
  );
}