import { expect, it } from 'vitest';
import { balconies, washingFacilities, apartmentAmenities, amenityList, sleepingCapacity } from '@/lib/apartment';

it('has exactly two balconies', () => {
  expect(balconies).toHaveLength(2);
});
it('has a south-facing front balcony', () => {
  expect(balconies.find(b => b.position === 'front')?.facing).toBe('south');
});
it('has a north-facing rear balcony', () => {
  expect(balconies.find(b => b.position === 'rear')?.facing).toBe('north');
});
it('has one full-size bathroom', () => {
  expect(washingFacilities.fullSizeBathrooms).toBe(1);
});
it('has one shower ensuite', () => {
  expect(washingFacilities.showerEnsuites).toBe(1);
});
it('offers free parking', () => { expect(apartmentAmenities.parkingFree).toBe(true); });
it('offers towels on request', () => { expect(apartmentAmenities.towelsOnRequest).toBe(true); });
it('has skiing five minutes away', () => { expect(apartmentAmenities.skiingMinutes).toBe(5); });
it('has hiking right outside', () => { expect(apartmentAmenities.hikingAtDoorstep).toBe(true); });
it('comfortably sleeps four', () => { expect(sleepingCapacity.comfortableGuests).toBe(4); });
it('also has a sofa bed', () => { expect(sleepingCapacity.sofaBed).toBe(true); });
it('does not offer a separate cot', () => {
  expect(amenityList.some(a => String(a.en) === 'Cot')).toBe(false);
});
it('provides the travel cot only on request', () => {
  const item = amenityList.find(a => a.en.startsWith('Travel cot'));
  expect(item && 'onRequest' in item ? item.onRequest : false).toBe(true);
});
it('provides the high chair only on request', () => {
  const item = amenityList.find(a => a.en.startsWith('High chair'));
  expect(item && 'onRequest' in item ? item.onRequest : false).toBe(true);
});