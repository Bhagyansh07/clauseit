import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-navy bg-navy text-paper/70">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6">
        <p className="text-sm">ClauseIt — understand the document before you sign it.</p>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/privacy" className="transition-colors hover:text-paper">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-paper">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
