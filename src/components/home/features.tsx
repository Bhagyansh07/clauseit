import {
  CalendarClock,
  IndianRupee,
  Languages,
  ScanSearch,
  ShieldAlert,
  FileText,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const features = [
  {
    icon: ScanSearch,
    title: "Hidden clause detection",
    text: "Auto-renewal, one-sided liability, and jurisdiction traps are pulled out and shown in plain words.",
  },
  {
    icon: IndianRupee,
    title: "Charges and penalties",
    text: "Every fee, penalty, and EMI amount becomes a simple table with a plain explanation of when it applies.",
  },
  {
    icon: ShieldAlert,
    title: "Risk score",
    text: "A gauge that tells you how careful to be before you sign.",
  },
  {
    icon: CalendarClock,
    title: "Key dates",
    text: "Renewal dates, notice periods, and deadlines extracted so you never miss a cancel window.",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Every result is written in both languages. Switch with one click.",
  },
  {
    icon: FileText,
    title: "Works with anything",
    text: "PDF, Word, plain text, or a photo you took of the page with your phone.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <FadeIn>
          <SectionLabel>Features</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            What ClauseIt <span className="text-gold">highlights</span> for you
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            The analysis is built around the details people usually miss: hidden
            clauses, unfair charges, automatic renewals, and deadlines that
            matter.
          </p>
        </FadeIn>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.06 * i}>
            <div className="h-full rounded border border-line bg-paper p-6 shadow-paper transition-transform duration-200 hover:-translate-y-0.5">
              <feature.icon className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-ink-soft">{feature.text}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
