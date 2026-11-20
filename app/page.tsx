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
  title: "MSU Black Alumni Weekend, Celebrating Black Accomplishment",
  description:
    "The year-round community of Mississippi State University Black alumni. We fund $1,000 student scholarships, connect alumni to careers, and come back to Starkville every two years for Black Alumni Weekend. Next: BAW28, February 2028.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MSU Black Alumni Weekend, Celebrating Black Accomplishment",
    description:
      "Four days in Starkville every two years. Funding scholarships for Mississippi State students. Next reunion: BAW28, February 2028.",
    url: "/",
  },
};

const PARTICULARS = [
  { k: "Award size", v: SCHOLARSHIP.award },
  { k: "Granted by", v: "Black Alumni Advisory Council" },
  { k: "Cadence", v: "Every two years, February" },
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
      {/* Who we are. Answer-first, extractable.                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="void" pad="loose">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="A reunion every two years. A commitment every day in between."
            />
            <div className="measure mt-8 space-y-5 text-lg leading-relaxed text-ash">
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
                returned to campus. It has run in 2022, 2024 and 2026, and the
                next one, {NEXT_WEEKEND.hashtag}, falls in{" "}
                {NEXT_WEEKEND.dateDisplay}.
              </Reveal>
            </div>
          </div>

          <Reveal delay={150} className="lg:pt-24">
            <h3 className="eyebrow text-smoke">At a glance</h3>
            <dl className="mt-6 border-t border-slate">
              {PARTICULARS.map((p) => (
                <div
                  key={p.k}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-slate py-4"
                >
                  <dt className="text-sm text-smoke">{p.k}</dt>
                  <dd className="tnum font-display font-semibold tracking-tight text-chalk">
                    {p.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Commitments. Asymmetric: one featured, three ruled rows.          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="pitch" pad="normal">
        <SectionHeading
          eyebrow="What we do"
          title="Four commitments, kept between reunions."
          lede="The weekend is the visible part. These are the reasons it exists."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <Reveal delay={60}>
            <article className="h-full border-t-2 border-wine-lit pt-8">
              <p className="eyebrow tnum text-wine-glow">01</p>
              <h3 className="display-xl mt-5 text-[clamp(1.7rem,3.2vw,2.5rem)] text-chalk">
                {PILLARS[0].title}
              </h3>
              <p className="measure mt-5 text-lg leading-relaxed text-ash">
                {PILLARS[0].body}
              </p>
              <Link
                href="/scholarships"
                className="link-draw mt-8 inline-flex items-center font-semibold text-wine-glow"
              >
                How the fund works
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            </article>
          </Reveal>

          <div className="border-t border-slate">
            {PILLARS.slice(1).map((p, i) => (
              <Reveal key={p.title} delay={120 + i * 80}>
                <article className="grid gap-x-6 gap-y-2 border-b border-slate py-7 sm:grid-cols-[3.5rem_1fr]">
                  <p className="eyebrow tnum pt-1.5 text-smoke">0{i + 2}</p>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-chalk">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 leading-relaxed text-ash">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Scholarship band. The one light surface: a deliberate gear change */}
      {/* for the money decision.                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="bone" id="give-band" pad="normal">
        <div className="grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Reveal className="flex items-center gap-4">
              <span className="h-px w-10 bg-wine" aria-hidden="true" />
              <p className="eyebrow text-wine">Where the money goes</p>
            </Reveal>
            <Reveal
              as="h2"
              delay={70}
              className="display-xl mt-6 max-w-2xl text-[clamp(2rem,4.8vw,3.4rem)] text-umber"
            >
              Every ticket becomes tuition.
            </Reveal>
            <Reveal as="p" delay={150} className="measure mt-6 text-lg leading-relaxed text-umber-soft">
              {SCHOLARSHIP.purpose} Awards are {SCHOLARSHIP.award} each.
            </Reveal>
          </div>

          <Reveal delay={220}>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/scholarships#give"
                className="group flex min-h-13 items-center justify-center rounded-full bg-wine px-8 font-semibold text-chalk transition-colors duration-300 hover:bg-wine-lit"
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
                className="flex min-h-13 items-center justify-center rounded-full border border-umber/25 px-8 font-semibold text-umber transition-colors duration-300 hover:border-umber hover:bg-umber/5"
              >
                Sponsor an event
              </Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Archive                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="void" id="weekends" pad="normal">
        <SectionHeading
          eyebrow="The archive"
          title="Three weekends, and counting."
          lede="Each reunion is documented so the next class of alumni knows what it is inheriting."
        />

        <ul className="mt-16 border-t border-slate">
          {WEEKENDS.map((w, i) => (
            <Reveal key={w.slug} as="li" delay={i * 70}>
              <Link
                href={`/galleries/${w.slug}`}
                className="group block border-b border-slate py-8 transition-colors duration-300 hover:bg-pitch md:py-10"
              >
                <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3">
                  <span className="tnum display-xl text-[clamp(2.6rem,5.5vw,4.25rem)] text-wine-lit transition-[transform,color] duration-500 group-hover:-translate-y-1 group-hover:text-wine-glow">
                    {w.year}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-chalk">
                      {w.theme ?? w.label}
                    </h3>
                    <p className="mt-1.5 text-sm text-smoke">
                      <time dateTime={w.startDate}>{w.dateDisplay}</time> ·{" "}
                      <span className="tnum">{w.hashtag}</span>
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-sm font-semibold text-wine-glow transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    View gallery →
                  </span>
                </div>
                <p className="mt-5 max-w-3xl leading-relaxed text-ash">
                  {w.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Venues                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="pitch" pad="tight">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading
            eyebrow="On campus"
            title="Where the weekend happens."
            lede="Black Alumni Weekend runs across the Mississippi State campus and downtown Starkville."
          />

          <Reveal delay={130}>
            <dl className="border-t border-slate">
              {VENUES.map((v) => (
                <div
                  key={v.name}
                  className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-slate py-5"
                >
                  <dt className="font-display font-semibold tracking-tight text-chalk">
                    {v.name}
                  </dt>
                  <dd className="text-sm text-smoke">{v.role}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="void" id="faq" pad="normal">
        <SectionHeading
          eyebrow="Questions"
          title="What people ask us most."
          lede="Short answers. If yours is not here, write to us and we will add it."
        />
        <Faq />

        <Reveal delay={100} className="mt-12">
          <p className="text-ash">
            Still unanswered? Write to{" "}
            <a
              href={`mailto:${SITE.email}`}
              className="link-draw font-semibold text-wine-glow"
            >
              {SITE.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${SITE.phone}`}
              className="link-draw tnum font-semibold text-wine-glow"
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
