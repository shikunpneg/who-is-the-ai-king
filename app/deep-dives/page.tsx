// 深度档案：模型家族版本演进与参数对比
import type { Metadata } from "next";
import ModelFamilyCharts from "@/components/ModelFamilyCharts";

export const metadata: Metadata = {
  title: "模型家族版本演进 · LLM Tracker",
  description: "追踪各大模型家族的版本演进路径、参数规模变化与架构特征对比",
};

export default function DeepDivesPage() {
  return (
    <div className="max-w-4xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">模型家族版本演进与参数对比</h1>
        <p className="text-slate-600 max-w-3xl">
          追踪 GPT、Claude、Gemini、Llama、Qwen、DeepSeek、Mistral、Grok
          八大模型家族的版本演进路径，对比参数规模、架构特征与上下文窗口变化。
        </p>
      </header>

      {/* 概览卡片 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card">
          <h3 className="font-semibold mb-2">🏢 开源/开放权重家族</h3>
          <p className="text-sm text-slate-600">
            Meta、阿里、DeepSeek、Mistral 等公司选择开放模型权重，推动了技术民主化。
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">🔒 闭源商业家族</h3>
          <p className="text-sm text-slate-600">
            OpenAI、Anthropic、Google 等公司通过 API 提供服务，注重安全对齐和商业闭环。
          </p>
        </div>
      </section>

      {/* GPT 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">GPT 家族（OpenAI）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">活跃参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-1</td><td className="py-2 px-3">2018-06</td><td className="text-right py-2 px-3">1.17 亿</td><td className="text-right py-2 px-3">—</td><td className="text-right py-2 px-3">512</td><td className="py-2 px-3">Decoder-only, 12L/768H</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-2</td><td className="py-2 px-3">2019-02</td><td className="text-right py-2 px-3">15 亿</td><td className="text-right py-2 px-3">—</td><td className="text-right py-2 px-3">1,024</td><td className="py-2 px-3">Decoder-only, 48L/1,600H</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-3</td><td className="py-2 px-3">2020-06</td><td className="text-right py-2 px-3">1,750 亿</td><td className="text-right py-2 px-3">—</td><td className="text-right py-2 px-3">2,048</td><td className="py-2 px-3">Decoder-only, 96L/12,288H, Dense</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-3.5</td><td className="py-2 px-3">2022-03</td><td className="text-right py-2 px-3">1,750 亿</td><td className="text-right py-2 px-3">—</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">GPT-3 微调版, RLHF</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-4</td><td className="py-2 px-3">2023-03</td><td className="text-right py-2 px-3">约 1.8 万亿</td><td className="text-right py-2 px-3">约 2,800 亿</td><td className="text-right py-2 px-3">8,192</td><td className="py-2 px-3">MoE, 16 专家, 8×220B</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-4o</td><td className="py-2 px-3">2024-05</td><td className="text-right py-2 px-3">约 2 万亿</td><td className="text-right py-2 px-3">约 3,000 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">原生多模态, 低延迟</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-4.5</td><td className="py-2 px-3">2025-03</td><td className="text-right py-2 px-3">约 2.5 万亿</td><td className="text-right py-2 px-3">约 3,500 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">更大规模扩展</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">GPT-5</td><td className="py-2 px-3">2025-08</td><td className="text-right py-2 px-3">约 5-6 万亿</td><td className="text-right py-2 px-3">约 6,000 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">MoE, 更多专家</td></tr>
              <tr><td className="py-2 px-3">GPT-5.6 Sol</td><td className="py-2 px-3">2026-08</td><td className="text-right py-2 px-3">约 7.6 万亿+</td><td className="text-right py-2 px-3">约 1.76 万亿</td><td className="text-right py-2 px-3">256,000</td><td className="py-2 px-3">进一步扩展, 更强推理</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Claude 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Claude 家族（Anthropic）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Claude 1</td><td className="py-2 px-3">2023-03</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">9,000</td><td className="py-2 px-3">Constitutional AI</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Claude 2</td><td className="py-2 px-3">2023-07</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">100,000</td><td className="py-2 px-3">扩展上下文</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Claude 3</td><td className="py-2 px-3">2024-03</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">200,000</td><td className="py-2 px-3">三模型分层, 多模态</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Claude 3.5 Sonnet</td><td className="py-2 px-3">2024-06</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">200,000</td><td className="py-2 px-3">显著提升编程与推理</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Claude 3.7 Sonnet</td><td className="py-2 px-3">2024-12</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">200,000</td><td className="py-2 px-3">推理能力进一步提升</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Claude 4.5</td><td className="py-2 px-3">2025-06</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000</td><td className="py-2 px-3">百万级上下文</td></tr>
              <tr><td className="py-2 px-3">Claude Fable 5</td><td className="py-2 px-3">2026-04</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000</td><td className="py-2 px-3">前沿推理与自主能力</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Gemini 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Gemini 家族（Google DeepMind）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Gemini 1.0</td><td className="py-2 px-3">2023-12</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">32,000</td><td className="py-2 px-3">多模态, 原生</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Gemini 1.5</td><td className="py-2 px-3">2024-02</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000+</td><td className="py-2 px-3">百万级上下文</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Gemini 2.0 Flash</td><td className="py-2 px-3">2024-12</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000</td><td className="py-2 px-3">低延迟, 实时</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Gemini 2.5 Pro</td><td className="py-2 px-3">2025-03</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000</td><td className="py-2 px-3">更强推理与编程</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Gemini 2.5 Flash</td><td className="py-2 px-3">2025-04</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000</td><td className="py-2 px-3">高效低成本</td></tr>
              <tr><td className="py-2 px-3">Gemini 3.7 Flash</td><td className="py-2 px-3">2026-03</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">1,000,000+</td><td className="py-2 px-3">前沿多模态能力</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Llama 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Llama 家族（Meta）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 1</td><td className="py-2 px-3">2023-02</td><td className="text-right py-2 px-3">7B-65B</td><td className="text-right py-2 px-3">2,048</td><td className="py-2 px-3">Decoder-only, SwiGLU, RMSNorm</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 2</td><td className="py-2 px-3">2023-07</td><td className="text-right py-2 px-3">7B-70B</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">GQA, 分组查询注意力</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 3</td><td className="py-2 px-3">2024-04</td><td className="text-right py-2 px-3">8B/70B</td><td className="text-right py-2 px-3">8,192</td><td className="py-2 px-3">15T tokens 训练</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 3.1</td><td className="py-2 px-3">2024-07</td><td className="text-right py-2 px-3">8B-405B</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">405B 首次突破 400B</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 3.2</td><td className="py-2 px-3">2024-09</td><td className="text-right py-2 px-3">1B-90B</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">多模态, 小模型升级</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 3.3</td><td className="py-2 px-3">2024-12</td><td className="text-right py-2 px-3">8B/70B</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">效率优化</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 4 Scout</td><td className="py-2 px-3">2025-04</td><td className="text-right py-2 px-3">约 170 亿</td><td className="text-right py-2 px-3">10,000,000</td><td className="py-2 px-3">MoE, 1,000 万上下文</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Llama 4 Maverick</td><td className="py-2 px-3">2025-04</td><td className="text-right py-2 px-3">约 4,000 亿</td><td className="text-right py-2 px-3">10,000,000</td><td className="py-2 px-3">MoE, 16 专家, 17B 活跃</td></tr>
              <tr><td className="py-2 px-3">Llama 4 Behemoth</td><td className="py-2 px-3">2025-07</td><td className="text-right py-2 px-3">约 2 万亿+</td><td className="text-right py-2 px-3">10,000,000</td><td className="py-2 px-3">MoE, 2× Behemoth 集群</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Qwen 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Qwen 家族（阿里）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen</td><td className="py-2 px-3">2023-09</td><td className="text-right py-2 px-3">1.8B-14B</td><td className="text-right py-2 px-3">2,048</td><td className="py-2 px-3">Decoder-only, 多语言</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen 1.5</td><td className="py-2 px-3">2024-02</td><td className="text-right py-2 px-3">0.5B-72B</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">系列化, 多尺寸</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen 2</td><td className="py-2 px-3">2024-06</td><td className="text-right py-2 px-3">0.5B-72B</td><td className="text-right py-2 px-3">32,768</td><td className="py-2 px-3">32K 上下文, 多语言</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen 2.5</td><td className="py-2 px-3">2024-09</td><td className="text-right py-2 px-3">0.5B-72B</td><td className="text-right py-2 px-3">32,768</td><td className="py-2 px-3">训练数据增强</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen 2.5-Coder</td><td className="py-2 px-3">2024-12</td><td className="text-right py-2 px-3">0.5B-32B</td><td className="text-right py-2 px-3">32,768</td><td className="py-2 px-3">代码专用模型</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen 3 (0.6B-32B)</td><td className="py-2 px-3">2025-01</td><td className="text-right py-2 px-3">0.6B-32B</td><td className="text-right py-2 px-3">32,768</td><td className="py-2 px-3">MoE, 混合推理</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Qwen 3 (235B-A22B)</td><td className="py-2 px-3">2025-01</td><td className="text-right py-2 px-3">2,350 亿</td><td className="text-right py-2 px-3">32,768</td><td className="py-2 px-3">MoE, 22B 活跃</td></tr>
              <tr><td className="py-2 px-3">Qwen3.7-Max</td><td className="py-2 px-3">2026-05</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">131,072</td><td className="py-2 px-3">超大规模, 更强推理</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* DeepSeek 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">DeepSeek 家族</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">活跃参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">DeepSeek LLM</td><td className="py-2 px-3">2023-11</td><td className="text-right py-2 px-3">7B/67B</td><td className="text-right py-2 px-3">—</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">基础模型</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">DeepSeek-Coder</td><td className="py-2 px-3">2023-12</td><td className="text-right py-2 px-3">1B-33B</td><td className="text-right py-2 px-3">—</td><td className="text-right py-2 px-3">16,384</td><td className="py-2 px-3">代码专用</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">DeepSeek-V2</td><td className="py-2 px-3">2024-05</td><td className="text-right py-2 px-3">2,360 亿</td><td className="text-right py-2 px-3">210 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">MoE, MLA, 低训练成本</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">DeepSeek-V3</td><td className="py-2 px-3">2024-12</td><td className="text-right py-2 px-3">6,710 亿</td><td className="text-right py-2 px-3">370 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">MoE, MLA, FP8 训练</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">DeepSeek-R1</td><td className="py-2 px-3">2025-01</td><td className="text-right py-2 px-3">6,710 亿</td><td className="text-right py-2 px-3">370 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">推理模型, 链式思考</td></tr>
              <tr><td className="py-2 px-3">DeepSeek-V4</td><td className="py-2 px-3">2026-04</td><td className="text-right py-2 px-3">约 10 万亿+</td><td className="text-right py-2 px-3">约 5,000 亿</td><td className="text-right py-2 px-3">256,000</td><td className="py-2 px-3">下一代架构, 更强</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Mistral 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Mistral 家族</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mistral 7B</td><td className="py-2 px-3">2023-09</td><td className="text-right py-2 px-3">73 亿</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">Sliding Window Attention</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mixtral 8×7B</td><td className="py-2 px-3">2023-12</td><td className="text-right py-2 px-3">4,670 亿</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">MoE, 8 专家, 13B 活跃</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mistral Small/Large</td><td className="py-2 px-3">2024-02</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">4,096</td><td className="py-2 px-3">多模型分层</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mistral Large 2</td><td className="py-2 px-3">2024-07</td><td className="text-right py-2 px-3">1,230 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">多语言, 长上下文</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mistral Small 3.1</td><td className="py-2 px-3">2025-01</td><td className="text-right py-2 px-3">240 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">小模型, 高性价比</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mixtral 8×22B</td><td className="py-2 px-3">2025-02</td><td className="text-right py-2 px-3">1,410 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">MoE, 8 专家, 39B 活跃</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Mistral Large 3</td><td className="py-2 px-3">2025-06</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">更强推理与多模态</td></tr>
              <tr><td className="py-2 px-3">Mistral Large 3.5</td><td className="py-2 px-3">2026-01</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">256,000</td><td className="py-2 px-3">前沿性能</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Grok 家族 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">Grok 家族（xAI）</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2 px-3 font-semibold">版本</th>
                <th className="text-left py-2 px-3 font-semibold">发布日期</th>
                <th className="text-right py-2 px-3 font-semibold">总参数</th>
                <th className="text-right py-2 px-3 font-semibold">上下文</th>
                <th className="text-left py-2 px-3 font-semibold">架构特征</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Grok-1</td><td className="py-2 px-3">2023-11</td><td className="text-right py-2 px-3">3,140 亿</td><td className="text-right py-2 px-3">8,192</td><td className="py-2 px-3">MoE, 8 专家, 86B 活跃</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Grok-1.5</td><td className="py-2 px-3">2024-04</td><td className="text-right py-2 px-3">3,140 亿</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">长上下文扩展</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Grok-2</td><td className="py-2 px-3">2024-08</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">更强性能</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Grok-3</td><td className="py-2 px-3">2025-02</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">128,000</td><td className="py-2 px-3">推理能力提升</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Grok-4</td><td className="py-2 px-3">2025-07</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">256,000</td><td className="py-2 px-3">更强多模态</td></tr>
              <tr className="border-b border-slate-100"><td className="py-2 px-3">Grok-4.1</td><td className="py-2 px-3">2025-11</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">256,000</td><td className="py-2 px-3">效率与情感表达</td></tr>
              <tr><td className="py-2 px-3">Grok-4.6</td><td className="py-2 px-3">2026-05</td><td className="text-right py-2 px-3">未公开</td><td className="text-right py-2 px-3">512,000+</td><td className="py-2 px-3">前沿推理与自主</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 关键洞察 */}
      <section className="card mb-6">
        <h2 className="text-xl font-semibold mb-4">关键洞察</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-lg font-semibold text-indigo-600 mb-1">MoE 成为主流</div>
            <p className="text-sm text-slate-600">从 GPT-4 到 Llama 4，几乎所有大模型都采用 MoE。MoE 通过稀疏激活机制，将总参数与活跃参数解耦，在控制推理成本的同时实现规模扩展。</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-lg font-semibold text-indigo-600 mb-1">上下文竞赛</div>
            <p className="text-sm text-slate-600">从 4K 到百万级，上下文窗口持续扩展。Gemini 1.5 率先突破百万级，Llama 4 将其带入开源世界，长文本处理能力大幅提升。</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-lg font-semibold text-indigo-600 mb-1">开源追赶闭源</div>
            <p className="text-sm text-slate-600">Llama 4 Behemoth 2T 参数接近 GPT-5 规模。开源模型在参数规模上快速追赶闭源模型，性能差距不断缩小。</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg">
            <div className="text-lg font-semibold text-indigo-600 mb-1">多模态成为标配</div>
            <p className="text-sm text-slate-600">GPT-4o、Gemini、Llama 3.2 均支持多模态，视觉理解成为基础能力。</p>
          </div>
        </div>
      </section>

      <ModelFamilyCharts />

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-indigo-800">
          <strong>给技术决策者：</strong>在选择模型时，不要只看参数规模——更应关注<strong>活跃参数</strong>（推理成本的真实反映）和<strong>上下文长度</strong>（决定可处理的文本规模）。MoE 模型的总参数是"虚胖"，活跃参数才是"真金白银"。
        </p>
      </div>
    </div>
  );
}