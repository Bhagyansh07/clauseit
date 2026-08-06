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
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <FadeIn>
              <SectionLabel>Pricing</SectionLabel>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="mt-6 font-display text-3xl leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
                Clear pricing for everyday{" "}
                <span className="gradient-text">document review</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="mt-5 text-lg leading-8 text-muted-foreground">
                Start free, review a few documents, and upgrade only when you
                need more volume or more advanced support.
              </p>
            </FadeIn>
          </div>
          <Link
            href="/pricing"
            className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
          >
            See full pricing
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <FadeIn key={plan.name} delay={0.08 * i}>
              {plan.highlight ? (
                <div className="relative h-full rounded-2xl bg-gradient-to-br from-accent to-accent-secondary p-[2px] shadow-accent-lg">
                  <div className="flex h-full flex-col rounded-2xl bg-foreground p-6 text-background">
                    <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent-secondary">
                      {plan.name}
                    </p>
                    <p className="mt-3 font-display text-4xl">
                      <span className="text-xl">₹</span>
                      {plan.price}
                      <span className="ml-2 text-sm font-normal text-background/60">
                        {plan.period}
                      </span>
                    </p>
                    <ul className="mt-5 flex-1 space-y-2 text-sm">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
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
                      className="gradient-bg mt-6 inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-white transition-all hover:brightness-110"
                    >
                      Start with Pro
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 shadow-sm">
                  <p className="font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground">
                    {plan.name}
                  </p>
                  <p className="mt-3 font-display text-4xl text-foreground">
                    <span className="text-xl">₹</span>
                    {plan.price}
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      {plan.period}
                    </span>
                  </p>
                  <ul className="mt-5 flex-1 space-y-2 text-sm">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2">
                        <Check
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/signup"
                    className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
                  >
                    Get started
                  </Link>
                </div>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
