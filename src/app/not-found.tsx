import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面未找到",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-sm text-text-tertiary">404</p>
        <h1 className="mt-2 text-2xl font-semibold text-text-primary">页面未找到</h1>
        <p className="mt-2 text-text-secondary">你访问的页面不存在。</p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          &larr; 返回首页
        </Link>
      </div>
    </div>
  );
}
