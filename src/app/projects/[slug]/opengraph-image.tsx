import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { createOgImage, humanizeSlug, OG_SIZE } from "@/lib/og";

export const alt = "Starry 项目案例";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();
  const technologies = project.tech_stack.filter((technology) =>
    /^[\x20-\x7e]+$/.test(technology),
  );
  return createOgImage({
    eyebrow: "Project",
    title: humanizeSlug(project.slug),
    description: `Built with ${technologies.join(" · ")}`,
  });
}
