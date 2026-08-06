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
    <div className="rounded-xl border border-line bg-white p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-gold" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold text-navy">
            Risk score
          </h2>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${colors[risk.level]}`}
        >
          {labels[risk.level]}
        </span>
      </div>
      <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-line">
        <div
          className={`h-full rounded-full ${colors[risk.level]}`}
          style={{ width }}
        />
      </div>
      <p className="mt-3 text-sm text-muted">
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
        <h1 className="font-display text-3xl font-semibold text-navy">
          Your analysis
        </h1>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              lang === "en" ? "bg-navy text-paper" : "bg-line/60 text-muted"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => setLang("hi")}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors ${
              lang === "hi" ? "bg-navy text-paper" : "bg-line/60 text-muted"
            }`}
          >
            हिन्दी
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/upload"
          className="inline-flex items-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-light"
        >
          <FileUp className="h-4 w-4" aria-hidden="true" />
          Analyze another
        </Link>
        <button
          type="button"
          onClick={downloadReport}
          className="inline-flex items-center gap-2 rounded-lg border border-line bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-gold"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download report
        </button>
      </div>

      <div className="mt-8 rounded-xl border border-line bg-white p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <Languages className="h-4 w-4 text-gold" aria-hidden="true" />
          Summary
        </div>
        <p className="mt-3 text-lg leading-8 text-ink">
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
        <p className="mt-2 text-sm text-muted">
          <BilingualText value={analysis.risk.reason} lang={lang} />
        </p>
      </div>

      {analysis.flags.length > 0 && (
        <FlagList flags={analysis.flags} lang={lang} />
      )}

      {analysis.charges.length > 0 && (
        <div className="mt-10">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold text-navy">
              Charges and fees
            </h2>
          </div>
          <div className="mt-5 overflow-hidden rounded-xl border border-line bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-paper text-muted">
                <tr>
                  <th className="px-5 py-3 font-semibold">Charge</th>
                  <th className="px-5 py-3 font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {analysis.charges.map((charge, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4 text-ink">{charge.name}</td>
                    <td className="px-5 py-4 font-medium text-ink">
                      {charge.amount}
                    </td>
                    <td className="px-5 py-4 text-muted">{charge.frequency}</td>
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
            <CalendarClock className="h-5 w-5 text-gold" aria-hidden="true" />
            <h2 className="font-display text-xl font-semibold text-navy">
              Important dates
            </h2>
          </div>
          <div className="mt-5 space-y-3">
            {analysis.dates.map((date, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-xl border border-line bg-white p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-ink">{date.label}</p>
                  <p className="text-sm text-muted">
                    <BilingualText value={date.note} lang={lang} />
                  </p>
                </div>
                <p className="shrink-0 font-semibold text-navy">
                  {date.date || "Check document"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {analysis.sections.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold text-navy">
            Section by section
          </h2>
          <div className="mt-5 space-y-3">
            {analysis.sections.map((section, i) => (
              <details
                key={i}
                className="rounded-xl border border-line bg-white px-5 py-4"
              >
                <summary className="cursor-pointer font-semibold text-ink">
                  {section.heading}
                </summary>
                <p className="mt-3 leading-7 text-muted">
                  <BilingualText value={section.plainMeaning} lang={lang} />
                </p>
              </details>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 rounded-xl border border-line bg-paper p-6">
        <div className="flex items-start gap-3">
          <Check className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
          <p className="text-sm leading-6 text-muted">
            ClauseIt summaries are informational and are not legal advice. For
            important decisions, a qualified lawyer should review your document.
          </p>
        </div>
      </div>
    </section>
  );
}
