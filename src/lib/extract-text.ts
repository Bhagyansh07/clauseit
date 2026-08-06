import { getDocumentProxy, extractText } from "unpdf";
import mammoth from "mammoth";
import type { FileKind } from "@/lib/file-validation";

export const MAX_TEXT_CHARS = 250_000;

export interface Extracted {
  text: string | null;
  kind: FileKind;
  truncated: boolean;
}

function truncate(text: string): { text: string; truncated: boolean } {
  if (text.length <= MAX_TEXT_CHARS) return { text, truncated: false };
  return {
    text: text.slice(0, MAX_TEXT_CHARS),
    truncated: true,
  };
}

export async function extractTextFromBuffer(
  kind: FileKind,
  buffer: Buffer
): Promise<Extracted> {
  if (kind === "pdf") {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    const result = truncate(text);
    return { text: result.text, kind, truncated: result.truncated };
  }

  if (kind === "docx") {
    const { value } = await mammoth.extractRawText({ buffer });
    const result = truncate(value);
    return { text: result.text, kind, truncated: result.truncated };
  }

  if (kind === "txt") {
    const result = truncate(buffer.toString("utf8"));
    return { text: result.text, kind, truncated: result.truncated };
  }

  return { text: null, kind, truncated: false };
}
