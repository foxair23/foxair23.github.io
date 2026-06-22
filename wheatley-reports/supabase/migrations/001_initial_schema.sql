-- Wheatley STR Reporting — Initial Schema
-- Run against your Supabase project via the SQL editor or CLI.

-- ───────────────────────────────────────────────
-- Properties
-- ───────────────────────────────────────────────
create table if not exists properties (
  id                      uuid primary key default gen_random_uuid(),
  name                    text not null,
  address                 text,
  status                  text not null default 'owned' check (status in ('prospective', 'owned')),
  purchase_price          numeric(12,2),
  mortgage_total_monthly  numeric(10,2),
  mortgage_pi             numeric(10,2),
  mortgage_escrow         numeric(10,2),
  go_live_date            date,
  created_at              timestamptz not null default now()
);

-- ───────────────────────────────────────────────
-- Reservations (from Hospitable)
-- ───────────────────────────────────────────────
create table if not exists reservations (
  id              uuid primary key default gen_random_uuid(),
  property_id     uuid not null references properties(id) on delete cascade,
  hospitable_id   text unique not null,
  channel         text,
  check_in        date not null,
  check_out       date not null,
  nights          int not null,
  status          text not null default 'confirmed',
  host_payout     numeric(10,2),
  cleaning_fee    numeric(10,2),
  guest_name      text,
  created_at      timestamptz not null default now()
);

create index if not exists idx_reservations_property_id on reservations(property_id);
create index if not exists idx_reservations_check_out   on reservations(check_out);
create index if not exists idx_reservations_status      on reservations(status);

-- ───────────────────────────────────────────────
-- Expense categories (reference taxonomy)
-- ───────────────────────────────────────────────
create table if not exists expense_categories (
  id              uuid primary key default gen_random_uuid(),
  subcategory     text not null,
  parent_category text not null,
  default_bucket  text not null check (default_bucket in ('operating','buildout','debt_service')),
  tax_deductible  boolean,
  typical_frequency text
);

-- ───────────────────────────────────────────────
-- Expenses
-- ───────────────────────────────────────────────
create table if not exists expenses (
  id              uuid primary key default gen_random_uuid(),
  property_id     uuid not null references properties(id) on delete cascade,
  date            date not null,
  amount          numeric(12,2) not null,
  category        text not null,
  subcategory     text,
  vendor          text,
  notes           text,
  bucket          text not null default 'operating'
                    check (bucket in ('operating','buildout','debt_service')),
  is_recurring    boolean not null default true,
  tax_deductible  boolean,
  source          text not null default 'manual'
                    check (source in ('import','manual')),
  import_batch_id text,
  flag_for_review boolean not null default false,
  created_at      timestamptz not null default now()
);

create index if not exists idx_expenses_property_id on expenses(property_id);
create index if not exists idx_expenses_date        on expenses(date);
create index if not exists idx_expenses_bucket      on expenses(bucket);

-- ───────────────────────────────────────────────
-- Capital contributions (feeds Total Invested Capital)
-- ───────────────────────────────────────────────
create table if not exists capital_contributions (
  id          uuid primary key default gen_random_uuid(),
  property_id uuid not null references properties(id) on delete cascade,
  date        date not null,
  amount      numeric(12,2) not null,
  type        text not null check (type in ('down_payment','closing_costs','buildout','other')),
  notes       text,
  source      text not null default 'manual' check (source in ('manual','expense_sync')),
  expense_id  uuid references expenses(id) on delete set null,
  created_at  timestamptz not null default now()
);

create index if not exists idx_capital_property_id on capital_contributions(property_id);

-- ───────────────────────────────────────────────
-- Underwriting (deal model / pro-forma)
-- ───────────────────────────────────────────────
create table if not exists underwriting (
  id                uuid primary key default gen_random_uuid(),
  property_id       uuid not null references properties(id) on delete cascade,
  purchase_price    numeric(12,2),
  down_payment_pct  numeric(5,4),
  loan_amount       numeric(12,2),
  interest_rate     numeric(5,4),
  term_years        int,
  closing_costs     numeric(12,2),
  rehab_cost        numeric(12,2),
  design_cost       numeric(12,2),
  revenue_low       numeric(12,2),
  revenue_mid       numeric(12,2),
  revenue_high      numeric(12,2),
  scenario_default  text not null default 'mid' check (scenario_default in ('low','mid','high')),
  created_at        timestamptz not null default now()
);

create table if not exists underwriting_opex (
  id              uuid primary key default gen_random_uuid(),
  underwriting_id uuid not null references underwriting(id) on delete cascade,
  line_item       text not null,
  monthly_amount  numeric(10,2) not null,
  category        text,
  subcategory     text
);

-- ───────────────────────────────────────────────
-- Settings
-- ───────────────────────────────────────────────
create table if not exists settings (
  id                  uuid primary key default gen_random_uuid(),
  property_id         uuid references properties(id) on delete cascade,
  key                 text not null,
  value               text,
  updated_at          timestamptz not null default now(),
  unique(property_id, key)
);

