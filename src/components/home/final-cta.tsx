import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function FinalCta() {
  return (
    <section className="dot-pattern relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-accent/20 blur-[150px]" />
      <div className="relative mx-auto max-w-4xl px-4 py-28 text-center sm:px-6 lg:py-32">
        <FadeIn>
          <h2 className="font-display text-3xl leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Read it carefully before you{" "}
            <span className="gradient-text">commit to it</span>
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-background/70">
            Upload the document, review the plain-language breakdown, and decide
            with more confidence. Your first 10 analyses are free every month.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/upload"
              className="group gradient-bg inline-flex h-14 items-center justify-center gap-2 rounded-xl px-7 text-base font-semibold text-white shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg active:scale-[0.98]"
            >
              Upload a document
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-background/30 px-7 text-base font-semibold text-background transition-colors hover:bg-background/10"
            >
              Create a free account
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
