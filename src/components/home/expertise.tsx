import {
  Banknote,
  FileWarning,
  HelpCircle,
  RefreshCcw,
  Scale,
  ScanSearch,
} from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import { FadeIn } from "@/components/ui/fade-in";

const categories = [
  {
    icon: ScanSearch,
    title: "Hidden clauses",
    text: "Terms buried deep that change what the document really says.",
    chip: "from-emerald-700 to-teal-600",
  },
  {
    icon: Banknote,
    title: "Unfair charges",
    text: "Fees, interest, and amounts that cost more than they should.",
    chip: "from-violet to-gold",
  },
  {
    icon: FileWarning,
    title: "Penalties and bonds",
    text: "Exit penalties, service bonds, and fines you were not told about.",
    chip: "from-teal-700 to-emerald-800",
  },
  {
    icon: RefreshCcw,
    title: "Auto-renewal",
    text: "Contracts that renew themselves and raise your cost every year.",
    chip: "from-gold to-amber",
  },
  {
    icon: Scale,
    title: "One-sided liability",
    text: "Clauses that put most of the risk on you and little on them.",
    chip: "from-emerald-600 to-teal-500",
  },
  {
    icon: HelpCircle,
    title: "Jurisdiction traps",
    text: "Places that decide your disputes before they even happen.",
    chip: "from-teal-600 to-gold",
  },
];

export default function Expertise() {
  return (
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <FadeIn>
            <SectionLabel>The kind of issues ClauseIt looks for</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
              Built to catch what{" "}
              <span className="gradient-text">small print hides</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-lg leading-8 text-ink-soft">
              This is not a generic summary tool. Every document is reviewed for
              the specific terms that often create risk, cost, or confusion for
              ordinary readers.
            </p>
          </FadeIn>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <FadeIn key={category.title} delay={0.06 * i}>
              <div
                className={`group h-full rounded-2xl bg-gradient-to-br ${category.chip} p-6 text-white shadow-paper transition-transform duration-200 hover:-translate-y-1 hover:shadow-glow`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <category.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/85">{category.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
