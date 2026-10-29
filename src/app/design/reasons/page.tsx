import type { ReactNode } from 'react';

import { Button, Icon, Layout, Section, type MediaImage } from '@/components';
import { getReasonFigure } from '@/content';
import { Reasons, type ReasonsItem } from '@/patterns';

import { Variation } from '../_specimen/Variation';
import t from '../_specimen/typeroles.module.css';

/**
 * /design/reasons — why choose the studio, as argued reasons each with a drawing of its claim
 * (why-us mocks rounds 1–4, owner 16 Oct 2026). Every arrangement with four reasons in a 2×2 (the
 * shape since 22 Oct 2026), the three- and six-reason rows that still fill whole rows, the longest
 * copy, the bare head, and the tint ground with its paper-deep figures; then the launch copy's Why
 * Tcules reasons with their own drawings (11–13, owner 29 Oct 2026). Sample words,
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

const all = (ground: 'paper' | 'paper-deep' = 'paper'): ReasonsItem[] =>
  WORDS.map((w) => ({ title: w.title, body: w.body, figure: figure(w.figure, ground) }));

/** The shape: four reasons, a 2×2. */
const items = (ground: 'paper' | 'paper-deep' = 'paper'): ReasonsItem[] =>
  all(ground).slice(0, 4);

/** The ceilings P48 sets: a five-word title of long words, a sentence of twenty words. */
const LONGEST: ReasonsItem[] = items().map((item, index) =>
  index % 2 === 0
    ? {
        ...item,
        title: 'Accountable seniority, discovery through deployment',
        body: 'The specialists who scope your engagement stay accountable for every decision, review and release until your product is live.',
      }
    : item,
);

const ACTION = (
  <Button
    as="a"
    href="#how-we-work"
    emphasis="link"
    size="md"
    icon={<Icon name="arrow-right" />}
  >
    How we work
  </Button>
);

/**
 * The launch copy's Why Tcules reasons (the 26 Oct copy, words exactly as authored), each drawn from
 * its own claim (scripts/illustrations/reasons.mjs) and resolved by title at the content seam.
 */
const COPY_REASONS: readonly (readonly [string, ReactNode])[] = [
  [
    'We work out what the product has to know before we draw it.',
    <>
      Our audit of Dealpath&rsquo;s deal-management software found that one action assumed every
      listing was a new deal, and our redesign changed that step.{' '}
      <a href="#dealpath">Read the Dealpath case</a>
    </>,
  ],
  [
    'We know what to leave alone in a product people rely on.',
    <>
      In Doodle&rsquo;s scheduling MVP, we reused the existing components for standard
      interactions and designed new ones only for calendar and bookability work.{' '}
      <a href="#doodle">Read the Doodle case</a>
    </>,
  ],
  [
    'We prove the hard parts in code while they can still change.',
    <>
      ConnectX&rsquo;s AI dashboard ran first as our coded demo on sample data, while the design
      could still change, and we then carried it into a production-ready module.{' '}
      <a href="#connectx">Read the ConnectX case</a>
    </>,
  ],
  [
    'One studio can take it into working software, with the designers staying in the build.',
    <>
      ConnectX&rsquo;s AI workspace went from our coded demo to a production-ready module, live
      since late 2025. <a href="#connectx">Read the ConnectX case</a>
    </>,
  ],
  [
    'We design AI that people can check and correct.',
    <>
      In the survey product we designed for Novus Insights, the AI drafts and the researcher
      decides, and a rewritten question keeps the AI&rsquo;s original visible beneath it.{' '}
      <a href="#novus">Read the Novus Insights case</a>
    </>,
  ],
  [
    'Senior people do the work, and clients keep us for years.',
    'Primelis brought us in as an ongoing partnership three years ago, and we have designed each of its products since.',
  ],
  [
    'We tell you what is really wrong.',
    <>
      At Dealpath, our audit placed the fault in a single assumption, that every listing becomes
      a new deal, and the redesign asks people to find the existing deal first.{' '}
      <a href="#dealpath">Read the Dealpath case</a>
    </>,
  ],
];

const HOME_REASONS: readonly (readonly [string, ReactNode])[] = [
  [
    'Products customers rely on',
    <>
      Enterprise scheduling for <a href="#doodle">Doodle</a>, the deal pipeline at{' '}
      <a href="#dealpath">Dealpath</a>, the print store and production system at{' '}
      <a href="#gold-image">Gold Image Printing</a> and search across hundreds of AI models at{' '}
      <a href="#eden-ai">Eden AI</a>.
    </>,
  ],
  [
    'AI that reached production',
    <>
      The AI dashboard we designed for ConnectX, first proved in a coded demo, has been live as
      a production-ready module since late 2025.{' '}
      <a href="#connectx">See how ConnectX got there</a>
    </>,
  ],
  [
    'Relationships that last',
    <>
      Primelis has worked with us for three years and <a href="#vovisto">Vovisto</a> since its
      first concept. Our work with Benchmark Gensuite has continued since the first coded
      prototypes.
    </>,
  ],
];

