"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { ProfileMenu } from "@/components/profile-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useUser } from "@/lib/auth";

const NAV = [
  { href: "/upload", label: "Analyze" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Plans" },
];

export default function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="ClauseIt home" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-semibold text-ink-soft md:flex">
          {NAV.map((item) => {
            const active =
              item.href === "/upload"
                ? pathname === "/upload" || pathname === "/signup"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors hover:text-violet ${
                  active ? "text-violet" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
                href="/upload"
                className="gradient-bg rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all hover:brightness-110"
              >
                Analyze
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
