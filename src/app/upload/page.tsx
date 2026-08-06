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
      <h1 className="font-display text-4xl leading-tight tracking-[-0.02em] text-foreground sm:text-5xl">
        Upload a document
      </h1>
      <p className="mt-3 text-muted-foreground">
        PDF, Word, plain text, or a photo of the page. Up to 10MB.
      </p>

      <div
        className="mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-card px-6 py-14 text-center transition-colors hover:border-accent/50 focus-within:border-accent"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) acceptFile(dropped);
        }}
      >
        {file ? (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-4">
              <span className="gradient-bg flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-accent">
                <FileText className="h-5 w-5 text-white" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-foreground">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={clearFile}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-border/60 hover:text-foreground"
                aria-label="Remove file"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
              >
                Choose another file
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="gradient-bg flex h-14 w-14 items-center justify-center rounded-2xl shadow-accent">
              <FileUp className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="mt-4 font-semibold text-foreground">
              Drop your document here
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              or click to browse files
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="gradient-bg rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg"
              >
                Browse files
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/40 hover:bg-accent/5"
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
          <span className="gradient-bg flex h-8 w-8 items-center justify-center rounded-lg shadow-accent">
            <ClipboardType className="h-4 w-4 text-white" aria-hidden="true" />
          </span>
          <h2 className="font-display text-lg text-foreground">
            Or paste text
          </h2>
        </div>
        <textarea
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
          rows={6}
          placeholder="Paste the text of an agreement, policy, or terms here..."
          className="mt-4 w-full rounded-xl border border-border bg-card px-4 py-3 leading-7 placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/30 focus:outline-none"
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
        className="gradient-bg mt-8 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-lg font-semibold text-white shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-accent"
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
