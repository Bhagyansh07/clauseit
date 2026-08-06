"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FileUp, LayoutDashboard, LogOut, User } from "lucide-react";
import { logoutUser, type UserRecord } from "@/lib/auth";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/upload", label: "Analyze a document", icon: FileUp },
  { href: "/account", label: "Account", icon: User },
];

export function ProfileMenu({ user }: { user: UserRecord }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPopState() {
      setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  function handleSignOut() {
    logoutUser();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet/40"
      >
        <span
          aria-hidden="true"
          className="gradient-bg flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
        >
          {initials(user.name)}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-line bg-paper shadow-seal"
        >
          <div className="border-b border-line px-4 py-3">
            <p className="truncate text-sm font-bold text-navy">
              {user.name}
            </p>
            <p className="truncate text-xs text-ink-soft">{user.email}</p>
          </div>

          <div className="p-1.5">
            {ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-parchment hover:text-violet"
              >
                <item.icon className="h-4 w-4 text-violet" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
            <div className="my-1.5 border-t border-dashed border-line" />
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-red-soft hover:text-red"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
