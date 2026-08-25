// ============================================================
// 共享类型定义
// ============================================================

export type Strategy =
  | "closed-ecosystem"   // 闭源生态派
  | "open-source"        // 开源普惠派
  | "vertical"           // 垂直行业派
  | "hardware"           // 硬件入口派
  | "sovereign";         // 主权 AI 派

export interface Company {
  id: string;
  name: string;
  country_code: string;
  country_name: string;
  strategy: Strategy;
  founded_year: number;
  hq_city: string;
  website: string;
  description: string;
  flag_model: Model;
  metrics: Metrics;
}

export interface Model {
  id: string;
  display_name: string;
  release_date: string;
  is_open_source: boolean;
  license: string;
  total_params: string;
  active_params: string | null;
  context_length: string;
  architecture: string;
  modality: string[];
  hf_org: string | null;
  notes: string;
}

export interface Metrics {
  aa_index: number | null;
  aa_rank: number | null;
  lmarena_elo: number | null;
  mau_millions: number | null;
  mau_source: string;
}

export interface Country {
  code: string;
  name: string;
  is_ai_priority: boolean;
  policy_label: string;
  annual_investment_usd: string;
  key_companies: string[];
}

export interface DailySnapshot {
  company_id: string;
  model_id: string;
  snapshot_date: string; // YYYY-MM-DD
  hf_total_downloads: number | null;
  hf_total_likes: number | null;
  hf_model_count: number | null;
  aa_index: number | null;
  aa_rank: number | null;
  lmarena_elo: number | null;
  mau_millions: number | null;
  mau_source: string | null;
}

export interface SourceMeta {
  source: "huggingface" | "github" | "artificial-analysis" | "lmarena" | "manual";
  fetched_at: string;
  ok: boolean;
  error?: string;
}
