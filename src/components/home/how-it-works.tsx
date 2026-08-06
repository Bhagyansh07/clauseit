import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const steps = [
  {
    step: "1",
    title: "Upload",
    text: "Drop the PDF, Word file, or a photo of the page. It takes five seconds. Nothing is stored.",
  },
  {
    step: "2",
    title: "We read it",
    text: "Every line is read, including schedules, footnotes, and the small print.",
  },
  {
    step: "3",
    title: "You decide",
    text: "A plain-language summary, flagged clauses, a full list of charges, and a risk score.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
        <FadeIn>
          <SectionLabel>How it works</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            A simple process, built for{" "}
            <span className="gradient-text">real decisions</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            From upload to review, the experience is designed to be fast and
            clear — so you can get to the important points without reading the
            full document twice.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-6">
          {steps.map((s, i) => (
            <FadeIn key={s.step} delay={0.1 * i}>
              <div className="relative flex h-full gap-5">
                <div className="flex flex-col items-center">
                  <span className="gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-mono text-lg font-semibold text-white shadow-accent">
                    {s.step}
                  </span>
                  {i < steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-3 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-accent/40 to-transparent lg:block"
                    />
                  )}
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {s.text}
                  </p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-8 top-4 hidden h-5 w-5 text-accent lg:block"
                  />
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
