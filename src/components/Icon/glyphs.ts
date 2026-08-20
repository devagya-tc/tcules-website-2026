/**
 * The glyph set — path data only, no components.
 *
 * Every glyph is drawn on a 24×24 box in the SOLID idiom: filled shapes in `currentColor`, no
 * stroke, and roughly 2px of clearance inside the box on each edge. That clearance is load-bearing
 * — it is the reason a button gives its icon 8px to the box edge where it gives its label 12 (see
 * tokens/components/button.css).
 *
 * Counters are cut out of the mass rather than drawn on top of it: the cross inside `close-circle`,
 * the lines inside `document-text`, the prompt inside `software-development`. Each of those glyphs
 * is ONE `d` string carrying several subpaths, and `Icon.module.css` sets `fill-rule: evenodd` so
 * the enclosed subpath knocks a hole through. A counter drawn as a second path in the ground colour
 * would only work on one surface, and the whole point of the set is that it works on four.
 *
 * ── Why these are drawn rather than imported ─────────────────────────────────────
 * These follow Solar's Bold conventions but are not Solar's paths, and that is a licence decision
 * rather than a stylistic one: Solar ships under CC BY 4.0, which carries an attribution
 * obligation. Drawing to the same conventions keeps this repo free of an icon dependency and of a
 * licence to track — conventions are not the artwork.
 *
 * If pixel-exact Solar paths are ever wanted, the move is a devDependency on
 * `@iconify-json/solar`, a build step that writes this file from the `*-bold` variants, and an
 * attribution line the site has to actually carry. A dev dependency, so the
 * three-runtime-dependency rule still holds, and nothing outside this file changes.
 *
 * Each entry is a list of `d` strings rather than mixed SVG elements, so the renderer is one
 * `<path>` map with no element switch. A circle is expressed as an arc pair for that reason.
 *
 * The set is deliberately small, and it grows only when a component names a glyph it cannot do
 * without. Adding one is a deliberate act — an icon set that grows by accident is how a system
 * ends up with four arrows. Three groups, and each one earned its place:
 *
 *   ACTIONS      the glyphs the button specification names, plus the two counterparts a set of
 *                navigation controls needs.
 *   DISCLOSURE   chevron, menu and close. A mega-menu trigger has to SAY it opens something and
 *                a drawer has to say it shuts, and neither claim can be made in words without
 *                putting two labels on one control.
 *   SUBJECTS     six marks, one per service. These are the only glyphs in the set that stand for
 *                a THING rather than an act, and they exist because the navigation panel gives
 *                each service a row of its own: at six rows in two columns, a mark is what lets
 *                the eye find "Design Systems" without reading all six labels. They are drawn to
 *                the same 24-box convention as the rest, so they are legible at 24 and hold at
 *                16 — no glyph here carries detail that only survives at native size.
 *
 * Note what is NOT here: brand marks. LinkedIn, YouTube and Clutch are trademarks with their own
 * usage rules and their own proportions — they are not drawn on this 24 box, they cannot be
 * redrawn to fit it without ceasing to be the mark, and each one carries its own permission to
 * check. The footer links to those profiles by name instead, which is also the accessible form.
 */
