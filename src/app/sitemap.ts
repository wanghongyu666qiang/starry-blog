import type { MetadataRoute } from "next";
import { getPosts, getProjects } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()]);
  const latestContentDate = [...posts, ...projects]
    .map((item) => item.updated_at)
    .sort()
    .at(-1);

  const staticModified = latestContentDate
    ? new Date(`${latestContentDate}T00:00:00Z`)
    : new Date("2026-07-27T00:00:00Z");
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: staticModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/articles"), lastModified: staticModified, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/projects"), lastModified: staticModified, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/about"), lastModified: new Date("2026-07-27T00:00:00Z"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/resume"), lastModified: new Date("2026-07-27T00:00:00Z"), changeFrequency: "monthly", priority: 0.6 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/articles/${post.slug}`),
    lastModified: new Date(`${post.updated_at}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(`${project.updated_at}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...postPages, ...projectPages];
}
