import Link from "next/link";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "per month",
    features: ["10 documents per month", "Full analysis in English and Hindi", "Report download"],
  },
  {
    name: "Pro",
    price: "99",
    period: "per month",
    features: ["200 documents per month", "Faster analysis", "Shareable analysis links"],
    highlight: true,
  },
  {
    name: "Premium",
    price: "599",
    period: "per month",
    features: ["Unlimited documents", "Lawyer review (coming soon)", "Priority support"],
  },
];

export default function PricingTeaser() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold text-navy">
              A price a document deserves
            </h2>
            <p className="mt-4 text-muted">
              Start free. Upgrade when you need more, without paying a lawyer
              every time.
            </p>
          </div>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-gold-dark underline-offset-4 hover:underline"
          >
            See full pricing
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "rounded-xl border-2 border-gold bg-navy p-6 text-paper"
                  : "rounded-xl border border-line bg-paper p-6"
              }
            >
              <p
                className={
                  plan.highlight
                    ? "text-sm font-semibold uppercase tracking-wider text-gold"
                    : "text-sm font-semibold uppercase tracking-wider text-muted"
                }
              >
                {plan.name}
              </p>
              <p className="mt-3 font-display text-4xl font-semibold">
                <span className="text-xl">₹</span>
                {plan.price}
                <span className="ml-2 text-sm font-normal text-muted">
                  {plan.period}
                </span>
              </p>
              <ul className="mt-5 space-y-2 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlight ? "text-gold" : "text-gold-dark"}`}
                      aria-hidden="true"
                    />
                    <span className={plan.highlight ? "text-paper/80" : "text-muted"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
