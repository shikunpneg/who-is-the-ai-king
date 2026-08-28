"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// 模型家族参数演进数据（对数刻度，单位：B）
const paramData = [
  { year: "2018", GPT: 0.117, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2019", GPT: 1.5, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2020", GPT: 17.5, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2021", GPT: 17.5, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2022", GPT: 17.5, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2023", GPT: 1800, Llama: 65, Qwen: 14, DeepSeek: 67, Mistral: 73, Grok: 3140 },
  { year: "2024", GPT: 2000, Llama: 405, Qwen: 72, DeepSeek: 2360, Mistral: 1230, Grok: 3140 },
  { year: "2025", GPT: 5500, Llama: 2000, Qwen: 235, DeepSeek: 6710, Mistral: 1410, Grok: null },
  { year: "2026", GPT: 7600, Llama: 2000, Qwen: null, DeepSeek: 10000, Mistral: null, Grok: null },
];

// 上下文窗口演进数据（对数刻度，单位：tokens）
const contextData = [
  { year: "2018", GPT: 512, Claude: null, Gemini: null, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2019", GPT: 1024, Claude: null, Gemini: null, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2020", GPT: 2048, Claude: null, Gemini: null, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2021", GPT: 2048, Claude: null, Gemini: null, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2022", GPT: 4096, Claude: null, Gemini: null, Llama: null, Qwen: null, DeepSeek: null, Mistral: null, Grok: null },
  { year: "2023", GPT: 8192, Claude: 9000, Gemini: 32000, Llama: 2048, Qwen: 2048, DeepSeek: 4096, Mistral: 4096, Grok: 8192 },
  { year: "2024", GPT: 128000, Claude: 200000, Gemini: 1000000, Llama: 128000, Qwen: 32768, DeepSeek: 128000, Mistral: 128000, Grok: 128000 },
  { year: "2025", GPT: 128000, Claude: 1000000, Gemini: 1000000, Llama: 10000000, Qwen: 32768, DeepSeek: 128000, Mistral: 128000, Grok: 256000 },
  { year: "2026", GPT: 256000, Claude: 1000000, Gemini: 1000000, Llama: 10000000, Qwen: 131072, DeepSeek: 256000, Mistral: 256000, Grok: 512000 },
];

const colors: Record<string, string> = {
  GPT: "#10b981",
  Claude: "#8b5cf6",
  Gemini: "#f59e0b",
  Llama: "#3b82f6",
  Qwen: "#ef4444",
  DeepSeek: "#f97316",
  Mistral: "#06b6d4",
  Grok: "#ec4899",
};

export default function ModelFamilyCharts() {
  return (
    <div className="space-y-8 mt-8">
      <div className="card">
        <h3 className="font-semibold mb-4">参数规模演进（对数刻度，单位：B）</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={paramData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e8f0" />
            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              scale="log"
              domain={[0.01, 10000]}
              label={{ value: "总参数量 (B, 对数)", position: "insideLeft", style: { fontSize: 11, fill: '#94a3b8' } }}
            />
            <Tooltip
              formatter={(value: any) => value ? `${value} B` : "无数据"}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {Object.keys(colors).map((family) => (
              <Line
                key={family}
                type="monotone"
                dataKey={family}
                stroke={colors[family]}
                strokeWidth={2}
                dot={false}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="font-semibold mb-4">上下文窗口演进（对数刻度，单位：tokens）</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={contextData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e8f0" />
            <XAxis dataKey="year" stroke="#94a3b8" fontSize={12} />
            <YAxis
              stroke="#94a3b8"
              fontSize={11}
              scale="log"
              domain={[100, 10000000]}
              label={{ value: "上下文 (tokens, 对数)", position: "insideLeft", style: { fontSize: 11, fill: '#94a3b8' } }}
            />
            <Tooltip
              formatter={(value: any) => value ? `${value.toLocaleString()} tokens` : "无数据"}
              contentStyle={{ fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {Object.keys(colors).map((family) => (
              <Line
                key={family}
                type="monotone"
                dataKey={family}
                stroke={colors[family]}
                strokeWidth={2}
                dot={false}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}