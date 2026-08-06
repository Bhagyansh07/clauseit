"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { getCurrentUser } from "@/lib/auth";

export default function Header() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setUser(getCurrentUser()), 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="ClauseIt home" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-muted-foreground sm:flex">
          <Link href="/upload" className="transition-colors hover:text-foreground">
            Analyze
          </Link>
          <Link href="/how-it-works" className="transition-colors hover:text-foreground">
            How it works
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-foreground">
            Plans
          </Link>
          {user && (
            <>
              <Link href="/dashboard" className="transition-colors hover:text-foreground">
                Dashboard
              </Link>
              <Link href="/account" className="transition-colors hover:text-foreground">
                Account
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href="/account"
              className="text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              {user.name}
            </Link>
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-opacity hover:opacity-70"
            >
              Log in
            </Link>
          )}
          <Link
            href={user ? "/upload" : "/signup"}
            className="gradient-bg rounded-xl px-4 py-2 text-sm font-semibold text-accent-foreground shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg"
          >
            {user ? "Upload" : "Get started"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
