import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free with 10 documents a month. Pro removes the limit. Premium adds lawyer review. UPI and card payments.",
};

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    tagline: "Try it on the documents you already have doubts about.",
    features: [
      "10 analyses per month",
      "PDF, Word, text, and photo upload",
      "Hidden clause and charge flags",
      "Risk score",
      "English and Hindi output",
    ],
    cta: "Start free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹99",
    period: "per month",
    tagline: "For people who sign documents regularly.",
    features: [
      "Unlimited analyses",
      "Report download as PDF",
      "Share analysis links",
      "Document history dashboard",
      "Everything in Free",
    ],
    cta: "Choose Pro",
    highlighted: true,
  },
  {
    name: "Premium",
    price: "₹599",
    period: "per month",
    tagline: "For the documents that really matter.",
    features: [
      "Everything in Pro",
      "Lawyer review of your document",
      "Priority processing",
      "Longer document support",
    ],
    cta: "Choose Premium",
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionLabel>Pricing</SectionLabel>
      <h1 className="mt-6 font-display text-4xl leading-tight tracking-[-0.02em] text-foreground sm:text-5xl">
        Simple pricing for{" "}
        <span className="gradient-text">everyday review</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Start free, upgrade when you need it. Pay with UPI, cards, or
        netbanking.
      </p>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) =>
          plan.highlighted ? (
            <div
              key={plan.name}
              className="relative rounded-2xl bg-gradient-to-br from-accent to-accent-secondary p-[2px] shadow-accent-lg"
            >
              <div className="flex h-full flex-col rounded-2xl bg-foreground p-8 text-background">
                <h2 className="font-display text-xl text-background">
                  {plan.name}
                </h2>
                <p className="mt-1 text-sm text-background/60">{plan.tagline}</p>
                <p className="mt-6">
                  <span className="font-display text-4xl">{plan.price}</span>
                  <span className="ml-2 text-sm text-background/60">
                    {plan.period}
                  </span>
                </p>
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent-secondary"
                        aria-hidden="true"
                      />
                      <span className="text-background/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="gradient-bg mt-8 rounded-xl px-5 py-3 text-center font-semibold text-white transition-all hover:brightness-110"
                >
                  {plan.cta}
                </Link>
              </div>
            </div>
          ) : (
            <div
              key={plan.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <h2 className="font-display text-xl text-foreground">
                {plan.name}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {plan.tagline}
              </p>
              <p className="mt-6">
                <span className="font-display text-4xl text-foreground">
                  {plan.price}
                </span>
                <span className="ml-2 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </p>
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="mt-8 rounded-xl border border-border px-5 py-3 text-center font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                {plan.cta}
              </Link>
            </div>
          )
        )}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-muted-foreground">
        Premium includes a lawyer review section, arriving soon. Pro and Premium
        cancel anytime from your account page.
      </p>
    </section>
  );
}
