"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const endpoint =
        mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "signup" ? { name, email, password } : { email, password }
        ),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-line bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-violet focus:ring-2 focus:ring-violet/25 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-line bg-paper p-7 shadow-seal"
    >
      {mode === "signup" && (
        <div>
          <label className="mb-2 block text-sm font-medium text-ink">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>
      )}

      <div>
        <label className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          placeholder="At least 6 characters"
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
        />
      </div>

      {error && (
        <p className="rounded-xl border border-red-soft bg-red-soft px-3 py-2 text-sm text-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="gradient-bg w-full rounded-xl px-4 py-3 font-semibold text-white shadow-glow transition-all hover:brightness-110 focus:ring-2 focus:ring-violet/40 focus:outline-none disabled:opacity-60"
      >
        {loading
          ? "Please wait..."
          : mode === "signup"
            ? "Create account"
            : "Log in"}
      </button>
    </form>
  );
}
