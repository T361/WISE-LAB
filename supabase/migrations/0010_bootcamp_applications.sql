-- ---------------------------------------------------------------------------
-- Migration 0010: bootcamp_applications
--
-- A typed, column-per-field table for the WISE Lab Micro-Entrepreneurship
-- Bootcamp application form (/apply/enterprise). Stores every question as
-- a proper column so admins can filter, sort, and export without parsing
-- jsonb. The existing generic `submissions` table continues to receive a
-- parallel insert (via the normal DynamicForm path) for backward compat
-- with the admin dashboard; this table is the source of truth for the
-- bootcamp-specific admin view.
-- ---------------------------------------------------------------------------

create table if not exists public.bootcamp_applications (
  -- surrogate key
  id               uuid primary key default gen_random_uuid(),

  -- Section 1: Personal Information
  email                text not null,
  full_name            text not null,
  cnic                 char(13) not null,
  disability_cnic      text,
  minority             text,
  dob                  text,
  mobile               char(11) not null,
  whatsapp             char(11) not null,
  marital_status       text,
  education            text,
  city_preference      text,
  language             text,

  -- Section 2: Current Address
  current_district     text,
  current_address      text,

  -- Section 3: Permanent Address
  permanent_district   text,
  urban_rural          text,
  permanent_address    text,

  -- Section 4: Digital Readiness
  phone_access         text,
  apps_used            text[],

  -- Section 5: Your Business
  business_name        text,
  business_duration    text,
  business_registration text,
  business_sector      text,
  business_sector_other text,
  average_earnings     text,
  paid_workers         text,
  unpaid_workers       text,
  equipment_value      text,
  sales_channel        text[],
  record_keeping       text,

  -- Section 6: Description and Goals
  business_practices   text[],
  business_description text,
  business_difference  text,
  bootcamp_reason      text,
  business_vision      text,

  -- Section 7: Use of Grant
  grant_use            text,
  grant_expenses       text,
  grant_need           text,

  -- Section 8: How did you hear
  source               text,
  source_other         text,

  -- Section 9: Declaration
  declaration_consent  boolean not null default false,

  -- Metadata
  submitted_at         timestamptz not null default now(),
  user_agent           text,
  locale               text
);

-- Indexes for common admin queries
create index if not exists bootcamp_applications_email_idx
  on public.bootcamp_applications (email);
create index if not exists bootcamp_applications_cnic_idx
  on public.bootcamp_applications (cnic);
create index if not exists bootcamp_applications_city_idx
  on public.bootcamp_applications (city_preference);
create index if not exists bootcamp_applications_submitted_at_idx
  on public.bootcamp_applications (submitted_at desc);

-- Row-Level Security
alter table public.bootcamp_applications enable row level security;

-- Anyone can submit
create policy "bootcamp_applications: public insert"
  on public.bootcamp_applications for insert
  to anon, authenticated
  with check (true);

-- Only admins can read
create policy "bootcamp_applications: admin read"
  on public.bootcamp_applications for select
  to authenticated
  using (
    exists (select 1 from public.admin_profiles where id = auth.uid())
  );

-- Admins can update (for status/notes in future)
create policy "bootcamp_applications: admin update"
  on public.bootcamp_applications for update
  to authenticated
  using (
    exists (select 1 from public.admin_profiles where id = auth.uid())
  );
