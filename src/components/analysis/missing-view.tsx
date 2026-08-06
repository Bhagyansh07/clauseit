import Link from "next/link";
import { ArrowRight, FileUp } from "lucide-react";

export function MissingView() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <span className="gradient-bg mx-auto flex h-16 w-16 items-center justify-center rounded-2xl shadow-accent-lg">
        <FileUp className="h-7 w-7 text-white" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-display text-3xl tracking-[-0.02em] text-foreground">
        No analysis found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        This analysis was not found. It may have been opened in a different
        browser or the result has expired.
      </p>
      <Link
        href="/upload"
        className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground shadow-accent transition-all hover:-translate-y-0.5 hover:shadow-accent-lg"
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
