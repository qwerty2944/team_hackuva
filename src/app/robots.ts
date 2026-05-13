import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/account", "/login", "/signup"],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
