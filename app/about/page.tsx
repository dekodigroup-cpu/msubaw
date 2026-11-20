import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SITE, WEEKENDS, NEXT_WEEKEND, SCHOLARSHIP } from "@/lib/site";
import { JsonLd, graph, breadcrumbSchema, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "MSU Black Alumni Weekend was founded by alumni who wanted Black reunions returned to Mississippi State. The story of the weekend, the Black Alumni Advisory Council, and 60 years of Black history at MSU.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Our Story | MSU Black Alumni",
    description:
      "Founded by alumni who wanted Black reunions returned to Mississippi State University. Here is how the weekend came back, and what it funds.",
    url: "/about",
  },
};

const MILESTONES = [
  {
    year: "1965",
    title: "The first Black students enroll",
    body: "Richard Holmes becomes the first Black student to enroll at Mississippi State University. The anniversary of that moment is what BAW26 marked as 60 years of Black history at MSU.",
  },
  {
    year: "2022",
    title: "Black reunions return",
    body: "Alumni organise the first Black Alumni Weekend of the modern era: a career mixer in the Colvard Union, a scholarship gala, a sports banquet, and a Sunday gospel brunch at The Mill.",
  },
  {
    year: "2024",
    title: "The record gets written down",
    body: "BAW24 premieres “Ring Your Bell and Tell Your Tale,” a project documenting the university’s first Black graduates in their own words, alongside a career expo and the Starkville Nights gala.",
  },
  {
    year: "2026",
    title: "Sixty years, marked properly",
    body: "BAW26 anchors the weekend on 60 Years of Black History at Mississippi State, with an anniversary gala and a concert featuring Courtney Little and Jamal Roberts.",
  },
  {
    year: NEXT_WEEKEND.dateDisplay,
    title: NEXT_WEEKEND.label,
    body: `The next reunion returns to Starkville. ${NEXT_WEEKEND.status}. The mailing list hears first.`,
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Our Story", path: "/about" },
          ]),
        )}
      />

      <PageHero
        eyebrow="Our story"
        title="Founded by alumni who wanted to come home."
        lede="Black Alumni Weekend exists because a group of Mississippi State graduates decided that Black reunions belonged back on their own campus, and then organised one."
      />

      {/* Answer-first origin block */}
      <Section tone="pitch">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="How it started"
              title="A reunion the university did not have to be asked for twice."
            />
            <Reveal as="p" delay={180} className="mt-6 leading-relaxed text-ash/90">
              For years there was no standing gathering for Black graduates of
              Mississippi State. Alumni who had met in the Union, pledged on
              campus, and sat in the same lecture halls had no scheduled reason
              to return together. A group of them changed that in {SITE.founded},
              building a four-day weekend from scratch and putting a
              scholarship at the centre of it.
            </Reveal>
            <Reveal as="p" delay={240} className="mt-5 leading-relaxed text-ash/90">
              It has run every two years since. The format has held because it
              answers two needs at once: alumni get the reunion, and students
              get the money and the mentorship that come out of it.
            </Reveal>
          </div>

          <Reveal delay={160}>
            <figure className="rounded-3xl border border-slate bg-void p-8 md:p-10">
              <blockquote className="font-display text-xl leading-snug text-chalk md:text-2xl">
                “The purpose of the weekend is to provide scholarship funds for
                the Black Alumni Advisory Council at Mississippi State
                University, where we give thousand-dollar scholarships to
                students at the university.”
              </blockquote>
              <figcaption className="mt-6 text-sm text-ash">
                Black Alumni Weekend organiser, speaking to WCBI
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      {/* Timeline */}
      <Section>
        <SectionHeading
          eyebrow="Timeline"
          title="Sixty years in, four weekends deep."
        />

        <ol className="mt-14 space-y-0">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.year} as="li" delay={i * 70}>
              <div className="group grid gap-4 border-t border-slate py-8 md:grid-cols-[9rem_1fr] md:gap-10 md:py-10">
                <span className="font-display text-2xl font-semibold text-wine-glow md:text-3xl">
                  {m.year}
                </span>
                <div>
                  <h3 className="font-display text-xl text-chalk">
                    {m.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-ash">
                    {m.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Council */}
      <Section tone="pitch">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <SectionHeading
            eyebrow="The council"
            title="Who decides where the money goes."
            lede={`Scholarships are awarded through the ${SCHOLARSHIP.beneficiary}: alumni who review and grant the ${SCHOLARSHIP.award} awards the weekend funds.`}
          />
          <Reveal delay={160} className="lg:pt-6">
            <p className="leading-relaxed text-ash/90">
              Running the weekend is volunteer work. Alumni handle programming,
              sponsorship, registration and the gala, and the proceeds move into
              the scholarship fund rather than into overhead. Sponsors across
              past weekends have included Tito&apos;s Handmade Vodka, Yokohama
              Tire and Hideoki, alongside Mississippi State&apos;s own College of
              Arts &amp; Sciences, African American Studies Program, and
              Division of Access, Opportunity and Success.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/scholarships#give"
                className="rounded-full bg-wine px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:-translate-y-0.5 hover:bg-wine-deep"
              >
                Give to the fund
              </Link>
              <Link
                href="/galleries"
                className="rounded-full border border-slate px-6 py-3.5 text-sm font-semibold text-chalk transition-colors duration-300 hover:-translate-y-0.5 hover:border-ink"
              >
                See the weekends
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Weekend list */}
      <Section>
        <SectionHeading eyebrow="Every weekend" title="The record so far." />
        <dl className="mt-12 divide-y divide-slate border-y border-slate">
          {WEEKENDS.map((w, i) => (
            <Reveal key={w.slug} delay={i * 60}>
              <div className="grid gap-3 py-7 md:grid-cols-[12rem_1fr] md:gap-8">
                <dt>
                  <Link
                    href={`/galleries/${w.slug}`}
                    className="link-draw font-display text-lg font-semibold text-wine-glow"
                  >
                    {w.hashtag}
                  </Link>
                  <span className="mt-1 block text-sm text-ash">
                    <time dateTime={w.startDate}>{w.dateDisplay}</time>
                  </span>
                </dt>
                <dd className="leading-relaxed text-ash">{w.summary}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>
    </>
  );
}
