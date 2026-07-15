import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const { title, description, role, content, tech_stack, github_url, demo_url, status, date } =
    await request.json();

  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "项目不存在" }, { status: 404 });
  }

  const frontmatter = [
    "---",
    `title: "${(title || "").replace(/"/g, '\\"')}"`,
    `description: "${(description || "").replace(/"/g, '\\"')}"`,
    `date: "${date || ""}"`,
    role ? `role: "${role.replace(/"/g, '\\"')}"` : null,
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

  fs.writeFileSync(filePath, frontmatter, "utf-8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = path.join(PROJECTS_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "项目不存在" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ ok: true });
}
