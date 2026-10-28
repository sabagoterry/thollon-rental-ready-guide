import type { ReactNode } from "react";
import logo from "@/assets/cyclamens-logo.jpg.asset.json";

type Props = {
  kicker?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Section heading with the cyclamen logo mark, a small kicker and a
 * hand-drawn-feel rule. The logo is black line art on white, so
 * mix-blend-multiply lets it sit on tinted sections too.
 */
export function SectionHeading({ kicker, children, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-4 md:gap-5 ${className}`}>
      <img
        src={logo.url}
        alt=""
        aria-hidden
        loading="lazy"
        className="size-20 shrink-0 rounded-full border-2 border-accent bg-card p-2 object-contain ring-4 ring-accent/15 md:size-24"
      />
      <div className="min-w-0">
        {kicker && (
          <p className="mb-1 text-sm font-semibold uppercase tracking-[0.35em] text-rainbow">
            {kicker}
          </p>
        )}
        <h2 className="text-4xl text-rainbow md:text-5xl">{children}</h2>
        <div className="bar-flow mt-3 h-1.5 w-40 rounded-full" />
      </div>
    </div>
  );
}
