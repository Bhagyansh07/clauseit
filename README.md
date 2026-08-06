# ClauseIt

**Read the clauses, not the fine print.**

ClauseIt is an India-focused web app that reads your loan agreements, insurance policies, rent contracts, and job offers, then translates them into plain language. It flags the hidden clauses, unfair charges, and deadlines that were written to be missed, and gives you a clear risk score before you sign.

English and Hindi. Free to start. No lawyer required.

---

## Features

- Upload a PDF, DOCX, or TXT file, paste text, or photograph a page with your phone camera
- AI reads the entire document, including schedules, footnotes, and small print
- Plain-language summary in English and Hindi with one-click toggle
- Hidden clause and unfair charge detection, grouped by severity
- Every fee, penalty, and EMI amount extracted into a simple table
- Key dates: renewals, notice periods, lock-ins, and deadlines
- Risk score from 0 (very fair) to 10 (very risky)
- Download the analysis as a report
- Free tier: 10 documents per month

## How it works

1. **Upload** — drop the PDF, Word file, or a photo of the page.
2. **ClauseIt reads it** — every line, including the small print.
3. **You decide** — a plain-language summary, flagged clauses, charges, and a risk score.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + Lucide icons |
| AI | Google Gemini API (server-side only, `gemini-3.6-flash`) |
| PDF/Word extraction | unpdf, mammoth |
| Auth / DB / Storage | Supabase (in progress) |
| Payments | Razorpay (planned) |
| Rate limiting | Upstash (planned) |
| Monitoring | Sentry (planned) |
| Deploy | Vercel (planned) |

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and add your keys:

   ```bash
   cp .env.example .env
   ```

   At minimum, add a `GEMINI_API_KEY` (create one at https://aistudio.google.com). Full setup steps for every service are in [docs/SETUP.md](docs/SETUP.md).

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Project structure

```
src/
  app/            # Pages and API routes (App Router)
  components/     # UI components, split by feature
  lib/            # Types, file validation, text extraction, Gemini client
docs/             # Feature spec and setup guide
AGENTS.md         # Rules every AI tool follows while building this project
```

## Documentation

- [Feature spec](docs/FEATURE_SPEC.md) — page-by-page specification and phase plan
- [Setup guide](docs/SETUP.md) — accounts, keys, and environment setup
- [AGENTS.md](AGENTS.md) — engineering and security rules

## Roadmap

- [x] Foundation: brand, design system, home/how-it-works/pricing, 404, meta
- [x] Upload + analysis: file validation, extraction, Gemini analysis, results page
- [ ] Auth + quota: Supabase auth, 10/month server-side limit, dashboard
- [ ] Payments: Razorpay subscriptions and plan gating
- [ ] Premium: lawyer review section (coming soon)
- [ ] Polish + deploy: share links, Sentry, Vercel, custom domain

## License

[MIT](LICENSE)
