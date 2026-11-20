import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <Reveal className="flex items-center gap-4">
          <span className="h-px w-10 bg-maroon-lit" aria-hidden="true" />
          <p className="eyebrow text-maroon-lit">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={70}
        className="mt-5 font-display text-[clamp(1.85rem,4vw,2.9rem)] font-semibold text-ink"
      >
        {title}
      </Reveal>
      {lede && (
        <Reveal as="p" delay={140} className="measure mt-5 text-lg leading-relaxed text-ink-soft">
          {lede}
        </Reveal>
      )}
    </div>
  );
}

/**
 * Section wrapper. Vertical rhythm is deliberately uneven across the page
 * (see DESIGN.md), so `pad` is set per section rather than fixed.
 */
export function Section({
  children,
  className = "",
  id,
  tone = "paper",
  pad = "normal",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "paper" | "deep";
  pad?: "tight" | "normal" | "loose";
}) {
  const tones = {
    paper: "bg-paper",
    deep: "bg-paper-deep",
  } as const;

  const pads = {
    tight: "py-16 md:py-20",
    normal: "py-20 md:py-24",
    loose: "py-24 md:py-32",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${pads[pad]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
