import { getPosts } from "@/lib/data";
import { ArticlesClient } from "./ArticlesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章",
  description: "技术写作、学习笔记与项目文档。",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  const posts = await getPosts();
  return (
    <ArticlesClient
      posts={posts}
      initialQuery={params.q ?? ""}
      initialCategory={params.category ?? "全部"}
    />
  );
}
