import Link from "next/link";
import { getPosts, getProjects, getTimeline } from "@/lib/data";

export default async function DashboardPage() {
  const posts = await getPosts();
  const projects = await getProjects();
  const timeline = await getTimeline();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-text-primary">概览</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="p-6 border border-border bg-surface">
          <p className="text-sm text-text-tertiary">文章</p>
          <p className="mt-2 text-3xl font-semibold text-text-primary">{posts.length}</p>
        </div>
        <div className="p-6 border border-border bg-surface">
          <p className="text-sm text-text-tertiary">项目</p>
          <p className="mt-2 text-3xl font-semibold text-text-primary">{projects.length}</p>
        </div>
        <div className="p-6 border border-border bg-surface">
          <p className="text-sm text-text-tertiary">时间线事件</p>
          <p className="mt-2 text-3xl font-semibold text-text-primary">{timeline.length}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/posts"
          className="p-6 border border-border hover:border-text-primary transition-colors"
        >
          <h2 className="font-medium text-text-primary">管理文章</h2>
          <p className="mt-1 text-sm text-text-secondary">创建、编辑、发布文章</p>
        </Link>
        <Link
          href="/admin/projects"
          className="p-6 border border-border hover:border-text-primary transition-colors"
        >
          <h2 className="font-medium text-text-primary">管理项目</h2>
          <p className="mt-1 text-sm text-text-secondary">管理项目展示和详情</p>
        </Link>
      </div>
    </div>
  );
}
