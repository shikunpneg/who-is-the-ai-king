import Link from "next/link";
import type { Company } from "@/lib/types";

const COUNTRY_BADGE: Record<string, string> = {
  CN: "badge-cn",
  US: "badge-us",
  FR: "badge-eu",
  DE: "badge-eu",
  GB: "badge-eu",
  CA: "badge-us",
  JP: "badge-other",
  KR: "badge-other",
  IN: "badge-other",
  AE: "badge-other",
  IL: "badge-other",
};

const STRATEGY_LABEL: Record<string, string> = {
  "closed-ecosystem": "闭源生态",
  "open-source": "开源普惠",
  vertical: "垂直行业",
  hardware: "硬件入口",
  sovereign: "主权 AI",
};

export default function CompanyCard({ company }: { company: Company }) {
  const m = company.metrics;
  return (
    <Link href={`/companies/${company.id}`} className="card block">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-base">{company.name}</h3>
        <span className={`badge ${COUNTRY_BADGE[company.country_code] ?? "badge-other"}`}>
          {company.country_name}
        </span>
      </div>

      <div className="text-sm text-slate-700 mb-3">{company.flag_model.display_name}</div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <div className="metric text-lg">
            {m.aa_index ?? "—"}
          </div>
          <div className="label">AA 指数</div>
        </div>
        <div>
          <div className="metric text-lg">
            {m.mau_millions != null ? `${m.mau_millions.toFixed(0)}M` : "—"}
          </div>
          <div className="label">月活</div>
        </div>
        <div>
          <div className="metric text-lg">
            {m.lmarena_elo ?? "—"}
          </div>
          <div className="label">Elo</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <span className={`badge ${company.flag_model.is_open_source ? "badge-open" : "badge-closed"}`}>
          {company.flag_model.is_open_source ? "开源" : "闭源"}
        </span>
        <span className="badge bg-slate-100 text-slate-700">{company.flag_model.license}</span>
        <span className="badge bg-indigo-50 text-indigo-700">
          {company.flag_model.total_params}
        </span>
        <span className="badge bg-slate-100 text-slate-600">
          {STRATEGY_LABEL[company.strategy]}
        </span>
      </div>
    </Link>
  );
}
