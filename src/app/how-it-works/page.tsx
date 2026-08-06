import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "Upload a document, ClauseIt reads every line, and you get a plain-language summary with flagged clauses and a risk score.",
};

const faqs = [
  {
    q: "What file types does ClauseIt accept?",
    a: "PDF, Word documents, plain text, and photos. If you have a physical document, take a clear photo of it with your phone and upload that.",
  },
  {
    q: "Does it really read the small print?",
    a: "Yes. ClauseIt reads the full text of your document, not just the headings. The clauses most people skim past are exactly the ones we flag.",
  },
  {
    q: "Is my document private?",
    a: "Your document is used only to produce your analysis. We do not store the raw file unless you choose to save it, and access is locked to your account.",
  },
  {
    q: "Do I need a lawyer to understand the output?",
    a: "No. The whole point is that the analysis is in plain language. For premium users, a lawyer review is on the way as an optional extra.",
  },
  {
    q: "Is there a free plan?",
    a: "Yes. Free accounts get 10 analyses per month. Pro and Premium remove that limit and add features like report download.",
  },
];

export default function HowItWorks() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
            How ClauseIt works
          </h1>
          <p className="mt-4 text-lg text-muted">
            Three steps between you and a document you actually understand.
          </p>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {[
            {
              step: "01",
              title: "Upload",
              text: "Drop a PDF or Word file, paste text, or scan a page with your camera. Files up to 10MB.",
            },
            {
              step: "02",
              title: "We read every line",
              text: "The full text is analysed, including terms buried in small print and clauses written to be overlooked.",
            },
            {
              step: "03",
              title: "You get the truth",
              text: "A plain-language summary, hidden clauses and charges flagged, a risk score, and key dates. In English or Hindi.",
            },
          ].map((item) => (
            <div key={item.step} className="border-t-2 border-gold pt-6">
              <span className="font-display text-sm font-semibold text-gold">
                Step {item.step}
              </span>
              <h2 className="mt-2 font-display text-2xl font-semibold text-navy">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <h2 className="font-display text-3xl font-semibold text-navy">
            Small print, translated
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            This is the kind of sentence a contract hides in a sea of paragraphs.
            This is what ClauseIt makes of it.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-line bg-paper p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
                What the document says
              </h3>
              <p className="mt-4 leading-7 text-ink">
                The borrower shall not terminate this agreement prior to the expiry
                of the lock-in period of thirty-six months without payment of a
                foreclosure charge amounting to four percent of the principal
                outstanding, which charge shall be recoverable forthwith.
              </p>
            </div>
            <div className="rounded-xl border border-gold bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gold">
                What it means
              </h3>
              <ul className="mt-4 space-y-3 leading-7 text-ink">
                <li>
                  You are locked in for 3 years. Ending the loan early is possible,
                  but it costs you 4% of the amount still owed.
                </li>
                <li>
                  On a 10 lakh loan, that penalty is roughly 40,000 rupees. It is
                  charged immediately.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="font-display text-3xl font-semibold text-navy">
          Common questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-xl border border-line bg-white px-6 py-5"
            >
              <summary className="cursor-pointer font-semibold text-navy">
                {faq.q}
              </summary>
              <p className="mt-3 leading-7 text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
