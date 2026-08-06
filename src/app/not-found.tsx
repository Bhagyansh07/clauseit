import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center justify-center bg-navy px-4 py-24 text-center">
      <div>
        <p className="font-display text-6xl font-semibold text-gold">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-paper">
          This page does not exist
        </h1>
        <p className="mt-3 text-paper/70">
          Even ClauseIt could not find a clause to read here.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-gold px-6 py-3 font-semibold text-navy transition-colors hover:bg-gold-dark"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
