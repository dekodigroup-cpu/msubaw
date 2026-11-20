/**
 * Single source of truth for site content, contact data and SEO.
 * Every page, schema block and machine-readable file reads from here,
 * so facts never drift between the HTML, the JSON-LD and /llms.txt.
 */

export const SITE = {
  name: "MSU Black Alumni",
  shortName: "MSU BAW",
  legalName: "Mississippi State University Black Alumni Weekend",
  url: "https://www.msubaw.com",
  tagline: "Celebrating Black Accomplishment",
  description:
    "The year-round community of Mississippi State University Black alumni: funding student scholarships, building careers, and gathering every two years for Black Alumni Weekend in Starkville.",
  locale: "en_US",
  email: "MStateBAW@gmail.com",
  phone: "+1-586-610-5450",
  phoneDisplay: "(586) 610-5450",
  city: "Starkville",
  region: "MS",
  regionName: "Mississippi",
  country: "US",
  founded: "2022",
  // Shown as a freshness signal; AI systems weight recency heavily.
  lastUpdated: "2026-11-20",
  social: {
    facebook: "https://www.facebook.com/msubaw",
    instagram: "https://www.instagram.com/msublackalumni",
  },
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/galleries", label: "Galleries" },
  { href: "/contact", label: "Contact" },
] as const;

/* ---------------------------------------------------------------------- */
/* Weekends                                                               */
/* ---------------------------------------------------------------------- */

export type GalleryPhoto = {
  /** Local path under /public, or a remote URL whose host is allowed in next.config.ts. */
  src: string;
  /** Required. Describes the photograph for screen readers and image search. */
  alt: string;
  /** Renders in a taller 3:4 cell instead of 4:3. */
  tall?: boolean;
};

export type Weekend = {
  slug: string;
  year: number;
  label: string;
  hashtag: string;
  theme?: string;
  startDate?: string;
  endDate?: string;
  dateDisplay: string;
  status: "past" | "upcoming";
  summary: string;
  highlights: string[];
  galleryUrl?: string;
  photoCredit?: string;
  /**
   * Drop photographs in here and the gallery grid renders them automatically.
   * Left empty, the page hands off to `galleryUrl` instead of showing
   * placeholder tiles.
   */
  photos?: GalleryPhoto[];
};

export const WEEKENDS: Weekend[] = [
  {
    slug: "2026",
    year: 2026,
    label: "Black Alumni Weekend 2026",
    hashtag: "#BAW26",
    theme: "60 Years of Black History at Mississippi State",
    startDate: "2026-02-12",
    endDate: "2026-02-15",
    dateDisplay: "February 12–15, 2026",
    status: "past",
    summary:
      "Bulldogs returned to Starkville for four days anchored by career programming and a campus celebration of 60 years of Black history at Mississippi State.",
    highlights: [
      "Career networking event",
      "Campus program spotlighting 60 Years of Black History",
      "60th anniversary gala",
      "Sunday gospel brunch",
      "BAW26 concert with Courtney Little and Jamal Roberts",
      "Social gatherings across campus and at The Mill",
      "Bulldog athletic events",
    ],
    galleryUrl: "https://gallery.dekodi.com/-baw2026/gallery",
    photoCredit: "Dekodi",
  },
  {
    slug: "2024",
    year: 2024,
    label: "Black Alumni Weekend 2024",
    hashtag: "#BAW24",
    startDate: "2024-02-15",
    endDate: "2024-02-18",
    dateDisplay: "February 15–18, 2024",
    status: "past",
    summary:
      "A four-day reunion built around a career expo, the Starkville Nights Awards & Scholarship Gala, the Ring Your Bell and Tell Your Tale project, and a Doug E. Fresh set at the State Theater.",
    highlights: [
      "Career expo, panel and mixer at The Mill",
      "Athletic luncheon at the Scoreboard Club, Davis Wade Stadium",
      "“Starkville Nights” Awards & Scholarship Gala",
      "Dr. Richard Holmes & John Barnes Brunch",
      "“Ring Your Bell and Tell Your Tale” project premiere",
      "BAW24 Day Party hosted by Rita Brent",
      "Doug E. Fresh live at the State Theater",
      "Gospel brunch with Shelby Greer and the Black Voices",
    ],
  },
  {
    slug: "2022",
    year: 2022,
    label: "Black Alumni Weekend 2022",
    hashtag: "#BAW22",
    startDate: "2022-02-17",
    endDate: "2022-02-20",
    dateDisplay: "February 17–20, 2022",
    status: "past",
    summary:
      "The weekend that brought Black reunions back to Mississippi State, with a career mixer in the Union, a scholarship gala, and a Sunday gospel brunch at The Mill.",
    highlights: [
      "Black Alumni Career Mixer in the Colvard Union",
      "Scholarship gala and sports banquet",
      "Panel with MSU’s first Black graduates",
      "Gospel brunch at The Mill at MSU",
    ],
  },
];

/** The weekend is biennial — even years, February, in Starkville. */
export const NEXT_WEEKEND = {
  label: "Black Alumni Weekend 2028",
  hashtag: "#BAW28",
  year: 2028,
  // Dates are not yet announced. Deliberately expressed as a month, never a
  // fabricated day range, so nobody books travel on a guess.
  dateDisplay: "February 2028",
  monthIso: "2028-02",
  location: "Starkville, Mississippi",
  status: "Dates to be announced",
} as const;

