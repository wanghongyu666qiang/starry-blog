import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/BackButton";
import { JsonLd } from "@/components/JsonLd";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { extractHeadings } from "@/lib/markdown";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "项目未找到" };
  const canonical = absoluteUrl(`/projects/${slug}`);
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: canonical,
      modifiedTime: project.updated_at,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const headings = extractHeadings(project.content);
  const canonical = absoluteUrl(`/projects/${slug}`);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.description,
          url: canonical,
          dateCreated: project.created_at,
          dateModified: project.updated_at,
          codeRepository: project.github_url,
          runtimePlatform: "Web",
          programmingLanguage: project.tech_stack,
          author: {
            "@type": "Person",
            name: siteConfig.author.name,
            url: siteConfig.author.github,
          },
        }}
      />
      <BackButton href="/projects" label="返回项目列表" />

      <header className="mx-auto mt-6 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 text-xs text-text-tertiary">
          <span className="border border-border px-2 py-0.5">
            {project.status}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={project.created_at}>{project.created_at}</time>
          {project.updated_at !== project.created_at && (
            <>
              <span aria-hidden="true">·</span>
              <span>更新于 {project.updated_at}</span>
            </>
          )}
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-6 border border-border bg-bg-alt p-4">
          <p className="text-sm text-text-secondary">
            <span className="font-medium text-text-primary">我的职责：</span>
            {project.role}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span
              key={tech}
              className="border border-border bg-bg-alt px-2 py-0.5 text-xs text-text-tertiary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              查看源码 ↗
            </a>
          )}
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              在线演示 ↗
            </a>
          )}
        </div>
      </header>

      <div className="mx-auto mt-16 flex max-w-5xl flex-col gap-10 lg:flex-row-reverse lg:gap-16">
        <TableOfContents headings={headings} />
        <article className="min-w-0 flex-1">
          <MarkdownRenderer content={project.content} />
        </article>
      </div>

      <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-8">
        <Link
          href="/projects"
          className="text-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          ← 全部项目
        </Link>
      </div>
    </div>
  );
}
