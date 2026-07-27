import { z } from "zod";
import { POST_CATEGORIES, PROJECT_STATUSES } from "./types";

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "日期必须使用 YYYY-MM-DD")
  .refine((value) => !Number.isNaN(Date.parse(`${value}T00:00:00Z`)), "日期无效");

const safeUrl = z
  .string()
  .url()
  .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
    message: "只允许 http/https URL",
  });

const coverUrl = z
  .string()
  .refine(
    (value) =>
      value.startsWith("/") ||
      (URL.canParse(value) &&
        ["http:", "https:"].includes(new URL(value).protocol)),
    "封面必须是站内绝对路径或 http/https URL",
  );

export const postFrontmatterSchema = z
  .object({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().min(10).max(240),
    date: isoDate,
    updated: isoDate.optional(),
    category: z.enum(POST_CATEGORIES),
    tags: z.array(z.string().trim().min(1).max(40)).default([]),
    published: z.boolean().default(false),
    featured: z.boolean().default(false),
    cover: coverUrl.nullable().optional(),
    canonicalUrl: safeUrl.nullable().optional(),
  })
  .strict();

export const projectFrontmatterSchema = z
  .object({
    title: z.string().trim().min(2).max(120),
    description: z.string().trim().min(10).max(240),
    date: isoDate,
    updated: isoDate.optional(),
    role: z.string().trim().min(4).max(300),
    tech_stack: z.array(z.string().trim().min(1).max(40)).min(1),
    github_url: safeUrl.nullable().optional(),
    demo_url: safeUrl.nullable().optional(),
    status: z.enum(PROJECT_STATUSES),
    featured: z.boolean().default(false),
    cover: coverUrl.nullable().optional(),
  })
  .strict();

export const timelineEventSchema = z
  .object({
    id: z.string().min(1),
    title: z.string().trim().min(2),
    description: z.string().nullable(),
    date: isoDate,
    type: z.string().trim().min(1),
    link: z.string().startsWith("/").nullable(),
    created_at: isoDate,
    context: z.string().optional(),
    what_did: z.string().optional(),
    learned: z.string().optional(),
  })
  .strict();

export const timelineSchema = z.array(timelineEventSchema);

export function validateSlug(slug: string): void {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`无效 slug: "${slug}"，仅允许小写字母、数字和连字符`);
  }
}

export function validateMarkdownImages(content: string, source: string): void {
  const imagePattern = /!\[([^\]]*)\]\(([^)]+)\)/g;
  for (const match of content.matchAll(imagePattern)) {
    if (!match[1].trim()) {
      throw new Error(`${source} 中的图片缺少 alt 文本: ${match[2]}`);
    }
  }
}
