import {
  CheckCircle2,
  Globe,
  Lock,
  Camera,
  Languages,
  Wallet,
} from "lucide-react";

const points = [
  {
    icon: Globe,
    title: "Built for India",
    text: "Made for loan, insurance, rent, and job documents. The terms that matter to Indian households, not generic templates.",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Both, on every result, written in simple language. No law-school vocabulary.",
  },
  {
    icon: Camera,
    title: "Works from a photo",
    text: "No printer, no scanner. Point your phone at the page and upload.",
  },
  {
    icon: Lock,
    title: "Your document is not stored",
    text: "Uploads are analyzed and discarded. We never keep a copy of your file by default.",
  },
  {
    icon: Wallet,
    title: "Free to start",
    text: "10 documents every month at no charge. No card required.",
  },
];

export default function WhyUnique() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-navy">
          Why ClauseIt
        </h2>
        <p className="mt-4 text-muted">
          A generic AI tool does not understand a Mumbai rent agreement or a
          Delhi home-loan foreclosure clause. ClauseIt is built around the
          reader, not the lawyer.
        </p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {points.map((point) => (
          <div key={point.title} className="flex gap-4">
            <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
            <div>
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-navy">
                <point.icon className="h-5 w-5 text-gold" aria-hidden="true" />
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted">{point.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
