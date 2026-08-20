import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  postFrontmatterSchema,
  projectFrontmatterSchema,
  validateMarkdownImages,
  validateSlug,
} from "./content-schema";
import type { Post, Project } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export function computeReadingTime(content: string): number {
  const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  return Math.max(1, Math.ceil((chineseChars + englishWords) / 400));
}

function computeDifficulty(category: Post["category"]): Post["difficulty"] {
  return category === "Research" || category === "Engineering"
    ? "进阶"
    : "入门";
}

function readMarkdownFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  const files = fs.readdirSync(directory).filter((file) => file.endsWith(".md"));
  const slugs = files.map((file) => file.replace(/\.md$/, ""));
  const normalized = new Set<string>();

  for (const slug of slugs) {
    validateSlug(slug);
    const key = slug.toLowerCase();
    if (normalized.has(key)) throw new Error(`重复 slug: ${slug}`);
    normalized.add(key);
  }

  return files;
}

function readPost(filename: string): Post {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(CONTENT_DIR, "posts", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const parsed = postFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      `文章 ${filename} 的 frontmatter 无效:\n${parsed.error.issues
        .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  validateMarkdownImages(content, filename);
  const meta = parsed.data;
  return {
    id: slug,
    slug,
    title: meta.title,
    description: meta.description,
    content,
    cover: meta.cover ?? null,
    canonical_url: meta.canonicalUrl ?? null,
    category: meta.category,
    tags: [...new Set(meta.tags)],
    published: meta.published,
    featured: meta.featured,
    created_at: meta.date,
    updated_at: meta.updated ?? meta.date,
    reading_time: computeReadingTime(content),
    difficulty: computeDifficulty(meta.category),
  };
}

function readProject(filename: string): Project {
  const slug = filename.replace(/\.md$/, "");
  const filePath = path.join(CONTENT_DIR, "projects", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const parsed = projectFrontmatterSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error(
      `项目 ${filename} 的 frontmatter 无效:\n${parsed.error.issues
        .map((issue) => `- ${issue.path.join(".")}: ${issue.message}`)
        .join("\n")}`,
    );
  }

  validateMarkdownImages(content, filename);
  const meta = parsed.data;
  return {
    id: slug,
    slug,
    title: meta.title,
    description: meta.description,
    content,
    cover: meta.cover ?? null,
    role: meta.role,
    tech_stack: [...new Set(meta.tech_stack)],
    github_url: meta.github_url ?? null,
    demo_url: meta.demo_url ?? null,
    status: meta.status,
    featured: meta.featured,
    created_at: meta.date,
    updated_at: meta.updated ?? meta.date,
  };
}

export async function getPosts(): Promise<Post[]> {
  return readMarkdownFiles(path.join(CONTENT_DIR, "posts"))
    .map(readPost)
    .filter((post) => post.published)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
}

export async function getFeaturedPosts(limit = 3): Promise<Post[]> {
  const posts = await getPosts();
  return [...posts]
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const filePath = path.join(CONTENT_DIR, "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const post = readPost(`${slug}.md`);
  return post.published ? post : null;
}

export async function getProjects(): Promise<Project[]> {
  return readMarkdownFiles(path.join(CONTENT_DIR, "projects"))
    .map(readProject)
    .filter((project) => project.status !== "草稿")
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
}

export async function getFeaturedProjects(limit = 3): Promise<Project[]> {
  const projects = await getProjects();
  return [...projects]
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return null;
  const filePath = path.join(CONTENT_DIR, "projects", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const project = readProject(`${slug}.md`);
  return project.status === "草稿" ? null : project;
}

export async function validateAllContent(): Promise<void> {
  await Promise.all([getPosts(), getProjects()]);
}
