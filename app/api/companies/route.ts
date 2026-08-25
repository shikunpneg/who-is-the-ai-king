// GET /api/companies  公开 API
import { listCompanies } from "@/lib/db";
import { NextResponse } from "next/server";

export const revalidate = 21600;

export async function GET() {
  const data = await listCompanies();
  return NextResponse.json({ data, count: data.length });
}
