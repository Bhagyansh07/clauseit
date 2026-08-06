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
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] ${
        inverted
          ? "border-white/25 bg-white/10 text-gold-bright"
          : "border-violet/25 bg-violet/5 text-violet"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 animate-pulse rounded-full ${
          inverted ? "bg-gold-bright" : "bg-violet"
        }`}
      />
      {children}
    </div>
  );
}
