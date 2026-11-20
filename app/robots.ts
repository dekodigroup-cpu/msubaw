import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Every AI search crawler is allowed explicitly.
 *
 * Blocking GPTBot, PerplexityBot, ClaudeBot or Google-Extended would mean
 * those engines cannot cite this site at all. For an organisation whose
 * goal is to be found, that trade is not worth making, so each bot gets a
 * named allow rule rather than relying on the wildcard.
 */
export default function robots(): MetadataRoute.Robots {
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-User",
    "Claude-SearchBot",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Googlebot",
    "Bingbot",
    "Applebot",
    "Applebot-Extended",
    "DuckDuckBot",
    "Amazonbot",
    "meta-externalagent",
    "cohere-ai",
    "YouBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
