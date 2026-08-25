# LLM Tracker · 全球大模型公司每日动态追踪站

> A daily-updated dashboard tracking every major LLM company & country — open data, open source, zero cost hosting.

[![Vercel](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![Data: HF + AA + LMArena](https://img.shields.io/badge/data-HF%20%2B%20AA%20%2B%20LMArena-green)](.)
[![Updated](https://img.shields.io/badge/updated-daily-success)](.)

**Live demo:** <https://llm-tracker.vercel.app> (部署后填入)
**Source:** <https://github.com/yourname/llm-tracker>

---

## 1. 产品定位

一个**每天自动更新**的全球 LLM 公司 / 国家格局仪表盘。读者可以：

- 看到任意一家头部公司的**最新模型、参数量、benchmark 排名、用户量、开/闭源状态**
- 按**国家**聚合，看每个国家的 AI 战略地位与公司清单
- 跟踪**每日趋势**——昨日 → 今日的下载量 / 点赞数 / 排名变化
- 一键订阅 RSS / Email 提醒，关注特定公司

## 2. 目标用户

| 画像 | 占比 | 痛点 |
|---|---|---|
| AI 创业者 / 产品经理 | 35% | 竞品监控，每周手动整理 3 小时 |
| 投资人 / 行业分析师 | 25% | 信息分散在 10 个网站，缺结构化数据 |
| 技术博客 / 媒体作者 | 20% | 写报告时数据来源不可追溯 |
| AI 工程师 | 15% | 选型时缺对比表格 |
| 政策研究者 / 学者 | 5% | 跨国数据难以横向比较 |

## 3. 核心功能（MVP）

| 优先级 | 功能 | 数据源 |
|---|---|---|
| P0 | 25 家公司卡片：当前最强模型 + AA Index + MAU + 战略标签 | HF + AA + LMArena + 媒体 |
| P0 | 13 国国家视图：政策投入 + 公司分布 + 代表模型 | 公开政策文件 |
| P0 | 每日 8:00 UTC 自动更新 | GitHub Actions cron |
| P0 | 6 维过滤：公司 / 国家 / 模态 / 开源 / 参数规模 / benchmark 段位 | 自建索引 |
| P1 | 趋势图：下载量 / 点赞数 / AA 排名 30 天曲线 | 每日快照 |
| P1 | RSS feed：每家公司 1 个 | 站点输出 |
| P1 | 公司详情页：完整 6 维分类 | 数据库 join |
| P2 | Email 提醒（每日摘要） | Resend 免费额度 |
| P2 | 暗色模式 | 主题切换 |
| P3 | 评论区 / 用户提交公司 | GitHub Issue 模板 |

## 4. 数据流架构

```
┌──────────────┐    ┌──────────────────┐    ┌──────────────┐
│  HuggingFace │    │ Artificial Anal. │    │  LMArena     │
│  Public API  │    │ (scraped)        │    │  Leaderboard │
└──────┬───────┘    └────────┬─────────┘    └──────┬───────┘
       │                     │                       │
       │     ┌───────────────▼───────────────────────┘
       │     │
       │     │       ┌──────────────────┐
       ├─────┼──────►│                  │
       │     │       │  GitHub Actions  │  every day 08:00 UTC
       │     │       │   (cron job)     │
       │     │       │                  │
       │     │       └────────┬─────────┘
       │     │                │ fetch + transform
       │     │                ▼
       │     │       ┌──────────────────┐
       │     │       │  Supabase        │  free tier: 500MB
       │     │       │  (Postgres)      │  + JSON snapshot to /data
       │     │       └────────┬─────────┘
       │     │                │ read
       │     │                ▼
       │     │       ┌──────────────────┐
       │     │       │  Vercel          │  Next.js 14 (App Router)
       │     │       │  Static + ISR    │  revalidate: 3600s
       │     │       └────────┬─────────┘
       │     │                │
       │     ▼                ▼
       │  ┌─────────────────────────┐
       └─►│   Public Website        │
          │   llm-tracker.vercel.app│
          └─────────────────────────┘
```

## 5. 技术栈

| 层 | 选型 | 理由 |
|---|---|---|
| 前端框架 | **Next.js 14 (App Router) + TypeScript** | Vercel 一等公民；ISR 自动增量更新 |
| UI 组件 | **Tailwind CSS + shadcn/ui** | 零运行时、类型安全 |
| 图表 | **Recharts** | 轻量、声明式、对小数据量足够 |
| 数据库 | **Supabase Postgres** | 500MB 免费；提供 SQL + REST |
| 缓存层 | **Next.js 内置 `unstable_cache` + Vercel KV** | ISR 友好 |
| 数据采集 | **Node.js 20 + TypeScript** | 标准库 `fetch`；cron 友好 |
| 调度 | **GitHub Actions** | 每月 2000 分钟免费；时间可控 |
| 部署 | **Vercel Hobby** | 个人项目免费；自动部署 |
| 监控 | **Upptime (GitHub Actions + status page)** | 零成本可用性监控 |

**总成本：$0 / 月**（全部免费层）

## 6. 仓库结构

```
llm-tracker/
├── .github/
│   └── workflows/
│       ├── daily-update.yml     # 每日 8:00 UTC 抓取 + 提交
│       └── healthcheck.yml      # 站点健康检查
├── app/                         # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx                 # 主页（公司卡片网格）
│   ├── companies/[slug]/page.tsx
│   ├── countries/page.tsx
│   ├── countries/[code]/page.tsx
│   └── api/
│       ├── companies/route.ts
│       ├── countries/route.ts
│       └── snapshot/route.ts
├── components/
│   ├── CompanyCard.tsx
│   ├── CountryCard.tsx
│   ├── BenchmarkBadge.tsx
│   └── TrendChart.tsx
├── lib/
│   ├── db.ts                    # Supabase 客户端
│   ├── transformers.ts          # 数据归一化
│   └── sources/                 # 5 个数据源采集器
│       ├── huggingface.ts
│       ├── github.ts
│       ├── artificial-analysis.ts
│       ├── lmarena.ts
│       └── manual.json          # 人工整理的 MAU / 战略 / 国家
├── scripts/
│   └── daily-cron.ts            # 入口
├── data/
│   └── companies.seed.json      # 种子数据（25 家公司）
├── supabase/
│   └── schema.sql               # 表结构
├── LICENSE
├── README.md
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## 7. 部署流程

1. **Fork 仓库** → 改 `package.json` 的 `homepage` 和 README 链接
2. **Vercel 连接** → 一键部署，Vercel 会自动识别 Next.js
3. **Supabase 建项目** → 复制 `SUPABASE_URL` 和 `SUPABASE_KEY` 到 Vercel 环境变量
4. **GitHub Secrets** → 配 `SUPABASE_URL` / `SUPABASE_KEY`（给 Actions 用）
5. **修改 `data/companies.seed.json`** → 替换为你想追踪的 25 家公司
6. **等待次日 8:00 UTC** → Actions 自动跑一遍，首批数据入库
7. **(可选) 启用 Upptime** → GitHub Pages 托管状态页

完整复现时间 ≈ 30 分钟。

## 8. 路线图

| 阶段 | 时间 | 目标 |
|---|---|---|
| v0.1 | Week 1 | 25 家公司静态展示，HF + GitHub 自动化 |
| v0.2 | Week 2 | 接入 AA + LMArena（爬虫或人工补录） |
| v0.5 | Week 4 | 趋势图 30 天，RSS feed |
| v1.0 | Week 8 | 100 家公司，国家视图，公司详情页 |
| v2.0 | Month 3 | Email 提醒，开放 API，社区提交 |

## 9. License

MIT — 欢迎 fork、修改、二次发布；引用请保留原始链接。
