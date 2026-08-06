import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of ClauseIt.",
};

export default function Terms() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold text-navy">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last updated: August 2026
      </p>

      <div className="mt-10 space-y-8 leading-7 text-ink">
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            What ClauseIt provides
          </h2>
          <p className="mt-3">
            ClauseIt produces plain-language summaries and flags within documents
            you upload. These outputs are informational and educational. They are
            not legal advice.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Not legal advice
          </h2>
          <p className="mt-3">
            Nothing on this service creates a lawyer-client relationship. For
            decisions that matter, consult a qualified lawyer. Premium lawyer
            review, when launched, will have its own terms.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Your responsibility
          </h2>
          <p className="mt-3">
            You confirm you have the right to share the documents you upload, and
            that you will not upload content that is illegal or infringes
            others&apos; rights.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Accounts and fair use
          </h2>
          <p className="mt-3">
            Free accounts are limited to 10 analyses per month. Automated or
            abusive use of the service is not allowed and may result in suspension.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Contact
          </h2>
          <p className="mt-3">
            Questions about these terms? Write to hello@clauseit.in.
          </p>
        </div>
      </div>
    </section>
  );
}
