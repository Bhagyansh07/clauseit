import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Plan, SavedAnalysis, StoredUser } from "@/lib/auth-types";
import type { Store } from "@/lib/store-types";

interface ProfileRow {
  id: string;
  name: string;
  plan: Plan;
  created_at: string;
}

interface AnalysisRow {
  id: string;
  user_id: string;
  title: string;
  summary: string | null;
  risk_level: string | null;
  risk_score: number | null;
  analysis: SavedAnalysis["analysis"];
  share_token: string | null;
  created_at: string;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

let cached: SupabaseClient | null = null;

function getAdmin(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env."
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return cached;
}

async function getProfile(id: string): Promise<ProfileRow | null> {
  const { data, error } = await getAdmin()
    .from("profiles")
    .select("id, name, plan, created_at")
    .eq("id", id)
    .maybeSingle();
  if (error || !data) return null;
  return data as ProfileRow;
}

function rowToSaved(row: AnalysisRow): SavedAnalysis {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    createdAt: row.created_at,
    summary: row.summary ?? "",
    riskLevel: row.risk_level ?? "unknown",
    riskScore: row.risk_score ?? 0,
    analysis: row.analysis,
    shareToken: row.share_token ?? undefined,
  };
}

export const supabaseStore: Store = {
  async createUser(name, email, password) {
    const sb = getAdmin();
    const { data, error } = await sb.auth.admin.createUser({
      email: normalizeEmail(email),
      password,
      email_confirm: true,
      user_metadata: { name: name.trim() },
    });
    if (error) {
      if (error.message.toLowerCase().includes("already registered")) {
        throw new Error("An account with this email already exists.");
      }
      throw new Error("Could not create your account. Please try again.");
    }
    if (!data.user) throw new Error("Could not create your account.");

    const createdAt = data.user.created_at ?? new Date().toISOString();
    await sb.from("profiles").upsert({ id: data.user.id, name: name.trim(), plan: "free" });

    return {
      id: data.user.id,
      name: name.trim(),
      email: data.user.email ?? normalizeEmail(email),
      plan: "free",
      createdAt,
    };
  },

  async authenticateUser(email, password) {
    const { data, error } = await getAdmin().auth.signInWithPassword({
      email: normalizeEmail(email),
      password,
    });
    if (error || !data.user) throw new Error("Invalid email or password.");

    const profile = await getProfile(data.user.id);
    return {
      id: data.user.id,
      name: profile?.name ?? data.user.user_metadata?.name ?? "",
      email: data.user.email ?? normalizeEmail(email),
      plan: profile?.plan ?? "free",
      createdAt: profile?.created_at ?? data.user.created_at ?? new Date().toISOString(),
    };
  },

  async getUserById(id) {
    const { data, error } = await getAdmin().auth.admin.getUserById(id);
    if (error || !data.user) return null;

    const profile = await getProfile(id);
    const user: StoredUser = {
      id,
      name: profile?.name ?? data.user.user_metadata?.name ?? "",
      email: data.user.email ?? "",
      passwordHash: "",
      plan: profile?.plan ?? "free",
      createdAt: profile?.created_at ?? data.user.created_at ?? new Date().toISOString(),
    };
    return user;
  },

  async updateUserPlan(id, plan) {
    const { error } = await getAdmin()
      .from("profiles")
      .update({ plan })
      .eq("id", id);
    if (error) throw new Error("Could not update your plan.");
  },

  async countMonthlyAnalyses(userId) {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    const { count, error } = await getAdmin()
      .from("analyses")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .gte("created_at", start.toISOString());
    if (error) throw new Error("Could not load your usage.");
    return count ?? 0;
  },

  async saveAnalysis(record) {
    const { error } = await getAdmin().from("analyses").insert({
      id: record.id,
      user_id: record.userId,
      title: record.title,
      summary: record.summary,
      risk_level: record.riskLevel,
      risk_score: record.riskScore,
      analysis: record.analysis,
      share_token: record.shareToken ?? null,
      created_at: record.createdAt,
    });
    if (error) throw new Error("Could not save your analysis.");
  },

  async listAnalyses(userId) {
    const { data, error } = await getAdmin()
      .from("analyses")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) throw new Error("Could not load your analyses.");
    return (data ?? []).map((row) => rowToSaved(row as AnalysisRow));
  },

  async getAnalysis(userId, id) {
    const { data, error } = await getAdmin()
      .from("analyses")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();
    if (error || !data) return null;
    return rowToSaved(data as AnalysisRow);
  },

  async getAnalysisByShareToken(token) {
    const { data, error } = await getAdmin()
      .from("analyses")
      .select("*")
      .eq("share_token", token)
      .maybeSingle();
    if (error || !data) return null;
    return rowToSaved(data as AnalysisRow);
  },
};
