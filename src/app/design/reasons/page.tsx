import { Button, Icon, Layout, Section, type MediaImage } from '@/components';
import { Reasons, type ReasonsItem } from '@/patterns';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/reasons — why choose the studio, as argued reasons each with a drawing of its claim
 * (why-us mocks rounds 1–4, owner 16 Oct 2026). Every arrangement with six reasons (the shape), the
 * three-reason row, the bare head, and the tint ground with its paper-deep figures. Sample words,
 * written to the brief's lengths (a title of about five words, a sentence of about fourteen), so the
 * pattern is proven content-agnostic.
 */

/** The six drawings, each on both grounds; the intrinsic sizes are the exported SVGs'. */
const FIGURES = {
  'same-people': [399, 359],
  'ships-as-code': [399, 356],
  'week-one': [420, 351],
  'the-number': [378, 358],
  'ai-trust': [420, 373],
  'system-kept': [383, 368],
} as const;

type FigureName = keyof typeof FIGURES;

const figure = (name: FigureName, ground: 'paper' | 'paper-deep' = 'paper'): MediaImage => ({
  src: `/illustrations/reasons/${name}.${ground}.svg`,
  alt: '',
  width: FIGURES[name][0],
  height: FIGURES[name][1],
  kind: 'illustration',
});

const WORDS: { title: string; body: string; figure: FigureName }[] = [
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
];

const items = (ground: 'paper' | 'paper-deep' = 'paper'): ReasonsItem[] =>
  WORDS.map((w) => ({ title: w.title, body: w.body, figure: figure(w.figure, ground) }));

const ACTION = (
  <Button as="a" href="#how-we-work" emphasis="link" size="md" icon={<Icon name="arrow-right" />}>
    How we work
  </Button>
);

export default function ReasonsSpecimen() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <p className={t.eyebrow}>Pattern · tier 2</p>
          <h1>Reasons</h1>
          <p className={t.lead}>
            Why a buyer should choose the studio: argued reasons, each a title, one sentence and an
            isometric drawing of its claim from the ch05 kit, facing its words. Three ways to hold six
            of them without boxing a reason: open (the gap scale alone), boxed (the set in
            LogoGrid&rsquo;s rounded frame) and beside (the head in a third, rules between columns).
            Every arrangement fits one fold at 1440.
          </p>
        </Layout>
      </Section>

      <Variation
        id="open"
        title="1 · Open — six reasons, no rules (the default)"
        note="Mock S1. The gap scale draws the grid: column (64) between columns and rows. Each drawing sits beside its words, facing them; the head reads across with the action at its end. Three across from 1440, two from 1024, one below."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Six reasons teams stay."
        headingId="rsn-open"
        items={items()}
        action={ACTION}
      />

      <Variation
        id="boxed"
        title="2 · Boxed — the set in one rounded frame"
        note="Mock C2a, with LogoGrid's closed frame: cells ruled between, the outer edge drawn once with the photograph radius, each cell at the gutter inset. The frame holds the SET; no reason is a card."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Six reasons teams stay."
        headingId="rsn-boxed"
        items={items()}
        action={ACTION}
        arrangement="boxed"
      />

      <Variation
        id="beside"
        title="3 · Beside — the head in a third, rules between columns"
        note="Mock C2b. From 1440 a split (section, 96): the argued heading in the leading third with the action pinned to its foot; three across in the trailing two thirds, each drawing above its words, hairline verticals between the columns only. Below 1440 the head stacks above the set (three across from 768); below 768 each drawing returns beside its words."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Senior people, work that lands as code, and a number we answer to."
        headingId="rsn-beside"
        items={items()}
        action={ACTION}
        arrangement="beside"
      />

      <Variation
        id="three"
        title="4 · Three reasons, beside, no eyebrow"
        note="The other count that fills whole rows. Three in open or boxed go three across from 1440 and one column below it, so a two-up row never leaves a hole in the frame. Any other count warns in development."
      />
      <Reasons
        heading="Why teams pick a studio that ships."
        headingId="rsn-three"
        items={items().slice(0, 3)}
        arrangement="beside"
      />

      <Variation
        id="bare"
        title="5 · Boxed, a bare head"
        note="No eyebrow, no tail, no action: the heading alone over the frame."
      />
      <Reasons heading="Why Tcules" headingId="rsn-bare" items={items()} arrangement="boxed" />

      <Variation
        id="tint"
        title="6 · Tint ground, open"
        note="Every --rsn-* token is restated on tint: the tail steps to neutral-600 and the rule to neutral-300. The figures are the paper-deep exports, so their occluding faces are the ground's own colour (§4a)."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Six reasons teams stay."
        headingId="rsn-tint"
        items={items('paper-deep')}
        action={ACTION}
        surface="tint"
      />

      <Variation
        id="tint-boxed"
        title="7 · Tint ground, boxed"
        note="The tint rule (neutral-300) on the frame and between the cells. Paper or tint only: the figures are exported for those two grounds, so `surface` takes no other."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Six reasons teams stay."
        headingId="rsn-tint-boxed"
        items={items('paper-deep')}
        arrangement="boxed"
        surface="tint"
      />
    </>
  );
}
