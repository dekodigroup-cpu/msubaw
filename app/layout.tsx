import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { JsonLd, graph, organizationSchema, webSiteSchema } from "@/lib/schema";

/**
 * Space Grotesk and Work Sans are both already in use on the live
 * msubaw.com, so the rebuild keeps the brand's own voice rather than
 * importing a new one. Self-hosted variable woff2, latin subset, preloaded:
 * no request to fonts.googleapis.com.
 */
const grotesk = localFont({
  src: [
    {
      path: "./fonts/space-grotesk-latin-wght-normal.woff2",
      weight: "300 700",
      style: "normal",
    },
  ],
  variable: "--font-grotesk",
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const work = localFont({
  src: [
    {
      path: "./fonts/work-sans-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "./fonts/work-sans-latin-wght-italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-work",
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name}, ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "MSU Black Alumni",
    "Mississippi State Black Alumni",
    "Black Alumni Weekend",
    "MSU BAW",
    "BAW28",
    "Mississippi State University alumni",
    "Starkville alumni reunion",
    "Black alumni scholarships",
    "Black Alumni Advisory Council",
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name}, ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name}, ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "education",
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  // Matches --color-void. Browser zoom is deliberately left enabled.
  themeColor: "#151011",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${grotesk.variable} ${work.variable}`}>
      <head>
        <JsonLd data={graph(organizationSchema(), webSiteSchema())} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-wine-lit focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-chalk"
        >
          Skip to content
        </a>

        <Header />

        <main id="main">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
