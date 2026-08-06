import Link from "next/link";

export default function FinalCta() {
  return (
    <section className="bg-navy text-paper">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <h2 className="font-display text-3xl font-semibold">
          Have a document you do not trust?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-paper/75">
          Get the breakdown before you sign. Free for your first 10 documents
          every month.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/upload"
            className="rounded-lg bg-gold px-6 py-3 font-semibold text-navy transition-colors hover:bg-gold-dark"
          >
            Upload a document
          </Link>
          <Link
            href="/signup"
            className="rounded-lg border border-paper/30 px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper/10"
          >
            Create a free account
          </Link>
        </div>
      </div>
    </section>
  );
}
