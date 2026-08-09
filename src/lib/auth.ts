"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { PublicUser } from "@/lib/auth-types";

export type { Plan, PublicUser, SavedAnalysis } from "@/lib/auth-types";

export const PLAN_LIMITS: Record<"free" | "pro" | "premium", number> = {
  free: 10,
  pro: 100,
  premium: 9999,
};

export const PLAN_NAMES: Record<"free" | "pro" | "premium", string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
};

interface MeResponse {
  user: PublicUser | null;
  usage: number;
}

async function fetchMe(): Promise<MeResponse> {
  const res = await fetch("/api/auth/me", { cache: "no-store" });
  if (!res.ok) return { user: null, usage: 0 };
  return (await res.json()) as MeResponse;
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
}

export function useUser() {
  const pathname = usePathname();
  const [user, setUser] = useState<PublicUser | null | undefined>(undefined);
  const [usage, setUsage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await fetchMe();
        if (cancelled) return;
        setUser(data.user);
        setUsage(data.usage ?? 0);
      } catch {
        if (cancelled) return;
        setUser(null);
        setUsage(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return { user, usage, loading };
}
