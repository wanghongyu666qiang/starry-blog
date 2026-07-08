import type { Post, Project, TimelineEvent } from "./types";
import { supabase } from "./supabase";

// ---- Posts ----

const STATIC_POSTS: Post[] = [
  {
    id: "1",
    title: "多智能体系统聚合机制综述",
    slug: "mas-aggregation-survey",
    description: "梳理 MAS 中的协调模式：从 Free-MAD 到 LLMASC，探索智能体如何讨论、投票与达成共识。",
    content: `
## 引言

多智能体系统（Multi-Agent System, MAS）近年来随着大语言模型（LLM）的进步获得了新的发展动力。然而，如何让多个智能体有效**协调和聚合**各自的输出，仍然是一个核心挑战。

本文系统梳理了当前主流的聚合机制，涵盖投票、讨论和共识三类范式。

## 背景

### 为什么需要聚合？

单个 LLM 的推理能力有限。通过引入多个智能体，可以实现：

- **多样性视角**：不同智能体从不同角度分析问题
- **错误纠正**：通过交叉验证减少幻觉
- **能力互补**：各智能体专注于不同子任务

聚合机制的核心是在多样性和一致性之间取得平衡：

$$
\\text{Quality} = \\alpha \\cdot \\text{Diversity} + (1 - \\alpha) \\cdot \\text{Consistency}
$$

其中 $\\alpha \\in [0, 1]$ 是权衡因子。

## 聚合机制分类

### 投票机制

投票是最直接的方式。各智能体给出独立答案，通过多数决定最终输出。

> 投票机制的优点是简单高效，但忽略了智能体之间的推理过程。

主要方法：

| 方法 | 特点 | 适用场景 |
|------|------|----------|
| 多数投票 | 简单直接 | 分类任务 |
| 加权投票 | 考虑置信度 | 需要不确定性估计 |
| 排名投票 | 保留更多信息 | 排序任务 |

### 讨论式方法

讨论式方法让智能体相互交流后再做出决策：

1. 各智能体独立生成初始响应
2. 相互阅读对方的输出
3. 基于同行的反馈修正自己的答案
4. 最终聚合修正后的结果

\`\`\`python
# 示例：智能体讨论流程
def agent_deliberation(agents, question):
    responses = []
    for agent in agents:
        initial = agent.respond(question)
        responses.append(initial)

    refined = []
    for i, agent in enumerate(agents):
        other = [r for j, r in enumerate(responses) if j != i]
        refined.append(agent.refine(question, other))

    return aggregate(refined)
\`\`\`

## 总结

聚合机制是 MAS 系统的关键组成部分。选择哪种取决于场景：

- 简单分类任务 → **多数投票**
- 复杂推理任务 → **讨论式方法**
- 安全关键场景 → **共识机制**

未来研究将关注自适应聚合策略和人机协作下的聚合优化。
`,
    cover: null,
    category: "研究",
    tags: ["MAS", "LLM", "综述"],
    published: true,
    created_at: "2026-06-25",
    updated_at: "2026-06-25",
  },
  {
    id: "2",
    title: "用 WebAssembly 构建校园导航系统",
    slug: "campus-navigation-wasm",
    description: "将 C++ 图算法移植到浏览器：架构设计、踩坑记录与经验总结。",
    content: "",
    cover: null,
    category: "工程",
    tags: ["C++", "WebAssembly", "图论"],
    published: true,
    created_at: "2026-06-15",
    updated_at: "2026-06-15",
  },
  {
    id: "3",
    title: "为什么我在 Obsidian 里写 Markdown",
    slug: "obsidian-writing-workflow",
    description: "我的写作工作流：从闪念笔记到发布文章，以及为什么纯文本是长期主义的选择。",
    content: "",
    cover: null,
    category: "思考",
    tags: ["写作", "Obsidian", "Markdown"],
    published: true,
    created_at: "2026-06-01",
    updated_at: "2026-06-01",
  },
  {
    id: "4",
    title: "深入理解 Dijkstra：从理论到实现",
    slug: "dijkstra-deep-dive",
    description: "最短路径算法深度解析——数学基础、边界条件与实用优化技巧。",
    content: "",
    cover: null,
    category: "算法",
    tags: ["图论", "Dijkstra", "C++"],
    published: true,
    created_at: "2026-05-20",
    updated_at: "2026-05-20",
  },
  {
    id: "5",
    title: "Vue 3 Composition API 入门",
    slug: "vue3-composition-api",
    description: "从 Options API 到 Composition API 的迁移之路：模式、陷阱与实战经验。",
    content: "",
    cover: null,
    category: "前端",
    tags: ["Vue 3", "TypeScript", "前端"],
    published: true,
    created_at: "2026-05-10",
    updated_at: "2026-05-10",
  },
];

