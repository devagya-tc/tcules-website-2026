import styles from './BrandMark.module.css';

/**
 * The three third-party marks the footer draws: LinkedIn, YouTube, Clutch.
 *
 * ── Why these are not glyphs ────────────────────────────────────────────────────────────────────
 * `Icon` is for glyphs THIS system draws, on a 24-unit box, at one optical weight. These are
 * trademarks. Each is published by its owner at its own proportions — 122.88 × 122.31 for the
 * LinkedIn app icon, 640 × 640 for YouTube, 100 × 100 for Clutch — and redrawing one onto a
 * 24-unit box to make it a glyph would stop it being the mark, which is the whole reason the
 * footer used to spell the names out in words instead.
 *
 * So they live here, beside the one pattern that draws them, each keeping the viewBox its owner
 * published. Nothing is reshaped; the only edit is colour, below. If a second pattern ever needs
 * one, this file moves up a tier — it does not get flattened into the glyph set.
 *
 * ── Colour ─────────────────────────────────────────────────────────────────────────────────────
 * All three run MONOCHROME, on `currentColor`, so a mark inherits the link ink of wherever it
 * sits and inverts across all four surfaces without a second asset. That is a design decision
 * before it is a technical one: the directory is deliberately the quietest block in the footer,
 * two saturated brand colours in it would outweigh the primary CTA two bands above, and neither
 * YouTube red nor LinkedIn blue exists in the Tcules palette.
 *
 * LinkedIn is the app icon — a rounded tile with the wordmark knocked OUT of it — so it is the
 * one that needs two fills: the tile takes `currentColor`, the letters take the surface's own
 * ground. That is what makes a single asset invert correctly rather than becoming a solid block
 * on a dark surface. Clutch's published asset hardcodes `fill="white"`, which is invisible on
 * paper; it is stripped to `currentColor` here.
 *
 * Every one is `aria-hidden`. The accessible name is the word beside it — see SiteFooterSocial.
 */
export type BrandMarkName = 'linkedin' | 'youtube' | 'clutch';

/* viewBox per mark, as published. Not a shared box, on purpose — see the note above. */
const MARKS: Record<BrandMarkName, { viewBox: string; paths: { d: string; knockout?: boolean }[] }> =
  {
    linkedin: {
      viewBox: '0 0 122.88 122.31',
      paths: [
        {
          d: 'M27.75,0H95.13a27.83,27.83,0,0,1,27.75,27.75V94.57a27.83,27.83,0,0,1-27.75,27.74H27.75A27.83,27.83,0,0,1,0,94.57V27.75A27.83,27.83,0,0,1,27.75,0Z',
        },
        {
          d: 'M49.19,47.41H64.72v8h.22c2.17-3.88,7.45-8,15.34-8,16.39,0,19.42,10.2,19.42,23.47V98.94H83.51V74c0-5.71-.12-13.06-8.42-13.06s-9.72,6.21-9.72,12.65v25.4H49.19V47.41ZM40,31.79a8.42,8.42,0,1,1-8.42-8.42A8.43,8.43,0,0,1,40,31.79ZM23.18,47.41H40V98.94H23.18V47.41Z',
          knockout: true,
        },
      ],
    },
    youtube: {
      viewBox: '0 0 640 640',
      paths: [
        /* One path. Its own fill-rule knocks the play triangle out of the rounded rectangle, which
           is why this needs no second fill and no knockout — keep the rule. */
        {
          d: 'M633.468 192.038s-6.248-44.115-25.477-63.485c-24.366-25.477-51.65-25.642-64.123-27.118-89.493-6.52-223.904-6.52-223.904-6.52h-.236s-134.352 0-223.893 6.52c-12.52 1.523-39.768 1.63-64.123 27.118-19.24 19.37-25.358 63.485-25.358 63.485S-.012 243.806-.012 295.681v48.509c0 51.768 6.366 103.643 6.366 103.643s6.248 44.114 25.358 63.52c24.355 25.477 56.363 24.65 70.655 27.367 51.237 4.89 217.644 6.366 217.644 6.366s134.529-.237 224.022-6.638c12.52-1.477 39.756-1.63 64.123-27.119 19.24-19.37 25.476-63.532 25.476-63.532S640 396.03 640 344.154v-48.508c-.13-51.769-6.497-103.643-6.497-103.643l-.035.035zm-379.8 211.007V223.173L426.56 313.41l-172.892 89.635z',
        },
      ],
    },
    clutch: {
      viewBox: '0 0 100 100',
      paths: [
        {
          d: 'M54.9241 66.8276C64.1857 66.8276 71.6937 59.3195 71.6937 50.0579C71.6937 40.7963 64.1857 33.2883 54.9241 33.2883C45.6625 33.2883 38.1544 40.7963 38.1544 50.0579C38.1544 59.3195 45.6625 66.8276 54.9241 66.8276Z',
        },
        {
          d: 'M74.8459 70.8624C69.8024 75.4015 63.1197 77.9233 55.8067 77.9233C52.0915 78.0285 48.3941 77.3722 44.942 75.9948C41.49 74.6173 38.3565 72.5479 35.7343 69.9139C33.1121 67.2799 31.0568 64.1371 29.6949 60.6789C28.333 57.2208 27.6933 53.5204 27.8153 49.8057C27.8153 33.5405 39.2892 22.1926 55.8067 22.1926C62.9937 22.1926 69.8024 24.5882 74.972 29.1274L78.5024 32.1535L94.1373 16.5186L90.2286 12.9882C80.7604 4.54325 68.4935 -0.0848946 55.8067 0.00117936C26.8065 0.00117936 5.74995 20.9317 5.74995 49.6797C5.59587 56.3071 6.7834 62.8973 9.24121 69.0541C11.699 75.2109 15.3764 80.8071 20.0522 85.5065C24.7279 90.2058 30.3057 93.9113 36.45 96.4C42.5944 98.8887 49.1785 100.109 55.8067 99.9886C69.0459 99.9886 81.4024 95.3233 90.4807 86.8755L94.2634 83.345L78.3763 67.7102L74.8459 70.8624Z',
        },
      ],
    },
  };

export function BrandMark({ name }: { name: BrandMarkName }) {
  const mark = MARKS[name];
  return (
    <svg
      className={styles.mark}
      viewBox={mark.viewBox}
      fillRule="evenodd"
      clipRule="evenodd"
      aria-hidden="true"
      focusable="false"
    >
      {mark.paths.map((path) => (
        <path key={path.d} className={path.knockout ? styles.knockout : undefined} d={path.d} />
      ))}
    </svg>
  );
}
