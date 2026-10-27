import { expect, it } from 'vitest';
import { balconies } from '@/lib/apartment';

it('has exactly two balconies', () => {
  expect(balconies).toHaveLength(2);
});
it('has a south-facing front balcony', () => {
  expect(balconies.find(b => b.position === 'front')?.facing).toBe('south');
});
it('has a north-facing rear balcony', () => {
  expect(balconies.find(b => b.position === 'rear')?.facing).toBe('north');
});