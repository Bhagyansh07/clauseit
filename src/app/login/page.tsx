import type { Metadata } from "next";
import Link from "next/link";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your ClauseIt account.",
};

export default function Login() {
  return (
    <section className="mx-auto flex max-w-3xl flex-1 items-center px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-md">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-navy">Log in</h1>
          <p className="mt-3 text-ink-soft">
            Access your uploads, analysis history, and saved reports.
          </p>
        </div>
        <div className="mt-8">
          <AuthForm mode="login" />
        </div>
        <p className="mt-5 text-center text-sm text-ink-soft">
          New here?{" "}
          <Link
            href="/signup"
            className="font-semibold text-violet underline decoration-fuchsia underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
