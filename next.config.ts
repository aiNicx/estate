import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048],
    imageSizes: [96, 128, 256, 384],
  },
  agentRules: false,
  async redirects() {
    return [{ source: "/", destination: "/en", permanent: false }];
  },
  outputFileTracingIncludes: {
    "/[locale]/**": ["./public/images/property/**/*"],
  },
};

export default nextConfig;
