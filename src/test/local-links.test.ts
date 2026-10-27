import { expect, it } from 'vitest';
import { liveLinks } from '@/lib/local-links';

it('uses the owner-supplied Thollon snow forecast address', () => {
  expect(liveLinks.find(link => link.name === 'Snow forecast')?.url).toBe('https://www.snow-forecast.com/resorts/Thollon/6day/mid');
});
it('uses the owner-supplied Thollon events calendar address', () => {
  expect(liveLinks.find(link => link.name === 'What’s on in Thollon')?.url).toBe('https://www.leman-mountains-explore.com/en/agenda/the-resorts-calendar-of-events/agenda-for-thollon-les-memises/');
});