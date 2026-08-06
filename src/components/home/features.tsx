import {
  CalendarClock,
  IndianRupee,
  Languages,
  ScanSearch,
  ShieldAlert,
  FileText,
} from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "Hidden clause detection",
    text: "Auto-renewal, one-sided liability, and jurisdiction traps are pulled out and shown in plain words.",
  },
  {
    icon: IndianRupee,
    title: "Charges and penalties",
    text: "Every fee, penalty, and EMI amount becomes a simple table with a plain explanation of when it applies.",
  },
  {
    icon: ShieldAlert,
    title: "Risk score",
    text: "Green, yellow, or red. One number that tells you how careful to be before you sign.",
  },
  {
    icon: CalendarClock,
    title: "Key dates",
    text: "Renewal dates, notice periods, and deadlines extracted so you never miss a cancel window.",
  },
  {
    icon: Languages,
    title: "English and Hindi",
    text: "Every result is written in both languages. Switch with one click.",
  },
  {
    icon: FileText,
    title: "Works with anything",
    text: "PDF, Word, plain text, or a photo you took of the page with your phone.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl font-semibold text-navy">
          What every document is hiding
        </h2>
        <p className="mt-4 text-muted">
          Loan agreements, insurance policies, and rent contracts are written
          for lawyers, not for the person signing them. ClauseIt changes that.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-line bg-white p-6"
          >
            <feature.icon className="h-6 w-6 text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-semibold text-navy">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
