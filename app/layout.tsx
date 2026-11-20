import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import { JsonLd, graph, organizationSchema, webSiteSchema } from "@/lib/schema";

/**
 * Self-hosted variable woff2, latin subset, served from our own origin and
 * preloaded. No request to fonts.googleapis.com: one fewer connection on
 * the critical path and no third-party surface.
 *
 * Besley is a Clarendon-style slab serif carrying the letterpress-programme
 * reference. Instrument Sans handles body copy. Neither is an AI-default
 * face (see DESIGN.md).
 */
const besley = localFont({
  src: [
    {
      path: "./fonts/besley-latin-wght-normal.woff2",
      weight: "400 800",
      style: "normal",
    },
    {
      path: "./fonts/besley-latin-wght-italic.woff2",
      weight: "400 800",
      style: "italic",
    },
  ],
  variable: "--font-besley",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const instrument = localFont({
  src: [
    {
      path: "./fonts/instrument-sans-latin-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
  ],
  variable: "--font-instrument",
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
  // Matches --color-paper. Browser zoom is deliberately left enabled.
  themeColor: "#fcfaf7",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${besley.variable} ${instrument.variable}`}>
      <head>
        <JsonLd data={graph(organizationSchema(), webSiteSchema())} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:bg-maroon focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-chalk"
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="pt-[var(--header-h)]">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
