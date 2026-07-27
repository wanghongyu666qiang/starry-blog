import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/data";
import { displayCategory } from "@/lib/utils";
import { extractHeadings } from "@/lib/markdown";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { PostCard } from "@/components/PostCard";
import { BackButton } from "@/components/BackButton";
import { ReadingProgress } from "@/components/ReadingProgress";
import { TableOfContents } from "@/components/TableOfContents";
import { JsonLd } from "@/components/JsonLd";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostBySlug(slug);
  if (!article) return { title: "文章未找到" };
  const canonical = article.canonical_url ?? absoluteUrl(`/articles/${slug}`);

  return {
    title: article.title,
    description: article.description,
    authors: [{ name: siteConfig.author.name, url: siteConfig.author.github }],
    alternates: { canonical },
    openGraph: {
      title: article.title,
      description: article.description,
      url: canonical,
      type: "article",
      publishedTime: article.created_at,
      modifiedTime: article.updated_at,
      authors: [siteConfig.author.name],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);
  if (!article) notFound();

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const relatedPosts = allPosts
    .filter(
      (post) =>
        post.category === article.category && post.slug !== article.slug,
    )
    .slice(0, 2);
  const headings = extractHeadings(article.content);
  const canonical = article.canonical_url ?? absoluteUrl(`/articles/${slug}`);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: article.title,
          description: article.description,
          datePublished: article.created_at,
          dateModified: article.updated_at,
          mainEntityOfPage: canonical,
          url: canonical,
          inLanguage: siteConfig.language,
          keywords: article.tags.join(", "),
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.author.github,
          },
          publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
          },
          image: article.cover
            ? absoluteUrl(article.cover)
            : absoluteUrl(`/articles/${slug}/opengraph-image`),
        }}
      />
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-24">
        <BackButton href="/articles" label="返回文章列表" />
        <header className="mx-auto mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-text-tertiary">
            <time dateTime={article.created_at}>{article.created_at}</time>
            {article.updated_at !== article.created_at && (
              <>
                <span aria-hidden="true">·</span>
                <span>更新于 {article.updated_at}</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{displayCategory(article.category)}</span>
            <span aria-hidden="true">·</span>
            <span>{article.difficulty}</span>
            <span aria-hidden="true">·</span>
            <span>{article.reading_time} 分钟阅读</span>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-text-secondary">
            {article.description}
          </p>
          {article.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2" aria-label="文章标签">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-2 py-0.5 text-xs text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="mx-auto mt-12 flex max-w-5xl flex-col gap-10 lg:flex-row-reverse lg:gap-16">
          <TableOfContents headings={headings} />
          <article className="min-w-0 flex-1">
            <MarkdownRenderer content={article.content} />

            <nav
              className="mt-16 flex justify-between border-t border-border pt-8 text-sm"
              aria-label="文章翻页"
            >
              {prevPost ? (
                <Link
                  href={`/articles/${prevPost.slug}`}
                  className="group max-w-[45%]"
                >
                  <span className="text-text-tertiary">← 上一篇</span>
                  <p className="mt-1 line-clamp-1 text-text-secondary transition-colors group-hover:text-text-primary">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
              {nextPost ? (
                <Link
                  href={`/articles/${nextPost.slug}`}
                  className="group max-w-[45%] text-right"
                >
                  <span className="text-text-tertiary">下一篇 →</span>
                  <p className="mt-1 line-clamp-1 text-text-secondary transition-colors group-hover:text-text-primary">
                    {nextPost.title}
                  </p>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          </article>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-24 max-w-3xl">
            <h2 className="mb-6 text-lg font-semibold text-text-primary">
              相关文章
            </h2>
            {relatedPosts.map((post) => (
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
          </section>
        )}
      </div>
    </>
  );
}
