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
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <FadeIn>
          <SectionLabel>How it works</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-5 max-w-2xl font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
            A simple process, built for{" "}
            <span className="text-gold">real decisions</span>
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
              <div className="h-full rounded border border-line bg-parchment p-6 shadow-paper">
                <span className="font-display text-4xl font-semibold text-gold">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">
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
