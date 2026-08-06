"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, getFreeUsageCount, getUserAnalyses, type SavedAnalysis } from "@/lib/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);
  const [analyses, setAnalyses] = useState<SavedAnalysis[]>([]);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);

    if (!currentUser) {
      setAnalyses([]);
      setUsage(0);
      return;
    }

    const items = getUserAnalyses(currentUser.id);
    setAnalyses(items);
    setUsage(getFreeUsageCount(currentUser.id));
  }, []);

  if (!user) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="rounded-2xl border border-line bg-white p-8 text-center">
          <h1 className="font-display text-3xl font-semibold text-navy">Your dashboard</h1>
          <p className="mt-3 text-muted">Log in to see your analysis history and usage.</p>
          <Link href="/login" className="mt-6 inline-block rounded-lg bg-navy px-5 py-3 font-semibold text-paper">Log in</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="rounded-2xl border border-line bg-white p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">Dashboard</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-navy">Welcome back, {user.name}</h1>
            <p className="mt-2 text-muted">You are on the {user.plan} plan.</p>
          </div>
          <div className="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-muted">
            <p className="font-semibold text-navy">Free usage this month</p>
            <p>{usage} / 10 analyses</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Link href="/upload" className="rounded-xl border border-line bg-paper p-5 transition-colors hover:border-gold">
            <p className="font-semibold text-navy">Analyze a new document</p>
            <p className="mt-2 text-sm text-muted">Upload a PDF, Word file, or paste text and get a plain-language breakdown.</p>
          </Link>
          <Link href="/account" className="rounded-xl border border-line bg-paper p-5 transition-colors hover:border-gold">
            <p className="font-semibold text-navy">Account and billing</p>
            <p className="mt-2 text-sm text-muted">View your plan details and upgrade options.</p>
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold text-navy">Recent analyses</h2>
          {analyses.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-line bg-paper p-6 text-center text-sm text-muted">
              No analyses yet. Start with your first document.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {analyses.map((item) => (
                <div key={item.id} className="rounded-xl border border-line bg-paper p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-ink">{item.title}</p>
                      <p className="text-sm text-muted">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-sm text-muted">
                      Risk: <span className="font-semibold text-navy">{item.riskLevel}</span> ({item.riskScore}/10)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
