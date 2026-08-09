import type { Plan, PublicUser, SavedAnalysis, StoredUser } from "@/lib/auth-types";

export interface Store {
  createUser(name: string, email: string, password: string): Promise<PublicUser>;
  authenticateUser(email: string, password: string): Promise<PublicUser>;
  getUserById(id: string): Promise<StoredUser | null>;
  updateUserPlan(id: string, plan: Plan): Promise<void>;
  countMonthlyAnalyses(userId: string): Promise<number>;
  saveAnalysis(record: SavedAnalysis): Promise<void>;
  listAnalyses(userId: string): Promise<SavedAnalysis[]>;
  getAnalysis(userId: string, id: string): Promise<SavedAnalysis | null>;
  getAnalysisByShareToken(token: string): Promise<SavedAnalysis | null>;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

export { localStore } from "@/lib/store-local";
export { supabaseStore } from "@/lib/store-supabase";
