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
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-navy">
          Fine print is designed to be missed
        </h2>
        <p className="mt-4 text-muted">
          In India, the terms that cost you money rarely sit on the first page.
          They hide in schedules, footnotes, and definitions. Real examples of
          what people find when the damage is already done:
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {examples.map((example) => (
          <div
            key={example.title}
            className="rounded-xl border border-line bg-white p-6"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
              {example.title}
            </p>
            <p className="mt-3 font-display text-lg leading-7 text-ink">
              &ldquo;{example.text}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