export async function getPosts(): Promise<Post[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false });
    if (!error && data?.length) return data as Post[];
  }
  return STATIC_POSTS;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Post;
  }
  return STATIC_POSTS.find((p) => p.slug === slug) ?? null;
}

// ---- Projects ----

const STATIC_PROJECTS: Project[] = [
  {
    id: "1",
    title: "海南大学导航系统",
    slug: "hainanu-navigation",
    description: "覆盖三个校区的校园导航系统，基于稀疏图的双图架构，C++ 实现并通过 WebAssembly 部署至浏览器。",
    cover: null,
    content: "",
    tech_stack: ["C++", "WebAssembly", "图算法", "HTML/CSS", "Emscripten"],
    github_url: "https://github.com/wanghongyu666qiang/The_navigation_of_hainanu_web",
    demo_url: "https://wanghongyu666qiang.github.io/The_navigation_of_hainanu_web/",
    status: "已完成",
    created_at: "2026-06-17",
    updated_at: "2026-06-17",
  },
  {
    id: "2",
    title: "智能开支追踪器",
    slug: "smart-expense-tracker",
    description: "基于 Vue 3 的个人财务管理应用，支持分类管理、预算提醒与数据可视化。",
    cover: null,
    content: "",
    tech_stack: ["Vue 3", "TypeScript", "Chart.js", "Pinia"],
    github_url: "https://github.com/wanghongyu666qiang/smart-expense-tracker",
    demo_url: null,
    status: "已完成",
    created_at: "2026-03-15",
    updated_at: "2026-03-15",
  },
];

export async function getProjects(): Promise<Project[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data?.length) return data as Project[];
  }
  return STATIC_PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as Project;
  }
  return STATIC_PROJECTS.find((p) => p.slug === slug) ?? null;
}

// ---- Timeline ----

const STATIC_TIMELINE: TimelineEvent[] = [
  {
    id: "1",
    date: "2026-06-17",
    title: "导航系统部署上线",
    description: "将海南大学导航系统以 WebAssembly 形式部署至 GitHub Pages，完成数据结构课程设计项目。",
    type: "project",
    link: null,
    created_at: "2026-06-17",
  },
  {
    id: "2",
    date: "2026-05-10",
    title: "启动 MAS 综述研究",
    description: "开始系统梳理多智能体系统聚合机制文献，研读 Free-MAD、DeLLMphi、LLMASC 等相关协调模式论文。",
    type: "milestone",
    link: null,
    created_at: "2026-05-10",
  },
  {
    id: "3",
    date: "2026-03-15",
    title: "完成智能开支追踪器",
    description: "完成 Vue 3 开支追踪应用，实现 8 项核心功能，包括分类管理、预算提醒与数据可视化。",
    type: "project",
    link: null,
    created_at: "2026-03-15",
  },
  {
    id: "4",
    date: "2025-12-30",
    title: "完成第一学期课程",
    description: "以优异成绩完成程序设计、数据结构、高等数学等基础课程。",
    type: "milestone",
    link: null,
    created_at: "2025-12-30",
  },
  {
    id: "5",
    date: "2025-09-01",
    title: "进入海南大学",
    description: "入读海南大学海甸校区计算机科学与技术专业。",
    type: "milestone",
    link: null,
    created_at: "2025-09-01",
  },
];

export async function getTimeline(): Promise<TimelineEvent[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from("timeline")
      .select("*")
      .order("date", { ascending: false });
    if (!error && data?.length) return data as TimelineEvent[];
  }
  return STATIC_TIMELINE;
}
