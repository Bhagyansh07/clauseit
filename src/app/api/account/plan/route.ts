import { NextRequest, NextResponse } from "next/server";
import { AuthError, getSessionUser, updateUserPlan } from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";
import { rateLimit, RateLimitError } from "@/lib/rate-limit";

export const runtime = "nodejs";

/**
 * Self-serve plan changes may only move a user *down* to Free.
 *
 * Paid plans are granted exclusively by the Razorpay webhook
 * (/api/payments/webhook) after a confirmed payment. Accepting a paid
 * plan here would let any logged-in user POST {plan:"premium"} and
 * unlock the Premium quota without paying, bypassing billing entirely.
 */
const SELF_SERVE_PLANS: readonly string[] = ["free"];

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ error: "Log in to change your plan." }, { status: 401 });
  }

  try {
    rateLimit(`plan:${user.id}`, 10, 10 * 60 * 1000);
  } catch (err) {
    if (err instanceof RateLimitError) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }
    return NextResponse.json(
      { error: "Could not change your plan right now. Try again shortly." },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json().catch(() => null)) as { plan?: string } | null;
    const plan = body?.plan ?? "";

    if (!SELF_SERVE_PLANS.includes(plan)) {
      return NextResponse.json(
        {
          error:
            "Paid plans activate only after payment. Use the checkout button on the pricing page.",
        },
        { status: 403 }
      );
    }

    await updateUserPlan(user.id, plan as "free");
    return NextResponse.json({ ok: true, plan });
  } catch (err) {
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Could not update your plan." },
      { status: 500 }
    );
  }
}
