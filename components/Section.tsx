import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  lede,
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  tone?: "dark" | "light";
}) {
  const accent = tone === "dark" ? "text-wine-glow" : "text-wine";
  const rule = tone === "dark" ? "bg-wine-glow" : "bg-wine";
  const head = tone === "dark" ? "text-chalk" : "text-umber";
  const body = tone === "dark" ? "text-ash" : "text-umber-soft";

  return (
    <div className="max-w-2xl">
      {eyebrow && (
        <Reveal className="flex items-center gap-4">
          <span className={`h-px w-10 ${rule}`} aria-hidden="true" />
          <p className={`eyebrow ${accent}`}>{eyebrow}</p>
        </Reveal>
      )}
      <Reveal
        as="h2"
        delay={70}
        className={`display-xl mt-6 text-[clamp(2rem,4.6vw,3.4rem)] ${head}`}
      >
        {title}
      </Reveal>
      {lede && (
        <Reveal as="p" delay={140} className={`measure mt-6 text-lg leading-relaxed ${body}`}>
          {lede}
        </Reveal>
      )}
    </div>
  );
}

/** Vertical rhythm is deliberately uneven across the page (see DESIGN.md). */
export function Section({
  children,
  className = "",
  id,
  tone = "void",
  pad = "normal",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "void" | "pitch" | "bone";
  pad?: "tight" | "normal" | "loose";
}) {
  const tones = {
    void: "bg-void",
    pitch: "bg-pitch",
    bone: "on-bone bg-bone text-umber-soft",
  } as const;

  const pads = {
    tight: "py-16 md:py-20",
    normal: "py-20 md:py-28",
    loose: "py-24 md:py-36",
  } as const;

  return (
    <section id={id} className={`${tones[tone]} ${pads[pad]} ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
