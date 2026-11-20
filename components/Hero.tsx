import Image from "next/image";
import Link from "next/link";
import { Logo } from "./Logo";
import { HERO_PHOTOS } from "@/lib/brand";
import { NEXT_WEEKEND, SITE } from "@/lib/site";

/**
 * Full-bleed cinematic hero.
 *
 * When a hero photograph exists it runs full-bleed under a scrim. When one
 * does not, the fallback is a composed dark field with a burgundy stage
 * wash, which reads as intentional rather than as a missing image.
 */
export function Hero() {
  const photo = HERO_PHOTOS[0];

  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-void">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        {photo ? (
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <>
            {/* Stage wash: two burgundy pools over near-black. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(90% 70% at 18% 8%, oklch(34% 0.125 17) 0%, oklch(13% 0.008 20) 62%)",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 88% 92%, oklch(30% 0.1 22 / 0.75) 0%, transparent 60%)",
              }}
            />
            {/* Light shafts, echoing stage rig beams. */}
            <svg
              className="absolute inset-0 h-full w-full opacity-[0.1]"
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
            >
              {[160, 420, 700, 980, 1260].map((x, i) => (
                <polygon
                  key={x}
                  points={`${x},0 ${x + 70},0 ${x + 320 - i * 36},900 ${x - 170 - i * 36},900`}
                  fill="oklch(97% 0.004 70)"
                  opacity={0.1 + (i % 2) * 0.08}
                />
              ))}
            </svg>
          </>
        )}
      </div>

      {/* Scrim keeps text legible whatever the photograph does. */}
      <div aria-hidden="true" className="scrim-bottom absolute inset-0 -z-10" />
      <div aria-hidden="true" className="grain-layer -z-10" />

      <div className="container-page relative w-full pb-16 pt-32 md:pb-24 md:pt-40">
        {/*
          The lockup is the page title, so it carries the h1. Logo renders
          with role="img" and an aria-label, which gives the heading its
          accessible text whether the artwork or the fallback is showing.
        */}
        <h1
          className="animate-in max-w-[22rem] md:max-w-[32rem]"
          style={{ animationDelay: "60ms" }}
        >
          <Logo
            variant="white"
            priority
            className="w-full text-[clamp(2.6rem,7vw,5rem)]"
          />
        </h1>

        <p
          className="animate-in measure mt-9 text-lg leading-relaxed text-ash md:text-xl"
          style={{ animationDelay: "260ms" }}
        >
          Every two years we come back to Starkville. Four days of career
          rooms, a gala, a gospel brunch and a floor that does not empty until
          they turn the lights on.
        </p>

        <div
          className="animate-in mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "380ms" }}
        >
          <Link
            href="/scholarships#give"
            className="group flex min-h-13 items-center rounded-full bg-wine px-8 font-semibold text-chalk transition-colors duration-300 hover:bg-wine-lit"
          >
            Fund a scholarship
            <span
              aria-hidden="true"
              className="ml-2.5 inline-block transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href="/galleries/2026"
            className="flex min-h-13 items-center rounded-full border border-chalk/25 px-8 font-semibold text-chalk transition-colors duration-300 hover:border-chalk/70 hover:bg-chalk/5"
          >
            See BAW26
          </Link>
        </div>

        {/* Particulars, as a ruled strip. */}
        <dl
          className="animate-in mt-14 grid max-w-3xl gap-y-6 border-t border-chalk/15 pt-8 sm:grid-cols-3 sm:gap-x-10"
          style={{ animationDelay: "480ms" }}
        >
          <div>
            <dt className="eyebrow text-wine-glow">Next reunion</dt>
            <dd className="mt-2.5 font-display text-xl font-semibold text-chalk">
              {NEXT_WEEKEND.hashtag}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-wine-glow">When</dt>
            <dd className="mt-2.5 text-chalk">
              <time dateTime={NEXT_WEEKEND.monthIso}>
                {NEXT_WEEKEND.dateDisplay}
              </time>
              <span className="mt-0.5 block text-sm text-smoke">
                {NEXT_WEEKEND.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-wine-glow">Where</dt>
            <dd className="mt-2.5 text-chalk">{NEXT_WEEKEND.location}</dd>
          </div>
        </dl>

        <p
          className="animate-in mt-8 text-sm text-smoke"
          style={{ animationDelay: "560ms" }}
        >
          <a href={`mailto:${SITE.email}`} className="link-draw text-ash">
            {SITE.email}
          </a>
          <span aria-hidden="true" className="mx-2.5">
            ·
          </span>
          <a href={`tel:${SITE.phone}`} className="link-draw tnum text-ash">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
