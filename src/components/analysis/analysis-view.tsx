"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  IndianRupee,
  CalendarClock,
  Download,
  Languages,
  FileUp,
  Check,
} from "lucide-react";
import type { Analysis, Bilingual } from "@/lib/types";
import { FLAG_LABEL } from "@/lib/flag-actions";
import { getVerdict } from "@/lib/verdict";
import { VerdictCard } from "@/components/analyze/verdict-card";
import { FlagList } from "@/components/analyze/flag-list";

function BilingualText({
  value,
  lang,
}: {
  value: Bilingual;
  lang: "en" | "hi";
}) {
  return <>{value[lang]}</>;
}

function RiskMeter({ risk }: { risk: Analysis["risk"] }) {
  const colors: Record<string, string> = {
    low: "bg-emerald-500",
    medium: "bg-amber-500",
    high: "bg-red-500",
  };
  const labels: Record<string, string> = {
    low: "Low risk",
    medium: "Medium risk",
    high: "High risk",
  };
  const width = `${Math.max(risk.score * 10, 4)}%`;
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg shadow-accent">
            <ShieldAlert className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg text-foreground">Risk score</h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${colors[risk.level]}`}
        >
          {labels[risk.level]}
        </span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-border">
        <div
          className={`h-full rounded-full ${colors[risk.level]}`}
          style={{ width }}
        />
      </div>
      <p className="mt-3 text-sm text-muted-foreground">
        {risk.score} out of 10 risk to the person signing
      </p>
    </div>
  );
}

export function AnalysisView({ analysis }: { analysis: Analysis }) {
  const [lang, setLang] = useState<"en" | "hi">("en");

  function downloadReport() {
    const lines: string[] = [];
    lines.push("ClauseIt report");
    lines.push("");
    lines.push(`Summary: ${analysis.summary[lang]}`);
    lines.push("");
    lines.push(`Risk score: ${analysis.risk.score}/10 (${analysis.risk.level})`);
    lines.push(`Why: ${analysis.risk.reason[lang]}`);
    if (analysis.flags.length) {
      lines.push("");
      lines.push("FLAGS");
      analysis.flags.forEach((flag) =>
        lines.push(
          `- [${flag.severity}] ${FLAG_LABEL[flag.type]}: ${flag.explanation[lang]}`
        )
      );
    }
    if (analysis.charges.length) {
      lines.push("");
      lines.push("CHARGES");
      analysis.charges.forEach((charge) =>
        lines.push(
          `- ${charge.name}: ${charge.amount} (${charge.frequency})`
        )
      );
    }
    if (analysis.dates.length) {
      lines.push("");
      lines.push("DATES");
      analysis.dates.forEach((date) =>
        lines.push(
          `- ${date.label}: ${date.date || "unknown"} - ${date.action}`
        )
      );
    }
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "clauseit-report.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl tracking-[-0.02em] text-foreground">
          Your analysis
        </h1>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              lang === "en"
                ? "gradient-bg text-white shadow-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang("hi")}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              lang === "hi"
                ? "gradient-bg text-white shadow-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/upload"
          className="gradient-bg inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg"
        >
          <FileUp className="h-4 w-4" aria-hidden="true" />
          Analyze another
        </Link>
        <button
          type="button"
          onClick={downloadReport}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download report
        </button>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          <span className="gradient-bg flex h-7 w-7 items-center justify-center rounded-md shadow-accent">
            <Languages className="h-3.5 w-3.5 text-white" aria-hidden="true" />
          </span>
          Summary
        </div>
        <p className="mt-3 text-lg leading-8 text-foreground">
          <BilingualText value={analysis.summary} lang={lang} />
        </p>
      </div>

      <div className="mt-6">
        <VerdictCard
          score={analysis.risk.score}
          verdict={getVerdict(analysis.risk.score)}
          lang={lang}
        />
      </div>

      <div className="mt-6">
        <RiskMeter risk={analysis.risk} />
        <p className="mt-2 text-sm text-muted-foreground">
          <BilingualText value={analysis.risk.reason} lang={lang} />
        </p>
      </div>

      {analysis.flags.length > 0 && (
        <FlagList flags={analysis.flags} lang={lang} />
      )}

      {analysis.charges.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <span className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg shadow-accent">
              <IndianRupee className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
            <h2 className="font-display text-xl text-foreground">
              Charges and fees
            </h2>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">Charge</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {analysis.charges.map((charge, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4 text-foreground">{charge.name}</td>
                    <td className="px-5 py-4 font-medium text-foreground">
                      {charge.amount}
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">
                      {charge.frequency}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {analysis.dates.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <span className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg shadow-accent">
              <CalendarClock className="h-4 w-4 text-white" aria-hidden="true" />
            </span>
            <h2 className="font-display text-xl text-foreground">
              Important dates
            </h2>
          </div>
          <div className="mt-5 space-y-3">
            {analysis.dates.map((date, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">{date.label}</p>
                  <p className="text-sm text-muted-foreground">
                    <BilingualText value={date.note} lang={lang} />
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-accent">
                  {date.date || "Check document"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.sections.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl text-foreground">
            Section by section
          </h2>
          <div className="mt-5 space-y-3">
            {analysis.sections.map((section, i) => (
              <details
                key={i}
                className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm open:border-accent/40"
              >
                <summary className="cursor-pointer font-semibold text-foreground">
                  {section.heading}
                </summary>
                <p className="mt-3 leading-7 text-muted-foreground">
                  <BilingualText value={section.plainMeaning} lang={lang} />
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 rounded-xl border border-border bg-muted p-6">
        <div className="flex items-start gap-3">
          <Check className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm leading-6 text-muted-foreground">
            ClauseIt summaries are informational and are not legal advice. For
            important decisions, a qualified lawyer should review your document.
          </p>
        </div>
      </div>
    </section>
  );
}
