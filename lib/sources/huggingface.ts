// HuggingFace 数据采集器
// 拉取 Top 300 模型，统计每个 org 的累计下载 / 点赞 / 模型数
import type { SourceMeta } from "../types";

const HF_API = "https://huggingface.co/api";

export interface HFOrgStats {
  org: string;
  model_count: number;
  total_downloads: number;
  total_likes: number;
  top_model: { id: string; downloads: number; likes: number } | null;
  fetched_at: string;
}

async function getJSON<T>(url: string, retries = 3): Promise<T> {
  let last: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      const r = await fetch(url, {
        headers: { "User-Agent": "llm-tracker/1.0" },
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return (await r.json()) as T;
    } catch (e) {
      last = e;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw last;
}

export async function fetchTopModels(limit = 300, sort: "downloads" | "likes" = "downloads") {
  const url = `${HF_API}/models?sort=${sort}&direction=-1&limit=${limit}`;
  return getJSON<Array<{
    id: string;
    downloads?: number;
    likes?: number;
    pipeline_tag?: string;
  }>>(url);
}

export async function fetchOrgStats(
  org: string
): Promise<HFOrgStats> {
  const meta: SourceMeta = {
    source: "huggingface",
    fetched_at: new Date().toISOString(),
    ok: true,
  };
  // author=org 拉所有模型（limit=1000 已足够；超量会标记 1000+）
  const models = await getJSON<Array<{ id: string; downloads?: number; likes?: number }>>(
    `${HF_API}/models?author=${org}&limit=1000`
  );
  let total_dl = 0, total_lk = 0;
  let top: HFOrgStats["top_model"] = null;
  for (const m of models) {
    const d = m.downloads ?? 0, l = m.likes ?? 0;
    total_dl += d;
    total_lk += l;
    if (!top || d > top.downloads) top = { id: m.id, downloads: d, likes: l };
  }
  return {
    org,
    model_count: models.length,
    total_downloads: total_dl,
    total_likes: total_lk,
    top_model: top,
    fetched_at: meta.fetched_at,
  };
}

export async function fetchAllOrgStats(orgs: string[]): Promise<HFOrgStats[]> {
  const out: HFOrgStats[] = [];
  for (const org of orgs) {
    try {
      out.push(await fetchOrgStats(org));
      await new Promise((r) => setTimeout(r, 1200)); // 限速
    } catch (e) {
      console.warn(`[hf] org=${org} failed:`, (e as Error).message);
      out.push({
        org,
        model_count: 0,
        total_downloads: 0,
        total_likes: 0,
        top_model: null,
        fetched_at: new Date().toISOString(),
      });
    }
  }
  return out;
}
