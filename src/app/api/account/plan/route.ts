import { NextRequest, NextResponse } from "next/server";
import { AuthError, getSessionUser, updateUserPlan } from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ error: "Log in to change your plan." }, { status: 401 });
  }

  try {
    const body = (await req.json().catch(() => null)) as { plan?: string } | null;
    const plan = body?.plan ?? "";

    await updateUserPlan(user.id, plan as "free" | "pro" | "premium");
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
