"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { DailySnapshot } from "@/lib/types";

export default function TrendChart({ data }: { data: DailySnapshot[] }) {
  const chart = data.map((d) => ({
    date: d.snapshot_date.slice(5), // MM-DD
    "HF 下载(万)": d.hf_total_downloads != null ? d.hf_total_downloads / 10_000 : null,
    "AA 指数": d.aa_index,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={chart}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e8f0" />
        <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
        <YAxis yAxisId="left" stroke="#4f46e5" fontSize={11} />
        <YAxis yAxisId="right" orientation="right" stroke="#0ea5e9" fontSize={11} />
        <Tooltip />
        <Legend />
        <Line yAxisId="left" type="monotone" dataKey="HF 下载(万)" stroke="#4f46e5" strokeWidth={2} dot={false} />
        <Line yAxisId="right" type="monotone" dataKey="AA 指数" stroke="#0ea5e9" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
