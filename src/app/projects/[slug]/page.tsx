import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { getProjectBySlug } from "@/lib/data";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "项目未找到" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6 pt-20 sm:pt-24 pb-16 sm:pb-24">
      <BackButton href="/projects" label="返回项目列表" />

      {/* Project Header */}
      <header>
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <span className="px-2 py-0.5 text-xs border border-border">
            {project.status}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          {project.description}
        </p>

        {/* Role */}
        {project.role && (
          <div className="mt-6 p-4 border border-border bg-bg-alt">
            <p className="text-sm text-text-secondary">
              <span className="font-medium text-text-primary">Role: </span>
              {project.role}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="inline-block px-2 py-0.5 text-xs text-text-tertiary bg-bg-alt border border-border"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-6 flex items-center gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              GitHub &rarr;
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              在线演示 &rarr;
            </a>
          )}
        </div>
      </header>

      {/* Project Content */}
      <div className="mt-16">
        <MarkdownRenderer content={project.content} />
      </div>

      {/* Back Link */}
      <div className="mt-16 pt-8 border-t border-border">
        <Link
          href="/projects"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        >
          &larr; 全部项目
        </Link>
      </div>
    </div>
  );
}
