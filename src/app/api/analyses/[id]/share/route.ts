import { NextRequest, NextResponse } from "next/server";
import {
  getAnalysis,
  getSessionUser,
  getShareTokenForAnalysis,
} from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return NextResponse.json({ error: "Log in to share an analysis." }, { status: 401 });
  }

  const { id } = await params;
  const saved = await getAnalysis(user.id, id);
  if (!saved) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  const token = await getShareTokenForAnalysis(user.id, id);
  if (!token) {
    return NextResponse.json(
      { error: "Could not create a share link." },
      { status: 500 }
    );
  }

  const origin = process.env.NEXT_PUBLIC_APP_URL ?? new URL(req.url).origin;
  return NextResponse.json({ url: `${origin}/share/${token}` });
}
