import type { Metadata } from "next";
import { getPosts, getProjects, getTimeline } from "@/lib/data";
import { HeroSection } from "@/components/HeroSection";
import { PostCard } from "@/components/PostCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TimelinePreview } from "@/components/TimelinePreview";
import { SubscribeCard } from "@/components/SubscribeCard";
import Link from "next/link";

export const metadata: Metadata = {
  description: "海南大学软件工程专业在读。构建智能工具与有意义的软件。",
};

export default async function Home() {
  const projects = await getProjects();
  const posts = await getPosts();
  const timeline = await getTimeline();

  const featuredProjects = projects.slice(0, 3);
  const latestArticles = posts.slice(0, 3);
  const timelinePreview = timeline.slice(0, 5);

  // Find zhi-xue project for "Currently building"
  const zhiXue = projects.find((p) => p.slug === "zhi-xue");

  return (
    <>
      {/* Hero */}
      <HeroSection zhiXue={zhiXue} />

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
            />
          ))}
        </div>
      </section>

      {/* Timeline Preview */}
      <section className="mx-auto max-w-5xl px-5 sm:px-6 pb-16 sm:pb-24">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="text-xl font-semibold text-text-primary">时间线</h2>
          <Link
            href="/timeline"
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            完整时间线 &rarr;
          </Link>
        </div>
        <TimelinePreview events={timelinePreview} />
      </section>

      {/* Subscription */}
      <SubscribeCard />
    </>
  );
}
