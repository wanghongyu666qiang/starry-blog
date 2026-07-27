import { notFound } from "next/navigation";
import { getPostBySlug, getPosts } from "@/lib/data";
import { createOgImage, humanizeSlug, OG_SIZE } from "@/lib/og";

export const alt = "Starry 技术文章";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return createOgImage({
    eyebrow: "Article",
    title: humanizeSlug(post.slug),
    description: `Published ${post.created_at} · ${post.category}`,
  });
}
