"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileUp, User } from "lucide-react";
import { getCurrentUser, getFreeUsageCount, getUserAnalyses, type SavedAnalysis } from "@/lib/auth";

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
        <div className="rounded border border-line bg-paper p-8 text-center shadow-paper">
          <h1 className="font-display text-3xl font-semibold text-navy">Your dashboard</h1>
          <p className="mt-3 text-ink-soft">Log in to see your analysis history and usage.</p>
          <Link
            href="/login"
            className="mt-6 inline-block rounded border border-navy bg-navy px-6 py-3 font-semibold text-paper transition-colors hover:bg-navy-light"
          >
            Log in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="rounded border border-line bg-paper p-8 shadow-paper">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
              Dashboard
            </p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy">
              Welcome back, {user.name}
            </h1>
            <p className="mt-2 text-ink-soft">
              {user.email} · You are on the {user.plan} plan.
            </p>
          </div>
          <div className="rounded border border-line bg-parchment px-4 py-3 text-sm text-ink-soft">
            <p className="font-semibold text-navy">Free usage this month</p>
            <p>
              {usage} / 10 analyses
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/upload"
            className="group rounded border border-line bg-parchment p-5 transition-colors hover:border-gold"
          >
            <FileUp className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="mt-2 font-semibold text-navy">Analyze a new document</p>
            <p className="mt-2 text-sm text-ink-soft">
              Upload a PDF, Word file, or paste text and get a plain-language breakdown.
            </p>
          </Link>
          <Link
            href="/account"
            className="group rounded border border-line bg-parchment p-5 transition-colors hover:border-gold"
          >
            <User className="h-5 w-5 text-gold" aria-hidden="true" />
            <p className="mt-2 font-semibold text-navy">Account and billing</p>
            <p className="mt-2 text-sm text-ink-soft">
              View your plan details and upgrade options.
            </p>
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold text-navy">Recent analyses</h2>
          {analyses.length === 0 ? (
            <div className="mt-4 rounded border border-dashed border-line bg-parchment p-6 text-center text-sm text-ink-soft">
              No analyses yet. Start with your first document.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {analyses.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    sessionStorage.setItem(item.id, JSON.stringify(item.analysis));
                    router.push(`/analyze/${item.id}`);
                  }}
                  className="w-full rounded border border-line bg-parchment p-4 text-left transition-colors hover:border-gold"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-navy">{item.title}</p>
                      <p className="text-sm text-ink-soft">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="text-sm text-ink-soft">
                      Risk:{" "}
                      <span className="font-semibold text-navy">
                        {item.riskLevel}
                      </span>{" "}
                      ({item.riskScore}/10)
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
