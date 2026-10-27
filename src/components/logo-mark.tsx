import logo from '@/assets/cyclamens-logo.jpg.asset.json';

export function LogoMark() {
  return <span className="grid size-20 shrink-0 place-items-center rounded-full border-2 border-accent bg-card shadow-lg ring-4 ring-primary/10 md:size-24">
    <img src={logo.url} alt="Les Cyclamens cyclamen flower logo" width={80} height={76} className="size-16 object-contain mix-blend-multiply md:size-20" />
  </span>;
}