import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { validateServerFile } from "@/lib/file-validation";
import { extractTextFromBuffer, MAX_TEXT_CHARS } from "@/lib/extract-text";
import { analyzeDocument, GeminiError } from "@/lib/gemini";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    const pasted = form.get("text");

    if (file instanceof File) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const check = validateServerFile(file.name, file.size, buffer);
      if (!check.ok) {
        return NextResponse.json({ error: check.error }, { status: 400 });
      }

      const extracted = await extractTextFromBuffer(check.kind, buffer);
      const analysis = await analyzeDocument({
        text: extracted.text ?? undefined,
        image:
          extracted.kind === "image"
            ? { data: buffer, mimeType: file.type || "image/jpeg" }
            : undefined,
      });

      return NextResponse.json({ id: randomUUID(), analysis });
    }

    const text = typeof pasted === "string" ? pasted.trim() : "";
    if (text.length < 20) {
      return NextResponse.json(
        { error: "Paste at least 20 characters of text to analyze." },
        { status: 400 }
      );
    }
    if (text.length > MAX_TEXT_CHARS) {
      return NextResponse.json(
        { error: "Text is too long. Keep it under 250,000 characters." },
        { status: 400 }
      );
    }

    const analysis = await analyzeDocument({ text });
    return NextResponse.json({ id: randomUUID(), analysis });
  } catch (err) {
    if (err instanceof GeminiError) {
      return NextResponse.json({ error: err.message }, { status: 502 });
    }
    return NextResponse.json(
      { error: "Something went wrong while analyzing the document." },
      { status: 500 }
    );
  }
}