/** Reasons with their drawings, resolved by title at the content seam, on the given ground. */
const drawn = (
  rows: readonly (readonly [string, ReactNode])[],
  ground: 'paper' | 'paper-deep' = 'paper',
): ReasonsItem[] =>
  rows.map(([title, body]) => {
    const found = getReasonFigure(title, ground);
    if (!found) throw new Error(`No reason figure for "${title}"`);
    return { title, body, figure: { ...found, alt: '', kind: 'illustration' } };
  });

const WHY_LINKS = (
  <Button
    as="a"
    href="#why-tcules"
    emphasis="link"
    size="md"
    icon={<Icon name="arrow-right" />}
  >
    Why teams choose Tcules
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
            Why a buyer should choose the studio: argued reasons, each a title, one sentence and
            an isometric drawing of its claim from the ch05 kit, facing its words. Built for
            four, set 2×2. Each reason is the drawing above, then its title, then its body, at
            the full width of its track, and the head always reads across the top (owner, 29 Oct
            2026). Two ways to hold the set without boxing a reason: open (the gap scale alone)
            and boxed (the set in LogoGrid&rsquo;s rounded frame). Beside was retired on 29 Oct
            2026.
          </p>
        </Layout>
      </Section>

      <Variation
        id="open"
        title="1 · Open — four reasons 2×2, no rules (the default; home)"
        note="Mock S1, the set as home shows it. The gap scale draws the grid: column (64) between columns and rows. Each drawing heads its title and body, which take the track's full width. The head reads across with the action at the heading row's end, its top on the heading's first line, the eyebrow above. Two across from 768 (a 2×2), one below."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Four reasons teams stay."
        headingId="rsn-open"
        items={items()}
        action={ACTION}
      />

      <Variation
        id="engagement"
        title="1b · Ways to work with us — a body with links, and a closing note"
        note="The service pages' engagement options drawn as reasons (owner, 26 Oct 2026): four in a 2×2, each with its isometric figure (scripts/illustrations/engagement.mjs), a body that may carry a link, and `note` closing the set: the limit on the offer."
      />
      <Reasons
        heading="Ways to work with us"
        headingId="rsn-engagement"
        items={(
          [
            ['feature', 'A single workflow or feature.', 'One problem, solved properly.'],
            [
              'area',
              'A product area or a whole new product.',
              'From research to designs ready to build.',
            ],
            [
              'embedded',
              'A designer in your team.',
              'An experienced designer working in your tools and meetings.',
            ],
            ['build', 'Design and build.', null],
          ] as const
        ).map(([scope, title, body]) => ({
          title,
          body: body ?? (
            <>
              We design it, then our <a href="#build">engineering team</a> builds it.
            </>
          ),
          figure: {
            src: `/illustrations/engagement/${scope}.paper.svg`,
            width: 380,
            height: 379,
            alt: '',
            kind: 'illustration' as const,
          },
        }))}
        note={<p className={t.body}>We are at our best when there is real thinking to do.</p>}
      />

      <Variation
        id="boxed"
        title="2 · Boxed — the set in one rounded frame"
        note="Mock C2a, with LogoGrid's closed frame: cells ruled between, the outer edge drawn once with the photograph radius, each cell at the gutter inset. Four cells 2×2 from 1024. The frame holds the SET; no reason is a card."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Four reasons teams stay."
        headingId="rsn-boxed"
        items={items()}
        action={ACTION}
        arrangement="boxed"
      />

      <Variation
        id="longest"
        title="3 · The longest copy, open"
        note="Every other reason at P48's ceilings: a five-word title of long words and a twenty-word sentence. Still one fold at 1440."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Senior people, work that lands as code, and a number we answer to."
        headingId="rsn-longest"
        items={LONGEST}
        action={ACTION}
      />

      <Variation
        id="three"
        title="4 · Three reasons, open, no eyebrow"
        note="Another count that fills whole rows. Three in open go three across from 1024 and one column below it; in boxed, three across from 1440. Counts other than three, four or six warn in development."
      />
      <Reasons
        heading="Why teams pick a studio that ships."
        headingId="rsn-three"
        items={items().slice(0, 3)}
      />

      <Variation
        id="six-boxed"
        title="5 · Six reasons, boxed"
        note="The shape before 22 Oct 2026, still accepted because it fills whole rows: three across from 1440, two from 1024, the frame ruled for each count."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Six reasons teams stay."
        headingId="rsn-six-boxed"
        items={all()}
        action={ACTION}
        arrangement="boxed"
      />

      <Variation
        id="six-open"
        title="6 · Six reasons, open"
        note="Six in open: two across from 768, three from 1440, in two rows."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Senior people, work that lands as code, and a number we answer to."
        headingId="rsn-six-open"
        items={all()}
        action={ACTION}
      />

      <Variation
        id="bare"
        title="7 · Boxed, a bare head"
        note="No eyebrow, no tail, no action: the heading alone over the frame."
      />
      <Reasons heading="Why Tcules" headingId="rsn-bare" items={items()} arrangement="boxed" />

      <Variation
        id="tint"
        title="8 · Tint ground, open"
        note="Every --rsn-* token is restated on tint: the tail steps to neutral-600 and the rule to neutral-300. The figures are the paper-deep exports, so their occluding faces are the ground's own colour (§4a)."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Four reasons teams stay."
        headingId="rsn-tint"
        items={items('paper-deep')}
        action={ACTION}
        surface="tint"
      />

      <Variation
        id="tint-boxed"
        title="9 · Tint ground, boxed"
        note="The tint rule (neutral-300) on the frame and between the cells. Paper or tint only: the figures are exported for those two grounds, so `surface` takes no other."
      />
      <Reasons
        eyebrow="Why Tcules"
        heading="A studio built for what ships."
        headingTail="Four reasons teams stay."
        headingId="rsn-tint-boxed"
        items={items('paper-deep')}
        arrangement="boxed"
        surface="tint"
      />

      <Variation
        id="lead-open"
        title="10 · A lead, open"
        note="`lead`: the sentence that frames the set, under the heading at the lead role (component-map C1). Three items fill one row from 1024."
      />
      <Reasons
        heading="How we work together"
        headingId="rsn-lead-open"
        lead="Bring what you have: an idea, a prototype or a product with years behind it. Shaping the brief is part of the work, and our first conversation is about your product."
        items={items().slice(0, 3)}
        action={ACTION}
      />

      <Variation
        id="lead-two"
        title="11 · A lead of two paragraphs, with an action"
        note="A lead of two paragraphs is passed as nodes. The action sits at the end of the heading's row from 1024, its top on the heading's first line, never at the lead's foot; below 1024 it is a stack under the lead."
      />
      <Reasons
        heading="How we work together"
        headingId="rsn-lead-two"
        lead={
          <Layout rowGap="text">
            <p>
              Bring what you have: an idea, a hunch that something is wrong, a prototype or a
              product with ten years behind it.
            </p>
            <p>
              Shaping the brief is part of the work, and our first conversation is about your
              product.
            </p>
          </Layout>
        }
        items={items().slice(0, 3)}
        action={ACTION}
      />

      <Variation
        id="home-copy"
        title="12 · Home's three reasons, drawn"
        note="Home's Why Tcules as the 26 Oct copy authors it, each reason with its own drawing (scripts/illustrations/reasons.mjs, home set): every day's work running through the product; the feature proved in a coded demo and live in production; the same seat on the product as it grows, year on year."
      />
      <Reasons
        heading="A product design partner for ambitious SaaS teams"
        headingId="rsn-home-copy"
        items={drawn(HOME_REASONS)}
        action={WHY_LINKS}
      />

      <Variation
        id="offer-copy"
        title="13 · An offer page's three, drawn (FinTech: 1, 6, 4)"
        note="Each of the seven reasons the offer pages draw from has its own drawing (offer set, one world box): this is FinTech's selection."
      />
      <Reasons
        heading="Why teams choose Tcules"
        headingId="rsn-offer-copy"
        items={drawn([COPY_REASONS[0]!, COPY_REASONS[5]!, COPY_REASONS[3]!])}
        action={WHY_LINKS}
      />

      <Variation
        id="offer-rest"
        title="14 · The other four offer reasons (2, 3, 5, 7), open, on tint"
        note="So all seven offer drawings are in view: the part replaced in a product kept as it is; the hard part built in code across the seam from the open design; the AI answer held at a person's station before it counts; the problems on the screen traced down to one cause. Paper-deep exports on tint."
      />
      <Reasons
        heading="Why teams choose Tcules"
        headingId="rsn-offer-rest"
        items={drawn(
          [COPY_REASONS[1]!, COPY_REASONS[2]!, COPY_REASONS[4]!, COPY_REASONS[6]!],
          'paper-deep',
        )}
        surface="tint"
      />
    </>
  );
}
