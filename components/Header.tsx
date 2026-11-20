"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-paper transition-[border-color,box-shadow] duration-500 ${
        scrolled
          ? "border-b border-paper-edge shadow-[0_1px_2px_oklch(23%_0.015_32/0.04),0_8px_24px_oklch(23%_0.015_32/0.05)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-page flex h-(--header-h) items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 py-2"
          aria-label="MSU Black Alumni, home"
        >
          <span
            aria-hidden="true"
            className="font-display text-[1.35rem] font-bold leading-none text-maroon"
          >
            MSU
          </span>
          <span className="eyebrow text-ink-soft">Black Alumni</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`link-draw flex min-h-11 items-center text-[0.9rem] font-medium transition-colors duration-300 ${
                isActive(item.href)
                  ? "text-maroon"
                  : "text-ink-soft hover:text-maroon"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/scholarships#give"
            className="flex min-h-11 items-center bg-maroon px-5 text-[0.85rem] font-semibold text-chalk transition-colors duration-300 hover:bg-maroon-deep"
          >
            Give
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex size-11 items-center justify-center text-ink transition-colors duration-200 hover:text-maroon md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-[1.75px] w-5 bg-current transition-[transform,top] duration-300 ${
                open ? "top-[7px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-[1.75px] w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 h-[1.75px] w-5 bg-current transition-[transform,top] duration-300 ${
                open ? "top-[7px] -rotate-45" : "top-3.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div id="mobile-nav" hidden={!open} className="md:hidden">
        <div className="border-t border-paper-edge bg-paper px-5 pb-8 pt-2">
          <nav aria-label="Mobile">
            <ul>
              {NAV.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    style={{ animationDelay: `${i * 45}ms` }}
                    className={`animate-in block border-b border-paper-edge py-4 font-display text-xl transition-colors duration-200 ${
                      isActive(item.href) ? "text-maroon" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/scholarships#give"
              className="mt-6 block bg-maroon px-6 py-4 text-center font-semibold text-chalk"
            >
              Give to the scholarship fund
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
