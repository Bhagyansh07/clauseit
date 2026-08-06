"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileUp,
  Camera,
  Loader2,
  FileText,
  X,
  ClipboardType,
} from "lucide-react";
import { getCurrentUser, saveAnalysisForUser } from "@/lib/auth";
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
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setChecked(true);
      if (!getCurrentUser()) {
        router.replace("/login");
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, [router]);

  if (!checked) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-line border-t-violet" />
        <p className="mt-4 font-mono text-sm uppercase tracking-[0.12em] text-ink-soft">
          Checking your session
        </p>
      </section>
    );
  }

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

      const currentUser = getCurrentUser();
      sessionStorage.setItem(data.id, JSON.stringify(data.analysis));
      if (data.id) {
        window.localStorage.setItem(`clauseit-analysis-${data.id}`, JSON.stringify(data.analysis));
      }

      if (currentUser) {
        const safeAnalysis =
          typeof data.analysis === "object" && data.analysis !== null
            ? (data.analysis as { summary?: { en?: string }; risk?: { level?: string; score?: number } })
            : null;

        saveAnalysisForUser({
          id: data.id,
          userId: currentUser.id,
          title: (file?.name ?? pastedText.slice(0, 40)) || "Untitled analysis",
          createdAt: new Date().toISOString(),
          summary: safeAnalysis?.summary?.en ?? "Analysis created",
          riskLevel: safeAnalysis?.risk?.level ?? "unknown",
          riskScore: safeAnalysis?.risk?.score ?? 0,
          analysis: data.analysis,
        });
      }

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
      <h1 className="font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
        Upload a document
      </h1>
      <p className="mt-3 text-ink-soft">
        PDF, Word, plain text, or a photo of the page. Up to 10MB.
      </p>

      <div
        className="mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-line bg-white px-6 py-14 text-center transition-colors hover:border-violet focus-within:border-violet"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) acceptFile(dropped);
        }}
      >
        {file ? (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-parchment p-4">
              <FileText className="h-7 w-7 shrink-0 text-violet" aria-hidden="true" />
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-ink">{file.name}</p>
                <p className="text-sm text-ink-soft">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="rounded p-2 text-ink-soft transition-colors hover:bg-line/50 hover:text-ink"
                aria-label="Remove file"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-line bg-white px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-violet"
              >
                Choose another file
              </button>
            </div>
          </div>
        ) : (
          <>
            <FileUp className="h-10 w-10 text-violet" aria-hidden="true" />
            <p className="mt-4 font-display text-lg font-bold text-navy">
              Drop your document here
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              or click to browse files
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="gradient-bg rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
              >
                Browse files
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-violet"
              >
                <Camera className="h-4 w-4 text-violet" aria-hidden="true" />
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
        <p className="mt-4 rounded border border-red-soft bg-red-soft px-4 py-3 text-sm text-red">
          {fileError}
        </p>
      )}

      <div className="mt-10">
        <div className="flex items-center gap-2">
          <ClipboardType className="h-5 w-5 text-violet" aria-hidden="true" />
          <h2 className="font-display text-lg font-bold text-navy">
            Or paste text
          </h2>
        </div>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          rows={6}
          placeholder="Paste the text of an agreement, policy, or terms here..."
          className="mt-4 w-full rounded-2xl border border-line bg-white px-4 py-3 leading-7 placeholder:text-ink-soft/60 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/25"
        />
      </div>

      {submit.status === "error" && (
        <p className="mt-4 rounded border border-red-soft bg-red-soft px-4 py-3 text-sm text-red">
          {submit.message}
        </p>
      )}

      <button
        type="button"
        onClick={handleAnalyze}
        disabled={submit.status === "loading"}
        className="gradient-bg mt-8 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-semibold text-white shadow-glow transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
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
