import { ShieldCheck, FileText, Languages } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    text: "Your file is analyzed and not kept by default.",
  },
  {
    icon: FileText,
    title: "Plain-language output",
    text: "Facts, risks, and deadlines in everyday language.",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Read the result in either language with no confusion.",
  },
];

export default function TrustBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-3 rounded-xl border border-border bg-background px-4 py-4"
            >
              <span className="gradient-bg flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-accent">
                <point.icon className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <div>
                <p className="font-semibold text-foreground">{point.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
