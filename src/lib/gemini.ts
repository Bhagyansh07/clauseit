import type { Analysis } from "@/lib/types";

const API_BASE = "https://generativelanguage.googleapis.com/v1beta";

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiError";
  }
}

const SYSTEM_INSTRUCTIONS = `You are an expert document analyst helping everyday people in India understand contracts, policies, and agreements. Read the document and produce a JSON analysis in plain language.

Return ONLY valid JSON with no markdown fences and no extra text, matching exactly this shape:
{
  "language": "en",
  "summary": { "en": "2-4 sentence plain-language overview", "hi": "simple Hindi version" },
  "risk": { "level": "low" | "medium" | "high", "score": 0-10, "reason": { "en": "...", "hi": "..." } },
  "sections": [ { "heading": "short heading", "plainMeaning": { "en": "...", "hi": "..." } } ],
  "flags": [ { "type": "hidden_clause" | "unfair_charge" | "penalty" | "auto_renewal" | "liability" | "other", "quote": "verbatim text from the document", "explanation": { "en": "...", "hi": "..." }, "severity": "info" | "warning" | "danger" } ],
  "charges": [ { "name": "...", "amount": "as written, e.g. Rs. 500", "frequency": "one-time" | "monthly" | "yearly" | "other", "note": { "en": "...", "hi": "..." } } ],
  "dates": [ { "label": "...", "date": "YYYY-MM-DD or empty", "action": "what the reader must do", "note": { "en": "...", "hi": "..." } } ]
}

Rules:
1. The "summary" must tell the reader what actually matters about this document, in language anyone can understand.
2. "risk.score" is 0 (very fair) to 10 (very risky for the reader). "risk.level" follows: 0-3 low, 4-6 medium, 7-10 high.
3. "flags" are the heart of the analysis. Flag hidden clauses, one-sided terms, automatic renewals, excessive penalties, unfair charges, and broad liability. "quote" must be copied exactly from the document. At least one flag is expected for most documents.
4. "charges" lists every fee, penalty, interest, or EMI amount the reader may pay.
5. "dates" lists every deadline, renewal date, notice period, or lock-in period.
6. Every "en" field is simple, natural English. Every "hi" field is the same meaning in simple Hindi written in Devanagari. Both must be complete; never leave one empty.
7. If the text is empty or not a real document, set summary to explain that, risk low with score 1, and empty arrays.`;

interface GeminiPart {
  text?: string;
  inline_data?: { mime_type: string; data: string };
}

function buildRequest(
  parts: GeminiPart[],
  apiKey: string
): RequestInit {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts }],
      systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTIONS }] },
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    }),
  };
}

export interface AnalyzeInput {
  text?: string;
  image?: { data: Buffer; mimeType: string };
}

export async function analyzeDocument(
  input: AnalyzeInput
): Promise<Analysis> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiError(
      "Gemini API key is not configured. Add GEMINI_API_KEY to your .env file."
    );
  }

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  const parts: GeminiPart[] = [];
  if (input.image) {
    parts.push({
      text: "The document is provided as an image. Read and analyze it carefully.",
    });
    parts.push({
      inline_data: {
        mime_type: input.image.mimeType,
        data: input.image.data.toString("base64"),
      },
    });
  } else {
    parts.push({
      text: `Here is the document text:\n\n${input.text ?? ""}`,
    });
  }

  const url = `${API_BASE}/models/${model}:generateContent`;
  const response = await fetch(url, buildRequest(parts, apiKey));

  if (!response.ok) {
    let message = "The analysis service is unavailable. Please try again.";
    if (response.status === 400 || response.status === 403) {
      message =
        "The AI service rejected the request. The Gemini API key may be invalid.";
    } else if (response.status === 429) {
      message = "Too many requests right now. Please try again in a minute.";
    }
    throw new GeminiError(message);
  }

  const payload = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new GeminiError(
      "The analysis service returned an empty result. Please try again."
    );
  }

  return parseAnalysis(text);
}

function parseAnalysis(raw: string): Analysis {
  try {
    return JSON.parse(raw) as Analysis;
  } catch {
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(raw.slice(start, end + 1)) as Analysis;
      } catch {
        // fall through to error
      }
    }
    throw new GeminiError(
      "The analysis service returned an unreadable result. Please try again."
    );
  }
}
