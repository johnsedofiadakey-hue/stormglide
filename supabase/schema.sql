-- ─────────────────────────────────────────────────────────────────────────────
-- STORMGLIDE Portal — Supabase Schema
-- Run this once in your Supabase project: SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- ── QUOTES TABLE ─────────────────────────────────────────────────────────────
create table if not exists quotes (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz default now(),

  -- Client info
  name        text not null,
  company     text not null,
  email       text not null,
  phone       text not null,

  -- What they want
  product_id   text,           -- matches products.js id field
  product_name text not null,
  quantity     text,
  message      text,
  service_type text,           -- 'product' | 'lcl' | 'fcl' | 'air' | '3pl'

  -- Admin fields
  status       text default 'new',  -- 'new' | 'read' | 'replied' | 'closed'
  admin_notes  text,
  replied_at   timestamptz
);

-- Allow anyone to INSERT (public quote form), but only admin service key can read
alter table quotes enable row level security;

create policy "Anyone can submit a quote"
  on quotes for insert
  with check (true);

create policy "Service role can read all quotes"
  on quotes for select
  using (auth.role() = 'service_role');

create policy "Service role can update quotes"
  on quotes for update
  using (auth.role() = 'service_role');

-- ── PRODUCTS TABLE (for admin-managed catalog) ────────────────────────────────
-- When a product exists in this table it OVERRIDES the static data in products.js
-- Leave this empty to use the static catalog. Add rows here to override/extend.
create table if not exists products_override (
  id           text primary key,  -- same as products.js id
  visible      boolean default true,
  availability text,
  admin_notes  text,
  updated_at   timestamptz default now()
);

alter table products_override enable row level security;

create policy "Service role manages product overrides"
  on products_override for all
  using (auth.role() = 'service_role');

-- ── SHIPMENTS TABLE ──────────────────────────────────────────────────────────
create table if not exists shipments (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz default now(),
  client_name  text not null,
  client_email text,
  cargo_desc   text,
  mode         text,            -- 'sea_lcl' | 'sea_fcl' | 'air'
  origin       text default 'China',
  destination  text default 'Tema, Ghana',
  bl_number    text,
  eta          date,
  status       text default 'booked',
  -- 'booked' | 'origin_port' | 'in_transit' | 'destination_port' | 'customs' | 'delivered'
  status_note  text,
  updated_at   timestamptz default now()
);

alter table shipments enable row level security;

create policy "Service role manages shipments"
  on shipments for all
  using (auth.role() = 'service_role');

-- ── INDEXES ───────────────────────────────────────────────────────────────────
create index on quotes (status, created_at desc);
create index on quotes (product_id);
create index on shipments (status, eta);
