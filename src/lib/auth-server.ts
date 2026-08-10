import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { isSupabaseConfigured } from "@/lib/store";
import { localStore } from "@/lib/store-local";
import { supabaseStore } from "@/lib/store-supabase";
import type { Plan, PublicUser, SavedAnalysis } from "@/lib/auth-types";
import type { Analysis } from "@/lib/types";

const SECRET_FILE =
  process.env.VERCEL === "1"
    ? path.join("/tmp", "clauseit-data", "secret")
    : path.join(process.cwd(), ".data", "secret");

const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const PLAN_LIMITS: Record<Plan, number> = {
  free: 10,
  pro: 100,
  premium: 9999,
};

export const PLAN_NAMES: Record<Plan, string> = {
  free: "Free",
  pro: "Pro",
  premium: "Premium",
};

export class AuthError extends Error {}

function getStore() {
  return isSupabaseConfigured() ? supabaseStore : localStore;
}

async function getSecret(): Promise<string> {
  const fromEnv = process.env.AUTH_SECRET;
  if (fromEnv) return fromEnv;
  try {
    const existing = await fs.readFile(SECRET_FILE, "utf8");
    if (existing.trim()) return existing.trim();
  } catch {
    // fall through and generate
  }
  const generated = randomBytes(32).toString("hex");
  await fs.mkdir(path.dirname(SECRET_FILE), { recursive: true });
  await fs.writeFile(SECRET_FILE, generated, "utf8");
  return generated;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function createUser(
  name: string,
  email: string,
  password: string
): Promise<PublicUser> {
  try {
    return await getStore().createUser(name, email, password);
  } catch (err) {
    throw new AuthError(
      err instanceof Error ? err.message : "Could not create your account."
    );
  }
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<PublicUser> {
  try {
    return await getStore().authenticateUser(email, password);
  } catch (err) {
    throw new AuthError(
      err instanceof Error ? err.message : "Could not log you in."
    );
  }
}

export async function updateUserPlan(userId: string, plan: Plan) {
  if (!["free", "pro", "premium"].includes(plan)) {
    throw new AuthError("Invalid plan.");
  }
  try {
    await getStore().updateUserPlan(userId, plan);
  } catch (err) {
    throw new AuthError(
      err instanceof Error ? err.message : "Could not update your plan."
    );
  }
}

async function signToken(payload: string): Promise<string> {
  const secret = await getSecret();
  const signature = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

async function verifyToken(token: string) {
  const lastDot = token.lastIndexOf(".");
  if (lastDot === -1) return null;
  const payload = token.slice(0, lastDot);
  const signature = token.slice(lastDot + 1);
  const secret = await getSecret();
  const expected = createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  const [userId, issuedAt] = payload.split(".");
  const issued = Number(issuedAt);
  if (!userId || !Number.isFinite(issued)) return null;
  if (Date.now() - issued > SESSION_TTL_MS) return null;
  return getStore().getUserById(userId);
}

export async function createSessionToken(userId: string): Promise<string> {
  const payload = `${userId}.${Date.now()}`;
  return signToken(payload);
}

export async function getSessionUser(token: string | undefined | null) {
  if (!token) return null;
  return verifyToken(token);
}

export async function countMonthlyAnalyses(userId: string): Promise<number> {
  return getStore().countMonthlyAnalyses(userId);
}

export async function saveAnalysis(
  userId: string,
  saved: Omit<SavedAnalysis, "userId">
): Promise<void> {
  const record: SavedAnalysis = { ...saved, userId };
  await getStore().saveAnalysis(record);
}

export async function listAnalyses(userId: string): Promise<SavedAnalysis[]> {
  return getStore().listAnalyses(userId);
}

export async function getAnalysis(
  userId: string,
  id: string
): Promise<SavedAnalysis | null> {
  return getStore().getAnalysis(userId, id);
}

export async function getShareTokenForAnalysis(
  userId: string,
  id: string
): Promise<string | null> {
  const saved = await getStore().getAnalysis(userId, id);
  if (!saved) return null;
  if (saved.shareToken) return saved.shareToken;

  const token = randomBytes(16).toString("hex");
  await getStore().saveAnalysis({ ...saved, shareToken: token });
  return token;
}

export async function getAnalysisByShareToken(
  token: string
): Promise<SavedAnalysis | null> {
  return getStore().getAnalysisByShareToken(token);
}

export function extractAnalysisMeta(analysis: Analysis) {
  return {
    summary: analysis.summary?.en ?? "Analysis created",
    riskLevel: analysis.risk?.level ?? "unknown",
    riskScore: analysis.risk?.score ?? 0,
  };
}
