import type { MetadataRoute } from "next";

const BASE_URL = "https://sultana.express";
const locales = ["en", "tr"];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/pricing", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/blog/how-to-source-cotton-tshirts-from-turkey", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog/turkey-vs-china-textile-sourcing-2026", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog/what-is-oeko-tex-100", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/blog/understanding-moq-buyers-guide", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/case-studies", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/legal/privacy", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/terms", priority: 0.3, changeFrequency: "yearly" as const },
    { path: "/legal/cookies", priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
