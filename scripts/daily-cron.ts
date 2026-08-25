// ============================================================
// 每日 cron 入口：拉数据 → 写库 → 输出 summary
// 用法：npm run cron
// 调度：GitHub Actions daily-update.yml（每天 08:00 UTC）
// ============================================================
import { listCompanies, insertSnapshots } from "../lib/db";
import { buildDailySnapshots } from "../lib/transformers";

async function main() {
  const t0 = Date.now();
  console.log(`[cron] 启动 ${new Date().toISOString()}`);

  const companies = await listCompanies();
  console.log(`[cron] 加载 ${companies.length} 家公司`);

  const { snapshots, sources, fetched_at } = await buildDailySnapshots(companies);
  console.log("[cron] 数据源：");
  for (const s of sources) {
    console.log(`  - ${s.name}: ${s.ok ? "✓" : "✗"} ${s.count} 条${s.error ? ` (${s.error})` : ""}`);
  }

  await insertSnapshots(snapshots);
  console.log(`[cron] 写入 ${snapshots.length} 条 snapshot`);

  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[cron] 完成，耗时 ${sec}s @ ${fetched_at}`);
}

main().catch((e) => {
  console.error("[cron] 失败:", e);
  process.exit(1);
});
