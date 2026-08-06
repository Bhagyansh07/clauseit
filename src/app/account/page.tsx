"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser, type Plan } from "@/lib/auth";

const planLabels: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
};

export default function AccountPage() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setUser(getCurrentUser()), 0);
    return () => window.clearTimeout(t);
  }, []);

  function handleLogout() {
    logoutUser();
    setUser(null);
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-display text-3xl tracking-[-0.02em] text-foreground">Account</h1>
          <p className="mt-3 text-muted-foreground">Log in to manage your plan and settings.</p>
          <Link href="/login" className="gradient-bg mt-6 inline-block rounded-xl px-5 py-3 font-semibold text-white shadow-accent">Log in</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="font-display text-3xl tracking-[-0.02em] text-foreground">Account</h1>
        <p className="mt-3 text-muted-foreground">Manage your ClauseIt account locally for now.</p>

        <div className="mt-8 rounded-xl border border-border bg-muted p-6">
          <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent">Profile</p>
          <p className="mt-2 text-xl font-semibold text-foreground">{user.name}</p>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-muted p-6">
          <p className="font-mono text-sm uppercase tracking-[0.15em] text-accent">Plan</p>
          <p className="mt-2 text-xl font-semibold text-foreground">{planLabels[user.plan as Plan]}</p>
          <p className="mt-2 text-sm text-muted-foreground">Free users get 10 analyses per month. Upgrade options are coming soon.</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/dashboard" className="gradient-bg rounded-xl px-5 py-3 font-semibold text-white shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg">Go to dashboard</Link>
          <button onClick={handleLogout} className="rounded-xl border border-border px-5 py-3 font-semibold text-foreground transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700">Log out</button>
        </div>
      </div>
    </section>
  );
}
