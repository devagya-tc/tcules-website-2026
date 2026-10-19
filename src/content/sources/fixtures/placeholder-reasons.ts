/**
 * PLACEHOLDER — the reasons a "why us" band shows while the content team writes its own, keyed by
 * route.
 *
 * Home's "Why teams choose Tcules" is drawn as the Reasons pattern, `open` (owner, 19 Oct 2026). The
 * pattern holds three or six short reasons, each with an isometric drawing of its claim; the corpus
 * authors four longer reasons with quotes, which leave a gap row and have no drawings. These six are
 * the length guide from docs/content-proposals.md P48, with the drawings made for them, and they
 * are NOT proposed copy: the claims (week-one screens, metric tracking) need the content team's
 * sign-off. Read only through `getPlaceholderReasons` (source.ts).
 */
export type PlaceholderReasonsRef = {
  band: string;
  items: readonly { title: string; body: string; figure: keyof typeof FIGURES }[];
};

/** The six drawings on paper; the intrinsic sizes are the exported SVGs'. */
const FIGURES = {
  'same-people': [399, 359],
  'ships-as-code': [399, 356],
  'week-one': [420, 351],
  'the-number': [378, 358],
  'ai-trust': [420, 373],
  'system-kept': [383, 368],
} as const;

export const figureOf = (name: keyof typeof FIGURES) => ({
  src: `/illustrations/reasons/${name}.paper.svg`,
  width: FIGURES[name][0],
  height: FIGURES[name][1],
});

export const PLACEHOLDER_REASONS: Readonly<Record<string, PlaceholderReasonsRef>> = {
  '/': {
    band: 'why-tcules',
    items: [
      {
        title: 'Senior people, start to finish',
        body: 'The people in the pitch are the people on your product, through to launch day.',
        figure: 'same-people',
      },
      {
        title: 'Design that ships as code',
        body: 'Components and tokens your engineers can use, matching the file to the pixel.',
        figure: 'ships-as-code',
      },
      {
        title: 'Real screens in week one',
        body: 'Decisions start in the first five days, on screens you can click.',
        figure: 'week-one',
      },
      {
        title: 'Judged on the number',
        body: 'We agree the metric that matters first, and track it after launch.',
        figure: 'the-number',
      },
      {
        title: 'AI that people trust',
        body: 'AI features designed around what people check, accept and correct.',
        figure: 'ai-trust',
      },
      {
        title: 'A system your team keeps',
        body: 'A documented design system, so the product holds its shape after we leave.',
        figure: 'system-kept',
      },
    ],
  },
};
