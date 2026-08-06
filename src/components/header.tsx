"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ProfileMenu } from "@/components/profile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { getCurrentUser } from "@/lib/auth";

export default function Header() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setUser(getCurrentUser()), 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="ClauseIt home" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-semibold text-ink-soft md:flex">
          <Link
            href="/signup"
            className="transition-colors hover:text-violet"
          >
            Analyze
          </Link>
          <Link href="/how-it-works" className="transition-colors hover:text-violet">
            How it works
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-violet">
            Plans
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-navy transition-opacity hover:opacity-70"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="gradient-bg rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
