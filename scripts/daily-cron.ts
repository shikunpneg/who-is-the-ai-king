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

  await writeSnapshotsToRepo(snapshots);
  console.log(`[cron] 写入 ${snapshots.length} 条 snapshot`);

  const sec = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`[cron] 完成，耗时 ${sec}s @ ${fetched_at}`);
}

main().catch((e) => {
  console.error("[cron] 失败:", e);
  process.exit(1);
});
