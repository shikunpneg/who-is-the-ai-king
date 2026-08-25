// 国家详情
import { notFound } from "next/navigation";
import { listCompanies, listCountries } from "@/lib/db";

export const revalidate = 21600;

export default async function CountryPage({ params }: { params: { code: string } }) {
  const [countries, companies] = await Promise.all([listCountries(), listCompanies()]);
  const ct = countries.find((c) => c.code === params.code);
  if (!ct) notFound();
  const cos = companies.filter((c) => c.country_code === params.code);

  return (
    <article>
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{ct.name}</h1>
        <div className="text-slate-600">
          <b>政策定位：</b>{ct.policy_label} · <b>投资：</b>
          {ct.annual_investment_usd}
        </div>
      </header>

      <h2 className="text-lg font-semibold mb-3">本国的 LLM 公司（{cos.length}）</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {cos.map((c) => (
          <a key={c.id} href={`/companies/${c.id}`} className="card block">
            <h3 className="font-bold">{c.name}</h3>
            <div className="text-sm text-slate-600 mt-1">
              {c.flag_model.display_name} · {c.flag_model.license}
            </div>
            <div className="text-sm text-slate-500 mt-2 line-clamp-2">
              {c.description}
            </div>
          </a>
        ))}
      </div>
    </article>
  );
}
