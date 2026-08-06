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
    text: "Green, yellow, or red. One number that tells you how careful to be before you sign.",
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
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
      <div className="max-w-2xl">
        <FadeIn>
          <SectionLabel>Features</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 font-display text-3xl leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            What ClauseIt{" "}
            <span className="gradient-text">highlights</span> for you
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            The analysis is built around the details people usually miss: hidden
            clauses, unfair charges, automatic renewals, and deadlines that
            matter.
          </p>
        </FadeIn>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <FadeIn key={feature.title} delay={0.06 * i}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
              <span className="gradient-bg flex h-12 w-12 items-center justify-center rounded-xl shadow-accent transition-transform group-hover:scale-110">
                <feature.icon className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {feature.text}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
