import { ShieldCheck, FileText, Languages } from "lucide-react";

const points = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    text: "Your file is analyzed and not kept by default.",
    chip: "from-violet to-fuchsia",
  },
  {
    icon: FileText,
    title: "Plain-language output",
    text: "Facts, risks, and deadlines in everyday language.",
    chip: "from-fuchsia to-amber",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Read the result in either language with no confusion.",
    chip: "from-violet to-amber",
  },
];

export default function TrustBar() {
  return (
    <section className="border-b border-line bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {points.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 rounded-2xl border border-line bg-paper p-5 shadow-paper"
            >
              <span
                className={`bg-gradient-to-br ${point.chip} flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white`}
              >
                <point.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-display font-bold text-navy">{point.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
