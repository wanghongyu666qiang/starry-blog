# Starry Blog

Starry 的个人品牌站：项目作品集、技术文章和成长记录。

- 线上地址：[www.starrylovetbao.cloud](https://www.starrylovetbao.cloud)
- 技术栈：Next.js 16、React 19、TypeScript、Tailwind CSS 4
- 内容：仓库内 Markdown
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

文章和项目分别位于：

```text
src/content/posts/*.md
src/content/projects/*.md
```

推荐流程：

1. 创建分支并编辑 Markdown 内容。
2. 执行 `npm run content:validate`。
3. 执行 `npm run check`。
4. 推送分支并检查 Vercel Preview。
5. 合并到 `main`，由 Vercel 自动发布生产站点。
6. 打开 `https://www.starrylovetbao.cloud` 确认页面、canonical、sitemap 和 robots 正常。

网站没有线上写入后台，也不需要 `ADMIN_PASSWORD`。

## 使用与更新规则

### 更新文章

在 `src/content/posts/*.md` 中新增或修改文章。文件名应使用稳定、可读的英文 slug，例如：

```text
my-new-post.md
```

文章必须包含合法 frontmatter。正文中的图片必须有 alt 文本，外链图片和 canonical URL 必须使用安全 URL。

### 更新项目

在 `src/content/projects/*.md` 中新增或修改项目。项目内容建议说明：

- 项目解决的问题
- 个人承担的角色
- 技术栈
- GitHub 或 Demo 地址
- 当前状态

状态为 `草稿` 的项目不会生成公开页面。

### 更新图片与静态资源

静态资源放在 `public/` 下。Markdown 中引用站内资源时优先使用站内绝对路径，例如：

```text
/images/example.png
```

不要引用本机绝对路径，也不要引用只在本地存在的临时文件。

### 更新域名或 SEO 配置

主域名固定为：

```text
https://www.starrylovetbao.cloud
```

如果未来调整域名，需要同步检查：

- `src/lib/site.ts` 中的 `SITE_URL`
- sitemap
- robots
- canonical
- Open Graph 图片
- JSON-LD 结构化数据
- Vercel 域名与重定向设置

不要同时在 `next.config.ts` 和 Vercel 中配置相反方向的跳转规则，否则会产生重定向循环。

### 发布前检查

每次发布前至少确认：

- `npm run content:validate` 通过
- `npm run check` 通过
- Vercel Preview 页面能正常打开
- 文章和项目页面没有 404
- 生产站点没有重定向循环

## 文章 frontmatter

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

## 项目 frontmatter

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

构建会拒绝无效日期、危险 URL、未知分类、非法 slug 和无 alt 文本的 Markdown 图片。`published: false` 的文章和状态为 `草稿` 的项目不会生成公开页面。

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

Vercel 项目使用 Node.js 24。主域名固定为 `https://www.starrylovetbao.cloud`，根域名会永久跳转到 `www` 主域名。

项目不需要运行时环境变量。
