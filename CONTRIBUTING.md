# Contributing to ClauseIt

Thanks for looking at ClauseIt. This is a solo-maintained portfolio project, but
issues and pull requests are welcome.

Before you start, read [`AGENTS.md`](AGENTS.md) — it is the engineering and
security rulebook for this repo, and it applies to human contributors and AI
tools alike. The short version:

- Keep files and functions small (under ~200 lines).
- Never hardcode secrets; everything goes in `.env` (see `.env.example`).
- AI calls stay server-side; the browser never talks to the provider.
- Validate file type, size and magic bytes on the backend.
- Ask before adding a new dependency.

## Getting started

```bash
npm install
cp .env.example .env        # Windows: copy .env.example .env
# add GEMINI_API_KEY (and Supabase keys if you want auth)
npm run dev                 # http://localhost:3000
```

Full setup for every service is in [`docs/SETUP.md`](docs/SETUP.md).

## Before you open a pull request

Run the checks and make sure they pass:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

Open the PR against `main`. Do not merge with red CI.

## Reporting bugs / requesting features

Open an issue with steps to reproduce, expected vs actual behaviour, and your
browser/OS. Do not paste real documents or personal data into an issue.

## License

By contributing, you agree that your contributions are licensed under the
project's [MIT License](LICENSE).
