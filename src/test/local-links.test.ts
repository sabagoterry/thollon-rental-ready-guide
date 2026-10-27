import { expect, it } from 'vitest';
import { liveLinks } from '@/lib/local-links';

it('uses the owner-supplied Thollon snow forecast address', () => {
  expect(liveLinks.find(link => link.name === 'Snow forecast')?.url).toBe('https://www.snow-forecast.com/resorts/Thollon/6day/mid');
});