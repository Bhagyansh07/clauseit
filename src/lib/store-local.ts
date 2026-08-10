import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { PublicUser, SavedAnalysis, StoredUser } from "@/lib/auth-types";
import type { Store } from "@/lib/store-types";

function resolveDataDir(): string {
  if (process.env.VERCEL === "1") return path.join("/tmp", "clauseit-data");
  return path.join(process.cwd(), ".data");
}

const DATA_DIR = resolveDataDir();
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ANALYSES_FILE = path.join(DATA_DIR, "analyses.json");

export class LocalAuthError extends Error {}

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return (
    candidate.length === expected.length && timingSafeEqual(candidate, expected)
  );
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function publicUser(user: StoredUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    createdAt: user.createdAt,
  };
}

function monthKey(iso: string): string {
  const date = new Date(iso);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export const localStore: Store = {
  async createUser(name, email, password) {
    const trimmedName = name.trim();
    const trimmedEmail = normalizeEmail(email);

    if (!trimmedName) throw new LocalAuthError("Please enter your name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      throw new LocalAuthError("Please enter a valid email address.");
    }
    if (password.length < 6) {
      throw new LocalAuthError("Password must be at least 6 characters.");
    }

    const users = await readJson<StoredUser[]>(USERS_FILE, []);
    if (users.some((user) => user.email === trimmedEmail)) {
      throw new LocalAuthError("An account with this email already exists.");
    }

    const user: StoredUser = {
      id: randomBytes(16).toString("hex"),
      name: trimmedName,
      email: trimmedEmail,
      passwordHash: hashPassword(password),
      plan: "free",
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await writeJson(USERS_FILE, users);
    return publicUser(user);
  },

  async authenticateUser(email, password) {
    const users = await readJson<StoredUser[]>(USERS_FILE, []);
    const match = users.find(
      (user) =>
        user.email === normalizeEmail(email) &&
        verifyPassword(password, user.passwordHash)
    );
    if (!match) throw new LocalAuthError("Invalid email or password.");
    return publicUser(match);
  },

  async getUserById(id) {
    const users = await readJson<StoredUser[]>(USERS_FILE, []);
    return users.find((user) => user.id === id) ?? null;
  },

  async updateUserPlan(id, plan) {
    const users = await readJson<StoredUser[]>(USERS_FILE, []);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) throw new LocalAuthError("User not found.");
    users[index].plan = plan;
    await writeJson(USERS_FILE, users);
  },

  async countMonthlyAnalyses(userId) {
    const analyses = await readJson<SavedAnalysis[]>(ANALYSES_FILE, []);
    const current = monthKey(new Date().toISOString());
    return analyses.filter(
      (item) => item.userId === userId && monthKey(item.createdAt) === current
    ).length;
  },

  async saveAnalysis(record) {
    const analyses = await readJson<SavedAnalysis[]>(ANALYSES_FILE, []);
    const filtered = analyses.filter((item) => item.id !== record.id);
    filtered.unshift(record);
    await writeJson(ANALYSES_FILE, filtered);
  },

  async listAnalyses(userId) {
    const analyses = await readJson<SavedAnalysis[]>(ANALYSES_FILE, []);
    return analyses
      .filter((item) => item.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  },

  async getAnalysis(userId, id) {
    const analyses = await readJson<SavedAnalysis[]>(ANALYSES_FILE, []);
    return (
      analyses.find((item) => item.userId === userId && item.id === id) ?? null
    );
  },

  async getAnalysisByShareToken(token) {
    const analyses = await readJson<SavedAnalysis[]>(ANALYSES_FILE, []);
    return analyses.find((item) => item.shareToken === token) ?? null;
  },
};
