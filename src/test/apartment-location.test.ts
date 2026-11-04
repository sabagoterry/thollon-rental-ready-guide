import { describe, expect, it } from 'vitest';
import { apartmentLocation, apartmentDirectionsUrl } from '@/lib/apartment-location';

describe('Owner-supplied apartment coordinates', () => {
  it('preserves 46°23\'25.8"N 6°43\'15.0"E in decimal form', () => {
    expect(apartmentLocation.latitude).toBeCloseTo(46 + 23 / 60 + 25.8 / 3600, 10);
    expect(apartmentLocation.longitude).toBeCloseTo(6 + 43 / 60 + 15 / 3600, 10);
    const destination = new URL(apartmentDirectionsUrl).searchParams.get('destination');
    expect(destination).toBe('46.3905,6.720833333333333');
  });
});