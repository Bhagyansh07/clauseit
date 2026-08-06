import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const plans = [
  {
    name: "Free",
    price: "0",
    period: "per month",
    features: [
      "10 documents per month",
      "Full analysis in English and Hindi",
      "Report download",
    ],
  },
  {
    name: "Pro",
    price: "99",
    period: "per month",
    features: [
      "200 documents per month",
      "Faster analysis",
      "Shareable analysis links",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "599",
    period: "per month",
    features: [
      "Unlimited documents",
      "Lawyer review (coming soon)",
      "Priority support",
    ],
  },
];

export default function PricingTeaser() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <FadeIn>
              <SectionLabel>Pricing</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
                Clear pricing for everyday{" "}
                <span className="gradient-text">document review</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-4 text-lg leading-8 text-ink-soft">
                Start free, review a few documents, and upgrade only when you
                need more volume or more advanced support.
              </p>
            </FadeIn>
          </div>
          <Link
            href="/pricing"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-violet hover:text-fuchsia"
          >
            See full pricing
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-12 grid items-stretch gap-5 md:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={0.08 * i}>
              <div
                className={`flex h-full flex-col rounded-2xl p-7 shadow-paper ${
                  plan.highlight
                    ? "gradient-bg text-white shadow-glow"
                    : "border border-line bg-parchment"
                }`}
              >
                <p
                  className={`font-mono text-sm font-medium uppercase tracking-[0.12em] ${
                    plan.highlight ? "text-white/80" : "text-ink-soft"
                  }`}
                >
                  {plan.name}
                </p>
                <p
                  className={`mt-3 font-display text-4xl font-bold ${
                    plan.highlight ? "text-white" : "text-navy"
                  }`}
                >
                  <span className="text-xl">₹</span>
                  {plan.price}
                  <span
                    className={`ml-2 text-sm font-normal ${
                      plan.highlight ? "text-white/75" : "text-ink-soft"
                    }`}
                  >
                    {plan.period}
                  </span>
                </p>
                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.highlight ? "text-gold-bright" : "text-violet"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={
                          plan.highlight ? "text-white/90" : "text-ink-soft"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`mt-6 inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-bold transition-all ${
                    plan.highlight
                      ? "bg-white text-violet hover:bg-white/90"
                      : "border border-violet bg-white text-violet hover:bg-violet hover:text-white"
                  }`}
                >
                  {plan.highlight ? "Start with Pro" : "Get started"}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
