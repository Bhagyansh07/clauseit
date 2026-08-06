import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <FadeIn>
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
          Read it carefully before you{" "}
          <span className="text-gold">commit to it</span>
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
          Upload the document, review the plain-language breakdown, and decide
          with more confidence. Your first 10 analyses are free every month.
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded border border-navy bg-navy px-6 text-base font-semibold text-paper transition-colors hover:bg-navy-light"
          >
            Upload a document
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-12 items-center justify-center rounded border border-line bg-paper px-6 text-base font-semibold text-navy transition-colors hover:border-gold"
          >
            Create a free account
          </Link>
        </div>
      </FadeIn>
    </section>
  );
}
