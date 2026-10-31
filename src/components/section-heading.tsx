import type { ReactNode } from "react";
import { LogoMark } from "@/components/logo-mark";

type Props = {
  kicker?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Section heading with the shared home-link logo, kicker and coloured rule.
 */
export function SectionHeading({ kicker, children, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-4 md:gap-5 ${className}`}>
      <LogoMark />
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
