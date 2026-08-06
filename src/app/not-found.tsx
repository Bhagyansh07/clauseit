import Link from "next/link";

export default function NotFound() {
  return (
    <section className="dot-pattern relative flex flex-1 items-center justify-center overflow-hidden bg-foreground px-4 py-24 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-accent/20 blur-[150px]" />
      <div className="relative">
        <p className="gradient-text font-display text-7xl">404</p>
        <h1 className="mt-4 font-display text-2xl text-background">
          This page does not exist
        </h1>
        <p className="mt-3 text-background/70">
          Even ClauseIt could not find a clause to read here.
        </p>
        <Link
          href="/"
          className="gradient-bg mt-8 inline-block rounded-xl px-6 py-3 font-semibold text-white shadow-accent transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent-lg"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
