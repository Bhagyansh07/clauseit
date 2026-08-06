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
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="max-w-2xl">
          <FadeIn>
            <SectionLabel>The kind of issues ClauseIt looks for</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight text-navy sm:text-4xl">
              Built to catch what <span className="text-gold">small print hides</span>
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
              <div className="h-full rounded border border-line bg-parchment p-6 shadow-paper">
                <category.icon className="h-6 w-6 text-gold" aria-hidden="true" />
                <h3 className="mt-4 font-display text-lg font-semibold text-navy">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{category.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
