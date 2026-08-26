// Supabase 客户端 + 数据访问层
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Company, Country, DailySnapshot } from "./types";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

let _client: SupabaseClient | null = null;

export function getClient(): SupabaseClient | null {
  if (!url || !key) {
    console.warn("[db] SUPABASE_URL / SUPABASE_KEY 未配置，仅本地模式");
    return null;
  }
  if (!_client) _client = createClient(url, key);
  return _client;
}

// --- Companies ---
export async function listCompanies(): Promise<Company[]> {
  const c = getClient();
  if (!c) {
    // 本地兜底：从 seed 文件读
    const seed = await import("../data/companies.seed.json");
    return seed.companies as unknown as Company[];
  }
  const { data, error } = await c
    .from("companies")
    .select("*, flag_model:models!flag_model(*), metrics:daily_snapshots!inner(*)")
    .order("name");
  if (error) throw error;
  return (data ?? []) as unknown as Company[];
}

export async function getCompany(id: string): Promise<Company | null> {
  const c = getClient();
  if (!c) {
    const seed = await import("../data/companies.seed.json");
    return (seed.companies as Company[]).find((x) => x.id === id) ?? null;
  }
  const { data, error } = await c
    .from("companies")
    .select("*, models(*)")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as Company;
}

// --- Countries ---
export async function listCountries(): Promise<Country[]> {
  const c = getClient();
  if (!c) {
    const seed = await import("../data/companies.seed.json");
    return seed.countries as unknown as Country[];
  }
  const { data, error } = await c
    .from("country_snapshots")
    .select("*")
    .order("snapshot_date", { ascending: false })
    .limit(50); // 取最近 50 条，去重
  if (error) throw error;
  // 简单去重
  const map = new Map<string, Country>();
  for (const row of data ?? []) {
    if (!map.has(row.country_code)) {
      map.set(row.country_code, {
        code: row.country_code,
        name: row.country_name,
        is_ai_priority: row.is_ai_priority ?? false,
        policy_label: row.policy_label ?? "—",
        annual_investment_usd: row.annual_investment_usd ?? "—",
        key_companies: [],
      });
    }
  }
  return Array.from(map.values());
}

// --- Snapshots ---
export async function insertSnapshots(rows: DailySnapshot[]): Promise<void> {
  if (rows.length === 0) return;
  const c = getClient();
  if (!c) {
    // 本地：写到 data/snapshots.log.json
    const fs = await import("fs/promises");
    const path = "data/snapshots.log.json";
    let arr: DailySnapshot[] = [];
    try {
      arr = JSON.parse(await fs.readFile(path, "utf8"));
    } catch {}
    arr.push(...rows);
    await fs.writeFile(path, JSON.stringify(arr, null, 2));
    return;
  }
  const { error } = await c.from("daily_snapshots").upsert(rows, {
    onConflict: "company_id,model_id,snapshot_date",
  });
  if (error) throw error;
}

export async function getTrend(
  companyId: string,
  days = 30
): Promise<DailySnapshot[]> {
  const c = getClient();
  if (!c) {
    // 本地/无数据库：读仓库内快照日志
    const { readSnapshotsFromRepo } = await import("./snapshot-store");
    const all = await readSnapshotsFromRepo();
    const since = new Date(Date.now() - days * 86_400_000)
      .toISOString()
      .slice(0, 10);
    return all
      .filter((r) => r.company_id === companyId && r.snapshot_date >= since)
      .sort((a, b) => a.snapshot_date.localeCompare(b.snapshot_date));
  }
  const since = new Date(Date.now() - days * 86_400_000)
    .toISOString()
    .slice(0, 10);
  const { data, error } = await c
    .from("daily_snapshots")
    .select("*")
    .eq("company_id", companyId)
    .gte("snapshot_date", since)
    .order("snapshot_date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as DailySnapshot[];
}
