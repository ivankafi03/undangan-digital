import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://fikadigi.store";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/member/", "/api/", "/_next/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
