/**
 * The glyph set — path data only, no components.
 *
 * Every glyph is drawn on a 24×24 box in the Solar Linear idiom the button spec names: strokes
 * only, no fill, 1.5 units of weight, round caps and joins, and roughly 2px of clearance inside
 * the box on each edge. That clearance is load-bearing — it is the reason a button gives its
 * icon 8px to the box edge where it gives its label 12 (see tokens/components/button.css).
 *
 * These are drawn to Solar's conventions rather than extracted from the Solar package, so the
 * repo carries no icon dependency and no licence to track. If pixel-exact Solar paths are
 * wanted, the move is a devDependency on `@iconify-json/solar` and a build step that writes this
 * file — a dev dependency, so the three-runtime-dependency rule still holds, and nothing outside
 * this file changes.
 *
 * Each entry is a list of `d` strings rather than mixed SVG elements, so the renderer is one
 * `<path>` map with no element switch. A circle is expressed as an arc pair for that reason.
 *
 * The set is deliberately small: it is exactly the glyphs the button specification names, plus
 * the two counterparts a set of navigation controls needs. Adding one is a deliberate act — an
 * icon set that grows by accident is how a system ends up with four arrows.
 */
export const glyphs = {
  /* Movement. The trailing glyph on an action that changes where you are, and its mirror. */
  'arrow-right': ['M4 12h16', 'M14 6l6 6-6 6'],
  'arrow-left': ['M20 12H4', 'M10 18l-6-6 6-6'],

  /* Named actions. A leading glyph says what KIND of action, never which direction it goes. */
  download: ['M12 3v12', 'M8 11l4 4 4-4', 'M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2'],
  copy: [
    'M8 10a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9Z',
    'M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3',
  ],
  'close-circle': ['M21 12a9 9 0 1 1-18 0 9 9 0 1 1 18 0', 'M14.5 9.5l-5 5', 'M9.5 9.5l5 5'],
  'document-text': [
    'M5 6a3 3 0 0 1 3-3h5.5L19 8.5V18a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V6Z',
    'M13 3v4a2 2 0 0 0 2 2h4',
    'M9 13h6',
    'M9 17h4',
  ],
  check: ['M4.5 12.5l5 5L19.5 7'],
} as const;

/** Every glyph in the set. The union, not `string` — a typo is a type error, not a blank box. */
export type IconName = keyof typeof glyphs;

/** Sorted, for the proving ground's index and for anything that needs to enumerate the set. */
export const iconNames = Object.keys(glyphs).sort() as IconName[];
