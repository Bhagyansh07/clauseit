import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

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
      <div className="max-w-2xl">
        <h1 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
          Simple pricing
        </h1>
        <p className="mt-4 text-lg text-muted">
          Start free, upgrade when you need it. Pay with UPI, cards, or netbanking.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col rounded-2xl border bg-white p-8 ${
              plan.highlighted
                ? "border-gold shadow-lg shadow-gold/10"
                : "border-line"
            }`}
          >
            <h2 className="font-display text-xl font-semibold text-navy">
              {plan.name}
            </h2>
            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
            <p className="mt-6">
              <span className="font-display text-4xl font-semibold text-navy">
                {plan.price}
              </span>
              <span className="ml-2 text-sm text-muted">{plan.period}</span>
            </p>
            <ul className="mt-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <span className="text-ink">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className={`mt-8 rounded-lg px-5 py-3 text-center font-semibold transition-colors ${
                plan.highlighted
                  ? "bg-gold text-navy hover:bg-gold-dark"
                  : "bg-navy text-paper hover:bg-navy-light"
              }`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-10 max-w-2xl text-sm text-muted">
        Premium includes a lawyer review section, arriving soon. Pro and Premium
        cancel anytime from your account page.
      </p>
    </section>
  );
}
