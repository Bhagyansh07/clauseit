import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your free ClauseIt account. 10 documents a month, no card needed.",
};

export default function Signup() {
  return (
    <section className="mx-auto flex max-w-6xl flex-1 items-center px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl font-semibold text-navy">
          Accounts are almost ready
        </h1>
        <p className="mt-4 text-muted">
          Sign-up goes live in the next phase of the build. You will need only an
          email and a password. Free plan: 10 documents a month, no card required.
        </p>
        <a
          href="mailto:hello@clauseit.in"
          className="mt-8 inline-block rounded-lg bg-navy px-6 py-3 font-semibold text-paper transition-colors hover:bg-navy-light"
        >
          Notify me when ready
        </a>
      </div>
    </section>
  );
}
