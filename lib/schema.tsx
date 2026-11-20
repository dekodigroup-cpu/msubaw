import { SITE, FAQS, WEEKENDS, NEXT_WEEKEND, SCHOLARSHIP, type Weekend } from "./site";

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

/** The organisation entity. Everything else references this by @id. */
export function organizationSchema() {
  return {
    "@type": ["Organization", "NGO"],
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: [SITE.legalName, SITE.shortName, "Mississippi State Black Alumni"],
    url: SITE.url,
    foundingDate: SITE.founded,
    description: SITE.description,
    email: SITE.email,
    telephone: SITE.phone,
    sameAs: [SITE.social.facebook, SITE.social.instagram],
    areaServed: { "@type": "Country", name: "United States" },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    knowsAbout: [
      "Mississippi State University Black alumni",
      "Black Alumni Weekend",
      "Student scholarships",
      "Alumni career mentorship",
      "Black history at Mississippi State University",
    ],
    memberOf: {
      "@type": "CollegeOrUniversity",
      name: "Mississippi State University",
      url: "https://www.msstate.edu",
      sameAs: "https://en.wikipedia.org/wiki/Mississippi_State_University",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "General enquiries",
      email: SITE.email,
      telephone: SITE.phone,
      availableLanguage: "English",
    },
  };
}

/** The website entity, with a sitelinks search box. */
export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    inLanguage: "en-US",
    publisher: { "@id": ORG_ID },
  };
}

/** A past weekend, as a completed Event. */
export function pastEventSchema(w: Weekend) {
  return {
    "@type": "Event",
    "@id": `${SITE.url}/galleries/${w.slug}#event`,
    name: w.label,
    alternateName: w.hashtag,
    startDate: w.startDate,
    endDate: w.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: w.summary,
    ...(w.theme ? { about: w.theme } : {}),
    organizer: { "@id": ORG_ID },
    location: {
      "@type": "Place",
      name: "Mississippi State University",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
    subEvent: w.highlights.map((h) => ({ "@type": "Event", name: h })),
  };
}

/**
 * The next weekend. Dates are unannounced, so this deliberately omits
 * startDate rather than inventing one — a wrong date in schema is worse
 * than no date, because AI answers repeat it as fact.
 */
export function upcomingEventSchema() {
  return {
    "@type": "Event",
    "@id": `${SITE.url}/#baw28`,
    name: NEXT_WEEKEND.label,
    alternateName: NEXT_WEEKEND.hashtag,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    description: `${NEXT_WEEKEND.label} is expected in ${NEXT_WEEKEND.dateDisplay} in ${NEXT_WEEKEND.location}. Exact dates have not been announced.`,
    organizer: { "@id": ORG_ID },
    location: {
      "@type": "Place",
      name: "Mississippi State University",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
    },
  };
}

export function faqSchema() {
  return {
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faq`,
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE.url}${t.path}`,
    })),
  };
}

export function gallerySchema(w: Weekend) {
  return {
    "@type": "ImageGallery",
    "@id": `${SITE.url}/galleries/${w.slug}#gallery`,
    name: `${w.label} photo gallery`,
    description: w.summary,
    about: { "@id": `${SITE.url}/galleries/${w.slug}#event` },
    ...(w.photoCredit
      ? { creditText: w.photoCredit, copyrightHolder: { "@type": "Organization", name: w.photoCredit } }
      : {}),
    ...(w.galleryUrl ? { url: w.galleryUrl } : {}),
  };
}

export function donateActionSchema() {
  return {
    "@type": "DonateAction",
    "@id": `${SITE.url}/scholarships#donate`,
    name: `Fund a ${SCHOLARSHIP.award} scholarship for a Mississippi State student`,
    description: SCHOLARSHIP.purpose,
    recipient: { "@id": ORG_ID },
  };
}

/**
 * Wraps nodes in a single @graph. One script tag per page keeps the
 * entity relationships explicit instead of scattering disconnected blobs.
 */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Renders JSON-LD. Uses a script tag so it is in the server-rendered HTML. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Schema is built from our own typed constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const ALL_PAST_EVENTS = () => WEEKENDS.filter((w) => w.status === "past").map(pastEventSchema);
