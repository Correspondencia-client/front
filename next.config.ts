import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["eduadminsoft-s3.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        // destination: "https://apico.eduadminsoft.shop/:path*",
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
