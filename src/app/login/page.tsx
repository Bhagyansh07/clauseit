import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your ClauseIt account.",
};

export default function Login() {
  return (
    <section className="mx-auto flex max-w-6xl flex-1 items-center px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Log in is coming soon
        </h1>
        <p className="mt-4 text-muted">
          Logging in goes live in the next phase of the build, alongside account
          sign-up and your document history.
        </p>
        <Link
          href="/signup"
          className="mt-8 inline-block rounded-lg bg-navy px-6 py-3 font-semibold text-paper transition-colors hover:bg-navy-light"
        >
          Learn about plans instead
        </Link>
      </div>
    </section>
  );
}
