import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, Project, TimelineEvent } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "src/content");

// ---- Helpers ----

function computeReadingTime(content: string): number {
  // 中文字符 + 英文单词估算，约 400 字/分钟
  const chineseChars = (content.match(/[\u4e00-\u9fff]/g) || []).length;
  const englishWords = (content.match(/[a-zA-Z]+/g) || []).length;
  const total = chineseChars + englishWords;
  return Math.max(1, Math.ceil(total / 400));
}

function computeDifficulty(category: string | null): string {
  if (category === "Research" || category === "Engineering") return "进阶";
  return "入门";
}

// ---- Posts ----

function readPostsDir(): Post[] {
  const dir = path.join(CONTENT_DIR, "posts");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.md$/, "");
      return {
        id: slug,
        title: data.title || slug,
        slug,
        description: data.description || "",
        content,
        cover: data.cover || null,
        category: data.category || null,
        tags: data.tags || [],
        published: data.published !== false,
        created_at: data.date || "",
        updated_at: data.updated || data.date || "",
        reading_time: computeReadingTime(content),
        difficulty: computeDifficulty(data.category || null),
      } as Post;
    })
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getPosts(): Promise<Post[]> {
  return readPostsDir();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(CONTENT_DIR, "posts", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    id: slug,
    title: data.title || slug,
    slug,
    description: data.description || "",
    content,
    cover: data.cover || null,
    category: data.category || null,
    tags: data.tags || [],
    published: data.published !== false,
    created_at: data.date || "",
    updated_at: data.updated || data.date || "",
    reading_time: computeReadingTime(content),
    difficulty: computeDifficulty(data.category || null),
  } as Post;
}

// ---- Projects ----

function readProjectsDir(): Project[] {
  const dir = path.join(CONTENT_DIR, "projects");
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const slug = filename.replace(/\.md$/, "");
      return {
        id: slug,
        title: data.title || slug,
        slug,
        description: data.description || "",
        content,
        cover: data.cover || null,
        role: data.role || null,
        tech_stack: data.tech_stack || [],
        github_url: data.github_url || null,
        demo_url: data.demo_url || null,
        status: data.status || "draft",
        created_at: data.date || "",
        updated_at: data.updated || data.date || "",
      } as Project;
    })
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getProjects(): Promise<Project[]> {
  return readProjectsDir();
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(CONTENT_DIR, "projects", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    id: slug,
    title: data.title || slug,
    slug,
    description: data.description || "",
    content,
    cover: data.cover || null,
    role: data.role || null,
    tech_stack: data.tech_stack || [],
    github_url: data.github_url || null,
    demo_url: data.demo_url || null,
    status: data.status || "draft",
    created_at: data.date || "",
    updated_at: data.updated || data.date || "",
  } as Project;
}

// ---- Timeline ----

function readTimelineFile(): TimelineEvent[] {
  const filePath = path.join(CONTENT_DIR, "timeline.json");
  if (!fs.existsSync(filePath)) return [];

  const raw = fs.readFileSync(filePath, "utf-8");
  const events = JSON.parse(raw) as TimelineEvent[];
  return events.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return readTimelineFile();
}
