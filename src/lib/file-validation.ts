export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export type FileKind = "pdf" | "docx" | "txt" | "image";

const EXT_TO_KIND: Record<string, FileKind> = {
  ".pdf": "pdf",
  ".docx": "docx",
  ".txt": "txt",
  ".jpg": "image",
  ".jpeg": "image",
  ".png": "image",
};

const MAGIC: Partial<Record<FileKind, number[][]>> = {
  pdf: [[0x25, 0x50, 0x44, 0x46, 0x2d]],
  docx: [[0x50, 0x4b, 0x03, 0x04]],
  image: [
    [0xff, 0xd8, 0xff],
    [0x89, 0x50, 0x4e, 0x47],
  ],
};

export function kindFromName(name: string): FileKind | null {
  const dot = name.lastIndexOf(".");
  if (dot === -1) return null;
  return EXT_TO_KIND[name.slice(dot).toLowerCase()] ?? null;
}

export type Validation =
  | { ok: true; kind: FileKind }
  | { ok: false; error: string };

export function validateClientFile(name: string, size: number): Validation {
  const kind = kindFromName(name);
  if (!kind) {
    return {
      ok: false,
      error: "Unsupported file type. Upload a PDF, DOCX, TXT, JPG, or PNG.",
    };
  }
  if (size === 0) {
    return { ok: false, error: "This file is empty." };
  }
  if (size > MAX_FILE_SIZE) {
    return {
      ok: false,
      error: "File is larger than 10MB. Please upload a smaller file.",
    };
  }
  return { ok: true, kind };
}

export function validateServerFile(
  name: string,
  size: number,
  buffer: Buffer
): Validation {
  const client = validateClientFile(name, size);
  if (!client.ok) return client;

  const magicList = MAGIC[client.kind];
  if (
    magicList &&
    !magicList.some((magic) =>
      magic.every((byte, i) => buffer[i] === byte)
    )
  ) {
    return {
      ok: false,
      error: "File contents do not match its name. It may be renamed or corrupt.",
    };
  }
  return client;
}
