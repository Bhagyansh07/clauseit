"use client";

import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Language } from "@/lib/types";
import type { VerdictResult } from "@/lib/verdict";

const VERDICT_COPY: Record<
  VerdictResult["verdict"],
  { icon: LucideIcon; en: string; hi: string }
> = {
  yes: {
    icon: CheckCircle2,
    en: "The main terms look balanced and standard. Check the flagged notes, then you can proceed.",
    hi: "मुख्य शर्तें संतुलित और मानक लगती हैं। दिए गए नोट्स जांचें, फिर आगे बढ़ सकते हैं।",
  },
  cautious: {
    icon: AlertTriangle,
    en: "Some terms are one-sided or unclear. Read the flags below before you decide.",
    hi: "कुछ शर्तें एकतरफा या अस्पष्ट हैं। निर्णय लेने से पहले नीचे दिए गए संकेत पढ़ें।",
  },
  "dont-sign": {
    icon: ShieldAlert,
    en: "Several clauses could cost you. Ask for changes or get a lawyer's opinion before you sign.",
    hi: "कई धाराएं आपको नुकसान पहुंचा सकती हैं। साइन करने से पहले बदलाव मांगें या वकील की राय लें।",
  },
};

const STYLES: Record<
  VerdictResult["colorToken"],
  { border: string; bg: string; icon: string; badge: string; ring: string }
> = {
  emerald: {
    border: "border-emerald-200",
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    badge: "bg-emerald-500",
    ring: "border-emerald-500",
  },
  amber: {
    border: "border-amber-200",
    bg: "bg-amber-50",
    icon: "text-amber-600",
    badge: "bg-amber-500",
    ring: "border-amber-500",
  },
  red: {
    border: "border-red-200",
    bg: "bg-red-50",
    icon: "text-red-600",
    badge: "bg-red-500",
    ring: "border-red-500",
  },
};

export function VerdictCard({
  score,
  verdict,
  lang,
}: {
  score: number;
  verdict: VerdictResult;
  lang: Language;
}) {
  const copy = VERDICT_COPY[verdict.verdict];
  const styles = STYLES[verdict.colorToken];
  const Icon = copy.icon;

  return (
    <div className={`rounded-xl border ${styles.border} ${styles.bg} p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Icon className={`h-8 w-8 ${styles.icon}`} aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Should you sign?
            </p>
            <h2 className="font-display text-2xl text-foreground">
              {verdict.label}
            </h2>
          </div>
        </div>
        <div
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 bg-white ${styles.ring}`}
        >
          <span className="font-display text-xl text-foreground">
            {score}
            <span className="text-sm text-muted-foreground">/10</span>
          </span>
        </div>
      </div>
      <p className="mt-4 leading-7 text-foreground">{copy[lang]}</p>
    </div>
  );
}
