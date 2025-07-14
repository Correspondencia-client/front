import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["sistema-de-atencion.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "https://apico.eduadminsoft.shop/:path*",
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
