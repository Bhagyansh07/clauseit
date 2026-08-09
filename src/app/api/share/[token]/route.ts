import { NextRequest, NextResponse } from "next/server";
import { getAnalysisByShareToken } from "@/lib/auth-server";
import type { Analysis } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const saved = await getAnalysisByShareToken(token);
  if (!saved) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({
    analysis: saved.analysis as Analysis,
    title: saved.title,
  });
}
