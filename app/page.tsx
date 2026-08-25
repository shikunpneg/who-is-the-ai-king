// 主页：公司卡片网格
import { listCompanies } from "@/lib/db";
import CompanyCard from "@/components/CompanyCard";
import type { Company } from "@/lib/types";

// ISR：每 6 小时重新拉取静态数据
export const revalidate = 21600;

export default async function HomePage() {
  const companies: Company[] = await listCompanies();

  // 按 MAU 排序（mau_millions 降序；null 放最后）
  const sorted = [...companies].sort((a, b) => {
    const am = a.metrics.mau_millions ?? -1;
    const bm = b.metrics.mau_millions ?? -1;
    return bm - am;
  });

  const totalCompanies = companies.length;
  const countriesSet = new Set(companies.map((c) => c.country_code));
  const openSourceCount = companies.filter((c) => c.flag_model.is_open_source).length;
  const totalMau = companies.reduce((s, c) => s + (c.metrics.mau_millions ?? 0), 0);

  return (
    <div>
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-2">全球大模型公司 · 每日动态</h1>
        <p className="text-slate-600 max-w-2xl">
          覆盖 {totalCompanies} 家公司、{countriesSet.size} 个国家。每日 08:00 UTC 自动更新。
          数据来源：HuggingFace、Artificial Analysis、LMArena + 公开行业数据。
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          <div className="card">
            <div className="metric">{totalCompanies}</div>
            <div className="label">覆盖公司</div>
          </div>
          <div className="card">
            <div className="metric">{countriesSet.size}</div>
            <div className="label">覆盖国家</div>
          </div>
          <div className="card">
            <div className="metric">{openSourceCount}</div>
            <div className="label">开源公司</div>
          </div>
          <div className="card">
            <div className="metric">{totalMau.toFixed(0)}M</div>
            <div className="label">总月活（百万）</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">公司卡片（按月活排序）</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sorted.map((c) => (
            <CompanyCard key={c.id} company={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
