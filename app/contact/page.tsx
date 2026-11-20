import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { SITE } from "@/lib/site";
import {
  JsonLd,
  graph,
  breadcrumbSchema,
  organizationSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with MSU Black Alumni. Email ${SITE.email} or call ${SITE.phoneDisplay} about Black Alumni Weekend, scholarships, sponsorship or mentoring a Mississippi State student.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | MSU Black Alumni",
    description: `Email ${SITE.email} or call ${SITE.phoneDisplay}.`,
    url: "/contact",
  },
};

const REASONS = [
  {
    t: "Black Alumni Weekend",
    d: "Dates, registration, programming and travel questions for the next reunion.",
  },
  {
    t: "Scholarships & giving",
    d: "Making a gift, funding a full award, or asking how the fund is administered.",
  },
  {
    t: "Sponsorship",
    d: "Corporate or individual sponsorship of a weekend event, and the deck that goes with it.",
  },
  {
    t: "Mentorship",
    d: "Volunteering for the career expo or taking introductions to students in your field.",
  },
  {
    t: "Photographs",
    d: "Requesting frames from a past weekend, or permission to reuse them.",
  },
  {
    t: "Press",
    d: "Interviews, media access and background on the weekend’s history.",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={graph(
          organizationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        )}
      />

      <PageHero
        eyebrow="Contact"
        title="Talk to us directly."
        lede="Alumni volunteers read this inbox. Tell us which part of the programme you are asking about and you will get a straight answer."
        meta={[
          { label: "Email", value: SITE.email },
          { label: "Phone", value: SITE.phoneDisplay },
          { label: "Based in", value: `${SITE.city}, ${SITE.regionName}` },
        ]}
      />

      <Section tone="pitch">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Reach us"
              title="Two ways, both answered."
            />

            <Reveal delay={180} className="mt-8">
              <div className="space-y-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-slate bg-void p-6 transition-colors duration-300 hover:-translate-y-0.5 hover:border-wine-lit/40 hover:bg-white"
                >
                  <span>
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-glow">
                      Email
                    </span>
                    <span className="mt-1.5 block break-all font-display text-lg text-chalk">
                      {SITE.email}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-wine-glow transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>

                <a
                  href={`tel:${SITE.phone}`}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-slate bg-void p-6 transition-colors duration-300 hover:-translate-y-0.5 hover:border-wine-lit/40 hover:bg-white"
                >
                  <span>
                    <span className="block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-wine-glow">
                      Phone
                    </span>
                    <span className="mt-1.5 block font-display text-lg text-chalk">
                      {SITE.phoneDisplay}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-wine-glow transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>

              <div className="mt-6 flex gap-4 text-sm">
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="me noopener"
                  className="link-draw font-semibold text-wine-glow"
                >
                  Facebook
                </a>
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="me noopener"
                  className="link-draw font-semibold text-wine-glow"
                >
                  Instagram
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="What people write in about"
          title="Six things we answer most."
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-void-edge md:grid-cols-3">
          {REASONS.map((r, i) => (
            <Reveal key={r.t} delay={i * 70}>
              <div className="h-full bg-void p-7">
                <dt className="font-display text-lg text-chalk">{r.t}</dt>
                <dd className="mt-2.5 text-sm leading-relaxed text-ash">
                  {r.d}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </Section>
    </>
  );
}
