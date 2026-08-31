import type { Post } from "./types";

export interface ColumnTrack {
  title: string;
  description: string;
  topics: readonly string[];
}

export interface ColumnDefinition {
  slug: string;
  title: string;
  description: string;
  focus: string;
  language: string;
  articleTag: string;
  tracks: readonly ColumnTrack[];
}

export const COLUMNS: readonly ColumnDefinition[] = [
  {
    slug: "algorithms",
    title: "算法札记",
    description:
      "面向 LeetCode 面试的 C++ 算法学习路线：从数据结构到算法设计，理解原理、证明与实现。",
    focus: "LeetCode 面试",
    language: "C++",
    articleTag: "算法",
    tracks: [
      {
        title: "基础工具箱",
        description: "建立分析复杂度、选择容器和写出稳定代码的基础。",
        topics: ["STL", "复杂度", "递归", "排序与二分"],
      },
      {
        title: "核心数据结构",
        description: "掌握高频结构的操作、不变量以及典型题型。",
        topics: ["数组与字符串", "链表", "栈与队列", "哈希表", "堆"],
      },
      {
        title: "高频解题模式",
        description: "把零散题目收敛成可识别、可复用的思考框架。",
        topics: ["双指针", "滑动窗口", "前缀和", "单调栈", "区间问题"],
      },
      {
        title: "树与图",
        description: "从遍历过渡到连通性、最短路和拓扑关系。",
        topics: ["二叉树", "DFS / BFS", "并查集", "最短路", "拓扑排序"],
      },
      {
        title: "搜索与回溯",
        description: "用决策树理解枚举边界，通过剪枝控制搜索空间。",
        topics: ["子集", "排列", "组合", "剪枝", "记忆化搜索"],
      },
      {
        title: "动态规划与贪心",
        description: "从状态定义和转移方程出发，建立可解释的正确性。",
        topics: ["线性 DP", "背包", "序列 DP", "区间 DP", "贪心证明"],
      },
    ],
  },
];

export function getColumnBySlug(slug: string): ColumnDefinition | undefined {
  return COLUMNS.find((column) => column.slug === slug);
}

export function getPostsForColumn(
  posts: readonly Post[],
  column: ColumnDefinition,
): Post[] {
  return posts.filter((post) => post.tags.includes(column.articleTag));
}
