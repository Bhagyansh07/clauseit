export type Verdict = "yes" | "cautious" | "dont-sign";

export interface VerdictResult {
  verdict: Verdict;
  label: string;
  colorToken: "emerald" | "amber" | "red";
}

export function getVerdict(score: number): VerdictResult {
  if (score <= 3) {
    return { verdict: "yes", label: "Safe to sign", colorToken: "emerald" };
  }
  if (score <= 6) {
    return {
      verdict: "cautious",
      label: "Think before you sign",
      colorToken: "amber",
    };
  }
  return {
    verdict: "dont-sign",
    label: "Do not sign yet",
    colorToken: "red",
  };
}
