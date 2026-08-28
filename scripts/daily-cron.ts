// scripts/daily-cron.ts
// 零数据库版：抓数据 → 提交到仓库本身 → 部署自动拉取
import { listCompanies } from "../lib/db";
import { buildDailySnapshots } from "../lib/transformers";
import { writeSnapshotsToRepo } from "../lib/snapshot-store";

async function main() {
  const t0 = Date.now();
  console.log(`[cron] 启动 ${new Date().toISOString()}`);

  const companies = await listCompanies();
  console.log(`[cron] 加载 ${companies.length} 家公司`);

  const { snapshots, sources, fetched_at } = await buildDailySnapshots(companies);
  for (const s of sources) {
    console.log(`  - ${s.name}: ${s.ok ? "✓" : "✗"} ${s.count}${s.error ? ` (${s.error})` : ""}`);
  }

  // 兜底：即使所有数据源失败，仍用 seed 数据生成 25 条 snapshot
  // 让 commit 一定发生（确保仓库有变化 → workflow 会真推一次）
  let rows = snapshots;
  if (rows.length === 0) {
    const today = new Date().toISOString().slice(0, 10);
    rows = companies.map((c) => ({
      company_id: c.id,
      model_id: c.flag_model.id,
      snapshot_date: today,
      hf_total_downloads: null,
      hf_total_likes: null,
      hf_model_count: null,
      aa_index: c.metrics.aa_index ?? null,
      aa_rank: c.metrics.aa_rank ?? null,
      lmarena_elo: c.metrics.lmarena_elo ?? null,
      mau_millions: c.metrics.mau_millions ?? null,
      mau_source: c.metrics.mau_source ?? null,
      adoption_score: c.metrics.adoption_score ?? null,
      livebench_rank: c.metrics.benchmark_ranks?.livebench_overall ?? null,
      swebench_verified_pct: c.metrics.benchmark_ranks?.swebench_verified_pct ?? null,
      superclue_score: c.metrics.benchmark_ranks?.superclue_total ?? null,
      mmlu_pro_pct: c.metrics.benchmark_ranks?.mmlu_pro ?? null,
      gpqa_diamond_pct: c.metrics.benchmark_ranks?.gpqa_diamond ?? null,
      bbh_pct: c.metrics.benchmark_ranks?.bbh ?? null,
      math_aime_pct: c.metrics.benchmark_ranks?.math_aime ?? null,
      humaneval_plus_pct: c.metrics.benchmark_ranks?.humaneval_plus ?? null,
      param_estimate_value: c.flag_model.param_estimate?.value ?? null,
      param_estimate_ci_low: c.flag_model.param_estimate?.ci_low ?? null,
      param_estimate_ci_high: c.flag_model.param_estimate?.ci_high ?? null,
      param_estimate_methods: c.flag_model.param_estimate?.methods ? JSON.stringify(c.flag_model.param_estimate.methods) : null,
      param_estimate_confidence: c.flag_model.param_estimate?.confidence ?? null,
    }));
    console.log(`[cron] 所有源失败，fallback 到 ${rows.length} 条 seed snapshot`);
  }

  await writeSnapshotsToRepo(rows);
  console.log(`[cron] 写入 ${rows.length} 条 snapshot`);

  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[cron] 完成，耗时 ${sec}s @ ${fetched_at}`);
}

main().catch((e) => {
  console.error("[cron] 失败:", e);
  process.exit(1);
});
