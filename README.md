# Starry Blog

Starry 的个人品牌站：项目作品集、技术文章和成长记录。

- 线上地址：[www.starrylovetbao.cloud](https://www.starrylovetbao.cloud)
- 技术栈：Next.js 16、React 19、TypeScript、Tailwind CSS 4
- 内容：仓库内 Markdown / JSON
- 部署：GitHub 推送触发 Vercel Preview 或 Production

## 本地开发

```bash
npm install
npm run dev
```

项目在 Windows 上固定使用 Webpack，避免已知的本地路径问题。

提交前运行完整检查：

```bash
npm run check
```

## 内容工作流

文章、项目和时间线分别位于：

```text
src/content/posts/*.md
src/content/projects/*.md
src/content/timeline.json
```

推荐流程：

1. 创建分支并编辑 Markdown。
2. 执行 `npm run content:validate`。
3. 推送分支并检查 Vercel Preview。
4. 合并到 `main`，由 Vercel 自动发布。

网站没有线上写入后台，也不需要 `ADMIN_PASSWORD`。

### 文章 frontmatter

```yaml
---
title: "文章标题"
description: "用于列表和搜索结果的简短摘要"
date: "2026-07-27"
updated: "2026-07-28" # 可选
category: "Engineering" # Engineering | Research | Learning | Thoughts
tags: ["Next.js", "TypeScript"]
published: true
featured: false
cover: null # 可选，站内绝对路径或 https URL
canonicalUrl: null # 可选，转载文章的原始 URL
---
```

### 项目 frontmatter

```yaml
---
title: "项目名称"
description: "项目解决的问题"
date: "2026-07-27"
updated: "2026-07-28" # 可选
role: "Full-stack Developer — 负责架构与实现"
tech_stack: ["TypeScript", "Next.js"]
github_url: "https://github.com/owner/repo"
demo_url: null
status: "进行中" # 草稿 | 进行中 | 已完成
featured: true
cover: null
---
```

构建会拒绝无效日期、危险 URL、未知分类、非法 slug 和无 alt
文本的 Markdown 图片。`published: false` 的文章和状态为 `草稿`
的项目不会生成公开页面。

## 站点能力

- 静态文章与项目路由、真实 404
- RSS、sitemap、robots、canonical
- `Person`、`WebSite`、`BlogPosting`、`SoftwareSourceCode` JSON-LD
- 动态 Open Graph 分享图
- 服务端 Markdown、KaTeX 与代码高亮
- 按需 Mermaid、文章目录、代码复制
- Vercel Web Analytics 与 Speed Insights
- CSP、HSTS 和常用安全响应头

## 部署配置

Vercel 项目使用 Node.js 24。主域名固定为
`https://www.starrylovetbao.cloud`，根域名会永久跳转到 `www` 主域名。
项目不需要运行时环境变量。
