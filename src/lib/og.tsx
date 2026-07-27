import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

export function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function createOgImage({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: string;
  eyebrow: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 82% 18%, #fff3a3 0, transparent 32%), #fefce8",
          color: "#18181b",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 26,
            color: "#52525b",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 999,
              border: "3px solid #18181b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            S
          </div>
          Starry · {eyebrow}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: title.length > 24 ? 58 : 68,
              lineHeight: 1.18,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 28,
              lineHeight: 1.45,
              color: "#52525b",
            }}
          >
            {description}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>
          starrylovetbao.cloud
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
