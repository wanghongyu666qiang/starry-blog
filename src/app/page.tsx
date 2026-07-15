import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getPosts, getProjects, getTimeline } from "@/lib/data";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";

export const metadata: Metadata = {
  description: "海南大学软件工程专业在读。构建智能工具与有意义的软件。",
};

export default async function Home() {
  const projects = await getProjects();
  const posts = await getPosts();
  const timeline = await getTimeline();

  const featuredProjects = projects.slice(0, 3);
  const latestArticles = posts.slice(0, 3);
  const timelinePreview = timeline.slice(0, 3);

  // Find zhi-xue project for "Currently building"
  const zhiXue = projects.find((p) => p.slug === "zhi-xue");

  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-border bg-bg-alt">
              <Image
                src="/avatar.jpg"
                alt="Starry"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
              你好，我是 Starry。
            </h1>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-xl">
              Software Engineering Student
            </p>
            <p className="mt-1 text-base text-text-secondary leading-relaxed max-w-xl">
              Building intelligent tools and meaningful software.
            </p>

            {/* Focus tags */}
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["AI Agent", "RAG", "WebAssembly", "Developer Tools"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2.5 py-1 text-xs text-text-secondary bg-bg-alt border border-border"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Currently building */}
            {zhiXue && (
              <div className="mt-6 p-4 border border-border bg-bg-alt max-w-lg">
                <p className="text-xs text-text-tertiary uppercase tracking-wider">
                  Currently Building
                </p>
                <p className="mt-1 text-sm font-medium text-text-primary">
                  {zhiXue.title}
                </p>
                <p className="mt-0.5 text-sm text-text-secondary">
                  {zhiXue.description}
                </p>
                <Link
                  href={`/projects/${zhiXue.slug}`}
                  className="inline-block mt-2 text-xs text-text-secondary hover:text-text-primary transition-colors"
                >
                  查看项目 &rarr;
                </Link>
              </div>
            )}

            {/* Currently learning */}
            <div className="mt-4">
              <p className="text-xs text-text-tertiary uppercase tracking-wider">
                Currently Learning
              </p>
              <p className="text-sm text-text-secondary">
                LLM Agent Architecture
              </p>
            </div>

            {/* CTA */}
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/articles"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium bg-text-primary text-text-inverse hover:bg-text-secondary transition-colors"
              >
                阅读文章
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-border hover:border-text-primary text-text-primary transition-colors"
              >
                查看项目
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-text-primary">精选项目</h2>
          <Link
            href="/projects"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            全部项目 &rarr;
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
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
            />
          ))}
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-text-primary">时间线</h2>
          <Link
            href="/timeline"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            完整时间线 &rarr;
          </Link>
        </div>
        <div className="border-l-2 border-border pl-6 space-y-6">
          {timelinePreview.map((event) => (
            <div key={event.id} className="relative">
              <span className="absolute -left-[31px] top-0.5 w-3 h-3 bg-surface border-2 border-border rounded-full" />
              <time className="text-sm text-text-tertiary">{event.date}</time>
              <p className="mt-0.5 text-text-primary">{event.title}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
