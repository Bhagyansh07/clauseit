"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function getInitialTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    window.localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Switch theme"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper text-ink-soft transition-colors hover:border-violet hover:text-violet focus:outline-none focus:ring-2 focus:ring-violet/40"
    >
      {mounted ? (
        theme === "dark" ? (
          <Sun className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Moon className="h-4 w-4" aria-hidden="true" />
        )
      ) : (
        <span className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  );
}
