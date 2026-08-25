// GET /api/snapshot?company=openai  趋势数据
import { getTrend } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const company = url.searchParams.get("company");
  const days = Number(url.searchParams.get("days") ?? 30);
  if (!company) return NextResponse.json({ error: "missing company" }, { status: 400 });
  const data = await getTrend(company, days);
  return NextResponse.json({ data, count: data.length });
}
