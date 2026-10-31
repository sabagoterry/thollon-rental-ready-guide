import { Link } from '@tanstack/react-router';
import logo from '@/assets/cyclamens-bright-logo.jpg';

export function LogoMark() {
  return <Link to="/" aria-label="Les Cyclamens home" title="Home" className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-full border-2 border-accent bg-card shadow-lg ring-4 ring-primary/10 transition hover:ring-accent/30 focus-visible:outline-none focus-visible:ring-ring md:size-24">
    <img src={logo} alt="Bright pink cyclamen flowers" width={96} height={96} className="size-full rounded-full object-cover" />
  </Link>;
}