import type { ReactNode } from "react";

export function SectionLabel({
  children,
  inverted = false,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-gold"
      />
      <span
        className={`font-mono text-xs font-medium uppercase tracking-[0.1em] ${
          inverted ? "text-gold-bright" : "text-navy-light"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
