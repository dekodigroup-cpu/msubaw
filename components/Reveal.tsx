"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/** One shared observer for the whole page. Observing twice is a no-op. */
let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (sharedObserver) return sharedObserver;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          sharedObserver?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
  );
  return sharedObserver;
}

type RevealProps = {
  children: ReactNode;
  /** Stagger, in milliseconds. */
  delay?: number;
  className?: string;
  as?: ElementType;
};

/**
 * Scroll reveal: opacity, translateY(30px) and blur(8px) resolving over
 * 0.8s, fired once at 20% visibility.
 *
 * The element is rendered visible in the server HTML. The `reveal` class,
 * which hides it, is only added by this effect, so anything that does not
 * run JS (crawlers, AI agents, no-JS visitors) sees complete content.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.classList.add("reveal");

    // Already in view on load: reveal on the next frame rather than waiting
    // for a scroll that may never come.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      requestAnimationFrame(() => el.classList.add("is-visible"));
      return;
    }

    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined
      }
    >
      {children}
    </Tag>
  );
}