-- ───────────────────────────────────────────────
-- Seed: default property (Wheatley Court)
-- ───────────────────────────────────────────────
insert into properties (
  id, name, address, status,
  purchase_price, mortgage_total_monthly, mortgage_pi, mortgage_escrow
) values (
  '00000000-0000-0000-0000-000000000001',
  'Wheatley Court',
  '82801 Wheatley Court, Indio CA 92201',
  'owned',
  830000.00,
  6592.62,
  4812.75,   -- P&I (from amort schedule; escrow split needs confirmation)
  1779.87    -- escrow = total − P&I (placeholder until mortgage statement confirmed)
)
on conflict do nothing;

-- ───────────────────────────────────────────────
-- Seed: expense taxonomy (PRD §9)
-- ───────────────────────────────────────────────
insert into expense_categories (subcategory, parent_category, default_bucket, tax_deductible, typical_frequency) values
  ('Maintenance & Repairs',                          'Property Operations',  'operating',     true,  'as-needed'),
  ('Cleaning & Turnover',                            'Property Operations',  'operating',     true,  'per-booking'),
  ('Utility Contracts (pool/pest/landscape)',         'Recurring Services',   'operating',     true,  'monthly'),
  ('Essential Utilities',                            'Utilities & Services', 'operating',     true,  'monthly'),
  ('Internet & Media',                               'Utilities & Services', 'operating',     true,  'monthly'),
  ('Consumables & Supplies',                         'Guest Amenities',      'operating',     true,  'as-needed'),
  ('Platform Fees & Commissions',                    'Marketing & Bookings', 'operating',     true,  'per-booking'),
  ('Insurance',                                      'Financial & Legal',    'operating',     true,  'monthly'),
  ('Property Taxes & Fees (incl. TOT/TBID, STR permit)', 'Financial & Legal','operating',    true,  'monthly'),
  ('Management Fees',                                'Management',           'operating',     true,  'monthly'),
  ('Transportation / Meals / Lodging / Admin',       'Owner Travel & Admin', 'operating',     true,  'as-needed'),
  ('Taxes (LLC, state)',                             'Taxes',                'operating',     true,  'annual'),
  ('Mortgage',                                       'Mortgage',             'debt_service',  null,  'monthly'),
  ('Major Construction/Remodel',                     'Capital Improvements', 'buildout',      false, 'one-time'),
  ('Property Upgrades',                              'Capital Improvements', 'buildout',      false, 'one-time'),
  ('Interior Design/Consulting',                     'Design & Staging',     'buildout',      true,  'one-time'),
  ('Furniture & Decor',                              'Design & Staging',     'buildout',      null,  'one-time')
on conflict do nothing;

-- ───────────────────────────────────────────────
-- Seed: underwriting model (PRD §9b)
-- ───────────────────────────────────────────────
insert into underwriting (
  id, property_id,
  purchase_price, down_payment_pct, loan_amount, interest_rate, term_years,
  closing_costs, rehab_cost, design_cost,
  revenue_low, revenue_mid, revenue_high, scenario_default
) values (
  '00000000-0000-0000-0001-000000000001',
  '00000000-0000-0000-0000-000000000001',
  830000.00, 0.15, 705500.00, 0.0725, 30,
  11000.00, 120000.00, 39900.00,
  150000.00, 175000.00, 190000.00, 'mid'
)
on conflict do nothing;

-- Underwriting opex assumptions (monthly, per pro-forma)
insert into underwriting_opex (underwriting_id, line_item, monthly_amount, category, subcategory) values
  ('00000000-0000-0000-0001-000000000001', 'Property Taxes',       823.00,  'Financial & Legal', 'Property Taxes & Fees (incl. TOT/TBID, STR permit)'),
  ('00000000-0000-0000-0001-000000000001', 'Insurance',            500.00,  'Financial & Legal', 'Insurance'),
  ('00000000-0000-0000-0001-000000000001', 'Utilities',            450.00,  'Utilities & Services', 'Essential Utilities'),
  ('00000000-0000-0000-0001-000000000001', 'Cleaning / Turnover',  800.00,  'Property Operations', 'Cleaning & Turnover'),
  ('00000000-0000-0000-0001-000000000001', 'Pool Service',         200.00,  'Recurring Services', 'Utility Contracts (pool/pest/landscape)'),
  ('00000000-0000-0000-0001-000000000001', 'Pest Control',          75.00,  'Recurring Services', 'Utility Contracts (pool/pest/landscape)'),
  ('00000000-0000-0000-0001-000000000001', 'PMS / Hospitable',      99.00,  'Marketing & Bookings', 'Platform Fees & Commissions'),
  ('00000000-0000-0000-0001-000000000001', 'PriceLabs',             20.00,  'Marketing & Bookings', 'Platform Fees & Commissions'),
  ('00000000-0000-0000-0001-000000000001', 'Airbnb Service Fee',  1000.00,  'Marketing & Bookings', 'Platform Fees & Commissions'),
  ('00000000-0000-0000-0001-000000000001', 'CapEx Reserve',        500.00,  'Property Operations', 'Maintenance & Repairs'),
  ('00000000-0000-0000-0001-000000000001', 'STR Permit',            50.00,  'Financial & Legal', 'Property Taxes & Fees (incl. TOT/TBID, STR permit)')
on conflict do nothing;
