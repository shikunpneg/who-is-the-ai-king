// Vercel Cron 触发的端点：用于在 Vercel 平台层面调度（也可由 GitHub Actions 代替）
// vercel.json 已配置每天 08:00 UTC 触发
import { listCompanies, insertSnapshots } from "@/lib/db";
import { buildDailySnapshots } from "@/lib/transformers";
import { NextResponse } from "next/server";

export const maxDuration = 300; // 5 分钟超时

export async function GET(req: Request) {
  // 简单鉴权：Vercel 会自动在请求头加 x-vercel-cron 头
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";
  if (!isVercelCron && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const companies = await listCompanies();
  const { snapshots, sources, fetched_at } = await buildDailySnapshots(companies);
  await insertSnapshots(snapshots);

  return NextResponse.json({
    ok: true,
    company_count: companies.length,
    snapshot_count: snapshots.length,
    sources,
    fetched_at,
  });
}
