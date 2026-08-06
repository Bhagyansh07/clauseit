import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create your free ClauseIt account. 10 documents a month, no card needed.",
};

export default function Signup() {
  return (
    <section className="mx-auto flex max-w-3xl flex-1 items-center px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-navy">
            Create your account
          </h1>
          <p className="mt-3 text-ink-soft">
            Start free with 10 analyses a month. Upgrade anytime.
          </p>
        </div>
        <div className="mt-8">
          <AuthForm mode="signup" />
        </div>
        <p className="mt-5 text-center text-sm text-ink-soft">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-violet underline decoration-fuchsia underline-offset-4"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
