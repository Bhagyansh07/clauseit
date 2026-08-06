"use client";

import { CheckCircle2, AlertTriangle, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { VerdictResult } from "@/lib/verdict";
import { RiskGauge } from "@/components/analyze/risk-gauge";
import { Stamp } from "@/components/analyze/stamp";

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
  { gauge: string; badge: string }
> = {
  emerald: { gauge: "#059669", badge: "bg-sage-soft text-sage" },
  amber: { gauge: "#D97706", badge: "bg-amber-soft text-amber" },
  red: { gauge: "#E11D48", badge: "bg-red-soft text-red" },
};

export function VerdictCard({
  score,
  verdict,
}: {
  score: number;
  verdict: VerdictResult;
}) {
  const copy = VERDICT_COPY[verdict.verdict];
  const styles = STYLES[verdict.colorToken];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-solid to-violet p-6 text-white shadow-seal sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia/30 blur-[80px]"
      />
      <div className="relative flex items-center gap-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" aria-hidden="true" />
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold-bright">
          Should you sign?
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap items-start justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-3xl font-bold leading-tight">
            {verdict.label}
          </h2>
          <p className="mt-3 max-w-md leading-7 text-white/80">{copy.en}</p>
          <p className="mt-2 max-w-md text-sm leading-6 text-gold-bright/90">
            {copy.hi}
          </p>
          <span
            className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold ${styles.badge}`}
          >
            Score {score}/10
          </span>
        </div>
        <div className="hidden shrink-0 pr-4 sm:block">
          <RiskGauge score={score} color={styles.gauge} onDark />
        </div>
      </div>

      <Stamp verdict={verdict.verdict} />
    </div>
  );
}
