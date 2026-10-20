import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Unsplash resizes images on its own CDN, so we skip the Next.js optimizer.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
  },
};

export default nextConfig;
