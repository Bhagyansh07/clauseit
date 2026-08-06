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
    <section className="border-y border-line bg-paper">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {points.map((point) => (
            <div key={point.title} className="flex items-start gap-3 rounded border border-line bg-parchment px-4 py-4">
              <point.icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <div>
                <p className="font-semibold text-navy">{point.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
