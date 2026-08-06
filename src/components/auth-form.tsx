"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, signupUser } from "@/lib/auth";

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
      if (mode === "signup") {
        signupUser(name, email, password);
        router.push("/login");
      } else {
        loginUser(email, password);
        router.push("/dashboard");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-ink placeholder:text-ink-soft/60 focus:border-gold focus:ring-2 focus:ring-gold/30 focus:outline-none";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded border border-line bg-paper p-6 shadow-paper"
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
        />
      </div>

      {error && (
        <p className="rounded-sm border border-red-soft bg-red-soft px-3 py-2 text-sm text-red">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded border border-navy bg-navy px-4 py-2.5 font-semibold text-paper transition-colors hover:bg-navy-light focus:ring-2 focus:ring-gold focus:outline-none disabled:opacity-60"
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
