/**
 * Brand assets.
 *
 * The Black Alumni Weekend logo is a real piece of artwork: the MSU wordmark
 * over a heavy condensed "BLACK ALUMNI" with "Weekend" set in a script face
 * (BillionDreams) that exists only inside that artwork. It is never
 * reconstructed in HTML, because a rebuilt lockup is a different logo.
 *
 * Drop the real files into /public/brand/ with these names and every usage
 * across the site picks them up at once. Until then, components fall back to
 * an accessible text lockup that is deliberately plain, so nobody mistakes it
 * for the finished brand.
 */

export type LogoVariant = "white" | "burgundy";

export const LOGO: Record<LogoVariant, { src: string; width: number; height: number }> = {
  // For dark grounds.
  white: { src: "/brand/baw-logo-white.png", width: 1323, height: 1001 },
  // For the light giving surface.
  burgundy: { src: "/brand/baw-logo-burgundy.png", width: 1323, height: 1001 },
};

/** The official Mississippi State bulldog mark, used once in the footer. */
export const BULLDOG = { src: "/brand/bulldog.svg", width: 512, height: 512 };

/**
 * Flip to true once the files above are actually in /public/brand/.
 * Keeping this explicit means a missing asset shows the honest fallback
 * instead of a broken image icon.
 */
export const LOGO_FILES_PRESENT = false;

/* ---------------------------------------------------------------------- */
/* Photography                                                            */
/* ---------------------------------------------------------------------- */

export type Photo = {
  /** Path under /public, e.g. /photos/baw26/hero.jpg */
  src: string;
  /** Required. Describe the moment, not the filename. */
  alt: string;
  width: number;
  height: number;
};

/**
 * Hero photography, in priority order. The first entry is the hero.
 *
 * Empty by design: the BAW26 gallery is token-gated, so its images cannot be
 * served publicly. Add files to /public/photos/ and list them here. While
 * this is empty the hero renders a designed dark field instead of a grey
 * placeholder pretending to be a photograph.
 */
export const HERO_PHOTOS: Photo[] = [];

/** Photographs used across the weekend archive, keyed by weekend slug. */
export const WEEKEND_PHOTOS: Record<string, Photo[]> = {
  "2026": [],
  "2024": [],
  "2022": [],
};

export const hasHero = HERO_PHOTOS.length > 0;
