import Link from "next/link";
import {
  ScanSearch,
  IndianRupee,
  ShieldAlert,
  CalendarClock,
  Languages,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "Hidden clause detection",
    text: "We find the clauses written to be missed: auto-renewal, one-sided liability, jurisdiction traps.",
  },
  {
    icon: IndianRupee,
    title: "Charges and penalties",
    text: "Every fee, penalty, and EMI amount is pulled out into a simple table with a plain explanation.",
  },
  {
    icon: ShieldAlert,
    title: "Risk score",
    text: "Green, yellow, or red. A single number that tells you how careful you should be before signing.",
  },
  {
    icon: CalendarClock,
    title: "Key dates",
    text: "Renewal dates, notice periods, and deadlines extracted so you never miss a cancel window.",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Read the analysis in English or switch to Hindi with one click.",
  },
  {
    icon: ArrowRight,
    title: "Works with anything",
    text: "PDF, Word, plain text, or a photo you took of the page with your phone.",
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              ClauseIt
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
              Read the clauses, not the fine print.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/75">
              Upload any agreement, policy, or loan document. ClauseIt translates it
              into plain language and points out the hidden clauses and charges you
              were never meant to notice.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/upload"
                className="rounded-lg bg-gold px-6 py-3 text-center font-semibold text-navy transition-colors hover:bg-gold-dark"
              >
                Upload a document
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-lg border border-paper/30 px-6 py-3 text-center font-semibold text-paper transition-colors hover:bg-paper/10"
              >
                How it works
              </Link>
            </div>
            <p className="mt-6 text-sm text-paper/50">
              PDF, Word, or a photo of the page. English and Hindi.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold text-navy">
            What every document is hiding
          </h2>
          <p className="mt-4 text-muted">
            Loan agreements, insurance policies, and rent contracts are written to
            be understood by lawyers, not by the person signing them. ClauseIt
            changes that.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-line bg-white p-6"
            >
              <feature.icon className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-3">
            {[
              ["1", "Upload", "Drop the PDF, Word file, or a photo of the page. Takes five seconds."],
              ["2", "We read it", "Our analysis reads every line, including the ones in small print."],
              ["3", "You decide", "A plain-language summary, flagged clauses, charges, and a risk score."],
            ].map(([step, title, text]) => (
              <div key={step} className="flex gap-4">
                <span className="font-display text-5xl font-semibold text-gold/40">
                  {step}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy text-paper">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold">
            Have a document you do not trust?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-paper/75">
            Get the breakdown before you sign. Free for your first 10 documents
            every month.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-lg bg-gold px-6 py-3 font-semibold text-navy transition-colors hover:bg-gold-dark"
          >
            Get started free
          </Link>
        </div>
      </section>
    </>
  );
}
