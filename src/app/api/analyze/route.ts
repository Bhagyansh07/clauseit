import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validateServerFile } from "@/lib/file-validation";
import { extractTextFromBuffer, MAX_TEXT_CHARS } from "@/lib/extract-text";
import { analyzeDocument, GeminiError } from "@/lib/gemini";
import {
  countMonthlyAnalyses,
  extractAnalysisMeta,
  getSessionUser,
  PLAN_LIMITS,
  saveAnalysis,
} from "@/lib/auth-server";
import { SESSION_COOKIE } from "@/lib/session";
import { captureError } from "@/lib/sentry";

export const runtime = "nodejs";
export const maxDuration = 60;

function error(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser(req.cookies.get(SESSION_COOKIE)?.value);
  if (!user) {
    return error("Log in to analyze a document.", 401);
  }

  const used = await countMonthlyAnalyses(user.id);
  if (used >= PLAN_LIMITS[user.plan]) {
    return error(
      "You have reached your free limit of 10 analyses this month. Upgrade to analyze more.",
      429
    );
  }

  try {
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return error("Send a valid multipart form (file or text).", 400);
    }

    const file = form.get("file");
    const pasted = form.get("text");

    let analysis;

    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const check = validateServerFile(file.name, file.size, buffer);
      if (!check.ok) {
        return error(check.error, 400);
      }

      const extracted = await extractTextFromBuffer(check.kind, buffer);
      analysis = await analyzeDocument({
        text: extracted.text ?? undefined,
        image:
          extracted.kind === "image"
            ? { data: buffer, mimeType: file.type || "image/jpeg" }
            : undefined,
      });
    } else {
      const text = typeof pasted === "string" ? pasted.trim() : "";
      if (text.length < 20) {
        return error("Paste at least 20 characters of text to analyze.", 400);
      }
      if (text.length > MAX_TEXT_CHARS) {
        return error("Text is too long. Keep it under 250,000 characters.", 400);
      }
      analysis = await analyzeDocument({ text });
    }

    const id = randomUUID();
    const pastedTitle = typeof pasted === "string" ? pasted.slice(0, 40) : "";
    const title =
      file instanceof File ? file.name : pastedTitle || "Untitled analysis";

    const meta = extractAnalysisMeta(analysis);
    await saveAnalysis(user.id, {
      id,
      title,
      createdAt: new Date().toISOString(),
      ...meta,
      analysis,
    });

    return NextResponse.json({ id, analysis });
  } catch (err) {
    captureError(err);
    if (err instanceof GeminiError) {
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
    return NextResponse.json(
      { error: "Something went wrong while analyzing the document." },
      { status: 500 }
    );
  }
}
