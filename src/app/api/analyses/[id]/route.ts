import { NextRequest, NextResponse } from "next/server";
import { getAnalysis, getSessionUser } from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ error: "Log in to view this analysis." }, { status: 401 });
  }

  const saved = await getAnalysis(user.id, id);
  if (!saved) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  return NextResponse.json({ analysis: saved.analysis });
}
