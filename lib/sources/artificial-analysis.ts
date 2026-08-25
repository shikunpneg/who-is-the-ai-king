// Artificial Analysis (AA) Intelligence Index 采集器
// 公开 API: https://artificialanalysis.ai/api/v2/...
// 由于 AA 官方 API 需要 key，这里采用公开页面 HTML 抓取 + 解析
import type { SourceMeta } from "../types";

export interface AAModelRow {
  name: string;
  org: string;
  aa_index: number;
  rank: number;
}

const AA_LEADERBOARD = "https://artificialanalysis.ai/leaderboards/models";

export async function fetchAALeaderboard(): Promise<AAModelRow[]> {
  const meta: SourceMeta = {
    source: "artificial-analysis",
    fetched_at: new Date().toISOString(),
    ok: true,
  };
  try {
    const r = await fetch(AA_LEADERBOARD, {
      headers: { "User-Agent": "llm-tracker/1.0" },
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const html = await r.text();
    // 极简解析：找 "[name, org, index, rank]" JSON 嵌入
    // AA 实际在页面里注入 __NEXT_DATA__；这里只取大致可用的数据
    const match = html.match(/__NEXT_DATA__[^>]*>([^<]+)</);
    if (!match) return [];
    const json = JSON.parse(match[1]);
    // 路径是 props.pageProps.leaderboard.rows；具体结构可能变化
    const rows = json?.props?.pageProps?.leaderboard?.rows ?? [];
    return rows.slice(0, 50).map((r: { name: string; org: string; intelligence_index: number }, i: number) => ({
      name: r.name,
      org: r.org,
      aa_index: r.intelligence_index,
      rank: i + 1,
    }));
  } catch (e) {
    meta.ok = false;
    meta.error = (e as Error).message;
    console.warn("[aa] fetch failed, 请考虑人工补充:", meta.error);
    return [];
  }
}
