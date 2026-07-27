import { createOgImage, OG_SIZE } from "@/lib/og";

export const alt = "Starry 个人网站";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    eyebrow: "Portfolio · Blog",
    title: "Build software. Document the thinking.",
    description: "Portfolio, engineering projects, and technical writing by Starry.",
  });
}
