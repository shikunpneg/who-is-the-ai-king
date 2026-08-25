-- ============================================================
-- LLM Tracker · Supabase Postgres schema
-- 在 Supabase SQL Editor 中执行一次
-- ============================================================

-- 1. 公司表：核心实体
create table if not exists companies (
  id text primary key,                 -- slug: openai / alibaba / deepseek
  name text not null,
  country_code text not null,          -- ISO 3166-1 alpha-2
  country_name text not null,
  strategy text not null,              -- closed-ecosystem / open-source / vertical / hardware / sovereign
  founded_year int,
  hq_city text,
  website text,
  description text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. 模型表：每个公司可能有多款旗舰
create table if not exists models (
  id text primary key,                 -- deepseek-v4-pro / gpt-5-5
  company_id text references companies(id) on delete cascade,
  display_name text not null,
  release_date date,
  is_open_source boolean not null,
  license text,                        -- MIT / Apache 2.0 / Llama 4 Community / Closed
  total_params text,                   -- "1.6T" / "10B" / "未公开"
  active_params text,                  -- "49B" / null if dense
  context_length text,                 -- "1M" / "128K"
  architecture text,                   -- MoE+DSA / Dense / Hybrid MoE
  modality text[],                    -- {text, image, audio, video}
  hf_org text,                         -- 关联的 HuggingFace 组织
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 3. 每日 snapshot：核心可观测数据
create table if not exists daily_snapshots (
  id bigserial primary key,
  company_id text references companies(id) on delete cascade,
  model_id text references models(id) on delete cascade,
  snapshot_date date not null,

  -- HuggingFace 一手
  hf_total_downloads bigint,
  hf_total_likes int,
  hf_top_model_downloads bigint,
  hf_top_model_likes int,
  hf_model_count int,

  -- 第三方 benchmark
  aa_index int,                        -- Artificial Analysis Intelligence Index
  aa_rank int,
  lmarena_elo int,
  lmarena_rank int,

  -- 用户量（多源，手工/爬取）
  mau_millions numeric(6,2),          -- 数值化 11 = 11 亿
  mau_source text,                     -- AICPB / QuestMobile / Sensor Tower

  snapshot_at timestamptz default now(),
  unique(company_id, model_id, snapshot_date)
);

-- 4. 国家聚合视图（每日刷新）
create table if not exists country_snapshots (
  id bigserial primary key,
  country_code text not null,
  country_name text not null,
  snapshot_date date not null,

  company_count int,
  model_count int,
  total_hf_downloads bigint,
  total_hf_likes int,
  total_mau_millions numeric(8,2),

  -- 政策环境
  is_ai_priority boolean,              -- 是否国家战略
  policy_label text,                   -- "国家战略"/"积极扶持"/"场景切入"
  annual_investment_usd text,          -- "6500 亿美元 (4 巨头)"

  unique(country_code, snapshot_date)
);

-- 5. 索引
create index if not exists idx_daily_company on daily_snapshots(company_id, snapshot_date desc);
create index if not exists idx_daily_model on daily_snapshots(model_id, snapshot_date desc);
create index if not exists idx_country on country_snapshots(country_code, snapshot_date desc);
create index if not exists idx_model_company on models(company_id);

-- 6. RLS（公开只读）
alter table companies enable row level security;
alter table models enable row level security;
alter table daily_snapshots enable row level security;
alter table country_snapshots enable row level security;

drop policy if exists "public read" on companies;
create policy "public read" on companies for select using (true);
drop policy if exists "public read" on models;
create policy "public read" on models for select using (true);
drop policy if exists "public read" on daily_snapshots;
create policy "public read" on daily_snapshots for select using (true);
drop policy if exists "public read" on country_snapshots;
create policy "public read" on country_snapshots for select using (true);

-- 7. 种子数据钩子（人工整理）
-- 真实数据通过 lib/sources/manual.json 注入；
-- 自动化采集通过 cron job 写入 daily_snapshots
