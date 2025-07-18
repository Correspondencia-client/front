import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["sistema-de-atencion.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
