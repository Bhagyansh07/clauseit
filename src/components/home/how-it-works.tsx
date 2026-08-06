import { UploadCloud, ScanSearch, FileCheck2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const steps = [
  {
    icon: UploadCloud,
    step: "01",
    title: "Upload",
    text: "Drop the PDF, Word file, or a photo of the page. It takes five seconds. Nothing is stored.",
  },
  {
    icon: ScanSearch,
    step: "02",
    title: "We read it",
    text: "Every line is read, including schedules, footnotes, and the small print.",
  },
  {
    icon: FileCheck2,
    step: "03",
    title: "You decide",
    text: "A plain-language summary, flagged clauses, a full list of charges, and a risk score.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <SectionLabel>How it works</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            A simple process, built for{" "}
            <span className="gradient-text">real decisions</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            From upload to review, the experience is designed to be fast and
            clear — so you can get to the important points without reading the
            full document twice.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={0.1 * i}>
              <div className="group h-full rounded-2xl border border-line bg-parchment p-7 shadow-paper transition-transform duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <span className="gradient-bg flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-glow">
                    <s.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-display text-4xl font-bold text-violet/15">
                    {s.step}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{s.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
