import { NextRequest, NextResponse } from "next/server";
import { clearSessionCookie, SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  if (req.cookies.get(SESSION_COOKIE)) {
    clearSessionCookie(res);
  }
  return res;
}
