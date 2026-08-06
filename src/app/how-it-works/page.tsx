import type { Metadata } from "next";
import { SectionLabel } from "@/components/ui/section-label";

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

const steps = [
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
];

export default function HowItWorks() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionLabel>How it works</SectionLabel>
        <h1 className="mt-6 max-w-2xl font-display text-4xl leading-tight tracking-[-0.02em] text-foreground sm:text-5xl">
          Three steps between you and a document you{" "}
          <span className="gradient-text">actually understand</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          From upload to review, the experience is fast and clear.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="gradient-bg flex h-11 w-11 items-center justify-center rounded-xl font-mono text-sm font-semibold text-white shadow-accent">
                {item.step}
              </span>
              <h2 className="mt-4 font-display text-2xl text-foreground">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <SectionLabel>Small print, translated</SectionLabel>
          <h2 className="mt-6 font-display text-3xl leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
            The sentence a contract hides
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            This is the kind of sentence a contract hides in a sea of
            paragraphs. This is what ClauseIt makes of it.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground">
                What the document says
              </h3>
              <p className="mt-4 leading-7 text-foreground">
                The borrower shall not terminate this agreement prior to the
                expiry of the lock-in period of thirty-six months without payment
                of a foreclosure charge amounting to four percent of the
                principal outstanding, which charge shall be recoverable
                forthwith.
              </p>
            </div>
            <div className="relative rounded-2xl bg-gradient-to-br from-accent to-accent-secondary p-[2px] shadow-accent-lg">
              <div className="h-full rounded-2xl bg-card p-6">
                <h3 className="font-mono text-sm uppercase tracking-[0.15em] text-accent">
                  What it means
                </h3>
                <ul className="mt-4 space-y-3 leading-7 text-foreground">
                  <li>
                    You are locked in for 3 years. Ending the loan early is
                    possible, but it costs you 4% of the amount still owed.
                  </li>
                  <li>
                    On a 10 lakh loan, that penalty is roughly 40,000 rupees. It
                    is charged immediately.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionLabel>FAQ</SectionLabel>
        <h2 className="mt-6 font-display text-3xl leading-tight tracking-[-0.02em] text-foreground sm:text-4xl">
          Common questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="rounded-xl border border-border bg-card px-6 py-5 shadow-sm open:border-accent/40"
            >
              <summary className="cursor-pointer font-semibold text-foreground">
                {faq.q}
              </summary>
              <p className="mt-3 leading-7 text-muted-foreground">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
