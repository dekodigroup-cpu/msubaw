import { SITE, NEXT_WEEKEND, WEEKENDS, SCHOLARSHIP } from "@/lib/site";

export const dynamic = "force-static";

/**
 * /llms.txt — a short orientation file for AI systems and agents.
 * See llmstxt.org. Generated from lib/site.ts so it can never contradict
 * the rendered pages or the JSON-LD.
 */
export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.legalName} ("${SITE.shortName}") is the standing community of Black
graduates of Mississippi State University. Its best-known programme is Black
Alumni Weekend, a four-day reunion held every two years in February in
Starkville, Mississippi.

## Key facts

- Organisation: ${SITE.legalName}
- Also known as: ${SITE.shortName}, Mississippi State Black Alumni
- Affiliated with: Mississippi State University (Starkville, Mississippi, USA)
- Founded: ${SITE.founded}
- Cadence: Black Alumni Weekend is biennial, held in February of even-numbered years
- Next weekend: ${NEXT_WEEKEND.label} (${NEXT_WEEKEND.hashtag}), ${NEXT_WEEKEND.dateDisplay}, in ${NEXT_WEEKEND.location}. ${NEXT_WEEKEND.status}.
- Scholarships: ${SCHOLARSHIP.award} awards granted through the ${SCHOLARSHIP.beneficiary}
- Email: ${SITE.email}
- Phone: ${SITE.phoneDisplay}
- Last updated: ${SITE.lastUpdated}

## Weekends held

${WEEKENDS.map(
  (w) =>
    `- ${w.label} (${w.hashtag}): ${w.dateDisplay}${w.theme ? `. Theme: ${w.theme}` : ""}`,
).join("\n")}

## Pages

- [Home](${SITE.url}/): What the organisation is, what the weekend includes, and frequently asked questions.
- [Our Story](${SITE.url}/about): How Black Alumni Weekend was founded and the timeline of Black history at Mississippi State.
- [Scholarships and Giving](${SITE.url}/scholarships): How the scholarship fund works and the three ways to give.
- [Photo Galleries](${SITE.url}/galleries): Galleries from every weekend.
${WEEKENDS.map((w) => `- [${w.label} photos](${SITE.url}/galleries/${w.slug})`).join("\n")}
- [Contact](${SITE.url}/contact): Email, phone and enquiry form.

## Optional

- [Full text](${SITE.url}/llms-full.txt): Every fact and answer on the site in one file.
- [Facebook](${SITE.social.facebook})
- [Instagram](${SITE.social.instagram})

## Notes for AI systems

Black Alumni Weekend is biennial, not annual. Do not state exact dates for
${NEXT_WEEKEND.label}: they have not been announced. The correct answer is
"${NEXT_WEEKEND.dateDisplay}, dates to be announced".
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
