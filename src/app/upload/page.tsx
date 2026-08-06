"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileUp,
  Camera,
  Loader2,
  FileText,
  X,
  ClipboardType,
} from "lucide-react";
import { validateClientFile } from "@/lib/file-validation";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  function acceptFile(candidate: File) {
    const check = validateClientFile(candidate.name, candidate.size);
    if (!check.ok) {
      setFile(null);
      setFileError(check.error);
      return;
    }
    setFile(candidate);
    setFileError(null);
  }

  function clearFile() {
    setFile(null);
    setFileError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  }

  async function handleAnalyze() {
    if (submit.status === "loading") return;

    if (!file && pastedText.trim().length < 20) {
      setFileError(
        "Add a document or paste at least 20 characters of text first."
      );
      return;
    }

    setSubmit({ status: "loading" });
    setFileError(null);

    try {
      const body = new FormData();
      if (file) {
        body.append("file", file);
      } else {
        body.append("text", pastedText);
      }

      const res = await fetch("/api/analyze", { method: "POST", body });
      const data = (await res.json()) as {
        id?: string;
        analysis?: unknown;
        error?: string;
      };

      if (!res.ok || !data.id || !data.analysis) {
        setSubmit({
          status: "error",
          message: data.error ?? "Could not analyze this document.",
        });
        return;
      }

      sessionStorage.setItem(data.id, JSON.stringify(data.analysis));
      router.push(`/analyze/${data.id}`);
    } catch {
      setSubmit({
        status: "error",
        message: "Network error. Check your connection and try again.",
      });
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-4xl font-semibold text-navy sm:text-5xl">
        Upload a document
      </h1>
      <p className="mt-3 text-muted">
        PDF, Word, plain text, or a photo of the page. Up to 10MB.
      </p>

      <div
        className="mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-white px-6 py-14 text-center transition-colors hover:border-gold"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) acceptFile(dropped);
        }}
      >
        {file ? (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 rounded-xl border border-line bg-paper p-4">
              <FileText className="h-8 w-8 shrink-0 text-gold" aria-hidden="true" />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-ink">{file.name}</p>
                <p className="text-sm text-muted">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-line/50 hover:text-ink"
                aria-label="Remove file"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-gold"
              >
                Choose another file
              </button>
            </div>
          </div>
        ) : (
          <>
            <FileUp className="h-10 w-10 text-gold" aria-hidden="true" />
            <p className="mt-4 font-medium text-ink">
              Drop your document here
            </p>
            <p className="mt-1 text-sm text-muted">
              or click to browse files
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-navy px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-navy-light"
              >
                Browse files
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-lg border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-gold"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Scan with camera
              </button>
            </div>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const chosen = e.target.files?.[0];
          if (chosen) acceptFile(chosen);
        }}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          const shot = e.target.files?.[0];
          if (shot) acceptFile(shot);
        }}
      />

      {fileError && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {fileError}
        </p>
      )}

      <div className="mt-10">
        <div className="flex items-center gap-2">
          <ClipboardType className="h-5 w-5 text-gold" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold text-navy">
            Or paste text
          </h2>
        </div>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          rows={6}
          placeholder="Paste the text of an agreement, policy, or terms here..."
          className="mt-4 w-full rounded-xl border border-line bg-white px-4 py-3 leading-7 placeholder:text-muted/60 focus:border-gold focus:outline-none"
        />
      </div>

      {submit.status === "error" && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submit.message}
        </p>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={submit.status === "loading"}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-6 py-4 text-lg font-semibold text-navy transition-colors hover:bg-gold-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submit.status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Reading every line...
          </>
        ) : (
          "Analyze document"
        )}
      </button>
    </section>
  );
}
