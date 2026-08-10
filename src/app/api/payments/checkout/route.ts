import { NextRequest, NextResponse } from "next/server";
import {
  createRecurringOrder,
  razorpayConfigured,
  RazorpayError,
} from "@/lib/razorpay";
import { getSessionUser } from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ error: "Log in to upgrade." }, { status: 401 });
  }

  if (!razorpayConfigured()) {
    return NextResponse.json(
      { error: "Payments are not live yet. You can preview plans from the pricing page." },
      { status: 503 }
    );
  }

  const body = (await req.json().catch(() => null)) as { plan?: string } | null;
  const plan = body?.plan;

  if (plan !== "pro" && plan !== "premium") {
    return NextResponse.json({ error: "Pick a valid paid plan." }, { status: 400 });
  }

  try {
    const order = await createRecurringOrder({
      userId: user.id,
      plan,
      name: user.name,
      email: user.email,
    });
    return NextResponse.json({
      orderId: order.orderId,
      keyId: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      plan,
    });
  } catch (err) {
    if (err instanceof RazorpayError) {
      return NextResponse.json(
        { error: "Could not start payment. Please try again." },
        { status: 502 }
      );
    }
    return NextResponse.json(
      { error: "Could not start payment. Please try again." },
      { status: 500 }
    );
  }
}