export const pastWeekends = WEEKENDS.filter((w) => w.status === "past");

export function getWeekend(slug: string): Weekend | undefined {
  return WEEKENDS.find((w) => w.slug === slug);
}

/* ---------------------------------------------------------------------- */
/* What the weekend funds                                                 */
/* ---------------------------------------------------------------------- */

export const SCHOLARSHIP = {
  award: "$1,000",
  beneficiary: "Black Alumni Advisory Council at Mississippi State University",
  purpose:
    "Every ticket, sponsorship and gift from Black Alumni Weekend funds scholarships awarded to Mississippi State students through the Black Alumni Advisory Council.",
} as const;

/* ---------------------------------------------------------------------- */
/* Pillars — the year-round programme                                     */
/* ---------------------------------------------------------------------- */

export const PILLARS = [
  {
    title: "Scholarships",
    body: `${SCHOLARSHIP.award} awards go to Mississippi State students through the ${SCHOLARSHIP.beneficiary}, funded by the weekend and by alumni giving the rest of the year.`,
  },
  {
    title: "Careers & mentorship",
    body: "A career mixer and expo each weekend, plus introductions between students and alumni working in their field. It is the connection that outlasts the reunion.",
  },
  {
    title: "Recognition",
    body: "The Starkville Nights Awards honour alumni whose work has carried the university’s name further than they were ever promised it would go.",
  },
  {
    title: "History & record",
    body: "Projects like “Ring Your Bell and Tell Your Tale” document the first Black graduates of Mississippi State in their own words, while they can still tell it.",
  },
] as const;

/* ---------------------------------------------------------------------- */
/* FAQ — natural-language questions, answer-first bodies (40–60 words).   */
/* Feeds both the visible page and FAQPage JSON-LD.                       */
/* ---------------------------------------------------------------------- */

export const FAQS = [
  {
    q: "What is MSU Black Alumni Weekend?",
    a: "MSU Black Alumni Weekend is a four-day reunion of Mississippi State University’s Black alumni, held every two years in Starkville, Mississippi. Founded by alumni who wanted Black reunions returned to campus, it combines career programming, an awards and scholarship gala, a gospel brunch and Bulldog athletics.",
  },
  {
    q: "When is the next Black Alumni Weekend?",
    a: `The next weekend is ${NEXT_WEEKEND.label} in ${NEXT_WEEKEND.dateDisplay}, in ${NEXT_WEEKEND.location}. Black Alumni Weekend is biennial, held in February of even-numbered years. Exact dates for ${NEXT_WEEKEND.year} have not been announced yet. Join the mailing list and you will hear the moment they are set.`,
  },
  {
    q: "How often is Black Alumni Weekend held?",
    a: "Every two years. Black Alumni Weekend is biennial, falling in February of even-numbered years. Recent weekends were held in 2022, 2024 and 2026, which puts the next one in February 2028.",
  },
  {
    q: "Where does Black Alumni Weekend take place?",
    a: "On the Mississippi State University campus and around downtown Starkville, Mississippi. Regular venues include The Mill at MSU, the Colvard Union, the Scoreboard Club at Davis Wade Stadium, Humphrey Coliseum, Dudy Noble Field and the State Theater.",
  },
  {
    q: "What does Black Alumni Weekend raise money for?",
    a: `${SCHOLARSHIP.purpose} Awards are ${SCHOLARSHIP.award} each. Attending, sponsoring or giving directly all feed the same fund.`,
  },
  {
    q: "Do I have to be a Mississippi State graduate to attend?",
    a: "No. Black Alumni Weekend is open to alumni, current students, family, faculty, staff and friends of Mississippi State. Many events are deliberately intergenerational, pairing current students with alumni already working in the fields those students are entering.",
  },
  {
    q: "Are Bulldog game tickets included with the weekend?",
    a: "No. Basketball and baseball tickets are bought separately through Mississippi State Athletics and should be purchased online in advance. Weekend registration covers the career, gala, brunch and social programming, not athletic admission.",
  },
  {
    q: "How do I get involved between weekends?",
    a: `Three ways: give to the scholarship fund, volunteer as a career mentor for current students, or sponsor a weekend event. Email ${SITE.email} or call ${SITE.phoneDisplay} and say which one interests you.`,
  },
] as const;

/* ---------------------------------------------------------------------- */
/* Venues — real, verifiable, and good entity signal for AI answers.      */
/* ---------------------------------------------------------------------- */

export const VENUES = [
  { name: "The Mill at Mississippi State University", role: "Gala, brunches and the career expo" },
  { name: "Colvard Union", role: "Career mixer and student programming" },
  { name: "Scoreboard Club at Davis Wade Stadium", role: "Athletic luncheon" },
  { name: "Humphrey Coliseum", role: "Bulldog basketball" },
  { name: "Dudy Noble Field", role: "Bulldog baseball" },
  { name: "State Theater, Downtown Starkville", role: "Headline concerts and after parties" },
] as const;
