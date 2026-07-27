import { describe, expect, it } from "vitest";
import {
  computeReadingTime,
  getPostBySlug,
  getPosts,
  getProjectBySlug,
  getProjects,
  validateAllContent,
} from "../src/lib/data";
import {
  postFrontmatterSchema,
  projectFrontmatterSchema,
  validateSlug,
} from "../src/lib/content-schema";
import { absoluteUrl, SITE_URL } from "../src/lib/site";

describe("内容契约", () => {
  it("所有仓库内容都能通过严格校验", async () => {
    await expect(validateAllContent()).resolves.toBeUndefined();
  });

  it("公开列表与详情只返回可发布内容", async () => {
    const posts = await getPosts();
    const projects = await getProjects();
    expect(posts.length).toBeGreaterThan(0);
    expect(projects.length).toBeGreaterThan(0);
    expect(posts.every((post) => post.published)).toBe(true);
    expect(projects.every((project) => project.status !== "草稿")).toBe(true);
    await expect(getPostBySlug("../package")).resolves.toBeNull();
    await expect(getProjectBySlug("UPPER_CASE")).resolves.toBeNull();
  });

  it("拒绝无效日期、分类、URL 和 slug", () => {
    expect(
      postFrontmatterSchema.safeParse({
        title: "测试文章",
        description: "这是一段足够长的测试文章描述。",
        date: "2026-13-99",
        category: "Unknown",
        tags: [],
        published: true,
      }).success,
    ).toBe(false);
    expect(
      projectFrontmatterSchema.safeParse({
        title: "测试项目",
        description: "这是一段足够长的测试项目描述。",
        date: "2026-07-27",
        role: "Full-stack Developer",
        tech_stack: ["TypeScript"],
        github_url: "javascript:alert(1)",
        status: "已完成",
      }).success,
    ).toBe(false);
    expect(() => validateSlug("../secret")).toThrow();
  });

  it("计算阅读时间并生成固定主域名 URL", () => {
    expect(computeReadingTime("中文内容".repeat(200))).toBe(2);
    expect(absoluteUrl("/articles/test")).toBe(`${SITE_URL}/articles/test`);
  });
});
