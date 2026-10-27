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
        className="h-14 w-14 shrink-0 -rotate-6 object-contain mix-blend-multiply transition-transform duration-300 hover:rotate-0 md:h-16 md:w-16"
      />
      <div className="min-w-0">
        {kicker && (
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.35em] text-accent">
            {kicker}
          </p>
        )}
        <h2 className="text-3xl text-primary md:text-4xl">{children}</h2>
        <div className="mt-2.5 h-px w-32 bg-gradient-to-r from-accent via-primary/40 to-transparent" />
      </div>
    </div>
  );
}
