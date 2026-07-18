import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 · 页面未找到",
};

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 pt-20 pb-24">
      <div className="text-center max-w-sm">
        <p className="text-5xl font-light text-text-tertiary">404</p>
        <h1 className="mt-4 text-xl font-semibold text-text-primary">这个页面不存在</h1>
        <p className="mt-2 text-sm text-text-secondary leading-relaxed">
          也许链接失效了，也许从来就没写过，<br />
          但首页还有更多内容等着你。
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-4 py-2 text-sm font-medium text-text-inverse bg-text-primary hover:-translate-y-0.5 transition-transform duration-200"
        >
          回到首页
        </Link>
      </div>
    </div>
  );
}
