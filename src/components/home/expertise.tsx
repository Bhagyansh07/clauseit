import {
  Banknote,
  FileWarning,
  HelpCircle,
  RefreshCcw,
  Scale,
  ScanSearch,
} from "lucide-react";

const categories = [
  {
    icon: ScanSearch,
    title: "Hidden clauses",
    text: "Terms buried deep that change what the document really says.",
  },
  {
    icon: Banknote,
    title: "Unfair charges",
    text: "Fees, interest, and amounts that cost more than they should.",
  },
  {
    icon: FileWarning,
    title: "Penalties and bonds",
    text: "Exit penalties, service bonds, and fines you were not told about.",
  },
  {
    icon: RefreshCcw,
    title: "Auto-renewal",
    text: "Contracts that renew themselves and raise your cost every year.",
  },
  {
    icon: Scale,
    title: "One-sided liability",
    text: "Clauses that put most of the risk on you and little on them.",
  },
  {
    icon: HelpCircle,
    title: "Jurisdiction traps",
    text: "Places that decide your disputes before they even happen.",
  },
];

export default function Expertise() {
  return (
    <section className="bg-navy text-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold">
            The analysis, up close
          </h2>
          <p className="mt-4 text-paper/75">
            ClauseIt is not a keyword search. The full document is read and each
            clause is weighed the way a careful reader would weigh it. Every
            finding is sorted into one of six categories:
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-paper/10 bg-navy-light/60 p-6"
            >
              <category.icon className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold">
                {category.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-paper/65">
                {category.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
