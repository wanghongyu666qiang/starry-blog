import Link from "next/link";
import type { Metadata } from "next";
import { getPostBySlug, getPosts } from "@/lib/data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { PostCard } from "@/components/PostCard";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPostBySlug(slug);
  if (!article) return { title: "文章未找到" };
  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-center">
        <h1 className="text-2xl font-semibold text-text-primary">文章未找到</h1>
        <p className="mt-4 text-text-secondary">你查找的文章不存在。</p>
        <Link href="/articles" className="mt-6 inline-block text-sm text-text-secondary hover:text-text-primary transition-colors">
          &larr; 返回文章列表
        </Link>
      </div>
    );
  }

  const allPosts = await getPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  // Related: same category, excluding current
  const relatedPosts = allPosts
    .filter((p) => p.category === article.category && p.slug !== article.slug)
    .slice(0, 2);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24">
      {/* Article Header */}
      <header className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 text-sm text-text-tertiary">
          <time dateTime={article.created_at}>{article.created_at}</time>
          <span aria-hidden="true">|</span>
          <span>{article.category}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          {article.description}
        </p>
        {article.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-2 py-0.5 text-xs text-text-tertiary border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="mt-12 max-w-5xl mx-auto flex gap-16">
        {/* Article Content */}
        <article className="min-w-0 flex-1 max-w-3xl mx-auto">
          <MarkdownRenderer content={article.content} />

          {/* Article Navigation */}
          <nav className="mt-16 pt-8 border-t border-border flex justify-between text-sm">
            {prevPost ? (
              <Link href={`/articles/${prevPost.slug}`} className="group max-w-[45%]">
                <span className="text-text-tertiary">&larr; 上一篇</span>
                <p className="mt-1 text-text-secondary group-hover:text-text-primary transition-colors line-clamp-1">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link href={`/articles/${nextPost.slug}`} className="group max-w-[45%] text-right">
                <span className="text-text-tertiary">下一篇 &rarr;</span>
                <p className="mt-1 text-text-secondary group-hover:text-text-primary transition-colors line-clamp-1">
                  {nextPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </article>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-lg font-semibold text-text-primary mb-6">相关文章</h2>
          {relatedPosts.map((post) => (
            <PostCard
              key={post.slug}
              title={post.title}
              description={post.description}
              date={post.created_at}
              category={post.category || undefined}
              slug={post.slug}
            />
          ))}
        </section>
      )}
    </div>
  );
}
