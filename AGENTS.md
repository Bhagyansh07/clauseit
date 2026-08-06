# AGENTS.md — Master Rules for ClauseIt

This file is automatically read by AI coding tools (opencode, Claude Code, Cursor, etc.). Every AI change to this repo MUST follow the rules below. The user is the driver; the AI is the tool. Do not skip any rule for speed. The result must look and behave like a production-grade professional application, not a quick AI-generated prototype.

---

## 1. Project Overview

**ClauseIt** — "Read the clauses, not the fine print."

Upload any document (PDF, DOCX, TXT, or camera photo) and get a plain-language analysis: hidden clauses, unfair charges, risk score, key dates. Built for India, where loan, insurance, rent, and job documents hide important terms in small print.

**Core flow:**
1. Upload page (drag-drop PDF/DOCX/TXT, paste text, camera scan)
2. Server extracts text / sends to Gemini for analysis
3. Analysis page: plain-language summary, flagged clauses, charges, risk score, key dates
4. User can download the analysis as a report or share a link

**Language:** UI and analysis in English with an English/Hindi toggle. Brand and copy are English-only. Hindi is a feature (analysis output), never the brand.

**Pages (minimum):** Home, How it works, Pricing, Login/Signup, Upload, Analysis, Dashboard (history), Account/Billing.

**Plans:**
- Free: 10 documents/month
- Pro: ₹99/month
- Premium: ₹599/month (includes "Lawyer review" section, currently a placeholder "coming soon")

---

## 2. Tech Stack & Decisions

| Layer | Choice | Note |
|---|---|---|
| Framework | Next.js 15 App Router + TypeScript | Single full-stack app |
| Styling | Tailwind CSS + shadcn/ui | Customized tokens, NOT default look |
| Icons | Lucide | Never emoji-as-icons |
| Auth / DB / Storage | Supabase | Auth managed by Supabase, Postgres DB, Storage for files |
| AI | Google Gemini API | Long context for full documents; call from server only |
| Payments | Razorpay | India: UPI, cards, subscriptions |
| Rate limiting | Upstash | Protect AI endpoints |
| Monitoring | Sentry | Production error visibility |
| Deploy | Vercel | Free tier, env vars set in dashboard |

**Hard rule: ask before adding ANY new dependency or library.** If a small feature can be done with existing tools, do it without a new package.

---

## 3. Design System (Locked)

Do not invent a new look per page. Use these tokens consistently everywhere. See the "Minimalist Modern" spec (the source of truth given by the user).

| Token | Value |
|---|---|
| Background | `#FAFAFA` (light, near-white) |
| Foreground | `#0F172A` (slate-900) |
| Muted surface | `#F1F5F9` |
| Muted text | `#64748B` |
| Accent | `#0052FF` |
| Accent secondary | `#4D7CFF` |
| Border | `#E2E8F0` |
| Card | `#FFFFFF` |
| Signature gradient | `linear-gradient(to right, #0052FF, #4D7CFF)` (135deg for icon fills) |
| Headings font | Calistoga (display serif) |
| Body font | Inter |
| Labels font | JetBrains Mono (uppercase, 0.15em tracking) |
| Radius | `rounded-xl` for cards, `rounded-2xl` for feature cards |
| Icons | Lucide only |

**Signature elements (use deliberately, not everywhere):**
- Gradient text effect (`background-clip: text`) for one key word per section headline.
- Inverted dark sections (`bg-foreground text-background`) with `.dot-pattern` texture and radial glows.
- Section-label pills: mono uppercase, `border-accent/30 bg-accent/5`, pulsing accent dot.
- Gradient icon backgrounds (small rounded squares with the signature gradient).
- Gradient-border featured cards (2px stroke via nested div) — used for the highlighted pricing tier and the "what it means" card.
- Primary buttons: gradient fill, `rounded-xl`, `h-12`/`h-14`, hover `-translate-y-0.5` + `shadow-accent-lg` + `brightness-110`, focus `ring-2 ring-accent ring-offset-2`.
- Entrance animations via Framer Motion only (`FadeIn` wrapper: fade up 28px, easeOut `[0.16,1,0.3,1]`, 0.7s, stagger 0.1s, `once: true`), respecting `prefers-reduced-motion`. Continuous CSS animations (rotating ring 60s, floating cards ±10px, pulsing dot 2s) are fine but sparse.

