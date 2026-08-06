"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  FileText,
  FileUp,
  ShieldAlert,
  Sparkles,
  User,
} from "lucide-react";
import { getCurrentUser, getFreeUsageCount, getUserAnalyses, type SavedAnalysis } from "@/lib/auth";

const MONTHLY_LIMIT = 10;

const RISK_META: Record<string, { badge: string; dot: string }> = {
  low: { badge: "bg-sage-soft text-sage", dot: "bg-sage" },
  medium: { badge: "bg-amber-soft text-amber", dot: "bg-amber" },
  high: { badge: "bg-red-soft text-red", dot: "bg-red" },
  unknown: { badge: "bg-parchment text-ink-soft", dot: "bg-ink-soft" },
};

function riskMeta(level: string) {
  return RISK_META[level] ?? RISK_META.unknown;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const currentUser = getCurrentUser();
      setUser(currentUser);

      if (!currentUser) {
        setAnalyses([]);
        setUsage(0);
        return;
      }

      setAnalyses(getUserAnalyses(currentUser.id));
      setUsage(getFreeUsageCount(currentUser.id));
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-line bg-paper p-8 text-center shadow-paper">
          <h1 className="font-display text-3xl font-bold text-navy">Your dashboard</h1>
          <p className="mt-3 text-ink-soft">Log in to see your analysis history and usage.</p>
          <Link
            href="/login"
            className="gradient-bg mt-6 inline-block rounded-xl px-6 py-3 font-semibold text-white shadow-glow transition-all hover:brightness-110"
          >
            Log in
          </Link>
        </div>
      </section>
    );
  }

  const firstName = user.name.trim().split(/\s+/)[0] || "there";
  const used = Math.min(usage, MONTHLY_LIMIT);
  const remaining = Math.max(MONTHLY_LIMIT - usage, 0);
  const usedPct = Math.min((used / MONTHLY_LIMIT) * 100, 100);
  const highest = analyses.reduce((max, item) => Math.max(max, item.riskScore ?? 0), 0);

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-violet">
            Dashboard
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
            Welcome back, {firstName}
          </h1>
          <p className="mt-2 text-ink-soft">
            {user.email} ·{" "}
            <span className="font-semibold capitalize text-navy">{user.plan}</span> plan
          </p>
        </div>
        <Link
          href="/upload"
          className="gradient-bg inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
        >
          <FileUp className="h-4 w-4" aria-hidden="true" />
          New analysis
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper shadow-paper">
        <div className="flex flex-col gap-6 border-b border-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
              Monthly limit · Free plan
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-navy">
              {remaining}
              <span className="text-lg font-semibold text-ink-soft"> / {MONTHLY_LIMIT} left</span>
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              You have used {usage} of {MONTHLY_LIMIT} analyses this month.
            </p>
          </div>
          {remaining === 0 ? (
            <div className="shrink-0 rounded-xl border border-red/30 bg-red-soft px-4 py-3 text-sm font-semibold text-red">
              Monthly limit reached
            </div>
          ) : (
            <Link
              href="/pricing"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl border border-violet px-6 text-sm font-semibold text-violet transition-colors hover:bg-violet hover:text-white"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Upgrade for more
            </Link>
          )}
        </div>
        <div className="h-1.5 w-full bg-parchment">
          <div
            className="gradient-bg h-full transition-all duration-700"
            style={{ width: `${usedPct}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-line bg-paper p-5 shadow-paper">
          <span className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl text-white">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-3 font-display text-2xl font-bold text-navy">{analyses.length}</p>
          <p className="mt-1 text-sm text-ink-soft">Documents analyzed</p>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-5 shadow-paper">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-soft text-red">
            <ShieldAlert className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-3 font-display text-2xl font-bold text-navy">
            {analyses.length > 0 ? `${highest}/10` : "—"}
          </p>
          <p className="mt-1 text-sm text-ink-soft">Highest risk score</p>
        </div>
        <div className="rounded-2xl border border-line bg-paper p-5 shadow-paper">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-parchment text-violet">
            <User className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="mt-3 font-display text-2xl font-bold text-navy">
            {new Date(user.createdAt).toLocaleDateString(undefined, {
              month: "short",
              year: "numeric",
            })}
          </p>
          <p className="mt-1 text-sm text-ink-soft">Member since</p>
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-violet">
              History
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-navy">Recent analyses</h2>
          </div>
          {analyses.length > 0 && (
            <Link href="/upload" className="text-sm font-semibold text-violet hover:underline">
              Analyze another document
            </Link>
          )}
        </div>

        {analyses.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-line bg-paper p-8 text-center">
            <span className="gradient-bg mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-white">
              <FileText className="h-6 w-6" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-navy">No analyses yet</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
              Your documents will appear here with their risk score, flagged clauses, and key
              dates — so you can reopen any review anytime.
            </p>

            <div className="mx-auto mt-6 max-w-xl rounded-xl border border-dashed border-line bg-parchment p-4 text-left opacity-70">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-violet" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-navy">
                      Rent agreement — lock-in &amp; penalties
                    </p>
                    <p className="text-xs text-ink-soft">This is how your review will look</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-amber-soft px-2.5 py-0.5 text-xs font-semibold text-amber">
                    Medium
                  </span>
                  <span className="font-mono text-xs font-semibold text-navy">6/10</span>
                </div>
              </div>
            </div>

            <Link
              href="/upload"
              className="gradient-bg mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
            >
              <FileUp className="h-4 w-4" aria-hidden="true" />
              Analyze your first document
            </Link>
          </div>
        ) : (
          <ul className="mt-4 space-y-3">
            {analyses.map((item) => {
              const meta = riskMeta(item.riskLevel);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      sessionStorage.setItem(item.id, JSON.stringify(item.analysis));
                      router.push(`/analyze/${item.id}`);
                    }}
                    className="group flex w-full items-center gap-4 rounded-2xl border border-line bg-paper p-4 text-left shadow-paper transition-colors hover:border-violet sm:px-5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-parchment text-violet">
                      <FileText className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-navy">{item.title}</p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-soft">
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`hidden rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize sm:inline ${meta.badge}`}
                      >
                        {item.riskLevel}
                      </span>
                      <span className="font-mono text-sm font-bold text-navy">
                        {item.riskScore ?? "—"}/10
                      </span>
                      <ChevronRight
                        className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:text-violet"
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
