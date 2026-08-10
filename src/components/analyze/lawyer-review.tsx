"use client";

import Link from "next/link";
import { Scale } from "lucide-react";
import { useUser } from "@/lib/auth";

const expectations = [
  "A lawyer reads your document in full",
  "Plain-language notes on the clauses that matter",
  "A short email with their assessment",
];

export function LawyerReview() {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="mt-10 h-40 animate-pulse rounded-2xl border border-line bg-paper" />
    );
  }

  const unlocked = user?.plan === "premium";

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-line bg-paper shadow-paper">
      <div className="flex items-center gap-3 px-6 pt-6">
        <span className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl shadow-glow">
          <Scale className="h-5 w-5 text-white" aria-hidden="true" />
        </span>
        <h2 className="font-display text-xl font-semibold text-navy">
          Lawyer review
        </h2>
      </div>

      {unlocked ? (
        <div className="px-6 pb-6">
          <p className="mt-4 leading-7 text-ink">
            Your document has been queued for review. A lawyer will read it and
            post their notes here, usually within 24 hours.
          </p>
          <ul className="mt-5 space-y-3">
            {expectations.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-dashed border-gold bg-parchment px-5 py-4 text-sm text-ink-soft">
            Review coming soon. This is where your lawyer&apos;s notes will
            appear.
          </div>
        </div>
      ) : (
        <div className="px-6 pb-6">
          <p className="mt-4 leading-7 text-ink">
            A lawyer reads your document in full and leaves plain-language notes
            on the clauses that matter. Included with the Premium plan.
          </p>
          <Link
            href="/premium"
            className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gold px-5 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
          >
            Explore Premium
          </Link>
        </div>
      )}
    </section>
  );
}