export const glyphs = {
  /* Movement. The trailing glyph on an action that changes where you are, and its mirror. A shaft
     and a head as two shapes: one closed outline around both would need eight collinear points
     kept in agreement by hand, and the union renders identically. */
  'arrow-right': ['M4 10.5h10a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3Z', 'M12.5 4.9 21.4 12l-8.9 7.1Z'],
  'arrow-left': ['M20 10.5H10a1.5 1.5 0 0 0 0 3h10a1.5 1.5 0 0 0 0-3Z', 'M11.5 4.9 2.6 12l8.9 7.1Z'],

  /* Named actions. A leading glyph says what KIND of action, never which direction it goes. */
  download: [
    'M12 2a1.5 1.5 0 0 1 1.5 1.5V10h-3V3.5A1.5 1.5 0 0 1 12 2Z',
    'M6.6 9h10.8L12 16.4Z',
    'M4 18.5h16a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3Z',
  ],
  /* The back plate is an L, not a square behind a square: two solid rounded squares that touch
     merge into one blob, and the 1.2 notch is the gap that keeps them two sheets. */
  copy: [
    'M5.5 2.5h6.5a3 3 0 0 1 3 3v2.3H7.8V15H5.5a3 3 0 0 1-3-3V5.5a3 3 0 0 1 3-3Z',
    'M12 9h6.5a3 3 0 0 1 3 3v6.5a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V12a3 3 0 0 1 3-3Z',
  ],
  /* Disc first, cross second, one `d`: the cross is a hole in the disc. Drawn as a single
     twelve-point polygon rather than two crossing bars, because two overlapping subpaths cancel
     each other at the crossing under evenodd and the centre fills back in. */
  'close-circle': [
    'M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20ZM15.15 7.23 16.77 8.85 13.63 12 16.77 15.15 15.15 16.77 12 13.63 8.85 16.77 7.23 15.15 10.37 12 7.23 8.85 8.85 7.23 12 10.37Z',
  ],
  /* A page with its top-right corner cut, and two lines knocked out of it. */
  'document-text': [
    'M7 2h6.2a2 2 0 0 1 1.42.59l5.79 5.8A2 2 0 0 1 21 9.8V19a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3ZM8 12.5a1.1 1.1 0 0 0 0 2.2h9a1.1 1.1 0 0 0 0-2.2Zm0 4.3a1.1 1.1 0 0 0 0 2.2h5.5a1.1 1.1 0 0 0 0-2.2Z',
  ],
  check: [
    'M9.6 19.3a1.6 1.6 0 0 1-1.14-.47l-5.3-5.3a1.6 1.6 0 0 1 2.27-2.27l4.17 4.17L19.5 5.5a1.6 1.6 0 0 1 2.28 2.25L10.75 18.83a1.6 1.6 0 0 1-1.15.47Z',
  ],

  /* Disclosure. A control that opens something says so with a chevron; a drawer that covers the
     page says so with a menu bar and takes it back with a cross. `chevron-down` rotates to point
     up when its panel is open rather than swapping to a second glyph — one mark, one meaning. */
  'chevron-down': [
    'M12 16.7a2 2 0 0 1-1.41-.59L4.3 9.83A2 2 0 0 1 7.13 7L12 11.87 16.87 7a2 2 0 0 1 2.83 2.83l-6.29 6.28a2 2 0 0 1-1.41.59Z',
  ],
  'chevron-right': [
    'M16.7 12a2 2 0 0 1-.59 1.41L9.83 19.7A2 2 0 0 1 7 16.87L11.87 12 7 7.13A2 2 0 0 1 9.83 4.3l6.28 6.29a2 2 0 0 1 .59 1.41Z',
  ],
  menu: [
    'M3.5 5h17a1.5 1.5 0 0 1 0 3h-17a1.5 1.5 0 0 1 0-3Z',
    'M3.5 10.5h17a1.5 1.5 0 0 1 0 3h-17a1.5 1.5 0 0 1 0-3Z',
    'M3.5 16h17a1.5 1.5 0 0 1 0 3h-17a1.5 1.5 0 0 1 0-3Z',
  ],
  close: [
    'M17.9 3.9 20.1 6.1 14.19 12 20.1 17.9 17.9 20.1 12 14.19 6.1 20.1 3.9 17.9 9.81 12 3.9 6.1 6.1 3.9 12 9.81Z',
  ],

  /* Subjects — one mark per service, for the navigation panel's rows. Each is a distinct
     silhouette at 16px, which is the whole test: two marks that read alike at row size are worse
     than none, because the eye stops trusting them. */

  /* An artboard on a stand, with a toolbar knocked out of it — the screen the work lands in. */
  'product-design': [
    'M5 3h14a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 19 16H5a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 5 3Zm.5 3.5v1.6h13V6.5Z',
    'M10.5 16h3v3.5h-3Z',
    'M7.5 19.5h9a1.25 1.25 0 0 1 0 2.5h-9a1.25 1.25 0 0 1 0-2.5Z',
  ],
  /* Two chevrons climbing. Forward, not merely again — and unmistakable against the single
     disclosure chevron, which is one mark pointing the other way. */
  modernisation: [
    'M12 3.6a2 2 0 0 1 1.42.59l5.6 5.6a2 2 0 0 1-2.83 2.83L12 8.43l-4.19 4.19a2 2 0 0 1-2.83-2.83l5.6-5.6A2 2 0 0 1 12 3.6Z',
    'M12 11a2 2 0 0 1 1.42.59l5.6 5.6a2 2 0 0 1-2.83 2.83L12 15.83l-4.19 4.19a2 2 0 0 1-2.83-2.83l5.6-5.6A2 2 0 0 1 12 11Z',
  ],
  /* Four equal tiles: parts that are interchangeable because they are the same part. */
  'design-systems': [
    'M4.5 2.5h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z',
    'M15.5 2.5h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z',
    'M4.5 13.5h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z',
    'M15.5 13.5h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z',
  ],
  /* Two sparks, unequal — the system's only glyph that means "generated". The quadratic control
     points sit 2.7 units off centre rather than 1.3: pulled further in, the waist thins the arms
     to hairlines and the mark reads as drawn in a different weight from every glyph beside it. */
  'ai-product-ux': [
    'M9.9 2.5Q12.6 7.2 17.3 9.9Q12.6 12.6 9.9 17.3Q7.2 12.6 2.5 9.9Q7.2 7.2 9.9 2.5Z',
    'M18.1 14.6Q19.38 16.82 21.6 18.1Q19.38 19.38 18.1 21.6Q16.82 19.38 14.6 18.1Q16.82 16.82 18.1 14.6Z',
  ],
  /* Brackets around a slash: a design decision written down as code. */
  'design-engineering': [
    'M9.2 4.9 2.2 12 9.2 19.1 9.2 15.4 6 12 9.2 8.6Z',
    'M14.8 4.9 21.8 12 14.8 19.1 14.8 15.4 18 12 14.8 8.6Z',
    'M14.97 3.86 11.77 20.66 9.03 20.14 12.23 3.34Z',
  ],
  /* A prompt in a window. Building the thing, not the picture of it. */
  'software-development': [
    'M5 3.5h14a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-11a3 3 0 0 1 3-3ZM7.4 9.3v1.8L9.1 12 7.4 12.9v1.8L11.9 12ZM13.5 13.2a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2Z',
  ],
} as const;

/** Every glyph in the set. The union, not `string` — a typo is a type error, not a blank box. */
export type IconName = keyof typeof glyphs;

/** Sorted, for the proving ground's index and for anything that needs to enumerate the set. */
export const iconNames = Object.keys(glyphs).sort() as IconName[];
