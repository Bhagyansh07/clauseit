import Link from "next/link";
import { AtSign, Globe, MessageCircle } from "lucide-react";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Analyze a document", href: "/upload" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Pricing", href: "/pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Create an account", href: "/signup" },
      { label: "Log in", href: "/login" },
      { label: "Account", href: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

const socials = [
  { label: "X (Twitter)", icon: AtSign, href: "https://twitter.com" },
  { label: "LinkedIn", icon: Globe, href: "https://linkedin.com" },
  { label: "GitHub", icon: MessageCircle, href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="border-t-4 border-transparent bg-navy text-white/70 [border-image:linear-gradient(90deg,#7C3AED,#DB2777)_1]">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold text-white">
              Clause<span className="gradient-text">It</span>
            </p>
            <p className="mt-4 text-sm leading-6 text-white/60">
              Read the clauses, not the fine print. Plain-language analysis of
              your documents, in English and Hindi.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-colors hover:border-violet hover:text-white"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-gold-bright">
                {column.title}
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>© 2026 ClauseIt. Made for India.</p>
          <p>Not legal advice — for important decisions, ask a lawyer.</p>
        </div>
      </div>
    </footer>
  );
}
