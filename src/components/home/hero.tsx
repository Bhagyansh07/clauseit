"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, CheckCircle2, ShieldAlert } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const enter = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="relative overflow-hidden bg-parchment">
      <div className="relative mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div {...enter} transition={{ duration: 0.7, ease: EASE }}>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-navy-light">
                ClauseIt · India-first document review
              </p>
            </motion.div>

            <motion.h1
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-5 font-display text-4xl font-semibold leading-[1.15] tracking-[-0.01em] text-navy sm:text-5xl"
            >
              Understand the document before you{" "}
              <span className="relative whitespace-nowrap text-gold">
                sign it
                <span className="verdict-underline" aria-hidden="true" />
              </span>
            </motion.h1>

            <motion.p
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-6 max-w-md text-lg leading-8 text-ink-soft"
            >
              ClauseIt turns loan agreements, insurance policies, rent contracts,
              and job offers into plain English and Hindi — with hidden clauses,
              unfair charges, and key dates called out clearly.
            </motion.p>

            <motion.div
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/login"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded border border-navy bg-navy px-6 text-base font-semibold text-paper transition-colors hover:bg-navy-light"
              >
                Analyze your document
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex h-12 items-center justify-center rounded border border-line bg-paper px-6 text-base font-semibold text-navy transition-colors hover:border-gold"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-ink-soft"
            >
              <span>PDF · Word · text · photos</span>
              <span>English + Hindi output</span>
              <span>Free: 10 / month</span>
            </motion.div>
          </div>

          <motion.div
            {...enter}
            transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
            aria-label="Example of a ClauseIt analysis"
            className="relative rounded border border-line bg-paper p-6 shadow-paper"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                Sample analysis
              </p>
              <span className="rounded border border-line px-2.5 py-0.5 font-mono text-xs text-navy">
                EN · हिंदी
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <svg viewBox="0 0 80 80" className="h-20 w-20 shrink-0 text-navy" aria-hidden="true">
                <circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="#B97D2B"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="120 201"
                  transform="rotate(-90 40 40)"
                />
                <text x="40" y="45" textAnchor="middle" fontSize="18" fontWeight="500" fill="#23211D">
                  6<tspan fontSize="10" dx="2">/10</tspan>
                </text>
              </svg>
              <div>
                <p className="font-display text-lg font-semibold text-navy">
                  Moderate risk
                </p>
                <p className="text-sm leading-6 text-ink-soft">
                  4 clauses and 2 charges to review before you sign.
                </p>
              </div>
            </div>

            <ul className="mt-5 space-y-3 border-t border-dashed border-line pt-5 text-sm">
              <li className="flex gap-3">
                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red" aria-hidden="true" />
                <span className="text-ink-soft">
                  <strong className="font-semibold text-ink">Auto-renewal:</strong>{" "}
                  rent increases 8% every year unless you cancel in writing.
                </span>
              </li>
              <li className="flex gap-3">
                <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                <span className="text-ink-soft">
                  <strong className="font-semibold text-ink">Deadline:</strong> exit
                  penalty waived only if you notify 60 days ahead.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sage" aria-hidden="true" />
                <span className="text-ink-soft">
                  <strong className="font-semibold text-ink">Deposit:</strong> Rs.
                  20,000 refundable within 14 days of vacating.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
