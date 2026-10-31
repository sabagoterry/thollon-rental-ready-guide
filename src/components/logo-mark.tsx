import { Link } from '@tanstack/react-router';
import logo from '@/assets/cyclamens-bright-logo.jpg';

export function LogoMark({ compact = false }: { compact?: boolean }) {
  return <Link to="/" aria-label="Les Cyclamens home" title="Home" className={`grid shrink-0 place-items-center overflow-hidden rounded-full border-2 border-accent bg-card shadow-lg ring-primary/10 transition hover:ring-accent/30 focus-visible:outline-none focus-visible:ring-ring ${compact ? 'size-8' : 'size-20 ring-4 md:size-24'}`}>
    <img src={logo} alt="Bright pink cyclamen flowers" width={96} height={96} className="size-full rounded-full object-cover" />
  </Link>;
}