import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/fade-in";

export default function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <FadeIn>
        <div className="relative overflow-hidden rounded-3xl bg-navy-solid px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet/40 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 h-64 w-64 rounded-full bg-fuchsia/40 blur-[100px]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              Read it carefully before you{" "}
              <span className="gradient-text">commit to it</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
              Upload the document, review the plain-language breakdown, and decide
              with more confidence. Your first 10 analyses are free every month.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-fuchsia px-7 text-base font-semibold text-white shadow-glow transition-all hover:brightness-110"
              >
                Upload a document
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                Create a free account
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
