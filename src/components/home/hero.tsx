"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, CalendarClock, CheckCircle2, ShieldAlert } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

function Counter({
  to,
  suffix = "",
}: {
  to: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    if (reduce) {
      raf = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const duration = 900;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="font-display text-3xl font-bold text-white sm:text-4xl">
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 10, suffix: "", label: "Free analyses every month" },
  { value: 2, suffix: "", label: "Languages — English & Hindi" },
  { value: 6, suffix: "+", label: "Document types supported" },
  { value: 100, suffix: "%", label: "Private — files not stored" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const enter = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section className="relative overflow-hidden bg-navy-solid">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet/40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-fuchsia/30 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div {...enter} transition={{ duration: 0.7, ease: EASE }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.12em] text-gold-bright">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright" />
                ClauseIt · India-first document review
              </span>
            </motion.div>

            <motion.h1
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl"
            >
              Understand the document before you{" "}
              <span className="gradient-text">sign it</span>
            </motion.h1>

            <motion.p
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="mt-6 max-w-md text-lg leading-8 text-white/75"
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
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-fuchsia px-7 text-base font-semibold text-white shadow-glow transition-all hover:brightness-110"
              >
                Analyze your document
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                See how it works
              </Link>
            </motion.div>

            <motion.div
              {...enter}
              transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wide text-white/50"
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
            className="relative rounded-2xl border border-line bg-paper p-6 shadow-seal sm:p-7"
          >
            <div className="flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wide text-ink-soft">
                Sample analysis
              </p>
              <span className="gradient-bg rounded-full px-3 py-0.5 font-mono text-xs text-white">
                EN · हिंदी
              </span>
            </div>

            <div className="mt-5 flex items-center gap-4">
              <svg viewBox="0 0 80 80" className="h-20 w-20 shrink-0" aria-hidden="true">
                <defs>
                  <linearGradient id="gauge" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#1F6F67" />
                    <stop offset="1" stopColor="#C18F3B" />
                  </linearGradient>
                </defs>
                <circle cx="40" cy="40" r="32" fill="none" className="stroke-line" strokeWidth="6" />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  fill="none"
                  stroke="url(#gauge)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="120 201"
                  transform="rotate(-90 40 40)"
                />
                <text
                  x="40"
                  y="45"
                  textAnchor="middle"
                  fontSize="18"
                  fontWeight="700"
                  className="fill-ink"
                >  6<tspan fontSize="10" dx="2">/10</tspan>
                </text>
              </svg>
              <div>
                <p className="font-display text-lg font-bold text-navy">
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

        <motion.div
          {...enter}
          transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:grid-cols-4 sm:p-8"
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <Counter to={stat.value} suffix={stat.suffix} />
              <p className="mt-1 text-sm text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
