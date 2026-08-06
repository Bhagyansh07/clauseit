"use client";

import { MoveRight } from "lucide-react";
import type { Flag, Language, Severity } from "@/lib/types";
import { FLAG_ACTION, FLAG_LABEL } from "@/lib/flag-actions";

const SEVERITY_META: Record<
  Severity,
  { label: string; border: string; badge: string }
> = {
  danger: {
    label: "Serious",
    border: "border-l-red",
    badge: "bg-red-soft text-red",
  },
  warning: {
    label: "Warning",
    border: "border-l-amber",
    badge: "bg-amber-soft text-amber",
  },
  info: {
    label: "Note",
    border: "border-l-sage",
    badge: "bg-sage-soft text-sage",
  },
};

export function FlagCard({
  flag,
  lang,
}: {
  flag: Flag;
  lang: Language;
}) {
  const meta = SEVERITY_META[flag.severity];
  const action = FLAG_ACTION[flag.type];

  return (
    <div className={`rounded border border-line border-l-4 bg-paper p-5 ${meta.border}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-navy">
          {FLAG_LABEL[flag.type] ?? "Watch out"}
        </p>
        <span
          className={`shrink-0 rounded-sm px-2.5 py-0.5 text-xs font-semibold ${meta.badge}`}
        >
          {meta.label}
        </span>
      </div>
      <p className="mt-3 text-sm italic text-ink-soft">&quot;{flag.quote}&quot;</p>
      <div className="my-3 border-t border-dashed border-line" />
      <p className="leading-7 text-ink">{flag.explanation[lang]}</p>
      <p className="mt-3 flex items-start gap-2 text-sm font-medium text-navy-light">
        <MoveRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        {action[lang]}
      </p>
    </div>
  );
}
