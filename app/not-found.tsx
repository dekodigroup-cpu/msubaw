import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-start justify-center py-24">
      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-wine-glow">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl text-chalk md:text-5xl">
        That page has moved on.
      </h1>
      <p className="mt-5 max-w-md leading-relaxed text-ash">
        The link may be from the previous version of this site. Everything is
        still here, just reorganised.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-wine-lit px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:-translate-y-0.5 hover:bg-wine-deep"
      >
        Back home
      </Link>
    </section>
  );
}
