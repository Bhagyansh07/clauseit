"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

export function ShareAnalysis({ id }: { id: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function createLink() {
    if (url) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/analyses/${encodeURIComponent(id)}/share`, {
        method: "POST",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Could not create a share link.");
      }
      const data = (await res.json()) as { url: string };
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create a share link.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard failures
    }
  }

  return (
    <div>
      {url ? (
        <div className="flex items-center gap-2">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.target.select()}
            className="w-full min-w-0 rounded-lg border border-line bg-parchment px-3 py-2 text-sm text-ink"
            aria-label="Share link"
          />
          <button
            type="button"
            onClick={copy}
            className="gradient-bg inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white shadow-glow transition-all hover:brightness-110"
            aria-label={copied ? "Copied" : "Copy link"}
          >
            {copied ? (
              <Check className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={createLink}
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-violet transition-colors hover:border-violet disabled:opacity-60"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          {busy ? "Creating..." : "Share link"}
        </button>
      )}
      {error ? <p className="mt-2 text-sm text-red">{error}</p> : null}
    </div>
  );
}
