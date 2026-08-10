"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser, type Plan } from "@/lib/auth";

interface PlanCtaProps {
  plan: Plan;
  label: string;
  highlighted?: boolean;
}

export function PlanCta({ plan, label, highlighted = false }: PlanCtaProps) {
  const router = useRouter();
  const { user, loading } = useUser();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpgrade() {
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch("/api/account/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Could not update your plan.");
      }
      setMessage(`Preview switched to ${label}.`);
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Could not update your plan.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <span
        className={`block rounded-xl px-5 py-3 text-center font-semibold ${
          highlighted ? "bg-white/80 text-violet" : "border border-line bg-paper text-ink-soft"
        }`}
        aria-hidden="true"
      >
        ...
      </span>
    );
  }

  if (!user) {
    return (
      <Link
        href={plan === "free" ? "/signup" : "/signup"}
        className={`block rounded-xl px-5 py-3 text-center font-semibold transition-all ${
          highlighted
            ? "bg-white text-violet hover:bg-white/90"
            : "border border-violet text-violet hover:bg-violet hover:text-white"
        }`}
      >
        {plan === "free" ? "Start free" : label}
      </Link>
    );
  }

  if (user.plan === plan) {
    return (
      <span
        className={`block rounded-xl px-5 py-3 text-center font-semibold ${
          highlighted
            ? "bg-white/90 text-violet"
            : "border border-line bg-parchment text-ink-soft"
        }`}
      >
        Current plan
      </span>
    );
  }

  if (plan === "premium") {
    return (
      <Link
        href="/premium"
        className={`block rounded-xl px-5 py-3 text-center font-semibold transition-all ${
          highlighted
            ? "bg-white text-violet hover:bg-white/90"
            : "border border-violet text-violet hover:bg-violet hover:text-white"
        }`}
      >
        Choose Premium
      </Link>
    );
  }

  return (
    <span className="block">
      <button
        onClick={handleUpgrade}
        disabled={busy}
        className={`w-full rounded-xl px-5 py-3 text-center font-semibold transition-all disabled:opacity-60 ${
          highlighted
            ? "bg-white text-violet hover:bg-white/90"
            : "border border-violet text-violet hover:bg-violet hover:text-white"
        }`}
      >
        {busy ? "Switching..." : `Preview ${label}`}
      </button>
      {message ? (
        <span className="mt-3 block text-center text-xs text-ink-soft">{message}</span>
      ) : null}
    </span>
  );
}
