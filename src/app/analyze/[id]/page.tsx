"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Analysis } from "@/lib/types";
import { AnalysisView } from "@/components/analysis/analysis-view";
import { MissingView } from "@/components/analysis/missing-view";

function readFromSession(id: string): Analysis | null {
  try {
    const raw = sessionStorage.getItem(id);
    if (raw) return JSON.parse(raw) as Analysis;
  } catch {
    // ignore malformed data
  }
  return null;
}

export default function AnalyzePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [analysis, setAnalysis] = useState<Analysis | null | "missing">(() =>
    id ? (readFromSession(id) ?? "missing") : "missing"
  );

  useEffect(() => {
    if (!id || analysis !== "missing") return;
    let cancelled = false;

    fetch(`/api/analyses/${encodeURIComponent(id)}`, { cache: "no-store" })
      .then(async (res) => {
        if (res.status === 401) {
          router.replace("/login");
          return;
        }
        if (!res.ok) {
          if (!cancelled) setAnalysis("missing");
          return;
        }
        const data = (await res.json()) as { analysis?: Analysis };
        if (!cancelled && data.analysis) {
          setAnalysis(data.analysis);
        } else if (!cancelled) {
          setAnalysis("missing");
        }
      })
      .catch(() => {
        if (!cancelled) setAnalysis("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [id, analysis, router]);

  if (analysis === null || analysis === "missing") {
    return <MissingView />;
  }

  return <AnalysisView analysis={analysis} id={id} />;
}
