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
    <section className="dot-pattern relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-[150px]" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        <div className="max-w-2xl">
          <FadeIn>
            <SectionLabel inverted>The kind of issues ClauseIt looks for</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="mt-6 font-display text-3xl leading-tight tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Built to catch what{" "}
              <span className="gradient-text">small print hides</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-5 text-lg leading-8 text-background/70">
              This is not a generic summary tool. Every document is reviewed for
              the specific terms that often create risk, cost, or confusion for
              ordinary readers.
            </p>
          </FadeIn>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <FadeIn key={category.title} delay={0.06 * i}>
              <div className="h-full rounded-2xl border border-background/10 bg-background/5 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-accent/50">
                <span className="gradient-bg flex h-11 w-11 items-center justify-center rounded-xl shadow-accent">
                  <category.icon className="h-5 w-5 text-white" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-display text-xl">{category.title}</h3>
                <p className="mt-2 text-sm leading-6 text-background/60">
                  {category.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
