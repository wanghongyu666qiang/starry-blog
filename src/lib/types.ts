export const POST_CATEGORIES = [
  "Engineering",
  "Research",
  "Learning",
  "Thoughts",
] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];

export const PROJECT_STATUSES = ["草稿", "进行中", "已完成"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  cover: string | null;
  canonical_url: string | null;
  category: PostCategory;
  tags: string[];
  published: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
  reading_time: number;
  difficulty: "入门" | "进阶";
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  cover: string | null;
  content: string;
  role: string;
  tech_stack: string[];
  github_url: string | null;
  demo_url: string | null;
  status: ProjectStatus;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}
