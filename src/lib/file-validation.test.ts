import { describe, it, expect } from "vitest";
import {
  MAX_FILE_SIZE,
  kindFromName,
  validateClientFile,
  validateServerFile,
} from "@/lib/file-validation";

describe("kindFromName", () => {
  it("maps the supported extensions to a kind", () => {
    expect(kindFromName("lease.pdf")).toBe("pdf");
    expect(kindFromName("policy.docx")).toBe("docx");
    expect(kindFromName("notes.txt")).toBe("txt");
    expect(kindFromName("page.jpg")).toBe("image");
    expect(kindFromName("page.jpeg")).toBe("image");
    expect(kindFromName("scan.png")).toBe("image");
  });

  it("is case-insensitive on the extension", () => {
    expect(kindFromName("LEASE.PDF")).toBe("pdf");
    expect(kindFromName("Policy.DocX")).toBe("docx");
  });

  it("returns null for unsupported or missing extensions", () => {
    expect(kindFromName("installer.exe")).toBeNull();
    expect(kindFromName("archive.tar.gz")).toBeNull();
    expect(kindFromName("noextension")).toBeNull();
  });

  it("only looks at the last dot", () => {
    expect(kindFromName("my.contract.pdf")).toBe("pdf");
  });
});

describe("validateClientFile", () => {
  it("accepts a supported, non-empty, in-size file", () => {
    const result = validateClientFile("lease.pdf", 1024);
    expect(result).toEqual({ ok: true, kind: "pdf" });
  });

  it("rejects an unsupported type", () => {
    const result = validateClientFile("malware.exe", 10);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/unsupported/i);
  });

  it("rejects an empty file", () => {
    const result = validateClientFile("empty.pdf", 0);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/empty/i);
  });

  it("rejects a file over the 10MB cap", () => {
    const result = validateClientFile("big.pdf", MAX_FILE_SIZE + 1);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/10MB/i);
  });

  it("accepts a file exactly at the cap", () => {
    expect(validateClientFile("ok.pdf", MAX_FILE_SIZE)).toEqual({
      ok: true,
      kind: "pdf",
    });
  });
});

describe("validateServerFile / magic bytes", () => {
  it("accepts a real PDF signature", () => {
    const buf = Buffer.from([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31]);
    expect(validateServerFile("a.pdf", buf.length, buf)).toEqual({
      ok: true,
      kind: "pdf",
    });
  });

  it("rejects a PDF whose contents do not match its extension", () => {
    const buf = Buffer.from("not a pdf at all");
    const result = validateServerFile("a.pdf", buf.length, buf);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/contents do not match/i);
  });

  it("accepts both JPEG and PNG image signatures", () => {
    const jpeg = Buffer.from([0xff, 0xd8, 0xff, 0xe0]);
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(validateServerFile("a.jpg", jpeg.length, jpeg).ok).toBe(true);
    expect(validateServerFile("a.png", png.length, png).ok).toBe(true);
  });

  it("does not require a signature for txt", () => {
    const buf = Buffer.from("hello world");
    expect(validateServerFile("a.txt", buf.length, buf)).toEqual({
      ok: true,
      kind: "txt",
    });
  });

  it("rejects a file too short to hold the expected signature", () => {
    const buf = Buffer.from([0x25, 0x50]); // truncated PDF magic
    const result = validateServerFile("a.pdf", buf.length, buf);
    expect(result.ok).toBe(false);
  });
});
