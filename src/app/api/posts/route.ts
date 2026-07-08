import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export async function POST(request: Request) {
  const { slug, title, description, content, category, tags, date, published } =
    await request.json();

  if (!slug || !title) {
    return NextResponse.json({ error: "slug 和 title 为必填项" }, { status: 400 });
  }

  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${(description || "").replace(/"/g, '\\"')}"`,
    `date: "${date || new Date().toISOString().split("T")[0]}"`,
    `category: "${category || ""}"`,
    `tags: [${(tags || []).map((t: string) => `"${t}"`).join(", ")}]`,
    `published: ${published !== false}`,
    "---",
    "",
    content || "",
  ].join("\n");

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(POSTS_DIR, `${slug}.md`), frontmatter, "utf-8");
  return NextResponse.json({ ok: true, slug });
}
