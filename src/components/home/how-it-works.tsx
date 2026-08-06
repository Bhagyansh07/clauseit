export default function HowItWorks() {
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
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.step} className="flex gap-4">
              <span className="font-display text-5xl font-semibold text-gold/40">
                {s.step}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-navy">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
