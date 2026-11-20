/**
 * Interior masthead. Same dark language as the home hero, quieter, and it
 * carries its own top padding because the header is fixed and overlays it.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  meta,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  meta?: { label: string; value: string; dateTime?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-void">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(95% 85% at 12% 0%, oklch(31% 0.112 17) 0%, oklch(13% 0.008 20) 62%)",
          }}
        />
        <div className="grain-layer" />
      </div>

      <div className="container-page pb-16 pt-32 md:pb-20 md:pt-40">
        <div
          className="animate-in flex items-center gap-4"
          style={{ animationDelay: "40ms" }}
        >
          <span className="h-px w-10 bg-wine-glow" aria-hidden="true" />
          <p className="eyebrow text-wine-glow">{eyebrow}</p>
        </div>

        <h1
          className="animate-in display-xl mt-7 max-w-4xl text-[clamp(2.2rem,6vw,4.5rem)] text-chalk"
          style={{ animationDelay: "130ms" }}
        >
          {title}
        </h1>

        {lede && (
          <p
            className="animate-in measure mt-7 text-lg leading-relaxed text-ash"
            style={{ animationDelay: "250ms" }}
          >
            {lede}
          </p>
        )}

        {meta && meta.length > 0 && (
          <dl
            className="animate-in mt-12 grid max-w-3xl gap-y-6 border-t border-slate pt-8 sm:grid-cols-3 sm:gap-x-10"
            style={{ animationDelay: "350ms" }}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-wine-glow">{m.label}</dt>
                <dd className="mt-2.5 break-words text-chalk">
                  {m.dateTime ? (
                    <time dateTime={m.dateTime}>{m.value}</time>
                  ) : (
                    m.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
