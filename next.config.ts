import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "gallery.dekodi.com" },
      { protocol: "https", hostname: "images.dekodi.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      // Preserve equity from the old Duda URLs.
      { source: "/msu-black-alumni", destination: "/galleries/2024", permanent: true },
      { source: "/msu-baw-2022", destination: "/galleries/2022", permanent: true },
      { source: "/msu-baw-2024", destination: "/galleries/2024", permanent: true },
      { source: "/msu-baw-2026", destination: "/galleries/2026", permanent: true },
    ];
  },
};

export default nextConfig;
