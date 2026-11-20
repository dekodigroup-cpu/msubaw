import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import {
  SITE,
  PILLARS,
  SCHOLARSHIP,
  WEEKENDS,
  NEXT_WEEKEND,
  VENUES,
} from "@/lib/site";
import {
  JsonLd,
  graph,
  faqSchema,
  upcomingEventSchema,
  ALL_PAST_EVENTS,
  donateActionSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "MSU Black Alumni, Celebrating Black Accomplishment",
  description:
    "The year-round community of Mississippi State University Black alumni. We fund $1,000 student scholarships, connect alumni to careers, and gather in Starkville every two years for Black Alumni Weekend. Next: BAW28, February 2028.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MSU Black Alumni, Celebrating Black Accomplishment",
    description:
      "Funding scholarships for Mississippi State students and bringing Bulldogs home to Starkville every two years. Next reunion: BAW28, February 2028.",
    url: "/",
  },
};

/** Programme particulars. A ruled table, not a row of metric tiles. */
const PARTICULARS = [
  { k: "Award size", v: SCHOLARSHIP.award },
  { k: "Granted by", v: "Black Alumni Advisory Council" },
  { k: "Cadence", v: "Every two years, in February" },
  { k: "Weekends held", v: "2022, 2024, 2026" },
  { k: "Location", v: "Starkville, Mississippi" },
] as const;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          upcomingEventSchema(),
          ...ALL_PAST_EVENTS(),
          faqSchema(),
          donateActionSchema(),
        )}
      />

      <Hero />

      {/* ---------------------------------------------------------------- */}
      {/* Definition block. Answers "what is this" immediately, in one      */}
      {/* extractable paragraph.                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="deep" pad="loose">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A community that meets every two years and works all year."
            />
            <div className="measure mt-7 space-y-5 text-lg leading-relaxed text-ink-soft">
              <Reveal as="p" delay={180}>
                MSU Black Alumni is the standing network of Black graduates of
                Mississippi State University. Black Alumni Weekend, the biennial
                reunion we are best known for, is one programme inside it. The
                rest of the year goes to scholarships, career mentorship for
                current students, and keeping the record of Black history at
                Mississippi State in the hands of the people who lived it.
              </Reveal>
              <Reveal as="p" delay={240}>
                The weekend was founded by alumni who wanted Black reunions
                returned to campus. It has run in 2022, 2024 and 2026. The next
                one, {NEXT_WEEKEND.hashtag}, falls in{" "}
                {NEXT_WEEKEND.dateDisplay}.
              </Reveal>
            </div>
          </div>

          <Reveal delay={150} className="lg:pt-20">
            <h3 className="eyebrow text-ink-faint">At a glance</h3>
            <dl className="mt-5 border-t border-paper-edge">
              {PARTICULARS.map((p) => (
                <div
                  key={p.k}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-paper-edge py-4"
                >
                  <dt className="text-sm text-ink-faint">{p.k}</dt>
                  <dd className="tnum font-display text-lg font-semibold text-ink">
                    {p.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Commitments. Asymmetric on purpose: the first is a featured       */}
      {/* block, the rest are ruled rows. No repeated card grid.           */}
      {/* ---------------------------------------------------------------- */}
      <Section pad="normal">
        <SectionHeading
          eyebrow="What we do"
          title="Four commitments, kept between reunions."
          lede="The weekend is the visible part. These are the reasons it exists."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Featured */}
          <Reveal delay={60}>
            <article className="h-full border-t-2 border-maroon pt-7">
              <p className="eyebrow tnum text-maroon-lit">01</p>
              <h3 className="mt-4 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold leading-tight text-ink">
                {PILLARS[0].title}
              </h3>
              <p className="measure mt-5 text-lg leading-relaxed text-ink-soft">
                {PILLARS[0].body}
              </p>
              <Link
                href="/scholarships"
                className="link-draw mt-7 inline-flex items-center font-semibold text-maroon"
              >
                How the fund works
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </article>
          </Reveal>

          {/* The remaining three, as ruled rows */}
          <div className="border-t border-paper-edge">
            {PILLARS.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={120 + i * 80}>
                <article className="grid gap-x-6 gap-y-2 border-b border-paper-edge py-7 sm:grid-cols-[3.5rem_1fr]">
                  <p className="eyebrow tnum pt-1.5 text-ink-faint">
                    0{i + 2}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ink-soft">
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Scholarship band                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="on-maroon relative isolate overflow-hidden bg-maroon py-20 text-chalk md:py-28">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(100% 120% at 85% 10%, oklch(39% 0.142 27) 0%, oklch(31% 0.128 29) 60%)",
            }}
          />
          <div className="grain-layer" />
        </div>

        <div className="container-page grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="h-px w-10 bg-brass" aria-hidden="true" />
              <p className="eyebrow text-brass">Where the money goes</p>
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="mt-5 max-w-2xl font-display text-[clamp(1.9rem,4.4vw,3.1rem)] font-bold leading-[1.04]"
            >
              Every ticket becomes tuition.
            </Reveal>
            <Reveal as="p" delay={150} className="measure mt-6 text-lg leading-relaxed text-chalk-soft">
              {SCHOLARSHIP.purpose} Awards are {SCHOLARSHIP.award} each.
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/scholarships#give"
                className="group flex min-h-12 items-center justify-center bg-brass px-7 font-semibold text-maroon-deep transition-colors duration-300 hover:bg-chalk"
              >
                Give to the fund
                <span
                  aria-hidden="true"
                  className="ml-2.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                href="/scholarships#sponsor"
                className="flex min-h-12 items-center justify-center border border-chalk/30 px-7 font-semibold text-chalk transition-colors duration-300 hover:border-chalk hover:bg-chalk/5"
              >
                Sponsor an event
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Archive                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="deep" id="weekends" pad="normal">
        <SectionHeading
          eyebrow="The archive"
          title="Three weekends, and counting."
          lede="Each reunion is documented so the next class of alumni knows what it is inheriting."
        />

        <ul className="mt-14 border-t border-paper-sunk">
          {WEEKENDS.map((w, i) => (
            <Reveal key={w.slug} as="li" delay={i * 70}>
              <Link
                href={`/galleries/${w.slug}`}
                className="group block border-b border-paper-sunk py-8 transition-colors duration-300 hover:bg-paper md:py-10"
              >
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <span className="tnum font-display text-[clamp(2.4rem,5vw,3.75rem)] font-bold leading-none text-maroon transition-transform duration-500 group-hover:-translate-y-1">
                    {w.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {w.theme ?? w.label}
                    </h3>
                    <p className="mt-1.5 text-sm text-ink-faint">
                      <time dateTime={w.startDate}>{w.dateDisplay}</time> ·{" "}
                      <span className="tnum">{w.hashtag}</span>
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold text-maroon transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    View gallery →
                  </span>
                </div>
                <p className="mt-5 max-w-3xl leading-relaxed text-ink-soft">
                  {w.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Venues. Concrete, verifiable entity signal.                       */}
      {/* ---------------------------------------------------------------- */}
      <Section pad="tight">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="On campus"
            title="Where the weekend happens."
            lede="Black Alumni Weekend runs across the Mississippi State campus and downtown Starkville."
          />

          <Reveal delay={130}>
            <dl className="border-t border-paper-edge">
              {VENUES.map((v) => (
                <div
                  key={v.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-paper-edge py-5"
                >
                  <dt className="font-display text-lg font-semibold text-ink">
                    {v.name}
                  </dt>
                  <dd className="text-sm text-ink-faint">{v.role}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="deep" id="faq" pad="normal">
        <SectionHeading
          eyebrow="Questions"
          title="What people ask us most."
          lede="Short answers. If yours is not here, write to us and we will add it."
        />
        <Faq />

        <Reveal delay={100} className="mt-12">
          <p className="text-ink-soft">
            Still unanswered? Write to{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="link-draw font-semibold text-maroon"
            >
              {SITE.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${SITE.phone}`}
              className="link-draw tnum font-semibold text-maroon"
            >
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
