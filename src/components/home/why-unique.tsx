import {
  Globe,
  Lock,
  Camera,
  Languages,
  Wallet,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const points = [
  {
    icon: Globe,
    title: "Built for India",
    text: "Made for loan, insurance, rent, and job documents. The terms that matter to Indian households, not generic templates.",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Both, on every result, written in simple language. No law-school vocabulary.",
  },
  {
    icon: Camera,
    title: "Works from a photo",
    text: "No printer, no scanner. Point your phone at the page and upload.",
  },
  {
    icon: Lock,
    title: "Your document is not stored",
    text: "Uploads are analyzed and discarded. We never keep a copy of your file by default.",
  },
  {
    icon: Wallet,
    title: "Free to start",
    text: "10 documents every month at no charge. No card required.",
  },
];

export default function WhyUnique() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <FadeIn>
          <SectionLabel>Why ClauseIt</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            Built for the way <span className="text-gold">real people</span>{" "}
            read documents
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            ClauseIt is designed around everyday decisions: signing a lease,
            accepting a policy, taking a loan, or reviewing a job offer. It is
            practical, direct, and built to make the risk obvious.
          </p>
        </FadeIn>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {points.map((point, i) => (
          <FadeIn key={point.title} delay={0.06 * i}>
            <div className="h-full rounded border border-line bg-paper p-6 shadow-paper">
              <div className="flex items-center gap-3">
                <point.icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-navy">
                  {point.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-soft">{point.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
