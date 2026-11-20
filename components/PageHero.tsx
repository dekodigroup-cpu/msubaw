/** Interior masthead. Same programme language as the home hero, quieter. */
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
    <section className="on-maroon relative isolate overflow-hidden bg-maroon-deep text-chalk">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(110% 100% at 10% 0%, oklch(37% 0.137 28) 0%, oklch(23% 0.098 29) 62%)",
          }}
        />
        <div className="grain-layer" />
      </div>

      <div className="container-page py-20 md:py-24">
        <div className="animate-in flex items-center gap-4" style={{ animationDelay: "40ms" }}>
          <span className="h-px w-10 bg-brass" aria-hidden="true" />
          <p className="eyebrow text-brass">{eyebrow}</p>
        </div>

        <h1
          className="animate-in mt-6 max-w-4xl font-display text-[clamp(2.1rem,5.4vw,4rem)] font-bold leading-[1.02]"
          style={{ animationDelay: "130ms" }}
        >
          {title}
        </h1>

        {lede && (
          <p
            className="animate-in measure mt-7 text-lg leading-relaxed text-chalk-soft"
            style={{ animationDelay: "250ms" }}
          >
            {lede}
          </p>
        )}

        {meta && meta.length > 0 && (
          <dl
            className="animate-in mt-11 grid max-w-3xl gap-y-5 border-t border-chalk/20 pt-7 sm:grid-cols-3 sm:gap-x-8"
            style={{ animationDelay: "350ms" }}
          >
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="eyebrow text-brass">{m.label}</dt>
                <dd className="mt-2 break-words text-chalk">
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
