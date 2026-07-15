import { getPosts } from "@/lib/data";
import { ArticlesClient } from "./ArticlesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文章",
  description: "技术写作、学习笔记与项目文档。",
};

export default async function ArticlesPage() {
  const posts = await getPosts();
  return <ArticlesClient posts={posts} />;
}
