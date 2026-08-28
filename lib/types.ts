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

  // 参数估计增强字段（闭源模型必填，开源可选）
  param_estimate?: ParamEstimate;
}

export interface ParamEstimate {
  value: string;              // 中位数估计，如 "1.76T"
  ci_low: string;             // 90% 下界，如 "1.2T"
  ci_high: string;            // 90% 上界，如 "2.5T"
  methods: ("pricing" | "ikp" | "memorization" | "config" | "official")[];  // 使用的估计方法
  confidence: "high" | "medium" | "low";  // 置信度
  last_updated: string;       // YYYY-MM-DD
}

export interface Metrics {
  aa_index: number | null;
  aa_rank: number | null;
  lmarena_elo: number | null;

  // MAU 相关（支持多源代理指标三角验证）
  mau_millions: number | null;           // 最终融合后的 MAU（百万）
  mau_source: string;                    // 主要来源标注，如 "Sensor Tower 2026-05 | OpenRouter 12% | HF 2.7B dl"
  mau_breakdown?: MauBreakdown;          // 详细拆解（可选，用于审计）

  // 采用度综合得分 0-100（用于排序/对比）
  adoption_score?: number;

  // 权威 Benchmark 排名（新增）
  benchmark_ranks?: BenchmarkRanks;
}

export interface MauBreakdown {
  hf_downloads?: number;          // HF 累计下载量
  hf_likes?: number;              // HF 点赞数
  openrouter_share_pct?: number;  // OpenRouter 市场份额 %
  aa_index?: number;              // Artificial Analysis 综合指数
  lmarena_elo?: number;           // LMArena Elo
  official_mau?: number;          // 官方披露 MAU
  sensor_tower_mau?: number;      // Sensor Tower 估算 MAU
  similarweb_visits_m?: number;   // SimilarWeb 月访问量（百万）
  weights_used?: Record<string, number>;  // 融合权重，如 {hf: 0.3, openrouter: 0.3, aa: 0.2, elo: 0.2}
}

export interface BenchmarkRanks {
  livebench_overall?: number;     // LiveBench 综合排名
  swebench_verified_pct?: number; // SWE-bench Verified 通过率 %
  superclue_total?: number;       // SuperCLUE 总分
  mmlu_pro?: number;              // MMLU-Pro 准确率 %
  gpqa_diamond?: number;          // GPQA Diamond 准确率 %
  bbh?: number;                   // BBH 准确率 %
  math_aime?: number;             // MATH/AIME 竞赛题准确率 %
  humaneval_plus?: number;        // HumanEval+ 通过率 %
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

  // HF 指标
  hf_total_downloads: number | null;
  hf_total_likes: number | null;
  hf_model_count: number | null;

  // Artificial Analysis
  aa_index: number | null;
  aa_rank: number | null;

  // LMArena
  lmarena_elo: number | null;

  // MAU 与采用度
  mau_millions: number | null;
  mau_source: string | null;
  adoption_score: number | null;          // 0-100 综合采用度得分

  // 权威 Benchmark 快照（新增）
  livebench_rank: number | null;
  swebench_verified_pct: number | null;
  superclue_score: number | null;
  mmlu_pro_pct: number | null;
  gpqa_diamond_pct: number | null;
  bbh_pct: number | null;
  math_aime_pct: number | null;
  humaneval_plus_pct: number | null;

  // 参数估计快照（新增）
  param_estimate_value: string | null;    // 如 "1.76T"
  param_estimate_ci_low: string | null;
  param_estimate_ci_high: string | null;
  param_estimate_methods: string | null;  // JSON 数组字符串
  param_estimate_confidence: string | null;
}

export interface SourceMeta {
  source: "huggingface" | "github" | "artificial-analysis" | "lmarena" | "manual";
  fetched_at: string;
  ok: boolean;
  error?: string;
}
