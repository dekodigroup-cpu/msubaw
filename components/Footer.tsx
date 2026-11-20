import Link from "next/link";
import { Logo } from "./Logo";
import { NAV, SITE, WEEKENDS } from "@/lib/site";

export function Footer() {
  const updated = new Date(SITE.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <footer className="relative isolate overflow-hidden border-t border-slate bg-pitch text-ash">
      <div aria-hidden="true" className="grain-layer -z-10" />

      <div className="container-page py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="white" className="w-44 text-[1.9rem]" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed">
              {SITE.tagline}. Funding scholarships for Mississippi State
              students, and bringing Bulldogs back to Starkville every two
              years.
            </p>
            <ul className="mt-6 flex gap-5">
              <li>
                <a
                  href={SITE.social.facebook}
                  className="link-draw text-sm transition-colors duration-300 hover:text-chalk"
                  rel="me noopener"
                  target="_blank"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href={SITE.social.instagram}
                  className="link-draw text-sm transition-colors duration-300 hover:text-chalk"
                  rel="me noopener"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="ft-explore">
            <h2 id="ft-explore" className="eyebrow text-wine-glow">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors duration-300 hover:text-chalk"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-weekends">
            <h2 id="ft-weekends" className="eyebrow text-wine-glow">
              Past weekends
            </h2>
            <ul className="mt-5 space-y-3">
              {WEEKENDS.map((w) => (
                <li key={w.slug}>
                  <Link
                    href={`/galleries/${w.slug}`}
                    className="tnum text-sm transition-colors duration-300 hover:text-chalk"
                  >
                    {w.hashtag} · {w.year}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-wine-glow">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="break-all transition-colors duration-300 hover:text-chalk"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="tnum transition-colors duration-300 hover:text-chalk"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                {SITE.city}, {SITE.region}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-slate pt-6 text-xs text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            Last updated <time dateTime={SITE.lastUpdated}>{updated}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
