import { getProjects } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "项目",
  description: "真实的软件项目。每个项目都解释了为什么做、怎么做、以及收获了什么。",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 pt-24 pb-24">
      <h1 className="text-3xl font-semibold tracking-tight text-text-primary">项目</h1>
      <p className="mt-3 text-text-secondary max-w-lg">
        真实的软件项目。每个项目都解释了为什么做、怎么做、以及收获了什么。
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            title={project.title}
            description={project.description}
            techStack={project.tech_stack}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  );
}
