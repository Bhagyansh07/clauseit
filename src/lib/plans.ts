import type { Plan } from "@/lib/auth-types";

/**
 * Single source of truth for plan limits and display names.
 *
 * Both the client hook (lib/auth.ts) and the server helpers
 * (lib/auth-server.ts) re-export from here, so the quota shown in the
 * dashboard can never drift from the quota the API enforces.
 */
export const PLAN_LIMITS: Record<Plan, number> = {
  free: 10,
  pro: 100,
  premium: 9999,
};

export const PLAN_NAMES: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
};
