import type { Metadata } from "next";
import { getAnalysisByShareToken } from "@/lib/auth-server";
import { AnalysisView } from "@/components/analysis/analysis-view";
import { MissingView } from "@/components/analysis/missing-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ token: string }>;
}): Promise<Metadata> {
  const { token } = await params;
  const saved = await getAnalysisByShareToken(token);
  return {
    title: saved ? `${saved.title} - shared on ClauseIt` : "Shared analysis",
    description: "A document analysis shared on ClauseIt.",
    robots: { index: false, follow: false },
  };
}

export default async function SharedAnalysisPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const saved = await getAnalysisByShareToken(token);

  if (!saved) return <MissingView />;

  return <AnalysisView analysis={saved.analysis} shareMode />;
}
