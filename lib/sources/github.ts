// GitHub API 采集器：抓取每个公司/项目的 star / fork 趋势
// 用途：给公司详情页提供 "社区关注度" 指标
const GH_API = "https://api.github.com";

export interface GHRepoStats {
  full_name: string;
  stars: number;
  forks: number;
  open_issues: number;
  pushed_at: string;
  fetched_at: string;
}

async function ghGet<T>(url: string): Promise<T> {
  const headers: HeadersInit = {
    "User-Agent": "llm-tracker/1.0",
    Accept: "application/vnd.github+json",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`GH ${r.status}`);
  return (await r.json()) as T;
}

export async function fetchRepo(full_name: string): Promise<GHRepoStats> {
  const data = await ghGet<{
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    pushed_at: string;
  }>(`${GH_API}/repos/${full_name}`);
  return {
    full_name,
    stars: data.stargazers_count,
    forks: data.forks_count,
    open_issues: data.open_issues_count,
    pushed_at: data.pushed_at,
    fetched_at: new Date().toISOString(),
  };
}

// 批量：可传入 repo 列表，逐个抓取（带 1s 限速以适配匿名 60/h）
export async function fetchRepos(repos: string[]): Promise<GHRepoStats[]> {
  const out: GHRepoStats[] = [];
  for (const r of repos) {
    try {
      out.push(await fetchRepo(r));
      if (!process.env.GITHUB_TOKEN) await new Promise((x) => setTimeout(x, 1500));
    } catch (e) {
      console.warn(`[gh] ${r} failed:`, (e as Error).message);
    }
  }
  return out;
}
