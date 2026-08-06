import type { ReactNode } from "react";

export function SectionLabel({
  children,
  inverted = false,
}: {
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-3 rounded-full border px-5 py-2 ${
        inverted
          ? "border-accent/40 bg-accent/10"
          : "border-accent/30 bg-accent/5"
      }`}
    >
      <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
      <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent">
        {children}
      </span>
    </div>
  );
}
