export function captureError(err: unknown) {
  if (!process.env.SENTRY_DSN) return;
  import("@sentry/nextjs")
    .then((Sentry) => Sentry.captureException(err))
    .catch(() => {
      // Sentry is optional; never let telemetry take down a request
    });
}
