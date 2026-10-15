# Security Policy

## Supported versions

`main` is the only supported branch and the only branch that deploys.

## Reporting a vulnerability

Please **do not** open a public issue for security problems. Report privately
via GitHub's [Security Advisories](../../security/advisories/new) for this
repository, or email the maintainer. Include a description, impact, steps to
reproduce and any suggested fix. You can expect an acknowledgement within a few
days.

## How secrets are handled

No credentials live in the repository. Everything is read from environment
variables (`AUTH_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`,
`RAZORPAY_*`, `UPSTASH_*`, `SENTRY_DSN`). Secret keys are never prefixed with
`NEXT_PUBLIC_` and never shipped to the browser. `.env` is git-ignored;
`.env.example` is the template.

If you believe a secret was committed, rotate it immediately and report it
privately.

## Application security posture

- AI calls are made server-side only; the browser never talks to the provider.
- File type, size (10MB cap) and magic bytes are validated on the server.
- Free-plan quotas and plan gating are enforced server-side, never trusted from
  the browser.
- Auth endpoints are rate limited, and the rate limiter fails **closed** on
  unexpected errors.
- Raw uploaded files are not persisted by default (see [`PRIVACY.md`](PRIVACY.md)).

The full rulebook is in [`AGENTS.md`](AGENTS.md).
