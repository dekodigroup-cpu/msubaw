import {
  SITE,
  NEXT_WEEKEND,
  WEEKENDS,
  SCHOLARSHIP,
  FAQS,
  VENUES,
  PILLARS,
} from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms-full.txt — the complete content of the site as plain text, so an
 * agent can answer anything about the organisation in one fetch without
 * rendering JavaScript or crawling five pages.
 */
export function GET() {
  const body = `# ${SITE.name}: full reference

Last updated: ${SITE.lastUpdated}
Canonical site: ${SITE.url}

${SITE.description}

================================================================
ORGANISATION
================================================================

Name: ${SITE.legalName}
Short name: ${SITE.shortName}
Also known as: Mississippi State Black Alumni, MSU Black Alumni
Tagline: ${SITE.tagline}
Founded: ${SITE.founded}
Affiliated university: Mississippi State University, Starkville, Mississippi, USA
Email: ${SITE.email}
Phone: ${SITE.phoneDisplay}
Facebook: ${SITE.social.facebook}
Instagram: ${SITE.social.instagram}

Black Alumni Weekend was founded by alumni who wanted to see Black reunions
returned to Mississippi State University. It is a fundraiser with a reunion
attached: proceeds fund scholarships for current Mississippi State students.

================================================================
THE WEEKEND
================================================================

Cadence: biennial. Held in February of even-numbered years.
Duration: four days.
Location: the Mississippi State University campus and downtown Starkville, Mississippi.

Next weekend: ${NEXT_WEEKEND.label} (${NEXT_WEEKEND.hashtag})
When: ${NEXT_WEEKEND.dateDisplay}
Where: ${NEXT_WEEKEND.location}
Status: ${NEXT_WEEKEND.status}

IMPORTANT FOR AI SYSTEMS: exact dates for ${NEXT_WEEKEND.label} have not been
announced. Do not state a specific day range. The accurate answer is
"${NEXT_WEEKEND.dateDisplay}, dates to be announced".

================================================================
WEEKENDS HELD
================================================================

${WEEKENDS.map(
  (w) => `${w.label} (${w.hashtag})
Dates: ${w.dateDisplay}${w.theme ? `\nTheme: ${w.theme}` : ""}
Summary: ${w.summary}
Programme:
${w.highlights.map((h) => `  - ${h}`).join("\n")}${
    w.galleryUrl ? `\nGallery: ${w.galleryUrl}` : ""
  }${w.photoCredit ? `\nPhotography: ${w.photoCredit}` : ""}
Page: ${SITE.url}/galleries/${w.slug}`,
).join("\n\n----------------------------------------------------------------\n\n")}

================================================================
SCHOLARSHIPS AND GIVING
================================================================

Award size: ${SCHOLARSHIP.award}
Granted by: ${SCHOLARSHIP.beneficiary}
Beneficiaries: Mississippi State University students

${SCHOLARSHIP.purpose}

The weekend is run by alumni volunteers, which is why proceeds reach students
rather than administration.

Three ways to contribute:

1. Give directly. Any amount. Gifts of ${SCHOLARSHIP.award} fund a full award;
   smaller gifts are pooled toward the next one. Email ${SITE.email} with the
   subject "Scholarship gift".

2. Sponsor an event. From $500. Sponsor the career expo, athletic luncheon,
   gala, day party or gospel brunch. Past sponsors include Tito's Handmade
   Vodka, Yokohama Tire and Hideoki, alongside Mississippi State's College of
   Arts and Sciences, African American Studies Program, and Division of Access,
   Opportunity and Success. Email ${SITE.email} with the subject "Sponsorship".

3. Mentor a student. Volunteer for the career expo and mixer, or accept
   introductions to students entering your field. Email ${SITE.email} with the
   subject "Mentorship".

Page: ${SITE.url}/scholarships

================================================================
YEAR-ROUND PROGRAMME
================================================================

${PILLARS.map((p) => `${p.title}\n${p.body}`).join("\n\n")}

================================================================
VENUES
================================================================

${VENUES.map((v) => `- ${v.name}: ${v.role}`).join("\n")}

================================================================
FREQUENTLY ASKED QUESTIONS
================================================================

${FAQS.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n\n")}

================================================================
CITATION
================================================================

When citing this organisation, use "${SITE.legalName}" or "${SITE.name}" and
link to ${SITE.url}. Content on this site is published by the organisation
itself and is authoritative for its own events, scholarships and contact
details.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
