"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const enter = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-40 top-32 h-[420px] w-[420px] rounded-full bg-accent-secondary/10 blur-[150px]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-28">
        <div>
          <motion.div {...enter} transition={{ duration: 0.7, ease: EASE }}>
            <div className="inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent/5 px-5 py-2">
              <span className="h-2 w-2 animate-pulse-dot rounded-full bg-accent" />
              <span className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-accent">
                ClauseIt · India-first document review
              </span>
            </div>
          </motion.div>

          <motion.h1
            {...enter}
            transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
            className="mt-6 font-display text-4xl leading-[1.1] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl xl:text-[5.25rem]"
          >
            Understand the document before you{" "}
            <span className="relative whitespace-nowrap">
              <span className="gradient-text">sign it</span>
              <span className="gradient-underline" aria-hidden="true" />
            </span>
          </motion.h1>

          <motion.p
            {...enter}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
          >
            ClauseIt turns loan agreements, insurance policies, rent contracts,
            and job offers into plain English — with hidden clauses, unfair
            charges, and key dates called out clearly.
          </motion.p>

          <motion.div
            {...enter}
            transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/upload"
              className="group gradient-bg inline-flex h-14 items-center justify-center gap-2 rounded-xl px-7 text-base font-semibold text-accent-foreground shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg active:scale-[0.98]"
            >
              Analyze your document
              <ArrowRight
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-14 items-center justify-center rounded-xl border border-border bg-white px-7 text-base font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
            >
              See how it works
            </Link>
          </motion.div>

          <motion.div
            {...enter}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-muted-foreground"
          >
            <span>PDF · Word · text · photos</span>
            <span>English + Hindi output</span>
            <span>Free: 10 / month</span>
          </motion.div>
        </div>

        <motion.div
          {...enter}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/25 animate-spin-slow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accent/10 to-accent-secondary/10 blur-2xl"
          />

          <div
            aria-label="Example of a ClauseIt analysis"
            className="relative mx-auto max-w-md animate-float rounded-2xl border border-border bg-card p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Sample analysis
              </p>
              <span className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-xs text-accent">
                EN · हिंदी
              </span>
            </div>
            <div className="mt-5 flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-amber-400 bg-amber-50">
                <div>
                  <p className="text-center font-display text-2xl text-foreground">
                    6
                  </p>
                  <p className="text-center text-[10px] uppercase tracking-wide text-muted-foreground">
                    Risk
                  </p>
                </div>
              </div>
              <div>
                <p className="font-display text-lg text-foreground">
                  Moderate risk
                </p>
                <p className="text-sm leading-6 text-muted-foreground">
                  4 clauses and 2 charges to review before you sign.
                </p>
              </div>
            </div>
            <ul className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
              <li className="flex gap-3">
                <ShieldAlert
                  className="mt-0.5 h-5 w-5 shrink-0 text-red-600"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Auto-renewal:
                  </strong>{" "}
                  rent increases 8% every year unless you cancel in writing.
                </span>
              </li>
              <li className="flex gap-3">
                <CalendarClock
                  className="mt-0.5 h-5 w-5 shrink-0 text-amber-600"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Deadline:
                  </strong>{" "}
                  exit penalty waived only if you notify 60 days ahead.
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">
                  <strong className="font-semibold text-foreground">
                    Deposit:
                  </strong>{" "}
                  Rs. 20,000 refundable within 14 days of vacating.
                </span>
              </li>
            </ul>
          </div>

          <div className="absolute -right-4 -top-6 animate-float-delayed rounded-xl border border-border bg-card px-4 py-3 shadow-lg">
            <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
              Scan
            </p>
            <p className="text-sm font-semibold text-foreground">
              Photo → analysis
            </p>
          </div>

          <div className="gradient-bg absolute -bottom-6 -left-6 flex h-24 w-24 items-center justify-center rounded-2xl shadow-accent-lg">
            <span className="font-display text-3xl text-white">/</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
