"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CreditCard, LogOut, User } from "lucide-react";
import {
  getCurrentUser,
  getFreeUsageCount,
  logoutUser,
  type Plan,
} from "@/lib/auth";

const MONTHLY_LIMIT = 10;

const planLabels: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
};

export default function AccountPage() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);
  const [usage, setUsage] = useState(0);

  useEffect(() => {
    const t = window.setTimeout(() => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      if (currentUser) setUsage(getFreeUsageCount(currentUser.id));
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  function handleLogout() {
    logoutUser();
    setUser(null);
  }

  if (!user) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <div className="rounded-2xl border border-line bg-paper p-8 text-center shadow-paper">
          <h1 className="font-display text-3xl font-bold text-navy">Account</h1>
          <p className="mt-3 text-ink-soft">Log in to manage your plan and settings.</p>
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

  const used = Math.min(usage, MONTHLY_LIMIT);
  const remaining = Math.max(MONTHLY_LIMIT - usage, 0);
  const usedPct = Math.min((used / MONTHLY_LIMIT) * 100, 100);

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-violet">
            Account
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
            Account settings
          </h1>
          <p className="mt-2 text-ink-soft">Manage your profile, plan, and usage.</p>
        </div>
        <Link
          href="/dashboard"
          className="gradient-bg inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
        >
          Go to dashboard
        </Link>
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-paper p-6 shadow-paper sm:p-8">
        <div className="flex items-center gap-4">
          <span className="gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-base font-bold text-white">
            {user.name
              .split(" ")
              .map((part) => part.charAt(0))
              .filter(Boolean)
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-xl font-bold text-navy">{user.name}</p>
            <p className="truncate text-sm text-ink-soft">{user.email}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-parchment p-5">
            <dt className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
              <User className="h-3.5 w-3.5 text-violet" aria-hidden="true" />
              Profile
            </dt>
            <dd className="mt-3 text-sm leading-6 text-ink">
              Signed in as <span className="font-semibold text-navy">{user.name}</span>.
              Billing and payment details can be added here once payments go live.
            </dd>
          </div>
          <div className="rounded-2xl border border-line bg-parchment p-5">
            <dt className="flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
              <CreditCard className="h-3.5 w-3.5 text-violet" aria-hidden="true" />
              Plan
            </dt>
            <dd className="mt-3 text-sm leading-6 text-ink">
              You are on the{" "}
              <span className="font-semibold capitalize text-navy">
                {planLabels[user.plan as Plan]}
              </span>{" "}
              plan. Free users get 10 analyses per month. Upgrade options are coming soon.
            </dd>
          </div>
        </dl>

        <div className="mt-6 rounded-2xl border border-line bg-parchment p-5">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-soft">
              Monthly usage
            </p>
            <p className="font-mono text-sm font-bold text-navy">
              {remaining} left / {MONTHLY_LIMIT}
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full rounded-full bg-line/60">
            <div
              className="gradient-bg h-full rounded-full transition-all duration-700"
              style={{ width: `${usedPct}%` }}
            />
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Used {usage} of {MONTHLY_LIMIT} analyses this month. Resets on the 1st.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-violet px-5 text-sm font-semibold text-violet transition-colors hover:bg-violet hover:text-white"
          >
            View plans
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 text-sm font-semibold text-navy transition-colors hover:border-red hover:bg-red-soft hover:text-red"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>
    </section>
  );
}
