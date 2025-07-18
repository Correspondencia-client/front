import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Es una buena práctica definir la URL base en tus variables de entorno
  // para que funcione tanto en desarrollo como en producción.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://gestia.com.co/";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/iniciar-sesion`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/registrarse`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
