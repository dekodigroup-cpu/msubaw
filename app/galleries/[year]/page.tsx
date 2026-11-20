import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { WEEKENDS, getWeekend, SITE } from "@/lib/site";
import {
  JsonLd,
  graph,
  breadcrumbSchema,
  pastEventSchema,
  gallerySchema,
} from "@/lib/schema";

type Params = { year: string };

/** Pre-render one static page per weekend. */
export function generateStaticParams(): Params[] {
  return WEEKENDS.map((w) => ({ year: w.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { year } = await params;
  const w = getWeekend(year);
  if (!w) return {};

  const title = `${w.label} Photos${w.theme ? `, ${w.theme}` : ""}`;
  const description = `${w.summary} Photos from ${w.label}, held ${w.dateDisplay} at Mississippi State University in Starkville.`;

  return {
    title,
    description,
    alternates: { canonical: `/galleries/${w.slug}` },
    openGraph: {
      title: `${w.label} Photos | MSU Black Alumni`,
      description,
      url: `/galleries/${w.slug}`,
      type: "article",
    },
  };
}

export default async function GalleryYearPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { year } = await params;
  const w = getWeekend(year);
  if (!w) notFound();

  const others = WEEKENDS.filter((x) => x.slug !== w.slug);

  return (
    <>
      <JsonLd
        data={graph(
          pastEventSchema(w),
          gallerySchema(w),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Galleries", path: "/galleries" },
            { name: w.label, path: `/galleries/${w.slug}` },
          ]),
        )}
      />

      <PageHero
        eyebrow={`${w.hashtag} · Gallery`}
        title={w.theme ?? w.label}
        lede={w.summary}
        meta={[
          { label: "Dates", value: w.dateDisplay, dateTime: w.startDate },
          { label: "Location", value: `${SITE.city}, ${SITE.regionName}` },
          ...(w.photoCredit
            ? [{ label: "Photography", value: w.photoCredit }]
            : []),
        ]}
      />

      {/* Highlights — extractable list of what actually happened. */}
      <Section tone="pitch">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <SectionHeading
            eyebrow="On the schedule"
            title={`What ${w.hashtag} included.`}
          />
          <Reveal delay={140}>
            <ul className="grid gap-px overflow-hidden rounded-2xl bg-void-edge sm:grid-cols-2">
              {w.highlights.map((h) => (
                <li
                  key={h}
                  className="bg-void p-6 text-sm leading-relaxed text-chalk"
                >
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Gallery */}
      <Section>
        <SectionHeading
          eyebrow="The photographs"
          title={`${w.label} in pictures.`}
          lede={
            w.galleryUrl
              ? "The full high-resolution set is hosted on our gallery, where you can browse, favourite and download."
              : "The full set from this weekend is held in our archive. Get in touch and we will share the link."
          }
        />
        <GalleryGrid weekend={w} />
      </Section>

      {/* Other years */}
      <Section tone="pitch">
        <SectionHeading eyebrow="Keep going" title="Other weekends." />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {others.map((o, i) => (
            <Reveal key={o.slug} delay={i * 80}>
              <Link
                href={`/galleries/${o.slug}`}
                className="group flex items-center justify-between gap-6 rounded-2xl border border-slate bg-void p-7 transition-colors duration-500 hover:-translate-y-1 hover:border-wine-lit/30 hover:bg-white hover:shadow-lg"
              >
                <div>
                  <p className="font-display text-3xl font-semibold text-wine-glow">
                    {o.year}
                  </p>
                  <p className="mt-1.5 text-sm text-ash">
                    {o.theme ?? o.label}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="text-sm font-semibold text-wine-glow transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
