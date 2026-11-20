import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { PageHero } from "@/components/PageHero";
import { WEEKENDS } from "@/lib/site";
import {
  JsonLd,
  graph,
  breadcrumbSchema,
  ALL_PAST_EVENTS,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Photo Galleries",
  description:
    "Photo galleries from every MSU Black Alumni Weekend: BAW26, BAW24 and BAW22. Four days in Starkville each time: career mixers, the scholarship gala, the gospel brunch and Bulldog athletics.",
  alternates: { canonical: "/galleries" },
  openGraph: {
    title: "Photo Galleries | MSU Black Alumni",
    description:
      "Every Black Alumni Weekend, documented: 2022, 2024 and 2026.",
    url: "/galleries",
  },
};

export default function GalleriesPage() {
  return (
    <>
      <JsonLd
        data={graph(
          ...ALL_PAST_EVENTS(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Galleries", path: "/galleries" },
          ]),
        )}
      />

      <PageHero
        eyebrow="Galleries"
        title="Four days, every other February, on the record."
        lede="Each weekend is photographed end to end: the mixer, the gala, the brunch, the stands. Pick a year."
      />

      <Section>
        <SectionHeading
          eyebrow="Choose a weekend"
          title="Three reunions, fully documented."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {WEEKENDS.map((w, i) => (
            <Reveal key={w.slug} delay={i * 90}>
              <Link
                href={`/galleries/${w.slug}`}
                className="group block h-full overflow-hidden rounded-3xl border border-slate bg-void transition-colors duration-500 hover:-translate-y-1.5 hover:border-wine-lit/30 hover:shadow-xl"
              >
                {/* Year plate — typographic, no image dependency. */}
                <div className="grain relative isolate overflow-hidden bg-wine-deep px-7 py-14">
                  <div aria-hidden="true" className="absolute inset-0 -z-10">
                    <div
                      className="absolute inset-0 opacity-60 transition-transform duration-[1200ms] group-hover:scale-110"
                      style={{
                        background:
                          "radial-gradient(circle at 30% 20%, rgba(138,21,56,0.9) 0%, rgba(74,0,0,0) 70%)",
                      }}
                    />
                    <div className="grain-layer" />
                  </div>
                  <p className="font-display text-6xl font-semibold leading-none text-white">
                    {w.year}
                  </p>
                  <p className="mt-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-wine-glow">
                    {w.hashtag}
                  </p>
                </div>

                <div className="p-7">
                  <h3 className="font-display text-lg leading-snug text-chalk">
                    {w.theme ?? w.label}
                  </h3>
                  <p className="mt-2 text-sm text-ash">
                    <time dateTime={w.startDate}>{w.dateDisplay}</time>
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ash">
                    {w.summary}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-6 inline-block text-sm font-semibold text-wine-glow transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    Open gallery →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
