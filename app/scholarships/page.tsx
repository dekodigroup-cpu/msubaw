import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { SITE, SCHOLARSHIP } from "@/lib/site";
import {
  JsonLd,
  graph,
  breadcrumbSchema,
  donateActionSchema,
  organizationSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Scholarships & Giving",
  description:
    "Black Alumni Weekend funds $1,000 scholarships for Mississippi State students through the Black Alumni Advisory Council. Give directly, sponsor a weekend event, or mentor a student.",
  alternates: { canonical: "/scholarships" },
  openGraph: {
    title: "Scholarships & Giving | MSU Black Alumni",
    description:
      "Every ticket, sponsorship and gift becomes tuition for a Mississippi State student. Here is exactly how to give.",
    url: "/scholarships",
  },
};

const WAYS = [
  {
    id: "give",
    label: "Give directly",
    amount: "Any amount",
    body: "A one-off or recurring gift to the scholarship fund. Gifts of $1,000 fund a full award; smaller gifts are pooled toward the next one.",
    action: `Email ${SITE.email} with the subject “Scholarship gift” and we will send payment details and a receipt.`,
  },
  {
    id: "sponsor",
    label: "Sponsor an event",
    amount: "From $500",
    body: "Put your name or your company’s on a weekend event: the career expo, the athletic luncheon, the gala, the day party or the gospel brunch. Past sponsors include Tito’s Handmade Vodka, Yokohama Tire and Hideoki.",
    action: `Email ${SITE.email} with the subject “Sponsorship” and tell us which event interests you.`,
  },
  {
    id: "mentor",
    label: "Mentor a student",
    amount: "Your time",
    body: "Take part in the career expo and mixer, or accept introductions to students entering your field. This is the part of the programme that runs between weekends.",
    action: `Email ${SITE.email} with the subject “Mentorship” and your industry.`,
  },
] as const;

export default function ScholarshipsPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          donateActionSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Scholarships & Giving", path: "/scholarships" },
          ]),
        )}
      />

      <PageHero
        eyebrow="Scholarships & giving"
        title="Every ticket becomes tuition."
        lede={SCHOLARSHIP.purpose}
        meta={[
          { label: "Award size", value: SCHOLARSHIP.award },
          { label: "Granted by", value: "Black Alumni Advisory Council" },
          { label: "Beneficiaries", value: "Mississippi State students" },
        ]}
      />

      {/* The direct answer, first. */}
      <Section tone="pitch">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="What your money does"
              title="A thousand dollars, handed to a student who is already here."
            />
            <Reveal as="p" delay={180} className="mt-6 leading-relaxed text-ash/90">
              Black Alumni Weekend is a fundraiser with a reunion attached. The
              proceeds, meaning tickets, sponsorships, gala table sales and
              direct gifts, move into a scholarship fund administered by the{" "}
              {SCHOLARSHIP.beneficiary}. Awards are {SCHOLARSHIP.award} each and
              go to Mississippi State students.
            </Reveal>
            <Reveal as="p" delay={240} className="mt-5 leading-relaxed text-ash/90">
              The weekend is run by alumni volunteers, which is the reason the
              money reaches students rather than administration.
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="rounded-3xl bg-wine-lit p-8 text-chalk md:p-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-wine-glow">
                One award
              </p>
              <p className="mt-4 font-display text-6xl font-semibold text-white">
                {SCHOLARSHIP.award}
              </p>
              <p className="mt-4 leading-relaxed text-ash">
                The size of a single Black Alumni Weekend scholarship. Fund one
                outright, or add to the pool toward the next.
              </p>
              <a
                href={`mailto:${SITE.email}?subject=Scholarship%20gift`}
                className="group mt-8 inline-block rounded-full bg-wine-lit px-7 py-4 text-sm font-semibold text-chalk transition-colors duration-300 hover:-translate-y-0.5 hover:bg-wine-glow"
              >
                Start a gift
                <span
                  aria-hidden="true"
                  className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Three ways to give — explicit, parseable, no hidden steps. */}
      <Section id="give">
        <SectionHeading
          eyebrow="Three ways in"
          title="Pick the one that fits."
          lede="No portal, no account to create. Each route is an email away, and we answer."
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-void-edge md:grid-cols-3">
          {WAYS.map((w, i) => (
            <Reveal key={w.id} delay={i * 90}>
              <article
                id={w.id}
                className="flex h-full flex-col bg-void p-8 transition-colors duration-500 hover:bg-white md:p-9"
              >
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-glow">
                  {w.amount}
                </p>
                <h3 className="mt-3 font-display text-2xl text-chalk">
                  {w.label}
                </h3>
                <p className="mt-4 flex-1 leading-relaxed text-ash">
                  {w.body}
                </p>
                <p className="mt-6 border-t border-slate pt-5 text-sm leading-relaxed text-ash">
                  {w.action}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="mt-12">
          <div className="rounded-2xl border border-slate bg-pitch p-7 md:p-9">
            <h3 className="font-display text-xl text-chalk">
              Prefer to talk it through?
            </h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-ash">
              Call{" "}
              <a
                href={`tel:${SITE.phone}`}
                className="link-draw font-semibold text-wine-glow"
              >
                {SITE.phoneDisplay}
              </a>{" "}
              or email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="link-draw font-semibold text-wine-glow"
              >
                {SITE.email}
              </a>
              . Corporate sponsorship packages and gala table pricing are
              available on request.
            </p>
          </div>
        </Reveal>
      </Section>

      {/* Sponsor section anchor target with detail */}
      <Section tone="pitch" id="sponsor">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="For companies"
            title="Sponsorship that reaches the room you want."
            lede="Black Alumni Weekend draws alumni across engineering, business, medicine, education, government and the trades back to one campus for four days."
          />
          <Reveal delay={140}>
            <dl className="divide-y divide-slate border-t border-slate">
              {[
                {
                  t: "Career expo & mixer",
                  d: "Direct access to students entering the workforce and alumni hiring into it.",
                },
                {
                  t: "Athletic luncheon",
                  d: "A seated audience before a Bulldog game, historically sponsor-presented.",
                },
                {
                  t: "Awards & Scholarship Gala",
                  d: "The formal centrepiece, where the scholarships are announced.",
                },
                {
                  t: "Headline entertainment",
                  d: "Concert and day-party programming with the widest attendance of the weekend.",
                },
                {
                  t: "Gospel brunch",
                  d: "The Sunday close, traditionally presented by a university partner.",
                },
              ].map((item) => (
                <div key={item.t} className="py-5">
                  <dt className="font-display text-lg text-chalk">{item.t}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ash">
                    {item.d}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={`mailto:${SITE.email}?subject=Sponsorship%20enquiry`}
              className="mt-8 inline-block rounded-full bg-wine-lit px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:-translate-y-0.5 hover:bg-wine-deep"
            >
              Request the sponsorship deck
            </a>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
