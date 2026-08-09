import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { PlanCta } from "@/components/pricing/plan-cta";
import type { Plan } from "@/lib/auth-types";

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
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <SectionLabel>Pricing</SectionLabel>
      <h1 className="mt-6 font-display text-4xl leading-tight text-navy sm:text-5xl">
        Simple pricing for{" "}
        <span className="gradient-text">everyday review</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Start free, upgrade when you need it. Pay with UPI, cards, or
        netbanking.
      </p>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl p-8 shadow-paper ${
              plan.highlighted
                ? "gradient-bg text-white shadow-glow"
                : "border border-line bg-paper"
            }`}
          >
            <h2 className={`font-display text-xl font-bold ${plan.highlighted ? "text-white" : "text-navy"}`}>
              {plan.name}
            </h2>
            <p className={`mt-1 text-sm ${plan.highlighted ? "text-white/80" : "text-ink-soft"}`}>
              {plan.tagline}
            </p>
            <p className="mt-6">
              <span className={`font-display text-4xl font-bold ${plan.highlighted ? "text-white" : "text-navy"}`}>
                {plan.price}
              </span>
              <span className={`ml-2 text-sm ${plan.highlighted ? "text-white/75" : "text-ink-soft"}`}>
                {plan.period}
              </span>
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      plan.highlighted ? "text-gold-bright" : "text-violet"
                    }`}
                    aria-hidden="true"
                  />
                  <span className={plan.highlighted ? "text-white/90" : "text-ink"}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            <PlanCta
              plan={plan.name.toLowerCase() as Plan}
              label={plan.name === "Free" ? "Start free" : `Choose ${plan.name}`}
              highlighted={plan.highlighted}
            />
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-ink-soft">
        Billing is not live yet, so you can preview any plan from your account
        to see how gating works. Premium includes a lawyer review section.
        Cancel anytime.
      </p>
    </section>
  );
}
