import Link from "next/link";
import { ArrowRight, FileUp } from "lucide-react";

export function MissingView() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-3xl font-bold text-navy">
        No analysis found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        This analysis was not found. It may have been opened in a different
        browser or the result has expired.
      </p>
      <Link
        href="/upload"
        className="gradient-bg group mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-white shadow-glow transition-all hover:brightness-110"
      >
        <FileUp className="h-5 w-5" aria-hidden="true" />
        Analyze a document
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </Link>
    </section>
  );
}
