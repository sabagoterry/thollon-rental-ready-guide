import { Link } from '@tanstack/react-router';
import { CalendarCheck } from 'lucide-react';

export function FloatingBookButton() {
  return (
    <Link
      to="/book"
      aria-label="Check dates and book"
      className="band-sunset glow-accent fixed right-0 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-1 rounded-l-full py-4 pl-3 pr-2 text-accent-foreground shadow-lg transition hover:pr-4 hover:brightness-110"
    >
      <CalendarCheck className="size-5" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-widest [writing-mode:vertical-rl]">Book</span>
    </Link>
  );
}
