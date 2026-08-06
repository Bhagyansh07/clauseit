export type Plan = "free" | "pro" | "premium";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  plan: Plan;
}

export interface SavedAnalysis {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  summary: string;
  riskLevel: string;
  riskScore: number;
  analysis: unknown;
}

const AUTH_KEY = "clauseit-users";
const CURRENT_USER_KEY = "clauseit-current-user";
const ANALYSES_KEY = "clauseit-analyses";

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function readUsers(): UserRecord[] {
  return readStorage<UserRecord[]>(AUTH_KEY, []);
}

function writeUsers(users: UserRecord[]) {
  writeStorage(AUTH_KEY, users);
}

export function getCurrentUser(): UserRecord | null {
  return readStorage<UserRecord | null>(CURRENT_USER_KEY, null);
}

export function setCurrentUser(user: UserRecord | null) {
  writeStorage(CURRENT_USER_KEY, user);
}

export function signupUser(name: string, email: string, password: string) {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedName || !trimmedEmail || !trimmedPassword) {
    throw new Error("Please fill in all fields.");
  }

  const users = readUsers();
  const exists = users.some((user) => user.email === trimmedEmail);
  if (exists) {
    throw new Error("An account with this email already exists.");
  }

  const newUser: UserRecord = {
    id: `${Date.now()}`,
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
    createdAt: new Date().toISOString(),
    plan: "free",
  };

  users.push(newUser);
  writeUsers(users);
  setCurrentUser(newUser);
  return newUser;
}

export function loginUser(email: string, password: string) {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    throw new Error("Please enter your email and password.");
  }

  const users = readUsers();
  const match = users.find(
    (user) => user.email === trimmedEmail && user.password === trimmedPassword
  );

  if (!match) {
    throw new Error("Invalid email or password.");
  }

  setCurrentUser(match);
  return match;
}

export function logoutUser() {
  setCurrentUser(null);
}

export function saveAnalysisForUser(saved: SavedAnalysis) {
  const all = readStorage<SavedAnalysis[]>(ANALYSES_KEY, []);
  const filtered = all.filter((item) => item.id !== saved.id);
  filtered.unshift(saved);
  writeStorage(ANALYSES_KEY, filtered);
}

export function getUserAnalyses(userId: string) {
  const all = readStorage<SavedAnalysis[]>(ANALYSES_KEY, []);
  return all.filter((item) => item.userId === userId);
}

export function getFreeUsageCount(userId: string) {
  const analyses = getUserAnalyses(userId);
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return analyses.filter((item) => item.createdAt.startsWith(currentMonth)).length;
}
