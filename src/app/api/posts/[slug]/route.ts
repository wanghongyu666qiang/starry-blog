import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "src/content/posts");

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { title, description, content, category, tags, date, published } =
    await request.json();

  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "文章不存在" }, { status: 404 });
  }

  const frontmatter = [
    "---",
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${(description || "").replace(/"/g, '\\"')}"`,
    `date: "${date || ""}"`,
    `category: "${category || ""}"`,
    `tags: [${(tags || []).map((t: string) => `"${t}"`).join(", ")}]`,
    `published: ${published !== false}`,
    "---",
    "",
    content || "",
  ].join("\n");

  fs.writeFileSync(filePath, frontmatter, "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(POSTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "文章不存在" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ ok: true });
}
