import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import sitemap from "../src/app/sitemap";
import { GET as getFeed } from "../src/app/feed.xml/route";
import { JsonLd } from "../src/components/JsonLd";
import { extractHeadings } from "../src/lib/markdown";
import { SITE_URL } from "../src/lib/site";

describe("发现与分享", () => {
  it("RSS 包含站点和文章链接", async () => {
    const response = await getFeed();
    const xml = await response.text();
    expect(response.headers.get("content-type")).toContain("application/rss+xml");
    expect(xml).toContain("<rss version=\"2.0\"");
    expect(xml).toContain(`${SITE_URL}/articles/`);
  });

  it("sitemap 包含文章和项目详情", async () => {
    const entries = await sitemap();
    expect(entries.some((entry) => entry.url.includes("/articles/"))).toBe(true);
    expect(entries.some((entry) => entry.url.includes("/projects/"))).toBe(true);
    expect(entries.every((entry) => entry.url.startsWith(SITE_URL))).toBe(true);
  });

  it("JSON-LD 可序列化并转义 HTML", () => {
    const html = renderToStaticMarkup(
      <JsonLd data={{ "@context": "https://schema.org", name: "<Starry>" }} />,
    );
    expect(html).toContain("application/ld+json");
    expect(html).toContain("\\u003cStarry>");
  });

  it("目录 slug 与 rehype-slug 规则保持稳定", () => {
    expect(
      extractHeadings("## 系统架构\n### 实现\n```\n## 忽略\n```\n## 系统架构"),
    ).toEqual([
      { id: "系统架构", text: "系统架构", level: 2 },
      { id: "实现", text: "实现", level: 3 },
      { id: "系统架构-1", text: "系统架构", level: 2 },
    ]);
  });
});
