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
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded border border-line bg-paper p-8 text-center shadow-paper">
          <h1 className="font-display text-3xl font-semibold text-navy">Account</h1>
          <p className="mt-3 text-ink-soft">Log in to manage your plan and settings.</p>
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
        <h1 className="font-display text-3xl font-semibold text-navy">Account</h1>
        <p className="mt-3 text-ink-soft">
          Manage your ClauseIt account locally for now.
        </p>

        <div className="mt-8 rounded border border-line bg-parchment p-6">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">Profile</p>
          <p className="mt-2 text-xl font-semibold text-navy">{user.name}</p>
          <p className="mt-1 text-ink-soft">{user.email}</p>
        </div>

        <div className="mt-6 rounded border border-line bg-parchment p-6">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">Plan</p>
          <p className="mt-2 text-xl font-semibold text-navy">
            {planLabels[user.plan as Plan]}
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Free users get 10 analyses per month. Upgrade options are coming soon.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/dashboard"
            className="rounded border border-navy bg-navy px-5 py-3 font-semibold text-paper transition-colors hover:bg-navy-light"
          >
            Go to dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="rounded border border-line bg-paper px-5 py-3 font-semibold text-navy transition-colors hover:border-red hover:bg-red-soft hover:text-red"
          >
            Log out
          </button>
        </div>
      </div>
    </section>
  );
}
