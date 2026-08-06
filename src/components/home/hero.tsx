import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-navy text-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">
            ClauseIt
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Read the clauses,{" "}
            <span className="highlight-stroke">not the fine print.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-paper/75">
            Upload any loan, insurance, rent, or job document. ClauseIt
            translates it into plain language, flags the clauses written to be
            missed, and shows you the charges and deadlines that matter before
            you sign.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/upload"
              className="rounded-lg bg-gold px-6 py-3 text-center font-semibold text-navy transition-colors hover:bg-gold-dark"
            >
              Analyze your document
              <ArrowRight className="ml-2 inline h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/how-it-works"
              className="rounded-lg border border-paper/30 px-6 py-3 text-center font-semibold text-paper transition-colors hover:bg-paper/10"
            >
              See how it works
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/60">
            <span>PDF, Word, or a phone photo</span>
            <span>English and Hindi</span>
            <span>10 documents free every month</span>
          </div>
        </div>

        <div
          aria-label="Example of a ClauseIt analysis"
          className="rounded-2xl border border-paper/10 bg-paper p-6 text-ink shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-muted">Sample analysis</p>
            <span className="rounded-full bg-gold/15 px-3 py-1 text-xs font-semibold text-gold-dark">
              EN · हिंदी
            </span>
          </div>
          <div className="mt-5 flex items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-gold">
              <div>
                <p className="text-center font-display text-2xl font-semibold text-navy">
                  6
                </p>
                <p className="text-center text-[10px] uppercase tracking-wide text-muted">
                  Risk
                </p>
              </div>
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-navy">
                Moderate risk
              </p>
              <p className="text-sm leading-6 text-muted">
                4 clauses and 2 charges to review before you sign.
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
            <li className="flex gap-3">
              <ShieldAlert
                className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-ink">Auto-renewal:</strong>{" "}
                rent increases 8% every year unless you cancel in writing.
              </span>
            </li>
            <li className="flex gap-3">
              <CalendarClock
                className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-ink">Deadline:</strong> exit
                penalty waived only if you notify 60 days ahead.
              </span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                aria-hidden="true"
              />
              <span>
                <strong className="font-semibold text-ink">Deposit:</strong> Rs.
                20,000 refundable within 14 days of vacating.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
