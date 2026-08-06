import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ClauseIt handles the documents and data you upload.",
};

export default function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold text-navy">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last updated: August 2026
      </p>

      <div className="mt-10 space-y-8 leading-7 text-ink">
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            What we collect
          </h2>
          <p className="mt-3">
            When you upload a document, we read its text to produce your analysis.
            We collect your email and password (handled securely by our auth
            provider) to run your account.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            What we do not do
          </h2>
          <p className="mt-3">
            We do not sell your documents or your personal data. We do not keep the
            raw file of your document unless you explicitly choose to save it. Your
            analysis is visible only to you and only when you are logged in.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Processing
          </h2>
          <p className="mt-3">
            Documents are processed by our analysis provider solely to generate
            your report. Once processing is complete, the raw file is discarded
            unless you saved it.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Your rights
          </h2>
          <p className="mt-3">
            You can ask us to delete your account and all stored analyses at any
            time. Contact us at hello@clauseit.in.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-navy">
            Contact
          </h2>
          <p className="mt-3">
            Questions about this policy? Write to hello@clauseit.in.
          </p>
        </div>
      </div>
    </section>
  );
}
