import { expect, it } from 'vitest';
import { liveLinks, dayTrips } from '@/lib/local-links';

it('uses the owner-supplied Thollon snow forecast address', () => {
  expect(liveLinks.find(link => link.name === 'Snow forecast')?.url).toBe('https://www.snow-forecast.com/resorts/Thollon/6day/mid');
});
it('uses the owner-supplied Thollon events calendar address', () => {
  expect(liveLinks.find(link => link.name === 'What’s on in Thollon')?.url).toBe('https://www.leman-mountains-explore.com/en/agenda/the-resorts-calendar-of-events/agenda-for-thollon-les-memises/');
});
it('uses the owner-supplied Télécabine Thollon Facebook page for cabin news', () => {
  expect(liveLinks.find(link => link.name === 'Télécabine news')?.url).toBe('https://www.facebook.com/profile.php?id=100069952870413');
});
it('has Portes du Soleil fifty minutes away by car', () => {
  const trip = dayTrips.find(t => t.name === 'Portes du Soleil');
  expect(trip && 'carMinutes' in trip ? trip.carMinutes : undefined).toBe(50);
});