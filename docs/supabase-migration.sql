-- ClauseIt schema. Run in Supabase SQL Editor.
-- Uses the service role key server-side (bypasses RLS), so RLS below is
-- defense-in-depth for the anon key. Keep it locked down.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  plan text not null default 'free'
    check (plan in ('free', 'pro', 'premium')),
  created_at timestamptz not null default now()
);

create table if not exists public.analyses (
  id uuid primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  summary text,
  risk_level text,
  risk_score numeric,
  analysis jsonb not null default '{}'::jsonb,
  share_token text unique,
  created_at timestamptz not null default now()
);

create index if not exists analyses_user_created_idx
  on public.analyses (user_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.analyses enable row level security;

create policy "profiles select own"
  on public.profiles for select using (auth.uid() = id);
create policy "profiles update own"
  on public.profiles for update using (auth.uid() = id);

create policy "analyses select own"
  on public.analyses for select using (auth.uid() = user_id);
create policy "analyses insert own"
  on public.analyses for insert with check (auth.uid() = user_id);
create policy "analyses update own"
  on public.analyses for update using (auth.uid() = user_id);

-- Create a profile row automatically on signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
