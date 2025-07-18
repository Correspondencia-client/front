import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["sistema-de-atencion.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.gestia.com.co/api/:path*",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
