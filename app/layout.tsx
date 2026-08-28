import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLM Tracker · 全球大模型公司每日动态",
  description: "A daily-updated dashboard tracking every major LLM company and country. Open data, open source.",
  openGraph: {
    title: "LLM Tracker",
    description: "全球大模型公司每日动态追踪站",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="font-bold text-lg flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span>LLM Tracker</span>
            </a>
            <nav className="flex gap-5 text-sm text-slate-600">
              <a href="/" className="hover:text-slate-900">公司</a>
              <a href="/countries" className="hover:text-slate-900">国家</a>
              <a href="/deep-dives" className="hover:text-slate-900">深度档案</a>
              <a href="https://github.com/yourname/llm-tracker" className="hover:text-slate-900">GitHub</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 py-10 text-center text-xs text-slate-500 border-t mt-12">
          <div className="mb-4">
            <a href="/docs/index.html" className="hover:text-slate-900 mx-2">📋 概览与部署</a>
            <a href="/docs/report/index.html" className="hover:text-slate-900 mx-2">📊 研究报告</a>
            <a href="/docs/architecture.html" className="hover:text-slate-900 mx-2">🧬 架构参考</a>
            <a href="/docs/pm-glossary.html" className="hover:text-slate-900 mx-2">🤖 术语手册</a>
          </div>
          Data: HuggingFace + Artificial Analysis + LMArena + 媒体公开数据
          · Source: open-source under MIT · Last updated: {new Date().toISOString().slice(0,10)}
        </footer>
      </body>
    </html>
  );
}
