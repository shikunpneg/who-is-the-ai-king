// 公司详情页：完整 6 维分类
import { notFound } from "next/navigation";
import { getCompany, getTrend } from "@/lib/db";
import TrendChart from "@/components/TrendChart";

export const revalidate = 21600;

export default async function CompanyPage({
  params,
}: {
  params: { slug: string };
}) {
  const company = await getCompany(params.slug);
  if (!company) notFound();
  const trend = await getTrend(company.id, 30);

  return (
    <article>
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">{company.name}</h1>
          <span className="badge badge-us">{company.country_name}</span>
        </div>
        <p className="text-slate-600">
          {company.hq_city} · 成立 {company.founded_year} ·{" "}
          <a href={company.website} className="text-indigo-600 hover:underline">
            {company.website}
          </a>
        </p>
        <p className="text-slate-700 mt-3 max-w-3xl">{company.description}</p>
      </header>

      <section className="card mb-6">
        <h2 className="text-lg font-semibold mb-3">🏆 旗舰模型</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="metric text-xl">{company.flag_model.display_name}</div>
            <div className="label">发布 {company.flag_model.release_date}</div>
          </div>
          <div>
            <div className="metric text-xl">
              {company.flag_model.total_params}
            </div>
            <div className="label">
              {company.flag_model.active_params
                ? `激活 ${company.flag_model.active_params}`
                : "Dense 模型"}
            </div>
          </div>
          <div>
            <div className="metric text-xl">{company.flag_model.context_length}</div>
            <div className="label">上下文</div>
          </div>
          <div>
            <div className="metric text-xl">{company.flag_model.license}</div>
            <div className="label">
              {company.flag_model.is_open_source ? "开源" : "闭源"}
            </div>
          </div>
        </div>
        <div className="mt-4 text-sm text-slate-600">
          <b>架构：</b>{company.flag_model.architecture} · <b>模态：</b>
          {company.flag_model.modality.join(" / ")}
        </div>
        <div className="mt-2 text-sm text-slate-500">
          {company.flag_model.notes}
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="text-lg font-semibold mb-3">📊 Benchmark 排名</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="metric text-2xl">
              {company.metrics.aa_index ?? "—"}
            </div>
            <div className="label">Artificial Analysis Index</div>
            {company.metrics.aa_rank && (
              <div className="badge-pri mt-1">Top {company.metrics.aa_rank}</div>
            )}
          </div>
          <div>
            <div className="metric text-2xl">
              {company.metrics.lmarena_elo ?? "—"}
            </div>
            <div className="label">LMArena Elo</div>
          </div>
          <div>
            <div className="metric text-2xl">
              {company.metrics.mau_millions != null
                ? `${company.metrics.mau_millions}M`
                : "—"}
            </div>
            <div className="label">月活（{company.metrics.mau_source}）</div>
          </div>
        </div>
      </section>

      {trend.length > 0 && (
        <section className="card mb-6">
          <h2 className="text-lg font-semibold mb-3">📈 30 天趋势</h2>
          <TrendChart data={trend} />
        </section>
      )}

      <section className="card">
        <h2 className="text-lg font-semibold mb-3">🏷️ 战略标签</h2>
        <div className="flex flex-wrap gap-2">
          <span className="badge bg-indigo-50 text-indigo-700">{company.strategy}</span>
        </div>
      </section>
    </article>
  );
}
