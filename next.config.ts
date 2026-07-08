import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack to avoid path resolution issues on Windows
  // Use webpack for dev/build
};

export default nextConfig;
