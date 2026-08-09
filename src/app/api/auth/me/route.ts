import { NextRequest, NextResponse } from "next/server";
import {
  countMonthlyAnalyses,
  getSessionUser,
} from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ user: null, usage: 0 });
  }

  const usage = await countMonthlyAnalyses(user.id);
  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      createdAt: user.createdAt,
    },
    usage,
  });
}
