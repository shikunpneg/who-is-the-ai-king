// ============================================================
// 归一化：把 5 个数据源的结果映射到统一的 DailySnapshot
// ============================================================
import type { Company, DailySnapshot } from "./types";
import { fetchAllOrgStats, HFOrgStats } from "./sources/huggingface";
import { fetchAALeaderboard, AAModelRow } from "./sources/artificial-analysis";

export interface BuildResult {
  snapshots: DailySnapshot[];
  sources: { name: string; ok: boolean; count: number; error?: string }[];
  fetched_at: string;
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

  // --- 3. 组装 snapshots ---
  const snapshots: DailySnapshot[] = companies.map((c) => {
    const hf = c.flag_model.hf_org ? hfMap.get(c.flag_model.hf_org) : null;
    const aa = aaMap.get(c.flag_model.display_name.toLowerCase());
    return {
      company_id: c.id,
      model_id: c.flag_model.id,
      snapshot_date: today,
      hf_total_downloads: hf?.total_downloads ?? null,
      hf_total_likes: hf?.total_likes ?? null,
      hf_model_count: hf?.model_count ?? null,
      aa_index: aa?.aa_index ?? c.metrics.aa_index ?? null,
      aa_rank: aa?.rank ?? c.metrics.aa_rank ?? null,
      lmarena_elo: c.metrics.lmarena_elo ?? null,
      mau_millions: c.metrics.mau_millions ?? null,
      mau_source: c.metrics.mau_source ?? null,
    };
  });

  return {
    snapshots,
    sources,
    fetched_at: new Date().toISOString(),
  };
}
