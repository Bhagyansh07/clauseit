import type { Analysis } from "@/lib/types";

export type Plan = "free" | "pro" | "premium";

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  createdAt: string;
}

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  plan: Plan;
  createdAt: string;
}

export interface SavedAnalysis {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  summary: string;
  riskLevel: string;
  riskScore: number;
  analysis: Analysis;
  shareToken?: string;
}
