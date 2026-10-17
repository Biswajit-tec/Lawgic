import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output for containerized deployments
  output: process.env["BUILD_STANDALONE"] === "true" ? "standalone" : undefined,

  // Strict type checking
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Transpile monorepo packages
  transpilePackages: ["@lawgic/types", "@lawgic/validation", "@lawgic/config"],

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
