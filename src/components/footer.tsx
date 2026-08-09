import Link from "next/link";

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

// Social links removed for now — add real profiles when available
// const socials = [
//   { label: "X (Twitter)", icon: AtSign, href: "https://twitter.com/clauseit_in" },
//   { label: "LinkedIn", icon: Globe, href: "https://linkedin.com/company/clauseit" },
//   { label: "GitHub", icon: MessageCircle, href: "https://github.com/clauseit" },
// ];

export default function Footer() {
  return (
    <footer className="border-t-4 border-transparent bg-navy-solid text-white/70 [border-image:linear-gradient(90deg,#1F6F67,#C18F3B)_1]">
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