**Layout rules:**
- Every page has exactly one `<h1>`, then a clear hierarchy.
- Responsive on real breakpoints (mobile first), not resize-and-hope.
- Loading, empty, and error states designed intentionally (skeletons, empty-state illustrations, error cards) — not bare spinners.

---

## 4. Security Checklist (Non-negotiable)

### 4.1 Environment & Secrets
- ALL API keys, DB URIs, JWT secrets go in `.env`. Never hardcoded anywhere in source.
- `.env` is in `.gitignore` from the very first commit. Verify it is never pushed.
- `.env.example` exists with dummy placeholder values.
- Secrets are backend-only. Never expose keys to frontend/client-side code.
- AI/LLM API calls go through the backend only. The frontend never talks directly to the AI provider.
- This stays true for any future frontend-only demo, browser extension, or widget: always proxy AI calls through a backend/serverless function.

### 4.2 Authentication & Authorization
- Auth is managed by Supabase Auth (passwords hashed by Supabase, JWT sessions). Do NOT roll a custom password/bcrypt implementation.
- Every protected API route verifies the session server-side. Never rely on frontend checks alone.
- Enable Supabase Row Level Security (RLS) on all tables: users can only access their own rows.
- Rate-limit login/signup endpoints (Upstash) to prevent brute-force.

### 4.3 API Abuse Prevention
- Rate-limit the document upload/analysis endpoint per user (protects the AI bill).
- Enforce the free-tier limit (10/month) SERVER-SIDE in the database. Never trust a frontend counter.
- Validate file type, size, and content on the backend before processing: reject anything that is not PDF/DOCX/TXT/image; cap file size at 10MB; check file magic bytes, not just extension.
- Sanitize all user input. Use parameterized queries (Supabase client) to prevent injection.

### 4.4 Data Handling
- Uploaded documents may contain sensitive personal/financial data.
- Do NOT persist raw files by default. Store the extracted analysis. Only save the raw file if the user explicitly opts in.
- HTTPS only in production (Vercel default). Use secure, httpOnly cookies for sessions.
- CORS restricted to the real frontend domain, never `*`.

### 4.5 Error Handling
- Central error handler on API routes. No raw stack traces or DB errors exposed to the client in production.
- No leftover `console.log`s or dead code in the final build.

---

## 5. Engineering Discipline & Workflow

- **Planning first.** MVP scope is defined in `docs/FEATURE_SPEC.md` ("in MVP" vs "later"). Do not add features the user did not ask for.
- **Build incrementally.** Smallest working version first, then iterate. One feature at a time: build it, test it in the browser, then move on. Never build 10 features at once without testing.
- **Keep files/functions small.** Every file and function under ~200 lines, single responsibility. No dumping ground files.
- **Explain before making changes.** State what you are about to change and why before editing.
- **Ask before adding dependencies.** New library only after the user approves.
- **Git discipline:**
  - `git init` + first commit from day one (docs first).
  - One branch per feature (e.g. `feature-upload`, `feature-ai-analysis`, `feature-auth`). Merge to `main` only when stable.
  - Commit frequently, with meaningful messages. No single giant "final commit".
  - Never commit secrets; keep `.env` out of history.
- **Understand, do not blindly paste.** The user reads the code. If the user asks "explain this line/function", explain it clearly. The user runs terminal basics (git, npm install, env) manually sometimes — support that, do not automate everything.
- **Deploy early and often.** Do not sit on localhost for months. Get a working version deployed (Vercel), then iterate on it.
- **Security from the start.** Auth, validation, rate limiting are part of every phase, not a retrofit at the end.

