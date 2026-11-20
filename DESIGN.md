# DESIGN.md

## Concept

**Dark, cinematic, photographic.** The reference is the room the weekend
actually happens in: a dark hall, stage light, a crowd. The original site led
with a full-bleed shot of the DJ and the floor, and that energy is the brand's
real signature, not a university crest.

Everything here is sampled from the live site at msubaw.com rather than from
Mississippi State's general brand guide, which is why the burgundy is a wine
crimson rather than MSU's flatter maroon.

## Sampled from the original site

Measured off the live DOM, not guessed:

| Value | Where it came from |
|---|---|
| `#5A1725` | The brand burgundy, 11 uses across the live site |
| `#463939` | Warm dark neutral |
| `#333333` | Body text |
| `#000000` | Ground |
| Work Sans | Primary face, 105 uses |
| Space Grotesk | Secondary, 26 uses |
| Spectral | Serif accent, 10 uses |
| BillionDreams | Script, 6 uses. Lives **inside the logo artwork** |

## Theme

**Dark.** Scene sentence: an alumnus scrolling on a phone at night, two weeks
after the weekend, looking at photographs of a room they were standing in.
Light mode would turn an event brand into a brochure.

The one deliberate exception is the scholarship and giving surface, which goes
to warm bone. Money decisions deserve daylight, and the switch gives the page a
gear change instead of one unbroken wall of black.

## Color

Strategy: **Drenched**, then burgundy as the single accent. The surface *is*
the dark. Burgundy earns attention because almost nothing else is saturated.

All values OKLCH. Never `#000` or `#fff`: the blacks are tinted toward the
burgundy hue so photography sits in the page rather than on it.

| Role | Token | OKLCH | Use |
|---|---|---|---|
| Void | `--ink-void` | `oklch(13% 0.008 20)` | Page ground |
| Pitch | `--ink-pitch` | `oklch(17% 0.011 20)` | Raised surfaces |
| Slate | `--ink-slate` | `oklch(24% 0.013 22)` | Hairlines, wells |
| Burgundy | `--wine` | `oklch(32% 0.112 17)` | The brand red, `#5A1725` |
| Burgundy lit | `--wine-lit` | `oklch(47% 0.163 16)` | Links, focus, emphasis |
| Burgundy glow | `--wine-glow` | `oklch(62% 0.195 18)` | Rare, highest emphasis only |
| Chalk | `--chalk` | `oklch(97% 0.004 70)` | Primary text on dark |
| Ash | `--ash` | `oklch(72% 0.008 40)` | Secondary text on dark |
| Smoke | `--smoke` | `oklch(55% 0.009 35)` | Tertiary, labels |
| Bone | `--bone` | `oklch(96% 0.008 70)` | The light giving surface |

## Typography

- **Display: Space Grotesk.** Tight, slightly mechanical, modern. Set very
  large, very tight (-0.04em), uppercase for the biggest moments to echo the
  condensed weight of the logo lockup.
- **Body: Work Sans.** The site's own primary face.
- **Accent: Spectral italic**, used sparingly for pull quotes.

No script font is bundled. The BillionDreams script exists only inside the logo
artwork, so faking it in HTML would produce a second, wrong signature. If the
real font file arrives it can be added for display use.

## Imagery

Photography is the main character. Rules:

- Full-bleed where it can be, never boxed in a card.
- Always under a gradient scrim so text keeps contrast; never rely on the photo
  being dark enough on its own.
- `alt` text is mandatory and describes the moment, not the file.
- **No fake photographs.** Where images are missing, the layout uses a designed
  dark field plus the logo. It never ships grey boxes pretending to be photos.

## Motion

- Easing `cubic-bezier(0.16, 1, 0.3, 1)`.
- Reveal: opacity, `translateY(30px)`, `blur(8px)`, 0.8s, IntersectionObserver
  at threshold 0.2, `0px 0px -10% 0px`, once.
- Hero image holds a slow scale on scroll, transform only.
- Only `transform`, `opacity`, `filter`. Never a layout property, never
  `transition: all`.
- No infinite autoplay. Everything is scroll, hover or focus driven.
- `prefers-reduced-motion: reduce` disables all of it.

## Banned in this project

Gradient text, side-stripe accent borders, decorative glassmorphism, the
hero-metric template, identical card grids, em dashes in copy, emoji as
iconography, `#000` / `#fff`, and any logo substitute such as brand name set in
a coloured box.
