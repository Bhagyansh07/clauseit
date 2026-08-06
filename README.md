# ClauseIt

**Read the clauses, not the fine print.**

Upload any document (PDF, Word, text, or a camera photo) and ClauseIt reads it for you. It breaks the document into plain language, flags hidden clauses and unfair charges, and gives you a clear risk score. No legalese, no small print, no surprises.

Built for India: documents like loan agreements, insurance policies, rent contracts, and job offers are full of small print that most people never read. ClauseIt makes them readable.

---

## Features

- Upload PDF, DOCX, TXT, or scan a document with your camera
- AI-powered analysis in plain language (English + Hindi)
- Hidden clause and charge detection, highlighted in the document
- Risk score (green / yellow / red)
- Fee, penalty, and EMI extraction
- Important dates (renewals, notice periods)
- Document history dashboard
- Free tier: 10 documents per month
- Pro plan: higher limits
- Premium plan: includes a lawyer review section (coming soon)

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui + Lucide icons |
| Auth / DB / Storage | Supabase |
| AI | Google Gemini API |
| Payments | Razorpay |
| Rate limiting | Upstash |
| Monitoring | Sentry |
| Deploy | Vercel |

## Getting Started

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in the values (see `docs/SETUP.md`)
3. Run the dev server: `npm run dev`
4. Open http://localhost:3000

## Documentation

- `AGENTS.md` — master rules every AI tool must follow while building this project
- `docs/FEATURE_SPEC.md` — page-by-page feature specification
- `docs/SETUP.md` — account and environment setup guide
