import { NextRequest, NextResponse } from "next/server";
import {
  AuthError,
  createSessionToken,
  createUser,
} from "@/lib/auth-server";
import { setSessionCookie } from "@/lib/session";
import { authLimits, rateLimit, RateLimitError } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as {
      name?: string;
      email?: string;
      password?: string;
    } | null;

    if (!body) {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const email = (body.email ?? "").trim();
    const keys = authLimits(req, email);
    rateLimit(keys.ipKey, 8, 10 * 60 * 1000);
    rateLimit(keys.emailKey, 5, 10 * 60 * 1000);

    const user = await createUser(
      body.name ?? "",
      email,
      body.password ?? ""
    );
    const token = await createSessionToken(user.id);
    const res = NextResponse.json({ user }, { status: 201 });
    setSessionCookie(res, token);
    return res;
  } catch (err) {
    if (err instanceof RateLimitError) {
      return NextResponse.json({ error: err.message }, { status: 429 });
    }
    if (err instanceof AuthError) {
      return NextResponse.json({ error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { error: "Could not create your account. Please try again." },
      { status: 500 }
    );
  }
}
