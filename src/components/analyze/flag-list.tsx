"use client";

import { useMemo } from "react";
import { AlertTriangle, ChevronDown } from "lucide-react";
import type { Flag, Language, Severity } from "@/lib/types";
import { FlagCard } from "@/components/analyze/flag-card";

const SEVERITY_ORDER: Severity[] = ["danger", "warning", "info"];

const SEVERITY_LABEL: Record<Severity, string> = {
  danger: "Serious",
  warning: "Warnings",
  info: "Notes",
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
        <AlertTriangle className="h-5 w-5 text-accent" aria-hidden="true" />
        <h2 className="font-display text-xl text-foreground">
          What to watch for
        </h2>
      </div>

      <div className="mt-5 space-y-4">
        {present.map((severity) => (
          <details
            key={severity}
            open={severity === "danger"}
            className="rounded-xl border border-border bg-card"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
              <span className="font-semibold text-foreground">
                {SEVERITY_LABEL[severity]} ({groups[severity].length})
              </span>
              <ChevronDown className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            </summary>
            <div className="space-y-4 px-5 pb-5">
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
