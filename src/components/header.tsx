import Link from "next/link";
import { Logo } from "@/components/logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="ClauseIt home" className="flex items-center">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-muted sm:flex">
          <Link href="/upload" className="transition-colors hover:text-ink">
            Upload
          </Link>
          <Link href="/how-it-works" className="transition-colors hover:text-ink">
            How it works
          </Link>
          <Link href="/pricing" className="transition-colors hover:text-ink">
            Pricing
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-ink transition-opacity hover:opacity-70"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-navy-light"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
