/**
 * The glyph set — path data only, no components.
 *
 * Every glyph is drawn on a 24×24 box in the SOLID idiom: filled shapes in `currentColor`, no
 * stroke, and roughly 2px of clearance inside the box on each edge. That clearance is load-bearing
 * — it is the reason a button gives its icon 8px to the box edge where it gives its label 12 (see
 * tokens/components/button.css).
 *
 * Counters are cut out of the mass rather than drawn on top of it: the cross inside `close-circle`,
 * the lines inside `document-text`, the mark inside `info-circle`. Each of those glyphs
 * is ONE `d` string carrying several subpaths, and `Icon.module.css` sets `fill-rule: evenodd` so
 * the enclosed subpath knocks a hole through. A counter drawn as a second path in the ground colour
 * would only work on one surface, and the whole point of the set is that it works on four.
 *
 * ── Two provenances, and which way the set is moving ────────────────────────────
 * The brand fixes the set as Solar Icons, Bold (DBF ch04 · Iconography): "never redraw, trace or
 * combine them". Solar Icons are by 480 Design and licensed CC BY 4.0, which carries an
 * attribution obligation; ch04 carries the credit, and the site owes one too.
 *
 *   SOLAR       `square-arrow-right-up`, `info-circle`, `danger-triangle`. Solar Bold's own path
 *               data, copied verbatim — `square-arrow-right-up` and `danger-triangle` as ch04
 *               embeds them, `info-circle` from `@iconify-json/solar` (`info-circle-bold`),
 *               because ch04's cell for it carries the check-circle path by mistake. Never
 *               hand-edit these; replace them from source.
 *   DRAWN       everything else. Drawn to Solar's Bold conventions before ch04 existed, so they
 *               are not Solar's artwork, and several sit under a different name from ch04's fixed
 *               choice for the same meaning (`chevron-down` / `alt-arrow-down`, `menu` /
 *               `hamburger-menu`, `check` / `check-circle`, `close` / `close-circle`). Moving
 *               each onto its ch04 glyph is a visual change at every call site, so it is done one
 *               meaning at a time with the call sites checked — not silently here.
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
 *   STATUS       ch04's "leaves the site", "information" and "warning" — the external-link cue a
 *                ListCard row and an off-site link need, and the two marks a notice leads with.
 *
 * Note what is no longer here: the six service marks (product design, modernisation, design
 * systems, AI product UX, design engineering, software development). They were drawn, not Solar,
 * and they were illustration jobs at icon scale — ch04 says anything above 64px, or more than one
 * element, is illustration, and that is chapter 05. Retired by ruling O1
 * (docs/phase-2-decisions.md); service lines get illustrations instead.
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
  'arrow-right': [
    'M4 10.5h10a1.5 1.5 0 0 1 0 3H4a1.5 1.5 0 0 1 0-3Z',
    'M12.5 4.9 21.4 12l-8.9 7.1Z',
  ],
  'arrow-left': [
    'M20 10.5H10a1.5 1.5 0 0 0 0 3h10a1.5 1.5 0 0 0 0-3Z',
    'M11.5 4.9 2.6 12l8.9 7.1Z',
  ],

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

  /* Status and leaving — Solar Bold's own paths, copied verbatim (see the header). One `d` each,
     the mark cut out of the mass under evenodd, like every counter in the set.

     `square-arrow-right-up` is ch04's "leaves the site": the trailing glyph on a link or a row
     whose destination is off tcules.com. `info-circle` is "information" and `danger-triangle`
     is "warning" — status marks, leading, beside the words that carry the meaning. */
  'square-arrow-right-up': [
    'M20.5355 20.5355C22 19.0711 22 16.714 22 12C22 7.28595 22 4.92893 20.5355 3.46447C19.0711 2 16.714 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355ZM14.8284 8.42157C15.2426 8.42157 15.5784 8.75736 15.5784 9.17157L15.5784 13.4142C15.5784 13.8284 15.2426 14.1642 14.8284 14.1642C14.4142 14.1642 14.0784 13.8284 14.0784 13.4142L14.0784 10.9822L9.7019 15.3588C9.40901 15.6517 8.93414 15.6517 8.64124 15.3588C8.34835 15.0659 8.34835 14.591 8.64124 14.2981L13.0178 9.92157H10.5858C10.1716 9.92157 9.83579 9.58579 9.83579 9.17157C9.83579 8.75736 10.1716 8.42157 10.5858 8.42157L14.8284 8.42157Z',
  ],
  'info-circle': [
    'M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z',
  ],
  'danger-triangle': [
    'M5.31171 10.7615C8.23007 5.58716 9.68925 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.31034 17.856 2.52291 15.7061 4.94805 11.4063L5.31171 10.7615ZM12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25ZM12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z',
  ],
} as const;

/** Every glyph in the set. The union, not `string` — a typo is a type error, not a blank box. */
export type IconName = keyof typeof glyphs;

/** Sorted, for the proving ground's index and for anything that needs to enumerate the set. */
export const iconNames = Object.keys(glyphs).sort() as IconName[];
