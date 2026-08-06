"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-display text-3xl tracking-[-0.02em] text-foreground">Your dashboard</h1>
          <p className="mt-3 text-muted-foreground">Log in to see your analysis history and usage.</p>
          <Link href="/login" className="gradient-bg mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white shadow-accent">Log in</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent">Dashboard</p>
            <h1 className="mt-2 font-display text-3xl tracking-[-0.02em] text-foreground">Welcome back, {user.name}</h1>
            <p className="mt-2 text-muted-foreground">You are on the {user.plan} plan.</p>
          </div>
          <div className="rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">Free usage this month</p>
            <p>{usage} / 10 analyses</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Link href="/upload" className="group rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
            <p className="font-semibold text-foreground">Analyze a new document</p>
            <p className="mt-2 text-sm text-muted-foreground">Upload a PDF, Word file, or paste text and get a plain-language breakdown.</p>
          </Link>
          <Link href="/account" className="group rounded-xl border border-border bg-background p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
            <p className="font-semibold text-foreground">Account and billing</p>
            <p className="mt-2 text-sm text-muted-foreground">View your plan details and upgrade options.</p>
          </Link>
        </div>

        <div className="mt-10">
          <h2 className="font-display text-xl text-foreground">Recent analyses</h2>
          {analyses.length === 0 ? (
            <div className="mt-4 rounded-xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
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
                  className="w-full rounded-xl border border-border bg-background p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Risk: <span className="font-semibold text-accent">{item.riskLevel}</span> ({item.riskScore}/10)
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
