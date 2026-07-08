"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export default function AdminPostEditPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const isNew = slug === "new";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  // Load existing post
  useEffect(() => {
    if (!isNew) {
      fetch(`/api/posts/${slug}`)
        .catch(() => {})
        .then(() => {
          // We'll load from data layer directly
        });
    }
  }, [slug, isNew]);

  // Load post data from server component wrapper
  useEffect(() => {
    if (!isNew) {
      async function load() {
        const res = await fetch(`/api/admin-post?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setDescription(data.description || "");
          setContent(data.content || "");
          setCategory(data.category || "");
          setTags((data.tags || []).join(", "));
          setDate(data.date || "");
          setPublished(data.published !== false);
        }
      }
      load();
    }
  }, [slug, isNew]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const newSlug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\u4e00-\u9fff-]/g, "")
      .slice(0, 60) || (isNew ? "untitled" : slug);

    const url = isNew ? "/api/posts" : `/api/posts/${slug}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: newSlug,
        title,
        description,
        content,
        category,
        tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
        date,
        published,
      }),
    });

    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "保存失败");
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("确定删除这篇文章？此操作不可撤销。")) return;

    const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/posts");
      router.refresh();
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">
          {isNew ? "新建文章" : "编辑文章"}
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1.5 text-sm border border-border text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPreview ? "隐藏预览" : "显示预览"}
          </button>
          {!isNew && (
            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              删除
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 border border-red-200 bg-red-50 text-sm text-red-600">{error}</div>
      )}

      <form onSubmit={handleSave}>
        <div className="grid gap-4 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">标题 *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">日期</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">摘要</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">分类</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
                placeholder="如：工程"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">标签（逗号分隔）</label>
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
                placeholder="如：C++, WebAssembly"
              />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4"
                />
                已发布
              </label>
            </div>
          </div>
        </div>

        {/* Editor + Preview split */}
        <div className={`grid ${showPreview ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
          <div>
            <label className="block text-sm text-text-secondary mb-1">Markdown 内容</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[500px] px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary font-mono resize-none"
              placeholder="在此编写 Markdown…"
            />
          </div>
          {showPreview && (
            <div>
              <label className="block text-sm text-text-secondary mb-1">预览</label>
              <div className="h-[500px] overflow-y-auto border border-border bg-surface p-4">
                <MarkdownRenderer content={content || "*内容为空*"} />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="submit"
            disabled={loading || !title}
            className="px-6 py-2 text-sm font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors disabled:opacity-50"
          >
            {loading ? "保存中…" : "保存"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/posts")}
            className="px-6 py-2 text-sm border border-border text-text-secondary hover:text-text-primary transition-colors"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
