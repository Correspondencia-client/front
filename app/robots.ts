import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://gestia.com.co";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/panel/",
          "/gestion-usuarios/",
          "/gestion-areas/",
          "/gestion-entidades/",
          "/solicitudes/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
