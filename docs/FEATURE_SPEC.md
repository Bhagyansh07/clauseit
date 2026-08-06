# ClauseIt — Feature Specification

**Tagline:** Read the clauses, not the fine print.

Upload any document and get a plain-language analysis: hidden clauses, unfair charges, risk score, and key dates. English brand; English + Hindi analysis output via a toggle.

---

## Pages

### 1. Home (`/`)
- Hero: name + tagline + one clear CTA ("Upload your document")
- Product screenshot (real, not stock)
- How it works (3 steps: Upload → We read it → You get the summary)
- Feature highlights: hidden clause flags, risk score, charges, Hindi toggle
- Pricing teaser linking to `/pricing`
- Footer with Privacy Policy / Terms links

### 2. How it works (`/how-it-works`)
- Step-by-step explanation of the flow
- Example: show a real snippet of "fine print" → plain-language translation
- FAQ section (plain, specific answers)

### 3. Pricing (`/pricing`)
| Plan | Price | Includes |
|---|---|---|
| Free | ₹0 | 10 documents/month |
| Pro | ₹99/month | Unlimited documents + report download + share links |
| Premium | ₹599/month | Everything in Pro + Lawyer review (coming soon) |

- CTA buttons route to signup/checkout. No dead buttons.

### 4. Login / Signup (`/login`, `/signup`)
- Supabase Auth (email + password). Google login optional later.
- Password handled by Supabase (hashed, never plain text).
- Login/signup endpoints rate-limited.

### 5. Upload (`/upload`)
- Drag-and-drop zone: PDF, DOCX, TXT, images (JPG/PNG).
- Paste-text box for plain text.
- Mobile camera capture button (accept `image/*` from camera).
- Client-side pre-check: type + size ≤ 10MB. Real validation repeats on the server.

### 6. Analysis (`/analyze/[id]`) — the main show
- Plain-language summary (top).
- Risk score meter: green / yellow / red, with a one-line reason.
- Section-by-section breakdown in plain language.
- Hidden clauses and charges: highlighted, each with a "what this means" callout.
- Charges/penalty/EMI extractor: a table of every fee, penalty, and amount found.
- Important dates: renewals, notice periods, deadlines.
- Language toggle: English ↔ Hindi (switches the displayed analysis; analysis is stored in both or regenerated on demand).
- Actions: Download report (PDF), Share link.

### 7. Dashboard (`/dashboard`)
- Document history (analysis only, not raw files unless opted in).
- Free-tier usage counter: X of 10 used this month (server-sourced).
- Upgrade card if on Free.

### 8. Account / Billing (`/account`)
- Profile, plan, Razorpay subscription management.

### 9. Static
- `/privacy`, `/terms` — required for a legal-document tool.
- `/404` — branded, not default.

---

## API Routes (all server-side)

| Route | Purpose | Protection |
|---|---|---|
| `POST /api/upload` | Validate file, extract text, save analysis job | Auth + rate limit + quota check |
| `POST /api/analyze` | Call Gemini, store analysis | Auth + rate limit + quota check |
| `GET /api/documents` | History list | Auth + RLS |
| `GET /api/documents/[id]` | Fetch one analysis | Auth + RLS |
| `POST /api/razorpay/checkout` | Create subscription order | Auth |
| `POST /api/razorpay/webhook` | Verify payment, activate plan | Signed webhook only |

AI is called ONLY from these server routes. The browser never receives a Gemini key.

---

## AI Analysis Output Schema (v1)

```json
{
  "summary": "Plain-language summary of the whole document",
  "risk": { "level": "low|medium|high", "score": 0-10, "reason": "one line" },
  "sections": [
    { "heading": "...", "plainMeaning": "...", "language": "original quote" }
  ],
  "flags": [
    { "type": "hidden_clause|unfair_charge|penalty|auto_renewal|liability",
      "quote": "original text",
      "explanation": "plain language",
      "severity": "info|warning|danger" }
  ],
  "charges": [
    { "name": "Processing fee", "amount": "₹500", "frequency": "one-time|monthly", "note": "..." }
  ],
  "dates": [
    { "label": "Auto-renewal", "date": "2026-12-31", "action": "Renew or cancel by" }
  ]
}
```

Storage: store this JSON per document. Store raw file only if the user opts in. Analysis is generated in the selected language; keep `language` field.

---

## Plans & Quota

- Free: 10 analyses/month, enforced server-side in the database (count by user + calendar month).
- Pro: unlimited, report download + share links unlocked.
- Premium: Pro features + lawyer placeholder.
- Plan gating checks are server-side. UI badges are display only.

---

## MVP vs Later

**In MVP (Phases 1–4):** upload → analysis → history → quota → report download → share link → payments.

**Later (only on request):** document comparison, renewal reminders, WhatsApp share, document-type-specific checklists (loan / insurance / rent / job offer), Google login.
