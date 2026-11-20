# DESIGN.md

## Concept

**A commemorative letterpress programme.** The visual reference is a well-made
printed programme or playbill for a sixtieth-anniversary event: maroon ink on
warm paper stock, a slab serif with weight and history, hairline rules dividing
sections, numerals used as structure rather than ornament.

This was chosen to dodge three reflexes: the crest-and-stock-photo university
site, the Afrocentric-template site, and the giant-serif editorial site.

## Theme

**Light.** Scene sentence: a 54-year-old alumna in Atlanta opens this on her
phone at lunch, deciding whether to fly to Starkville in February and whether to
write a cheque. Daylight, skim-reading, trust matters. Dark mode would read as a
developer tool and undercut the commemorative register.

## Color

Strategy: **Committed.** Maroon carries 30 to 60% of the surface. Not a tinted
neutral with one accent.

All values OKLCH. No `#000`, no `#fff`; every neutral is tinted toward the
maroon hue (~29deg) so the paper reads warm rather than clinical.

| Role | Token | OKLCH | Use |
|---|---|---|---|
| Paper | `--paper` | `oklch(98.4% 0.006 62)` | Default background |
| Paper, deep | `--paper-deep` | `oklch(96.2% 0.010 64)` | Alternating sections |
| Paper, edge | `--paper-edge` | `oklch(91% 0.013 58)` | Hairline rules, borders |
| Ink | `--ink` | `oklch(23% 0.015 32)` | Body text |
| Ink, soft | `--ink-soft` | `oklch(44% 0.014 34)` | Secondary text |
| Maroon | `--maroon` | `oklch(31% 0.128 29)` | MSU maroon. Primary surface |
| Maroon, deep | `--maroon-deep` | `oklch(23% 0.098 29)` | Hero ground |
| Maroon, lit | `--maroon-lit` | `oklch(44% 0.158 26)` | Links, emphasis on paper |
| Brass | `--brass` | `oklch(77% 0.108 76)` | Accent on maroon only |
| Chalk | `--chalk` | `oklch(97.5% 0.008 70)` | Text on maroon |

Brass never appears on paper, only on maroon. That restriction keeps it feeling
like foil stamping rather than a highlighter.

## Typography

- **Display: Besley** (variable, self-hosted). A Clarendon-style slab serif.
  Carries the letterpress reference and has enough weight for commemorative
  headings. Explicitly *not* Inter, Roboto, Arial, Fraunces or system-ui.
- **Body: Instrument Sans** (variable, self-hosted). Clean, slightly
  idiosyncratic, legible at 17px on a phone.

Scale is fluid via `clamp()`. Step ratio ≥ 1.25. Display-to-body contrast at the
hero reaches roughly 4.5x.

Body measure capped at 68ch. `text-wrap: pretty` on prose, `balance` on
headings. Tabular numerals wherever figures are compared.

## Spacing

Base unit 4px. Section rhythm is deliberately uneven: 80px / 112px / 96px rather
than a uniform pad, so the page has cadence instead of monotony.

## Rules over cards

Cards are used sparingly. Sections are divided by **hairline rules**
(`--paper-edge`, 1px) in the manner of a printed programme. There are no nested
cards anywhere, and no repeated icon-heading-text grids.

## Elevation

Mostly flat. Where elevation is needed, layered shadows:
`0 1px 2px / 0 8px 24px` at low alpha, tinted with the maroon hue rather than
neutral black.

## Motion

- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out-expo). No bounce, no elastic.
- Scroll reveal: opacity 0 to 1, `translateY(30px)` to 0, `blur(8px)` to 0, over
  0.8s. Triggered by IntersectionObserver at threshold 0.2 with rootMargin
  `0px 0px -10% 0px`, firing once.
- Only `transform`, `opacity` and `filter` are animated. Never a layout
  property. Never `transition: all`.
- **No infinite autoplay motion.** Background washes are static; all movement is
  user-initiated (scroll, hover, focus).
- `prefers-reduced-motion: reduce` disables transitions and reveals entirely and
  shows all content at rest.

## Banned in this project

Gradient text (`background-clip: text`), side-stripe accent borders, decorative
glassmorphism, the hero-metric template, identical card grids, em dashes in
copy, emoji as iconography, `#000` / `#fff`.
