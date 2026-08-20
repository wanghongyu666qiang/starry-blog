import type { Metadata } from "next";
import { getFeaturedPosts, getFeaturedProjects } from "@/lib/data";
import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl, siteConfig } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = {
  description: "海南大学软件工程专业在读。构建智能工具与有意义的软件。",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const [featuredProjects, latestArticles] = await Promise.all([
    getFeaturedProjects(3),
    getFeaturedPosts(3),
  ]);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: siteConfig.author.name,
          url: siteConfig.url,
          email: `mailto:${siteConfig.author.email}`,
          sameAs: [siteConfig.author.github],
          affiliation: {
            "@type": "CollegeOrUniversity",
            name: "海南大学",
          },
          knowsAbout: [
            "C++",
            "WebAssembly",
            "Multi-Agent Systems",
            "Retrieval-Augmented Generation",
          ],
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          inLanguage: siteConfig.language,
          publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${absoluteUrl("/articles")}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />
      {/* Hero */}
      <HeroSection />

      {/* Featured Projects */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-16 sm:pb-24">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl font-semibold text-text-primary">精选项目</h2>
          <Link
            href="/projects"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            全部项目 &rarr;
          </Link>
        </div>
        <div className="grid gap-5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              title={project.title}
              description={project.description}
              techStack={project.tech_stack}
              slug={project.slug}
              role={project.role}
            />
          ))}
        </div>
      </section>

      {/* Latest Articles */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-16 sm:pb-24">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl font-semibold text-text-primary">最新文章</h2>
          <Link
            href="/articles"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            全部文章 &rarr;
          </Link>
        </div>
        <div>
          {latestArticles.map((article) => (
            <PostCard
              key={article.slug}
              title={article.title}
              description={article.description}
              date={article.created_at}
              category={article.category || undefined}
              slug={article.slug}
              tags={article.tags}
              readingTime={article.reading_time}
              difficulty={article.difficulty}
            />
          ))}
        </div>
      </section>
    </>
  );
}
