// 零数据库版快照存储：把每日 snapshot 写到 data/snapshots.log.json
// GitHub Actions 在 cron 跑完后会 git commit + push 这个文件，
// 部署端的 ISR 重新拉取，最新数据自动呈现。
import { promises as fs } from "fs";
import path from "path";
import type { DailySnapshot } from "./types";

const STORE_PATH = path.join(process.cwd(), "data", "snapshots.log.json");

export async function writeSnapshotsToRepo(rows: DailySnapshot[]): Promise<void> {
  let arr: DailySnapshot[] = [];
  try {
    const txt = await fs.readFile(STORE_PATH, "utf8");
    arr = JSON.parse(txt);
  } catch {
    // 第一次写，文件不存在
  }

  // 去重：同 company_id + model_id + snapshot_date 覆盖
  const map = new Map<string, DailySnapshot>();
  for (const r of arr) map.set(keyOf(r), r);
  for (const r of rows) map.set(keyOf(r), r);
  const merged = Array.from(map.values()).sort((a, b) =>
    a.snapshot_date.localeCompare(b.snapshot_date)
  );

  // 截断到最近 90 天，避免文件无限增长
  const cutoff = new Date(Date.now() - 90 * 86_400_000).toISOString().slice(0, 10);
  const trimmed = merged.filter((r) => r.snapshot_date >= cutoff);

  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(trimmed, null, 2));
}

function keyOf(r: DailySnapshot): string {
  return `${r.company_id}::${r.model_id}::${r.snapshot_date}`;
}

export async function readSnapshotsFromRepo(): Promise<DailySnapshot[]> {
  try {
    const txt = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(txt);
  } catch {
    return [];
  }
}
