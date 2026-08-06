"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { ProfileMenu } from "@/components/profile-menu";
import { getCurrentUser } from "@/lib/auth";

export default function Header() {
  const [user, setUser] = useState<ReturnType<typeof getCurrentUser> | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setUser(getCurrentUser()), 0);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="ClauseIt home" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-ink-soft sm:flex">
          <Link
            href={user ? "/upload" : "/login"}
            className="transition-colors hover:text-navy"
          >
            Analyze
          </Link>
          <Link href="/how-it-works" className="transition-colors hover:text-navy">
            How it works
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-navy">
            Plans
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user ? (
            <ProfileMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="text-sm font-medium text-navy transition-opacity hover:opacity-70"
            >
              Log in
            </Link>
          )}
          <Link
            href={user ? "/upload" : "/signup"}
            className="rounded border border-navy bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-navy-light"
          >
            {user ? "Upload" : "Get started"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
