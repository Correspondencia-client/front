import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typescript: {
  //   // ⚠️ Peligroso: Esto permitirá que el build pase incluso con errores de TypeScript
  //   ignoreBuildErrors: true,
  // },
  // eslint: {
  //   // También puedes ignorar errores de ESLint si los tienes
  //   ignoreDuringBuilds: true,
  // },
  images: {
    domains: ["sistema-de-atencion.s3.amazonaws.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "https://apico.eduadminsoft.shop/:path*",
        destination: "https://apico.eduadminsoft.shop/api/:path*",
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
