import Link from "next/link";
import { NEXT_WEEKEND, SITE } from "@/lib/site";

/**
 * Masthead, built like the cover of a printed programme: rule, standfirst,
 * title, rule, particulars.
 *
 * Server-rendered. Motion is a CSS entrance only, no infinite autoplay and
 * nothing gated on hydration.
 */
export function Hero() {
  return (
    <section className="on-maroon relative isolate overflow-hidden bg-maroon-deep text-chalk">
      {/* Static layered washes. Deliberately not animated. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 12% 0%, oklch(38% 0.14 28) 0%, oklch(23% 0.098 29) 58%)",
          }}
        />
        {/* Programme rules, set as a bell curve over the campus. */}
        <svg
          className="absolute inset-x-0 bottom-0 h-44 w-full opacity-[0.09]"
          viewBox="0 0 1440 176"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M0 ${176 - i * 24} C 340 ${106 - i * 20}, 1100 ${106 - i * 20}, 1440 ${176 - i * 24}`}
              stroke="oklch(97.5% 0.008 70)"
              strokeWidth="1.25"
            />
          ))}
        </svg>
        <div className="grain-layer" />
      </div>

      <div className="container-page py-24 md:py-32">
        <div
          className="animate-in flex items-center gap-4"
          style={{ animationDelay: "40ms" }}
        >
          <span className="h-px w-10 bg-brass" aria-hidden="true" />
          <p className="eyebrow text-brass">Mississippi State University</p>
        </div>

        <h1
          className="animate-in mt-7 font-display text-[clamp(2.75rem,7.5vw,5.75rem)] font-bold leading-[0.96]"
          style={{ animationDelay: "140ms" }}
        >
          Celebrating{" "}
          <span className="italic text-brass">Black</span>{" "}
          Accomplishment
        </h1>

        <p
          className="animate-in measure mt-8 text-lg leading-relaxed text-chalk-soft md:text-xl"
          style={{ animationDelay: "280ms" }}
        >
          We are the Black alumni of Mississippi State, united by what Starkville
          made of us and organised around what we owe the students coming next.
        </p>

        <div
          className="animate-in mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "380ms" }}
        >
          <Link
            href="/scholarships#give"
            className="group flex min-h-12 items-center bg-brass px-7 font-semibold text-maroon-deep transition-colors duration-300 hover:bg-chalk"
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
            className="flex min-h-12 items-center border border-chalk/30 px-7 font-semibold text-chalk transition-colors duration-300 hover:border-chalk hover:bg-chalk/5"
          >
            Revisit BAW26
          </Link>
        </div>

        {/* Particulars. A ruled table, not a glass card. */}
        <dl
          className="animate-in mt-16 grid max-w-3xl gap-y-5 border-t border-chalk/20 pt-7 sm:grid-cols-3 sm:gap-x-8"
          style={{ animationDelay: "480ms" }}
        >
          <div>
            <dt className="eyebrow text-brass">Next reunion</dt>
            <dd className="mt-2 font-display text-xl text-chalk">
              {NEXT_WEEKEND.label}
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-brass">When</dt>
            <dd className="mt-2 text-chalk">
              <time dateTime={NEXT_WEEKEND.monthIso}>
                {NEXT_WEEKEND.dateDisplay}
              </time>
              <span className="mt-0.5 block text-sm text-chalk-soft">
                {NEXT_WEEKEND.status}
              </span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-brass">Where</dt>
            <dd className="mt-2 text-chalk">{NEXT_WEEKEND.location}</dd>
          </div>
        </dl>

        <p
          className="animate-in mt-7 text-sm text-chalk-soft"
          style={{ animationDelay: "560ms" }}
        >
          Questions?{" "}
          <a href={`mailto:${SITE.email}`} className="link-draw text-chalk">
            {SITE.email}
          </a>{" "}
          or{" "}
          <a href={`tel:${SITE.phone}`} className="link-draw tnum text-chalk">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
}
