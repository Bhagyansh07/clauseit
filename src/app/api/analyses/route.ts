import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, listAnalyses } from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ error: "Log in to view your analyses." }, { status: 401 });
  }

  const analyses = await listAnalyses(user.id);
  return NextResponse.json({ analyses });
}
