import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { COLUMNS } from "@/lib/columns";

export const metadata: Metadata = {
  title: "专栏",
  description: "按主题组织的系列学习路线与技术文章。",
  alternates: { canonical: "/columns" },
};

export default function ColumnsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-24">
      <BackButton href="/" label="返回首页" />

      <div className="mt-4 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
          Columns
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
          专栏
        </h1>
        <p className="mt-3 leading-relaxed text-text-secondary">
          把零散笔记组织成可循序学习、持续更新的主题路线。
        </p>
      </div>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2">
        {COLUMNS.map((column) => (
          <li key={column.slug}>
            <Link
              href={`/columns/${column.slug}`}
              className="group block h-full border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-text-primary/30 hover:shadow-lg hover:shadow-neutral-900/5 sm:p-6"
            >
              <article className="flex h-full flex-col">
                <div className="flex flex-wrap gap-2 text-xs text-text-tertiary">
                  <span className="border border-border bg-bg-alt px-2 py-1">
                    {column.focus}
                  </span>
                  <span className="border border-border bg-bg-alt px-2 py-1">
                    {column.language}
                  </span>
                </div>
                <h2 className="mt-5 text-xl font-semibold text-text-primary transition-colors group-hover:text-text-secondary">
                  {column.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
                  {column.description}
                </p>
                <p className="mt-6 text-sm text-text-tertiary transition-colors group-hover:text-text-primary">
                  查看学习路线 &rarr;
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
