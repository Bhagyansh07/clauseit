import { NextRequest, NextResponse } from "next/server";
import {
  AuthError,
  authenticateUser,
  createSessionToken,
} from "@/lib/auth-server";
import { setSessionCookie } from "@/lib/session";
import { authLimits, rateLimit, RateLimitError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      email?: string;
      password?: string;
    } | null;

    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const email = (body.email ?? "").trim();
    const keys = authLimits(req, email);
    rateLimit(keys.ipKey, 15, 15 * 60 * 1000);
    rateLimit(keys.emailKey, 8, 15 * 60 * 1000);

    const user = await authenticateUser(email, body.password ?? "");
    const token = await createSessionToken(user.id);
    const res = NextResponse.json({ user });
    setSessionCookie(res, token);
    return res;
  } catch (err) {
    if (err instanceof RateLimitError) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 401 });
    }
    return NextResponse.json(
      { error: "Could not log you in. Please try again." },
      { status: 500 }
    );
  }
}
