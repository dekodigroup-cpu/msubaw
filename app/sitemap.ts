import type { MetadataRoute } from "next";
import { SITE, WEEKENDS } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(SITE.lastUpdated);

  const core: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/scholarships`, lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE.url}/about`, lastModified: updated, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE.url}/galleries`, lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: updated, changeFrequency: "yearly", priority: 0.6 },
  ];

  const galleries: MetadataRoute.Sitemap = WEEKENDS.map((w) => ({
    url: `${SITE.url}/galleries/${w.slug}`,
    lastModified: updated,
    changeFrequency: "yearly" as const,
    // The most recent weekend is the one people search for.
    priority: w.year >= 2026 ? 0.8 : 0.5,
  }));

  return [...core, ...galleries];
}
