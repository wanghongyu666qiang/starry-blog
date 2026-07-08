"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export default function AdminProjectEditPage() {
  const router = useRouter();
  const p = useParams();
  const slug = p.slug as string;
  const isNew = slug === "new";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(true);

  useEffect(() => {
    if (!isNew) {
      async function load() {
        const res = await fetch(`/api/admin-project?slug=${slug}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title || "");
          setDescription(data.description || "");
          setContent(data.content || "");
          setTechStack((data.tech_stack || []).join(", "));
          setGithubUrl(data.github_url || "");
          setDemoUrl(data.demo_url || "");
          setStatus(data.status || "draft");
          setDate(data.date || "");
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
      .replace(/[^a-z0-9-]/g, "")
      .slice(0, 60) || (isNew ? "untitled" : slug);

    const url = isNew ? "/api/projects" : `/api/projects/${slug}`;
    const method = isNew ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: newSlug,
        title,
        description,
        content,
        tech_stack: techStack.split(",").map((t) => t.trim()).filter(Boolean),
        github_url: githubUrl || null,
        demo_url: demoUrl || null,
        status,
        date,
      }),
    });

    if (res.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "保存失败");
    }
    setLoading(false);
  }

  async function handleDelete() {
    if (!confirm("确定删除这个项目？")) return;
    await fetch(`/api/projects/${slug}`, { method: "DELETE" });
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-text-primary">
          {isNew ? "新建项目" : "编辑项目"}
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
              <label className="block text-sm text-text-secondary mb-1">项目名 *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">状态</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
              >
                <option value="draft">草稿</option>
                <option value="进行中">进行中</option>
                <option value="已完成">已完成</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">简述</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
            />
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">技术栈（逗号分隔）</label>
              <input
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
                placeholder="如：C++, WebAssembly"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">GitHub 链接</label>
              <input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
              />
            </div>
            <div>
              <label className="block text-sm text-text-secondary mb-1">Demo 链接</label>
              <input
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className="w-full px-3 py-2 border border-border bg-surface text-text-primary text-sm focus:outline-none focus:border-text-primary"
              />
            </div>
          </div>
        </div>

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
            onClick={() => router.push("/admin/projects")}
            className="px-6 py-2 text-sm border border-border text-text-secondary hover:text-text-primary transition-colors"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
}
