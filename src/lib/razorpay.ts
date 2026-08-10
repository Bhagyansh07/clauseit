import { createHmac, timingSafeEqual } from "node:crypto";
import type { Plan } from "@/lib/auth-types";

const RAZORPAY_API = "https://api.razorpay.com/v1";

export const PLAN_PRICES: Record<Plan, number> = {
  free: 0,
  pro: 9900,
  premium: 59900,
};

export const PLAN_RECURRING_LABELS: Record<Plan, string> = {
  free: "₹0",
  pro: "₹99/month",
  premium: "₹599/month",
};

export class RazorpayError extends Error {}

export function razorpayConfigured(): boolean {
  return Boolean(
    process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
}

function auth(): { Authorization: string } {
  const key = process.env.RAZORPAY_KEY_ID ?? "";
  const secret = process.env.RAZORPAY_KEY_SECRET ?? "";
  return {
    Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString("base64")}`,
  };
}

export interface CreateOrderInput {
  userId: string;
  plan: Extract<Plan, "pro" | "premium">;
  name: string;
  email: string;
}

export async function createRecurringOrder(input: CreateOrderInput) {
  const amount = PLAN_PRICES[input.plan];
  const res = await fetch(`${RAZORPAY_API}/orders`, {
    method: "POST",
    headers: {
      ...auth(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      payment_capture: 1,
      recurring: 1,
      notes: { userId: input.userId, plan: input.plan },
      customer: { name: input.name, email: input.email },
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new RazorpayError(`Razorpay order failed (${res.status}): ${body.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    id: string;
    amount: number;
    currency: string;
  };
  return {
    orderId: data.id,
    amount: data.amount,
    currency: data.currency,
  };
}

export async function getOrderNotes(orderId: string): Promise<{
  userId?: string;
  plan?: string;
}> {
  const res = await fetch(`${RAZORPAY_API}/orders/${orderId}`, {
    headers: auth(),
  });
  if (!res.ok) return {};
  const data = (await res.json()) as { notes?: Record<string, string> };
  return data.notes ?? {};
}

export function verifyWebhookSignature(
  payload: string,
  signature: string | null
): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
