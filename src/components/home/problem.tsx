import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const examples = [
  {
    title: "Home loan",
    text: "An 8% foreclosure charge printed on page 9, after a footnote telling you to 'see the schedule'.",
    accent: "from-violet to-fuchsia",
  },
  {
    title: "Health insurance",
    text: "A list of 40 excluded procedures hidden inside a three-line policy definition.",
    accent: "from-fuchsia to-amber",
  },
  {
    title: "Rent agreement",
    text: "An automatic 10% yearly increase with no exit clause until month 24.",
    accent: "from-amber to-violet",
  },
  {
    title: "Job offer",
    text: "A 24-month service bond with a penalty equal to six months' salary.",
    accent: "from-fuchsia to-violet",
  },
];

export default function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="max-w-2xl">
        <FadeIn>
          <SectionLabel>The problem</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
            The most expensive terms are often the{" "}
            <span className="gradient-text">easiest to miss</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-4 text-lg leading-8 text-ink-soft">
            In India, the clauses that cost people the most are often buried in
            schedules, footnotes, definitions, or tiny print. These are the kinds
            of terms people discover too late — after signing, paying, or
            renewing.
          </p>
        </FadeIn>
      </div>
      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {examples.map((example, i) => (
          <FadeIn key={example.title} delay={0.08 * i}>
            <div className="h-full overflow-hidden rounded-2xl border border-line bg-paper shadow-paper transition-transform duration-200 hover:-translate-y-1">
              <div
                className={`bg-gradient-to-r ${example.accent} h-1.5`}
                aria-hidden="true"
              />
              <div className="p-6">
                <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-violet">
                  {example.title}
                </p>
                <p className="mt-3 font-display text-lg leading-7 text-ink">
                  &ldquo;{example.text}&rdquo;
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
