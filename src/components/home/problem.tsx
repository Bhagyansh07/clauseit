import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const examples = [
  {
    title: "Home loan",
    text: "An 8% foreclosure charge printed on page 9, after a footnote telling you to 'see the schedule'.",
  },
  {
    title: "Health insurance",
    text: "A list of 40 excluded procedures hidden inside a three-line policy definition.",
  },
  {
    title: "Rent agreement",
    text: "An automatic 10% yearly increase with no exit clause until month 24.",
  },
  {
    title: "Job offer",
    text: "A 24-month service bond with a penalty equal to six months' salary.",
  },
];

export default function Problem() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-28">
      <div className="max-w-2xl">
        <FadeIn>
          <SectionLabel>The problem</SectionLabel>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="mt-6 font-display text-3xl leading-tight tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl">
            The most expensive terms are often the{" "}
            <span className="gradient-text">easiest to miss</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            In India, the clauses that cost people the most are often buried in
            schedules, footnotes, definitions, or tiny print. These are the kinds
            of terms people discover too late — after signing, paying, or
            renewing.
          </p>
        </FadeIn>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {examples.map((example, i) => (
          <FadeIn key={example.title} delay={0.08 * i}>
            <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-accent transition-all group-hover:w-12" />
                <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent">
                  {example.title}
                </p>
              </div>
              <p className="mt-3 font-display text-lg leading-7 text-foreground">
                &ldquo;{example.text}&rdquo;
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
