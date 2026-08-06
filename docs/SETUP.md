# ClauseIt — Setup Guide

Everything needed to set up the project from a fresh machine. Accounts you must create yourself; this guide tells you exactly what to do.

---

## 0. Local Tools (already checked on this machine)

| Tool | Version |
|---|---|
| Node.js | v24 (installed) |
| npm | v11 (installed) |
| Git | v2.54 (installed) |
| VS Code | install if not present |

VS Code workflow:
1. Open VS Code → File → Open Folder → select this project folder.
2. Built-in terminal: `Terminal` → `New Terminal`.
3. Keep two terminals: one for `npm run dev`, one for git commands.

Run terminal basics manually sometimes (git, npm install, env). Do not automate every command through an AI tool. This keeps you independent and interview-ready.

---

## 1. GitHub Account

1. Sign up at https://github.com (free).
2. Install Git for Windows if missing (check with `git --version`).
3. Configure once:
   ```
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
   ```
4. Create a new private repo (later, in Phase 1) and push the project to it.
   - Rule: `.env` must NEVER be pushed. It is in `.gitignore`.
   - Rule: one feature per branch, merge to `main` only when stable.

---

## 2. Google AI Studio (Gemini API key)

1. Go to https://aistudio.google.com and sign in with a Google account.
2. Create an API key (Project → Get API key → Create).
3. Copy the key into `.env` as `GEMINI_API_KEY`.
4. Free tier is enough to start. It is used for document analysis.

**Safety rule:** this key lives ONLY in `.env` (server-side). The browser never sees it. AI calls happen in `app/api/` routes only.

---

## 3. Supabase (Auth + DB + Storage)

1. Sign up at https://supabase.com (free).
2. Create a new project. Copy the Project URL and keys:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (public, safe in frontend — it is a public client key)
   - `SUPABASE_SERVICE_ROLE_KEY` (SECRET — server-only, never expose)
3. Enable Auth → Email provider.
4. Later (Phase 3): enable Row Level Security (RLS) on all tables. Default is locked down.

**Safety rule:** the anon key is public by design. The service role key is a superuser key — server-side only, never in client code.

---

## 4. Razorpay (Payments)

1. Sign up at https://razorpay.com with a business/individual account.
2. Get keys from Dashboard → Settings → API Keys:
   - `RAZORPAY_KEY_ID` (public)
   - `RAZORPAY_KEY_SECRET` (SECRET — server-only)
3. For local testing, enable test mode and use test card details from the Razorpay docs.
4. Configure the webhook URL later (Phase 4) with a webhook secret:
   - `RAZORPAY_WEBHOOK_SECRET`

---

## 5. Upstash (Rate limiting)

1. Sign up at https://upstash.com (free tier).
2. Create a Redis database, copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
3. Used to rate-limit login/signup and the AI analysis endpoint (protects the AI bill).

---

## 6. Vercel (Deploy)

1. Sign up at https://vercel.com and connect the GitHub repo.
2. Deploy: import repo → set env vars (same as `.env`) in the dashboard → deploy.
3. Production env vars are set ONLY in the Vercel dashboard, never committed.
4. Custom domain (Phase 6): buy `clauseit.in` / `clauseit.com` (Namecheap/GoDaddy, ~₹400–800/yr) and point it at Vercel.

---

## 7. Sentry (Monitoring)

1. Sign up at https://sentry.io (free tier).
2. Create a project, copy the DSN:
   - `SENTRY_DSN`
3. Connected in Phase 6 so you can say "I have visibility into errors in production."

---

## `.env` final shape

Copy `.env.example` to `.env` and fill values:

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
SENTRY_DSN=
```

`.env` is never committed. `.env.example` (with blank/dummy values) IS committed.
