import Link from "next/link";
import { FileUp } from "lucide-react";

export function MissingView() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-navy">
        No analysis found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        This analysis was not found. It may have been opened in a different
        browser or the result has expired.
      </p>
      <Link
        href="/upload"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-navy transition-colors hover:bg-gold-dark"
      >
        <FileUp className="h-5 w-5" aria-hidden="true" />
        Analyze a document
      </Link>
    </section>
  );
}
