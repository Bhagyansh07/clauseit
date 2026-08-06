"use client";

import { useMemo } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import type { Flag, Language, Severity } from "@/lib/types";
import { FlagCard } from "@/components/analyze/flag-card";

const SEVERITY_ORDER: Severity[] = ["danger", "warning", "info"];

const SEVERITY_META: Record<
  Severity,
  { label: string; dot: string }
> = {
  danger: { label: "Serious", dot: "bg-red" },
  warning: { label: "Warnings", dot: "bg-amber" },
  info: { label: "Notes", dot: "bg-sage" },
};

export function FlagList({
  flags,
  lang,
}: {
  flags: Flag[];
  lang: Language;
}) {
  const groups = useMemo(() => {
    const bySeverity: Record<Severity, Flag[]> = {
      danger: [],
      warning: [],
      info: [],
    };
    flags.forEach((flag) => bySeverity[flag.severity].push(flag));
    return bySeverity;
  }, [flags]);

  const present = SEVERITY_ORDER.filter(
    (severity) => groups[severity].length > 0
  );

  if (present.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-gold" aria-hidden="true" />
        <h2 className="font-display text-xl font-semibold text-navy">
          What to watch for
        </h2>
      </div>

      <div className="mt-5 space-y-6">
        {present.map((severity) => (
          <details key={severity} open={severity === "danger"}>
            <summary className="flex cursor-pointer list-none items-center justify-between py-1">
              <span className="flex items-center gap-2.5 font-semibold text-navy">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${SEVERITY_META[severity].dot}`}
                />
                {SEVERITY_META[severity].label} ({groups[severity].length})
              </span>
              <ChevronDown className="h-5 w-5 text-ink-soft" aria-hidden="true" />
            </summary>
            <div className="mt-3 space-y-4">
              {groups[severity].map((flag, i) => (
                <FlagCard key={i} flag={flag} lang={lang} />
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
