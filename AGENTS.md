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

Do not invent a new look per page. Use these tokens consistently everywhere. See the "PW.live-style revamp" spec (the source of truth given by the user). This REPLACED the earlier "Notary's Desk" navy/gold spec AND the "Minimalist Modern" electric-blue spec; do not reintroduce old gold-on-navy or electric-blue looks. The site is a vibrant, eye-catching, professional consumer look: deep navy + violet/fuchsia gradients, bold Poppins display type, colorful gradient tiles, dark gradient hero with animated counters, gradient CTAs.

| Token | Value | Use |
|---|---|---|
| Navy | `#1E1B4B` | Dark hero/footer backgrounds, dark panels |
| Navy-light | `#6D28D9` | Secondary depth on navy, hover fills |
| Violet | `#7C3AED` | Primary accent: links, icons, chips, active states |
| Fuchsia | `#DB2777` | Secondary accent (gradient partner of violet) |
| Gold | `#F59E0B` | Trust accent: Hindi lines, stamp, small highlights |
| Gold-bright | `#FBBF24` | Bright accent on dark/violet backgrounds |
| Parchment | `#F8F7FF` | Page background |
| Paper | `#FFFFFF` | Cards |
| Ink | `#1E1B33` | Body text |
| Ink-soft | `#6B6887` | Secondary / meta text |
| Red / red-soft | `#E11D48` / `#FDE8EF` | Serious severity |
| Amber / amber-soft | `#D97706` / `#FEF3C7` | Warning severity |
| Sage / sage-soft | `#059669` / `#D1FAE5` | Note / safe severity |
| Line | `#E9E6F6` | Hairlines, borders, dashed dividers |
| Headings font | Poppins (500–800) | `font-display` |
| Body font | Inter (400–600) + Noto Sans Devanagari (400–700) | `font-sans` (both scripts) |
| Labels font | JetBrains Mono (400–500, uppercase) | `font-mono` |
| Radius | `rounded-xl`/`rounded-2xl` on cards and inputs | — |
| Container | `max-w-6xl` for marketing pages, `max-w-4xl` for reading | — |
| Icons | Lucide only | — |

**Signature elements (use deliberately, not everywhere):**
- **Gradient text/bg:** the violet→fuchsia linear gradient (`#7C3AED` → `#DB2777`) via `.gradient-text`, `.gradient-bg`, `.gradient-border` utilities (defined in `globals.css`). Used for CTAs, key headline words, the Pro pricing card, the 404 number.
- **Dark hero:** navy `#1E1B4B` section with blurred violet/fuchsia glow blobs (`blur-3xl`), gradient badge pill, gradient CTA buttons, and an animated stats band (Counter component: `useInView` + `requestAnimationFrame`, 900ms ease-out cubic, one shot, respects `prefers-reduced-motion`).
- **Color tiles:** full-gradient cards with white text (expertise grid). Allowed gradients: violet→fuchsia, fuchsia→rose-500, amber→orange-500, violet→sky-500, sky-500→violet, fuchsia→violet. Default Tailwind palette colors may accompany the custom tokens.
- **Stamp:** a circular, gold-ringed, tilted seal (`#FBBF24`) overlapping the top-right edge of the verdict card. Lands once (rotate + scale animation), never loops. Disabled under `prefers-reduced-motion`. See `src/components/analyze/stamp.tsx`.
- **Risk gauge:** a radial/arc gauge (`src/components/analyze/risk-gauge.tsx`), NEVER a progress bar. Severity-colored by level.
- **Verdict card:** the only inverted card on the site — gradient navy→violet with a fuchsia blur blob, white text, gold-bright Hindi subline, radial gauge, overlapping stamp.
- **Flag cards:** white card with a THIN LEFT border in the severity color (4px), a soft pill badge (`bg-*-soft text-*`), the quoted clause in italic, a dashed divider, then the plain explanation and a one-line action in violet with a fuchsia arrow.
- **Severity colors are reserved for flags.** Violet/fuchsia gradients are reserved for CTAs, brand, and key highlights. Never use plain blue.
- **Language toggle:** two-button pill, violet border, active side fills the gradient with white text.
- **Section labels:** violet pill with a pulsing violet dot + mono uppercase (~0.15em tracking).
- **Buttons:** primary = `gradient-bg` white text with `shadow-glow`, hover `brightness-110`. Secondary = white/paper fill, `border-line`, hover `border-violet`. Focus rings `ring-violet/25`.
- **Cards:** white or parchment on the page background, `rounded-2xl`, `shadow-paper`, optional `hover:-translate-y-1` lift. Pro highlight cards use full `gradient-bg` with white text.
- **Motion:** entrance animations and counter one-shot; stamp lands once. NO continuous pulse (the single pulsing section-label dot is allowed), NO rotating rings, NO floating cards. Respect `prefers-reduced-motion`.

**Layout rules:**
- Every page has exactly one `<h1>`, then a clear hierarchy.
- Responsive on real breakpoints (mobile first), not resize-and-hope.
- Loading, empty, and error states designed intentionally (paper cards, bordered empty states, soft severity-colored error notes) — not bare spinners.
- Keep every component under ~200 lines; split `Stamp`, `RiskGauge`, `VerdictCard`, `FlagCard`, `FlagList` into their own files.

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
- Navy + violet/fuchsia palette everywhere; no plain-blue default Tailwind look, no old Notary gold-on-navy scheme.
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
- Do not use plain-blue default Tailwind styling, the old electric-blue palette, or the old navy/gold scheme.
- Do not break responsive layout on mobile.
- Do not expose AI calls from the client side, ever.
- Do not trust frontend checks for quotas or authorization.
