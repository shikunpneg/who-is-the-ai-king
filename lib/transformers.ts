// ============================================================
// 归一化：把 5 个数据源的结果映射到统一的 DailySnapshot
// ============================================================
import type { Company, DailySnapshot, ParamEstimate, MauBreakdown, BenchmarkRanks } from "./types";
import { fetchAllOrgStats, HFOrgStats } from "./sources/huggingface";
import { fetchAALeaderboard, AAModelRow } from "./sources/artificial-analysis";

export interface BuildResult {
  snapshots: DailySnapshot[];
  sources: { name: string; ok: boolean; count: number; error?: string }[];
  fetched_at: string;
}

/** 从 mau_breakdown 权重计算 adoption_score（0-100） */
function computeAdoptionScore(breakdown: MauBreakdown | undefined, baseMau: number | null): number {
  if (!breakdown || !baseMau) return 0;
  const weights = breakdown.weights_used || {};
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return 0;

  // 简单加权：MAU 越高分数越高，benchmark 分也按比例贡献
  let score = 0;
  if (breakdown.official_mau) score += (Math.log10(breakdown.official_mau + 1) / Math.log10(2000)) * 50;
  if (breakdown.sensor_tower_mau) score += (Math.log10(breakdown.sensor_tower_mau + 1) / Math.log10(2000)) * 20;
  if (breakdown.openrouter_share_pct) score += (breakdown.openrouter_share_pct / 20) * 15;
  if (breakdown.aa_index) score += (breakdown.aa_index / 100) * 10;
  if (breakdown.lmarena_elo) score += (breakdown.lmarena_elo / 1700) * 5;

  return Math.min(100, Math.round(score));
}

/** 从 benchmark_ranks 计算综合 benchmark 得分 */
function computeBenchmarkScore(ranks: BenchmarkRanks | undefined): number {
  if (!ranks) return 0;
  let score = 0;
  let count = 0;
  if (ranks.livebench_overall) { score += (100 - ranks.livebench_overall) / 100 * 20; count++; }
  if (ranks.swebench_verified_pct) { score += ranks.swebench_verified_pct / 100 * 20; count++; }
  if (ranks.mmlu_pro) { score += ranks.mmlu_pro / 100 * 20; count++; }
  if (ranks.gpqa_diamond) { score += ranks.gpqa_diamond / 100 * 15; count++; }
  if (ranks.bbh) { score += ranks.bbh / 100 * 15; count++; }
  if (ranks.math_aime) { score += ranks.math_aime / 100 * 5; count++; }
  if (ranks.humaneval_plus) { score += ranks.humaneval_plus / 100 * 5; count++; }
  return count > 0 ? Math.round(score / count * 100) / 100 : 0;
}

export async function buildDailySnapshots(
  companies: Company[]
): Promise<BuildResult> {
  const today = new Date().toISOString().slice(0, 10);
  const sources: BuildResult["sources"] = [];
  const sources_failed: string[] = [];

  // --- 1. HF: 拉每个公司的 HF org stats ---
  const hfOrgs = companies
    .map((c) => c.flag_model.hf_org)
    .filter((x): x is string => !!x);
  const uniqueOrgs = Array.from(new Set(hfOrgs));
  let hfStats: HFOrgStats[] = [];
  try {
    hfStats = await fetchAllOrgStats(uniqueOrgs);
    sources.push({ name: "huggingface", ok: true, count: hfStats.length });
  } catch (e) {
    sources.push({ name: "huggingface", ok: false, count: 0, error: (e as Error).message });
    sources_failed.push("huggingface");
  }
  const hfMap = new Map(hfStats.map((s) => [s.org, s]));

  // --- 2. AA: 拉取一次，按模型名匹配 ---
  let aaRows: AAModelRow[] = [];
  try {
    aaRows = await fetchAALeaderboard();
    sources.push({ name: "artificial-analysis", ok: true, count: aaRows.length });
  } catch (e) {
    sources.push({ name: "artificial-analysis", ok: false, count: 0, error: (e as Error).message });
    sources_failed.push("artificial-analysis");
  }
  const aaMap = new Map(aaRows.map((r) => [r.name.toLowerCase(), r]));

  // --- 3. 组装 snapshots（合并 seed 数据 + 实时抓取）---
  const snapshots: DailySnapshot[] = companies.map((c) => {
    const hf = c.flag_model.hf_org ? hfMap.get(c.flag_model.hf_org) : null;
    const aa = aaMap.get(c.flag_model.display_name.toLowerCase());

    // 合并 mau_breakdown：HF 数据覆盖
    const mau_breakdown: MauBreakdown | undefined = c.metrics.mau_breakdown
      ? { ...c.metrics.mau_breakdown }
      : undefined;
    if (hf && mau_breakdown) {
      mau_breakdown.hf_downloads = hf.total_downloads;
      mau_breakdown.hf_likes = hf.total_likes;
    }

    // 合并 benchmark_ranks：AA 数据覆盖
    const benchmark_ranks: BenchmarkRanks | undefined = c.metrics.benchmark_ranks
      ? { ...c.metrics.benchmark_ranks }
      : undefined;

    // 计算 adoption_score（基于 mau_breakdown 权重）
    const adoption_score = c.metrics.adoption_score ?? computeAdoptionScore(mau_breakdown, c.metrics.mau_millions);

    // param_estimate
    const paramEstimate: ParamEstimate | undefined = c.flag_model.param_estimate;

    return {
      company_id: c.id,
      model_id: c.flag_model.id,
      snapshot_date: today,

      // HF 指标
      hf_total_downloads: hf?.total_downloads ?? null,
      hf_total_likes: hf?.total_likes ?? null,
      hf_model_count: hf?.model_count ?? null,

      // Artificial Analysis
      aa_index: aa?.aa_index ?? c.metrics.aa_index ?? null,
      aa_rank: aa?.rank ?? c.metrics.aa_rank ?? null,

      // LMArena
      lmarena_elo: c.metrics.lmarena_elo ?? null,

      // MAU 与采用度
      mau_millions: c.metrics.mau_millions ?? null,
      mau_source: c.metrics.mau_source ?? null,
      adoption_score: adoption_score,

      // 权威 Benchmark 快照
      livebench_rank: benchmark_ranks?.livebench_overall ?? null,
      swebench_verified_pct: benchmark_ranks?.swebench_verified_pct ?? null,
      superclue_score: benchmark_ranks?.superclue_total ?? null,
      mmlu_pro_pct: benchmark_ranks?.mmlu_pro ?? null,
      gpqa_diamond_pct: benchmark_ranks?.gpqa_diamond ?? null,
      bbh_pct: benchmark_ranks?.bbh ?? null,
      math_aime_pct: benchmark_ranks?.math_aime ?? null,
      humaneval_plus_pct: benchmark_ranks?.humaneval_plus ?? null,

      // 参数估计快照
      param_estimate_value: paramEstimate?.value ?? null,
      param_estimate_ci_low: paramEstimate?.ci_low ?? null,
      param_estimate_ci_high: paramEstimate?.ci_high ?? null,
      param_estimate_methods: paramEstimate?.methods ? JSON.stringify(paramEstimate.methods) : null,
      param_estimate_confidence: paramEstimate?.confidence ?? null,
    };
  });

  return {
    snapshots,
    sources,
    fetched_at: new Date().toISOString(),
  };
}