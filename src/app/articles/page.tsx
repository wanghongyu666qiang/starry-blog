import { getPosts } from "@/lib/data";
import { PostCard } from "@/components/PostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章",
  description: "技术写作、学习笔记与项目文档。",
};

const CATEGORIES = ["全部", "研究", "工程", "算法", "前端", "思考"];

export default async function ArticlesPage() {
  const posts = await getPosts();

  // Extract unique categories from posts
  const existingCategories = [...new Set(posts.map((p) => p.category).filter(Boolean))];
  const allCategories = CATEGORIES.filter(
    (c) => c === "全部" || existingCategories.includes(c)
  );

  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight text-text-primary">文章</h1>
      <p className="mt-3 text-text-secondary">
        技术写作、学习笔记与项目文档。
      </p>

      {/* Search */}
      <div className="mt-8">
        <input
          type="search"
          placeholder="搜索文章…"
          className="w-full px-4 py-2.5 text-sm border border-border bg-surface text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-text-primary transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="mt-6 flex flex-wrap gap-2">
        {allCategories.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1.5 text-sm border transition-colors ${
              cat === "全部"
                ? "border-text-primary text-text-primary"
                : "border-border text-text-secondary hover:border-text-primary hover:text-text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article List */}
      <div className="mt-8">
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            title={post.title}
            description={post.description}
            date={post.created_at}
            category={post.category || undefined}
            slug={post.slug}
          />
        ))}
      </div>

      {/* Pagination */}
      {posts.length > 5 && (
        <div className="mt-12 flex items-center justify-center gap-2 text-sm">
          <span className="px-3 py-1.5 text-text-tertiary border border-border cursor-not-allowed">
            上一页
          </span>
          <span className="px-3 py-1.5 bg-text-primary text-text-inverse">1</span>
          <span className="px-3 py-1.5 text-text-secondary border border-border hover:border-text-primary transition-colors cursor-not-allowed">
            下一页
          </span>
        </div>
      )}
    </div>
  );
}
