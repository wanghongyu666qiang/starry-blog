"use client";
import { BackButton } from "@/components/BackButton";

import { useState, useMemo } from "react";
import { PostCard } from "@/components/PostCard";
import type { Post } from "@/lib/types";

const CATEGORIES = [
  { key: "全部", label: "全部", desc: null },
  { key: "Engineering", label: "Engineering", desc: "技术实现 · 架构设计 · 踩坑记录" },
  { key: "Research", label: "Research", desc: "论文阅读 · AI 研究" },
  { key: "Learning", label: "Learning", desc: "数据结构 · 算法 · 课程笔记" },
  { key: "Thoughts", label: "Thoughts", desc: "开发感悟 · 个人思考" },
];

interface ArticlesClientProps {
  posts: Post[];
}

export function ArticlesClient({ posts }: ArticlesClientProps) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        activeCategory === "全部" || post.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags || []).some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchCategory && matchSearch;
    });
  }, [posts, activeCategory, searchQuery]);

  const existingKeys = useMemo(
    () => new Set(posts.map((p) => p.category).filter(Boolean)),
    [posts]
  );
  const visibleCategories = CATEGORIES.filter(
    (c) => c.key === "全部" || existingKeys.has(c.key)
  );

  const activeDesc = CATEGORIES.find((c) => c.key === activeCategory)?.desc;

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24">
      <BackButton href="/" label="返回首页" />
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">文章</h1>
      <p className="mt-3 text-text-secondary">
        技术写作、学习笔记与项目文档。
      </p>

      {/* Search */}
      <div className="mt-8">
        <input
          type="search"
          placeholder="搜索文章…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2.5 text-sm border border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="mt-5 flex flex-wrap gap-2">
        {visibleCategories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-3 py-1.5 text-sm border transition-colors ${
              activeCategory === cat.key
                ? "border-text-primary text-text-primary"
                : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Category Description */}
      {activeDesc && (
        <p className="mt-2 text-xs text-text-tertiary">{activeDesc}</p>
      )}

      {/* Article List */}
      <div className="mt-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.created_at}
              category={post.category || undefined}
              slug={post.slug}
              tags={post.tags.length > 0 ? post.tags : undefined}
            />
          ))
        ) : (
          <p className="text-sm text-text-tertiary py-12 text-center">
            {searchQuery ? "没有匹配的文章" : "暂无文章"}
          </p>
        )}
      </div>

      {/* Article count */}
      <p className="mt-6 text-xs text-text-tertiary">
        {filteredPosts.length} 篇文章
        {activeCategory !== "全部" && ` · 分类：${activeCategory}`}
        {searchQuery && ` · 搜索："${searchQuery}"`}
      </p>
    </div>
  );
}
