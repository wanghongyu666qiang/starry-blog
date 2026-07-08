import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export async function POST(request: Request) {
  const { slug, title, description, content, tech_stack, github_url, demo_url, status, date } =
    await request.json();

  if (!slug || !title) {
    return NextResponse.json({ error: "slug 和 title 为必填项" }, { status: 400 });
  }

  const frontmatter = [
    "---",
    `title: "${(title || "").replace(/"/g, '\\"')}"`,
    `description: "${(description || "").replace(/"/g, '\\"')}"`,
    `date: "${date || new Date().toISOString().split("T")[0]}"`,
    `tech_stack: [${(tech_stack || []).map((t: string) => `"${t}"`).join(", ")}]`,
    github_url ? `github_url: "${github_url}"` : null,
    demo_url ? `demo_url: "${demo_url}"` : null,
    `status: "${status || "draft"}"`,
    "---",
    "",
    content || "",
  ]
    .filter(Boolean)
    .join("\n");

  if (!fs.existsSync(PROJECTS_DIR)) {
    fs.mkdirSync(PROJECTS_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(PROJECTS_DIR, `${slug}.md`), frontmatter, "utf-8");
  return NextResponse.json({ ok: true, slug });
}
