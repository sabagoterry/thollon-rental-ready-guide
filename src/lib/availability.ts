import ICAL from 'ical.js';

export type BlockedRange = { start: string; end: string };
export type Availability = {
  ranges: BlockedRange[];
  syncedAt: string | null;
  status: 'ready' | 'unavailable';
  today: string;
};

export function parisToday(now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  return ['year', 'month', 'day'].map(type => parts.find(p => p.type === type)?.value).join('-');
}

export function isBlocked(day: string, ranges: BlockedRange[]): boolean {
  return ranges.some(range => day >= range.start && day < range.end);
}

// Export only dates, never summaries, UIDs, descriptions or embedded URLs.
export function parseBlockedRanges(text: string): BlockedRange[] {
  if (text.length > 1_000_000) throw new Error('Calendar too large');
  const root = new ICAL.Component(ICAL.parse(text));
  if (root.name !== 'vcalendar') throw new Error('Invalid calendar');
  const events = root.getAllSubcomponents('vevent');
  if (events.length > 5000) throw new Error('Too many calendar events');
  const ranges: BlockedRange[] = [];
  for (const component of events) {
    if (component.getFirstPropertyValue('status') === 'CANCELLED') continue;
    // Airbnb exports date-only stays. Fail closed on unsupported shapes.
    if (component.hasProperty('rrule') || component.hasProperty('rdate') || component.hasProperty('recurrence-id')) {
      throw new Error('Unsupported recurring calendar');
    }
    const event = new ICAL.Event(component);
    const start = event.startDate;
    const end = event.endDate;
    if (!start?.isDate || !end?.isDate) throw new Error('Invalid stay dates');
    const range = { start: start.toString(), end: end.toString() };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(range.start) || range.end <= range.start) throw new Error('Invalid stay interval');
    ranges.push(range);
  }
  return ranges.sort((a, b) => a.start.localeCompare(b.start));
}