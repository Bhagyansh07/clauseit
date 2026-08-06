"use client";

import { MoveRight } from "lucide-react";
import type { Flag, Language, Severity } from "@/lib/types";
import { FLAG_ACTION, FLAG_LABEL } from "@/lib/flag-actions";

const SEVERITY_META: Record<
  Severity,
  { label: string; card: string; badge: string }
> = {
  danger: {
    label: "Serious",
    card: "border-red-200 bg-red-50",
    badge: "bg-red-500",
  },
  warning: {
    label: "Warning",
    card: "border-amber-200 bg-amber-50",
    badge: "bg-amber-500",
  },
  info: {
    label: "Note",
    card: "border-blue-200 bg-blue-50",
    badge: "bg-blue-500",
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
    <div className={`rounded-xl border p-5 ${meta.card}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold text-ink">
          {FLAG_LABEL[flag.type] ?? "Watch out"}
        </p>
        <span
          className={`shrink-0 rounded-full ${meta.badge} px-2.5 py-0.5 text-xs font-semibold text-white`}
        >
          {meta.label}
        </span>
      </div>
      <p className="mt-3 text-sm italic text-muted">&quot;{flag.quote}&quot;</p>
      <p className="mt-3 leading-7 text-ink">{flag.explanation[lang]}</p>
      <p className="mt-3 flex items-start gap-2 text-sm font-medium text-ink">
        <MoveRight className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        {action[lang]}
      </p>
    </div>
  );
}
