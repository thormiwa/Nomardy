create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email text unique not null,
  nationality text not null,
  currency_preference text not null default 'NGN',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  country_code text not null,
  city text not null,
  visa_requirements jsonb not null default '{}'::jsonb,
  budget_estimates jsonb not null default '{}'::jsonb,
  itinerary_templates jsonb not null default '[]'::jsonb,
  last_verified_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint destinations_country_city_unique unique (country_code, city)
);

create table if not exists public.visa_guides (
  id uuid primary key default gen_random_uuid(),
  origin_country text not null,
  destination_country text not null,
  requirement_type text not null check (
    requirement_type in ('visa-free', 'visa-on-arrival', 'e-visa', 'embassy-visa')
  ),
  documents_required jsonb not null default '[]'::jsonb,
  step_by_step_guide text not null,
  official_links jsonb not null default '[]'::jsonb,
  allowed_stay_days integer,
  last_updated_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint visa_guides_origin_destination_unique unique (origin_country, destination_country)
);

create table if not exists public.saved_trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  destination text not null,
  start_date date,
  end_date date,
  budget_tier text not null check (budget_tier in ('budget', 'mid', 'luxury')),
  itinerary jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists idx_users_nationality on public.users (nationality);
create index if not exists idx_destinations_country_code on public.destinations (country_code);
create index if not exists idx_visa_guides_origin_country on public.visa_guides (origin_country);
create index if not exists idx_saved_trips_user_id on public.saved_trips (user_id);

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

drop trigger if exists set_destinations_updated_at on public.destinations;
create trigger set_destinations_updated_at
before update on public.destinations
for each row
execute function public.set_updated_at();

drop trigger if exists set_visa_guides_updated_at on public.visa_guides;
create trigger set_visa_guides_updated_at
before update on public.visa_guides
for each row
execute function public.set_updated_at();

drop trigger if exists set_saved_trips_updated_at on public.saved_trips;
create trigger set_saved_trips_updated_at
before update on public.saved_trips
for each row
execute function public.set_updated_at();

alter table public.users enable row level security;
alter table public.saved_trips enable row level security;
alter table public.destinations enable row level security;
alter table public.visa_guides enable row level security;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users
for select
using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.users;
create policy "Users can insert own profile"
on public.users
for insert
with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile"
on public.users
for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Users manage own saved trips" on public.saved_trips;
create policy "Users manage own saved trips"
on public.saved_trips
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Anyone can read destinations" on public.destinations;
create policy "Anyone can read destinations"
on public.destinations
for select
using (true);

drop policy if exists "Anyone can read visa guides" on public.visa_guides;
create policy "Anyone can read visa guides"
on public.visa_guides
for select
using (true);