---

## 6. Anti-"AI-tells" Polish Checklist

Before any feature or release is considered done, verify:

### 6.1 Visible
- Custom domain in production, not default `vercel.app`.
- Blue + white palette everywhere; no purple gradients, no default Tailwind/shadcn look.
- Real screenshots of the actual product on the landing page; no generic AI stock photos.
- No fake testimonials, fake visitor/customer counts, or invented social proof. Empty is better than fake.
- No broken buttons. No `href="#"` dead links. Every interactive element works.
- Sparse scroll animations; signature elements (gradient text, inverted sections, gradient borders) used deliberately, not everywhere.
- At least 5 real pages: Home, How it works, Pricing, Login/Signup, Dashboard. No one-page site.
- Logo: icon + wordmark, not text-only. Favicon present (`favicon.ico` + app icon).
- Specific, concrete copy. No "AI-powered platform" fluff. Say exactly what it does.
- Privacy Policy and Terms & Conditions pages exist (essential for a legal-document tool).
- No emojis used as icons or in UI. Emoji in marketing copy only if explicitly requested.
- No builder-tool badges ("Made with ..."). No leftover boilerplate branding.
- Natural writing voice; no em-dash overuse, no generic AI phrasing.

### 6.2 Hidden / Technical
- SSR / proper meta tags (View Source is not empty).
- Custom branded 404 page.
- No default boilerplate signatures (clean `index.html`-equivalent titles/meta; remove "Next.js starter" text).
- Unique `<title>` per page. Meta description + `og:image` per page.
- `lang` attribute set (`en`, and `hi` on Hindi pages).
- Meaningful `alt` text on all images.
- Source maps disabled in production builds.
- Zero console errors/warnings in DevTools on every page.
- Small JS bundle: remove unused imports, code-split, optimize images.
- Optional but nice: schema.org JSON-LD (e.g. `SoftwareApplication`) on the homepage.

**Release gate instruction:** Before considering a phase complete, run through this checklist: unique titles/meta/og:image per page, single H1 per page, alt text everywhere, no console errors, no exposed source maps, minimal bundle size, custom 404, favicon present, no builder branding. Review all copy — remove generic AI-sounding phrasing and em-dash overuse; write in a natural, specific voice.

---

## 7. Build Phases

| Phase | Scope |
|---|---|
| 1. Foundation | Next.js scaffold, design tokens, layout, Home/How it works/Pricing pages, favicon, 404, meta |
| 2. Upload + Analysis | Upload UI, file validation, text extraction, Gemini analysis, analysis page (flags, risk score, dates, EN/HI toggle) |
| 3. Auth + Quota | Supabase auth, login/signup, server-side 10/month quota, dashboard/history |
| 4. Payments | Razorpay subscription, upgrade flow, plan gating |
| 5. Premium | Lawyer section placeholder ("coming soon") |
| 6. Polish + Deploy | Report download, share links, Privacy/T&C, SEO/meta/og, Sentry, Vercel deploy, custom domain |

**Post-MVP (later, only on request):** compare two documents, deadline/renewal reminders, WhatsApp share, advanced per-document checklists (loan, insurance, rent, job offer).

---

## 8. Do-Not-Do List

- Do not hardcode any API key or secret in source files.
- Do not commit `.env`.
- Do not add features the user did not ask for.
- Do not over-architect. Smallest working version first.
- Do not create files over ~200 lines. Split them.
- Do not make one giant "final commit". Commit often with clear messages.
- Do not leave dead code, unused imports, commented-out blocks, or `console.log`s.
- Do not ship fake reviews, fake counts, or fake testimonials.
- Do not use default AI-generated hero text ("Empowering the future of...").
- Do not use purple gradients or default starter styling.
- Do not break responsive layout on mobile.
- Do not expose AI calls from the client side, ever.
- Do not trust frontend checks for quotas or authorization.
