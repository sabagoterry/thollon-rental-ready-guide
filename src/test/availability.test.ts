import { describe, expect, it } from 'vitest';
import { isBlocked, parseBlockedRanges, parisToday } from '@/lib/availability';

const feed = (event: string) => `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\n${event}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
describe('Private Airbnb availability', () => {
  it('exports only blocked dates, never private event properties', () => {
    const result = parseBlockedRanges(feed('DTSTART;VALUE=DATE:20261027\r\nDTEND;VALUE=DATE:20261030\r\nSUMMARY:Private guest\r\nDESCRIPTION:Private reservation\r\nUID:private-id\r\nURL:https://example.com/private'));
    expect(result).toEqual([{ start: '2026-10-27', end: '2026-10-30' }]);
  });
  it('blocks arrival nights but leaves checkout available', () => {
    const ranges = [{ start: '2026-10-27', end: '2026-10-30' }];
    expect(isBlocked('2026-10-27', ranges)).toBe(true);
    expect(isBlocked('2026-10-29', ranges)).toBe(true);
    expect(isBlocked('2026-10-30', ranges)).toBe(false);
  });
  it('ignores cancelled reservations', () => {
    expect(parseBlockedRanges(feed('DTSTART;VALUE=DATE:20261027\r\nDTEND;VALUE=DATE:20261030\r\nSTATUS:CANCELLED'))).toEqual([]);
  });
  it('rejects invalid feeds instead of showing false availability', () => {
    expect(() => parseBlockedRanges('<html>error</html>')).toThrow();
    expect(() => parseBlockedRanges(feed('SUMMARY:Missing dates'))).toThrow();
  });
  it('rejects unsupported recurring reservations rather than missing blocked nights', () => {
    expect(() => parseBlockedRanges(feed('DTSTART;VALUE=DATE:20261027\r\nDTEND;VALUE=DATE:20261030\r\nRRULE:FREQ=WEEKLY'))).toThrow();
  });
  it('uses the apartment timezone for today', () => {
    expect(parisToday(new Date('2026-10-27T23:30:00Z'))).toBe('2026-10-28');
  });
});