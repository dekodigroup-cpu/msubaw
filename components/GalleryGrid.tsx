import Image from "next/image";
import { Reveal } from "./Reveal";
import { SITE, type Weekend } from "@/lib/site";

/**
 * Gallery block.
 *
 * Renders a real image grid when `weekend.photos` is populated, and an
 * honest hand-off to the hosted gallery when it is not. It never shows
 * decorative placeholders pretending to be photographs.
 *
 * To add photos: push entries onto the weekend's `photos` array in
 * lib/site.ts. Local files go in /public/galleries/<year>/; remote files
 * need their host added to `images.remotePatterns` in next.config.ts.
 */
export function GalleryGrid({ weekend }: { weekend: Weekend }) {
  const photos = weekend.photos ?? [];

  if (photos.length > 0) {
    return (
      <>
        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {photos.map((p, i) => (
            <Reveal key={p.src} delay={(i % 6) * 60}>
              <figure
                className={`group relative overflow-hidden rounded-xl bg-void-edge ${
                  p.tall ? "row-span-2 aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  loading={i < 6 ? "eager" : "lazy"}
                  priority={i < 3}
                />
              </figure>
            </Reveal>
          ))}
        </div>

        {weekend.galleryUrl && (
          <Reveal delay={120} className="mt-10">
            <GalleryLink weekend={weekend} />
          </Reveal>
        )}
      </>
    );
  }

  return (
    <Reveal delay={120} className="mt-12">
      <div className="relative isolate overflow-hidden rounded-3xl bg-wine-deep p-9 text-chalk md:p-14">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div
            className="animate-drift absolute -right-1/4 top-[-60%] h-[40rem] w-[40rem] rounded-full opacity-45"
            style={{
              background:
                "radial-gradient(circle at center, rgba(212,161,71,0.45) 0%, rgba(74,0,0,0) 65%)",
            }}
          />
          <div className="grain-layer" />
        </div>

        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-wine-glow">
          {weekend.hashtag} · Full set
        </p>
        <h3 className="mt-4 max-w-xl display-xl text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight text-white">
          {weekend.galleryUrl
            ? "Browse every photograph from the weekend."
            : "Looking for photos from this weekend?"}
        </h3>
        <p className="mt-5 max-w-xl leading-relaxed text-ash">
          {weekend.galleryUrl ? (
            <>
              The complete high-resolution gallery is hosted externally, where
              you can browse the full weekend, favourite the frames you want and
              download them.
              {weekend.photoCredit
                ? ` Photography by ${weekend.photoCredit}.`
                : ""}
            </>
          ) : (
            <>
              The {weekend.year} set lives in our archive rather than on a public
              gallery. Write to us and we will send you the link, or the specific
              frames you are after.
            </>
          )}
        </p>

        <div className="mt-9">
          <GalleryLink weekend={weekend} />
        </div>
      </div>
    </Reveal>
  );
}

function GalleryLink({ weekend }: { weekend: Weekend }) {
  if (weekend.galleryUrl) {
    return (
      <a
        href={weekend.galleryUrl}
        target="_blank"
        rel="noopener"
        className="group inline-flex items-center gap-2 rounded-full bg-wine px-7 py-4 text-sm font-semibold text-chalk shadow-lg transition-colors duration-300 hover:-translate-y-0.5 hover:bg-wine-lit"
      >
        Open the {weekend.year} gallery
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          →
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <a
      href={`mailto:${SITE.email}?subject=${encodeURIComponent(
        `Photo request: ${weekend.label}`,
      )}`}
      className="group inline-flex items-center gap-2 rounded-full bg-wine px-7 py-4 text-sm font-semibold text-chalk shadow-lg transition-colors duration-300 hover:-translate-y-0.5 hover:bg-wine-lit"
    >
      Request the {weekend.year} photos
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
