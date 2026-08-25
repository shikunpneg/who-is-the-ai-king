// 国家视图
import { listCompanies, listCountries } from "@/lib/db";
import Link from "next/link";

export const revalidate = 21600;

export default async function CountriesPage() {
  const [countries, companies] = await Promise.all([listCountries(), listCompanies()]);

  // 按国家分组
  const byCountry = new Map<string, typeof companies>();
  for (const c of companies) {
    if (!byCountry.has(c.country_code)) byCountry.set(c.country_code, []);
    byCountry.get(c.country_code)!.push(c);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">按国家 / 地区</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {countries.map((ct) => {
          const cos = byCountry.get(ct.code) ?? [];
          return (
            <Link
              href={`/countries/${ct.code}`}
              key={ct.code}
              className="card block"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg">{ct.name}</h2>
                <span className="badge bg-slate-100 text-slate-700">
                  {cos.length} 家公司
                </span>
              </div>
              <div className="text-sm text-slate-600 mb-2">
                <b>政策：</b>{ct.policy_label}
              </div>
              <div className="text-sm text-slate-600 mb-3">
                <b>投入：</b>{ct.annual_investment_usd}
              </div>
              <div className="flex flex-wrap gap-1">
                {cos.map((c) => (
                  <span key={c.id} className="badge bg-indigo-50 text-indigo-700">
                    {c.name}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
