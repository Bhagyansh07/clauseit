import { NextRequest, NextResponse } from "next/server";
import { getOrderNotes, verifyWebhookSignature } from "@/lib/razorpay";
import { updateUserPlan } from "@/lib/auth-server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-razorpay-signature");
  const raw = await req.text();

  if (!verifyWebhookSignature(raw, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let event: { event?: string; payload?: { order?: { entity?: { id?: string } } } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event.event !== "order.paid") {
    return NextResponse.json({ received: true });
  }

  const orderId = event.payload?.order?.entity?.id;
  if (!orderId) {
    return NextResponse.json({ error: "Missing order id." }, { status: 400 });
  }

  const notes = await getOrderNotes(orderId);
  const userId = notes.userId;
  const plan = notes.plan;

  if (!userId || (plan !== "pro" && plan !== "premium")) {
    return NextResponse.json({ error: "Missing plan info." }, { status: 400 });
  }

  await updateUserPlan(userId, plan);
  return NextResponse.json({ received: true });
}
