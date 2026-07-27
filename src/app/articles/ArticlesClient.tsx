"use client";
import { BackButton } from "@/components/BackButton";

import { useEffect, useState, useMemo } from "react";
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
  initialQuery: string;
  initialCategory: string;
}

export function ArticlesClient({
  posts,
  initialQuery,
  initialCategory,
}: ArticlesClientProps) {
  const allowedInitialCategory = CATEGORIES.some(
    (category) => category.key === initialCategory,
  )
    ? initialCategory
    : "全部";
  const [activeCategory, setActiveCategory] = useState(allowedInitialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const url = new URL(window.location.href);
      if (searchQuery) url.searchParams.set("q", searchQuery);
      else url.searchParams.delete("q");
      if (activeCategory !== "全部") {
        url.searchParams.set("category", activeCategory);
      } else {
        url.searchParams.delete("category");
      }
      window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const onPopState = () => {
      const url = new URL(window.location.href);
      const category = url.searchParams.get("category") ?? "全部";
      setActiveCategory(
        CATEGORIES.some((item) => item.key === category) ? category : "全部",
      );
      setSearchQuery(url.searchParams.get("q") ?? "");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
    () => new Set<string>(posts.map((post) => post.category)),
    [posts]
  );
  const visibleCategories = CATEGORIES.filter(
    (category) =>
      category.key === "全部" || existingKeys.has(category.key),
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
        <label htmlFor="article-search" className="sr-only">
          搜索文章标题、摘要或标签
        </label>
        <input
          id="article-search"
          type="search"
          placeholder="搜索文章…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-describedby="article-results"
          className="w-full px-4 py-2.5 text-sm border border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="mt-5 flex flex-wrap gap-2">
        {visibleCategories.map((cat) => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCategory(cat.key)}
            aria-pressed={activeCategory === cat.key}
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
              readingTime={post.reading_time}
              difficulty={post.difficulty}
            />
          ))
        ) : (
          <p className="text-sm text-text-tertiary py-12 text-center">
            {searchQuery ? "没有匹配的文章" : "暂无文章"}
          </p>
        )}
      </div>

      {/* Article count */}
      <p
        id="article-results"
        className="mt-6 text-xs text-text-tertiary"
        aria-live="polite"
      >
        {filteredPosts.length} 篇文章
        {activeCategory !== "全部" && ` · 分类：${activeCategory}`}
        {searchQuery && ` · 搜索："${searchQuery}"`}
      </p>
    </div>
  );
}
