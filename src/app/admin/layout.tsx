import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "管理后台 — Starry",
  robots: { index: false },
};

const SIDEBAR_ITEMS = [
  { href: "/admin/dashboard", label: "概览" },
  { href: "/admin/posts", label: "文章" },
  { href: "/admin/projects", label: "项目" },
  { href: "/admin/timeline", label: "时间线" },
  { href: "/admin/settings", label: "设置" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <a
        href="#admin-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-text-primary focus:text-text-inverse focus:text-sm"
      >
        跳到内容
      </a>
      {/* Sidebar */}
      <aside className="w-52 shrink-0 border-r border-border bg-surface" aria-label="管理导航">
        <div className="px-4 py-4 border-b border-border">
          <Link href="/admin/dashboard" className="text-text-primary font-medium text-sm">
            Starry 后台
          </Link>
        </div>
        <nav className="p-3">
          <ul className="space-y-1">
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-alt transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto p-3 border-t border-border">
          <form action="/api/logout" method="POST">
            <button className="block w-full px-3 py-2 text-sm text-text-tertiary hover:text-text-primary transition-colors text-left">
              退出登录
            </button>
          </form>
        </div>
      </aside>

      {/* Content */}
      <main id="admin-content" className="flex-1 bg-bg min-h-screen">{children}</main>
    </div>
  );
}
