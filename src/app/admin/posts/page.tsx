import Link from "next/link";
import { getPosts } from "@/lib/data";

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary">文章管理</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 text-sm font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors"
        >
          新建文章
        </Link>
      </div>

      <div className="mt-8 border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-alt">
              <th className="px-4 py-3 text-left font-medium text-text-secondary">标题</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">分类</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary hidden sm:table-cell">日期</th>
              <th className="px-4 py-3 text-left font-medium text-text-secondary">操作</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.slug} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-text-primary">{post.title}</td>
                <td className="px-4 py-3 text-text-tertiary hidden sm:table-cell">{post.category}</td>
                <td className="px-4 py-3 text-text-tertiary hidden sm:table-cell">{post.created_at}</td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/posts/${post.slug}`}
                    className="text-text-secondary hover:text-text-primary transition-colors"
                  >
                    编辑
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
