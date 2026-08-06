import Link from "next/link";

export default function Footer() {
  return (
    <footer className="dot-pattern relative overflow-hidden border-t border-foreground/10 bg-foreground text-background/70">
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <p className="text-sm">
          ClauseIt — understand the document before you sign it.
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/privacy" className="transition-colors hover:text-background">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-background">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
