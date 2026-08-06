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
    chip: "from-violet to-fuchsia",
  },
  {
    icon: IndianRupee,
    title: "Charges and penalties",
    text: "Every fee, penalty, and EMI amount becomes a simple table with a plain explanation of when it applies.",
    chip: "from-amber to-fuchsia",
  },
  {
    icon: ShieldAlert,
    title: "Risk score",
    text: "A gauge that tells you how careful to be before you sign.",
    chip: "from-fuchsia to-violet",
  },
  {
    icon: CalendarClock,
    title: "Key dates",
    text: "Renewal dates, notice periods, and deadlines extracted so you never miss a cancel window.",
    chip: "from-violet to-amber",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Every result is written in both languages. Switch with one click.",
    chip: "from-fuchsia to-amber",
  },
  {
    icon: FileText,
    title: "Works with anything",
    text: "PDF, Word, plain text, or a photo you took of the page with your phone.",
    chip: "from-amber to-violet",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <FadeIn>
          <SectionLabel>Features</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            What ClauseIt <span className="gradient-text">highlights</span> for you
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
            <div className="h-full rounded-2xl border border-line bg-white p-6 shadow-paper transition-transform duration-200 hover:-translate-y-1">
              <span
                className={`bg-gradient-to-br ${feature.chip} flex h-11 w-11 items-center justify-center rounded-xl text-white`}
              >
                <feature.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">
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
