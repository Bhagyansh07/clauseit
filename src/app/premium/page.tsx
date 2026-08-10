import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, FileText, MessagesSquare, Scale } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { PremiumCheckout } from "@/components/pricing/premium-checkout";

export const metadata: Metadata = {
  title: "Premium",
  description:
    "Premium adds a lawyer review of your document. Queue your document and get a lawyer's notes within 24 hours.",
};

const steps = [
  {
    icon: FileText,
    title: "Upload your document",
    text: "The same upload as always. PDF, Word, or a photo of the agreement.",
  },
  {
    icon: Scale,
    title: "A lawyer reads it in full",
    text: "A qualified lawyer reviews the whole document, not just the flagged clauses.",
  },
  {
    icon: MessagesSquare,
    title: "Notes within 24 hours",
    text: "Plain-language notes on the clauses that matter, posted on this page.",
  },
];

export default function PremiumPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionLabel>Premium</SectionLabel>
      <h1 className="mt-6 font-display text-4xl leading-tight text-navy sm:text-5xl">
        Lawyer review,{" "}
        <span className="gradient-text">coming soon</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Premium includes a lawyer reading your document and leaving
        plain-language notes on the clauses that matter. Reserve your plan now —
        the review section activates here the day it launches.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map((step, i) => (
          <div key={step.title} className="rounded-2xl border border-line bg-paper p-6 shadow-paper">
            <div className="flex items-center gap-3">
              <span className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-glow">
                <step.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
                Step {i + 1}
              </span>
            </div>
            <h2 className="mt-4 font-display text-lg font-semibold text-navy">{step.title}</h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{step.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-line bg-paper p-8 shadow-paper sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
            Premium · ₹599/month
          </p>
          <ul className="mt-3 space-y-2 text-sm text-ink">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Everything in Pro (unlimited analyses)
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Lawyer review of your document
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              Priority processing
            </li>
          </ul>
        </div>
        <div className="shrink-0">
          <PremiumCheckout />
        </div>
      </div>

      <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-parchment p-6">
        <CalendarClock className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
        <p className="text-sm leading-6 text-ink-soft">
          The lawyer review itself launches soon. If you pay for Premium now,
          your plan activates immediately and you will get a note here when the
          review queue opens. You can also just{" "}
          <Link href="/pricing" className="font-semibold text-violet hover:underline">
            preview the plan
          </Link>{" "}
          without paying anything.
        </p>
      </div>
    </section>
  );
}
