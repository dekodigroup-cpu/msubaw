# msubaw.com

The site for **MSU Black Alumni** (Mississippi State University Black Alumni
Weekend). Next.js 16 App Router, Tailwind CSS v4, deployed on Vercel.

## Running locally

```bash
npm install
npm run dev
```

## How this project is organised

| Path | What it holds |
|---|---|
| `lib/site.ts` | **Single source of truth** for all content, contact details, weekend data and FAQs. |
| `lib/schema.tsx` | JSON-LD builders. Read from `lib/site.ts`. |
| `app/` | Routes. One folder per page. |
| `app/llms.txt/`, `app/llms-full.txt/` | Machine-readable files for AI search engines and agents. Generated from `lib/site.ts`. |
| `app/fonts/` | Self-hosted variable fonts (Besley, Instrument Sans). |
| `components/` | Shared UI. |
| `PRODUCT.md` | Audience, tone, strategic principles, anti-references, verified facts. |
| `DESIGN.md` | Design system: colour, type, spacing, motion, and what is banned. |

### Editing content

Almost all copy lives in `lib/site.ts`. Changing it there updates the page, the
JSON-LD structured data, `llms.txt` and `llms-full.txt` together, so the facts
can never drift apart. **Prefer editing that file over editing a page.**

### Adding photographs to a gallery

Add entries to the relevant weekend's `photos` array in `lib/site.ts`:

```ts
photos: [
  { src: "/galleries/2026/opening-night.jpg", alt: "Alumni greeting each other at the BAW26 check-in desk.", tall: true },
]
```

Local files go in `public/galleries/<year>/`. Remote files need their hostname
added to `images.remotePatterns` in `next.config.ts`. `alt` text is required.

While a `photos` array is empty, the gallery page hands off to the externally
hosted gallery instead of showing placeholder tiles.

### The contact form

`components/ContactForm.tsx` validates in the browser and then opens the
visitor's own mail client with the message composed. There is **no backend and
no third-party form service**, so nothing can be silently dropped. To switch to
server-side delivery, replace the body of `handleSubmit` with a server action
that calls an email provider.

## SEO and AI search

- Per-page metadata and canonicals via the Next.js Metadata API.
- `app/sitemap.ts` and `app/robots.ts` are generated, not hand-written.
  `robots.ts` allows every AI search crawler by name.
- JSON-LD on every page as one `@graph`: `Organization`/`NGO`, `WebSite`,
  `Event` per weekend, `FAQPage`, `BreadcrumbList`, `ImageGallery`,
  `DonateAction`.
- `/llms.txt` and `/llms-full.txt` let an AI agent answer anything about the
  organisation in one fetch.
- Social card generated at build time by `app/opengraph-image.tsx`.
- 301 redirects from the previous site's URLs are in `next.config.ts`.

**One rule when editing:** never publish a specific date range for BAW28. The
dates are unannounced, and the site says "February 2028, dates to be announced"
in the copy, the schema and the AI files deliberately. People book flights off
this page.

## Accessibility and motion

Content is rendered server-side and is fully visible without JavaScript; the
scroll-reveal class is only applied by JS once it can also remove it. Motion is
CSS-only, animates nothing but `transform`, `opacity` and `filter`, has no
infinite autoplay, and is disabled entirely under
`prefers-reduced-motion: reduce`.
