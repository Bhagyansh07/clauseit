"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { Analysis } from "@/lib/types";
import { AnalysisView } from "@/components/analysis/analysis-view";
import { MissingView } from "@/components/analysis/missing-view";

export default function AnalyzePage() {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<Analysis | null | "missing">(
    "missing"
  );

  useEffect(() => {
    if (!id) return;
    const timer = window.setTimeout(() => {
      const raw = sessionStorage.getItem(id);
      if (raw) {
        try {
          setAnalysis(JSON.parse(raw) as Analysis);
          return;
        } catch {
          setAnalysis("missing");
          return;
        }
      }

      const stored = window.localStorage.getItem(`clauseit-analysis-${id}`);
      if (stored) {
        try {
          setAnalysis(JSON.parse(stored) as Analysis);
          return;
        } catch {
          setAnalysis("missing");
          return;
        }
      }

      setAnalysis("missing");
    }, 0);
    return () => window.clearTimeout(timer);
  }, [id]);

  if (analysis === null || analysis === "missing") {
    return <MissingView />;
  }

  return <AnalysisView analysis={analysis} />;
}
