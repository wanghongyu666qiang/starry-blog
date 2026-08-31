import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";
import { getColumnBySlug, getPostsForColumn } from "@/lib/columns";
import { getPosts } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site";
import type { ColumnDefinition } from "@/lib/columns";

function requireColumn(slug: string): ColumnDefinition {
  const result = getColumnBySlug(slug);
  if (!result) throw new Error(`缺少 ${slug} 专栏配置`);
  return result;
}

const column = requireColumn("algorithms");

export const metadata: Metadata = {
  title: column.title,
  description: column.description,
  alternates: { canonical: "/columns/algorithms" },
};

export default async function AlgorithmsColumnPage() {
  const posts = getPostsForColumn(await getPosts(), column);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: column.title,
          description: column.description,
          url: absoluteUrl("/columns/algorithms"),
          inLanguage: siteConfig.language,
          hasPart: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: absoluteUrl(`/articles/${post.slug}`),
          })),
        }}
      />

      <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-24">
        <BackButton href="/columns" label="返回专栏" />

        <header className="mt-6 max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
            LeetCode Interview · C++
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            {column.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
            {column.description}
          </p>

          <dl className="mt-8 grid max-w-2xl grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
            <div className="bg-surface px-4 py-4">
              <dt className="text-xs text-text-tertiary">学习目标</dt>
              <dd className="mt-1 text-sm font-medium text-text-primary">
                {column.focus}
              </dd>
            </div>
            <div className="bg-surface px-4 py-4">
              <dt className="text-xs text-text-tertiary">默认语言</dt>
              <dd className="mt-1 text-sm font-medium text-text-primary">
                {column.language}
              </dd>
            </div>
            <div className="bg-surface px-4 py-4">
              <dt className="text-xs text-text-tertiary">更新方式</dt>
              <dd className="mt-1 text-sm font-medium text-text-primary">
                按学习路线持续更新
              </dd>
            </div>
          </dl>
        </header>

        <section className="mt-16" aria-labelledby="roadmap-heading">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
              Roadmap
            </p>
            <h2
              id="roadmap-heading"
              className="mt-2 text-2xl font-semibold tracking-tight text-text-primary"
            >
              学习路线
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              先建立解题工具箱，再掌握数据结构与高频模式，最后进入搜索、图论和动态规划。
            </p>
          </div>

          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {column.tracks.map((track, index) => (
              <li
                key={track.title}
                className="border border-border bg-surface p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-border bg-bg-alt font-mono text-xs text-text-tertiary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {track.description}
                    </p>
                  </div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {track.topics.map((topic) => (
                    <li
                      key={topic}
                      className="border border-border bg-bg-alt px-2 py-1 text-xs text-text-tertiary"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16" aria-labelledby="column-posts-heading">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-tertiary">
                Articles
              </p>
              <h2
                id="column-posts-heading"
                className="mt-2 text-2xl font-semibold tracking-tight text-text-primary"
              >
                专栏文章
              </h2>
            </div>
            {posts.length > 0 && (
              <span className="text-xs text-text-tertiary">
                {posts.length} 篇
              </span>
            )}
          </div>

          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <PostCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.created_at}
                  category={post.category}
                  slug={post.slug}
                  tags={post.tags}
                  readingTime={post.reading_time}
                  difficulty={post.difficulty}
                />
              ))}
            </div>
          ) : (
            <div className="border-b border-border py-10">
              <p className="text-sm font-medium text-text-primary">
                第一篇文章正在整理中。
              </p>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
                专栏首期先发布学习路线；未完成的草稿不会出现在公开列表中。
              </p>
            </div>
          )}

          <Link
            href="/articles"
            className="mt-6 inline-flex text-sm text-text-tertiary transition-colors hover:text-text-primary"
          >
            浏览全部文章 &rarr;
          </Link>
        </section>
      </div>
    </>
  );
}
