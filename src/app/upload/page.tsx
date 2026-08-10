"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileUp,
  Camera,
  Loader2,
  X,
  ClipboardType,
  FileCheck2,
  ShieldCheck,
} from "lucide-react";
import { validateClientFile } from "@/lib/file-validation";

type SubmitState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string };

const ACCEPT_HINTS = [
  { ext: "PDF", label: "Agreements & policies" },
  { ext: "DOCX", label: "Word contracts" },
  { ext: "TXT", label: "Pasted terms" },
  { ext: "JPG/PNG", label: "Photo of a page" },
];

const LOADING_STEPS = ["Reading every line", "Spotting hidden clauses", "Tallying charges & dates"];

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [dragging, setDragging] = useState(false);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (submit.status !== "loading") return;
    const id = window.setInterval(() => {
      setStepIndex((index) => (index + 1) % LOADING_STEPS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [submit.status]);

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
        guest?: boolean;
      };

      if (res.status === 401) {
        router.replace("/login");
        return;
      }

      if (!res.ok || !data.id || !data.analysis) {
        setSubmit({
          status: "error",
          message: data.error ?? "Could not analyze this document.",
        });
        return;
      }

      sessionStorage.setItem(data.id, JSON.stringify(data.analysis));
      if (data.guest) {
        sessionStorage.setItem(`${data.id}.guest`, "1");
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
      <p className="mt-3 max-w-xl text-ink-soft">
        PDF, Word, plain text, or a photo of the page. Up to 10MB.
      </p>

      <div
        className={`mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-paper px-6 py-14 text-center transition-colors ${
          dragging
            ? "gradient-border border-transparent"
            : "border-line hover:border-violet focus-within:border-violet"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const dropped = e.dataTransfer.files?.[0];
          if (dropped) acceptFile(dropped);
        }}
      >
        {file ? (
          <div className="w-full max-w-md">
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-parchment p-4">
              <span className="gradient-bg flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white">
                <FileCheck2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate font-medium text-ink">{file.name}</p>
                <p className="text-sm text-ink-soft">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB · ready to analyze
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
                className="rounded-xl border border-line bg-paper px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-violet"
              >
                Choose another file
              </button>
            </div>
          </div>
        ) : (
          <>
            <span className="gradient-bg flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-glow">
              <FileUp className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-4 font-display text-lg font-bold text-navy">
              {dragging ? "Drop it right here" : "Drop your document here"}
            </p>
            <p className="mt-1 text-sm text-ink-soft">or click to browse files</p>
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
                className="flex items-center justify-center gap-2 rounded-xl border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-violet"
              >
                <Camera className="h-4 w-4 text-violet" aria-hidden="true" />
                Scan with camera
              </button>
            </div>
            <ul className="mt-8 grid w-full max-w-lg grid-cols-2 gap-2 text-left sm:grid-cols-4">
              {ACCEPT_HINTS.map((hint) => (
                <li
                  key={hint.ext}
                  className="rounded-xl border border-line bg-parchment px-3 py-2"
                >
                  <p className="font-mono text-xs font-semibold text-violet">
                    {hint.ext}
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-soft">{hint.label}</p>
                </li>
              ))}
            </ul>
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
        <p className="mt-4 rounded-xl border border-red-soft bg-red-soft px-4 py-3 text-sm text-red">
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
        <div className="relative">
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={6}
            placeholder="Paste the text of an agreement, policy, or terms here..."
            className="mt-4 w-full rounded-2xl border border-line bg-paper px-4 py-3 leading-7 placeholder:text-ink-soft/60 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/25"
          />
          <p className="mt-2 text-right font-mono text-xs text-ink-soft">
            {pastedText.length.toLocaleString()} chars
          </p>
        </div>
      </div>

      {submit.status === "error" && (
        <p className="mt-4 rounded-xl border border-red-soft bg-red-soft px-4 py-3 text-sm text-red">
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
            {LOADING_STEPS[stepIndex]}...
          </>
        ) : (
          "Analyze document"
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-ink-soft">
        <ShieldCheck className="h-4 w-4 text-sage" aria-hidden="true" />
        Your file is never stored. Only the analysis is saved to your history.
      </p>
    </section>
  );
}
