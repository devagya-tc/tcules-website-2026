import { Cluster, Layout, Prose, Section, type SectionSurface } from '@/components';
import {
  CtaSection,
  Proof,
  type ProofFigure,
  type ProofPortrait,
  type ProofQuote,
} from '@/patterns';
import { caseStudyPath, ROUTES, UNRESOLVED_EXTERNAL } from '@/lib/routes';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const ONE_SENTENCE_QUOTE = {
  quoteHtml:
    '<p>They turned a broad product problem into a sequence the whole team could act on.</p>',
  name: 'Ashok Mohanty',
  role: 'Founder',
  company: 'Auxentios',
} as const satisfies ProofQuote;

const THREE_SENTENCE_QUOTE = {
  ...ONE_SENTENCE_QUOTE,
  quoteHtml:
    '<p>They made the difficult parts visible early. Each review ended with a decision the team could carry forward. The result felt considered without slowing delivery.</p>',
} as const satisfies ProofQuote;

const SIX_SENTENCE_QUOTE = {
  ...ONE_SENTENCE_QUOTE,
  quoteHtml:
    '<p>We began with a workflow that had grown around years of exceptions. Tcules helped us separate the real customer need from the habits in the interface. They made the difficult parts visible early. Each review ended with a decision the team could carry forward. Our engineers understood why the sequence had changed, not only what to build. The result felt considered without slowing delivery.</p>',
} as const satisfies ProofQuote;

const LINK_QUOTE = {
  ...ONE_SENTENCE_QUOTE,
  quoteHtml: `<p>They turned a broad product problem into a sequence the whole team could act on. <a href="${ROUTES.caseStudies}">Read the case studies</a>.</p>`,
} as const satisfies ProofQuote;

/* ── Portrait and client-mark fixtures ─────────────────────────────────────────────────────────
   The people and clients below are FICTIONAL, and so are their marks (public/design/client-mark-*,
   drawn as stress files: -mid (3:1, Dunmere) and -wide (6:1, Aldermoor) for this route, -square
   for /design/client-mark). A real client's file from public/clients/ is never used here: a real
   logo under a fictional quote would be a fabricated attribution, specimen or not. -mid and -wide
   were referenced before they existed, so until 2.17 no mark on this route had ever rendered. The photograph is the brand chapter's stand-in portrait, reused
   for every speaker, so it is never attached to the real Auxentios quote above: a real client's
   name beside a stranger's face would be a fabricated attribution, specimen or not.

   It is the SQUARE crop of that stand-in. The file Media's specimen uses
   (photograph-portrait.png) is itself masked to a circle, which ch05 §6 forbids ("no photograph is
   masked to a circle"); ch10 hides the mask by scaling it 142% inside its box. This crop takes the
   inscribed square instead, so what Proof renders is what a real shoot would supply. */
const PORTRAIT = {
  src: '/design/media/photograph-portrait-square.png',
  width: 204,
  height: 204,
} as const satisfies ProofPortrait;

/* A master that is NOT square — a capture used as the stress case. Proof centre-crops it to 1:1 and
   warns in development; it is never letterboxed. */
const PORTRAIT_OFF_SQUARE = {
  src: '/design/media/capture-listing-652.jpg',
  width: 652,
  height: 401,
} as const satisfies ProofPortrait;

const DUNMERE_QUOTE = {
  quoteHtml:
    '<p>They showed us which half of the roadmap was habit, and we cut it in a week.</p>',
  name: 'Mira Castellan',
  role: 'Head of Product',
  company: 'Dunmere',
} as const satisfies ProofQuote;

const DUNMERE_SIX_SENTENCES = {
  ...DUNMERE_QUOTE,
  quoteHtml: SIX_SENTENCE_QUOTE.quoteHtml,
} as const satisfies ProofQuote;

const ALDERMOOR_QUOTE = {
  quoteHtml:
    '<p>Every review ended with a decision, and our engineers could see why the sequence changed.</p>',
  name: 'Tomasz Ellery',
  role: 'Engineering Lead',
  company: 'Aldermoor',
  portrait: PORTRAIT,
} as const satisfies ProofQuote;

const BRIGHTWELL_QUOTE = {
  quoteHtml:
    '<p>The work felt considered without ever slowing delivery. That is rarer than it sounds.</p>',
  name: 'Priya Anand-Whitcombe',
  company: 'Brightwell',
  portrait: PORTRAIT,
} as const satisfies ProofQuote;

/* The quote that stands alone, with the case it came from as a link in its attribution row. */
const SOURCED_QUOTE = {
  quoteHtml:
    '<p>The workflow between our teams was seamless. I found the team at Tcules to be knowledgeable, friendly and research oriented.</p>',
  name: 'Ashok Mohanty',
  company: 'Auxentios',
  portrait: PORTRAIT,
  source: { label: 'Read the Auxentios case study', href: caseStudyPath('auxentios') },
} as const satisfies ProofQuote;

const LONG_ATTRIBUTION_QUOTE = {
  ...DUNMERE_QUOTE,
  name: 'Maximiliana Oyelaran-Featherstonehaugh',
  role: 'Vice President, Customer Operations and Service Design, Europe, Middle East and Africa',
  company: 'Dunmere',
  portrait: PORTRAIT,
} as const satisfies ProofQuote;

/** With and without the portrait, on one fictional quote. (The client-mark half of this matrix
    was removed with the mark, 30 Sep 2026.) */
const MEDIA_MATRIX = [
  { title: 'text only', quote: DUNMERE_QUOTE },
  { title: 'portrait', quote: { ...DUNMERE_QUOTE, portrait: PORTRAIT } },
] as const satisfies readonly { title: string; quote: ProofQuote }[];

const FULL_QUOTE = MEDIA_MATRIX[1].quote;

const PHONE_ROWS = [
  { title: 'compact · portrait', quote: FULL_QUOTE, arrangement: 'compact' },
  {
    title: 'compact · long attribution',
    quote: LONG_ATTRIBUTION_QUOTE,
    arrangement: 'compact',
  },
  { title: 'display · quote', quote: FULL_QUOTE, arrangement: 'display' },
] as const;

const FIGURES = [
  {
    value: '90+',
    label: 'completed projects',
    checkedOn: 'checked on 8 August 2026',
  },
  {
    value: '19',
    label: 'countries with Tcules clients',
    checkedOn: 'checked on 8 August 2026',
  },
  {
    value: '12',
    label: '12 AI engagements',
    checkedOn: 'checked on 8 August 2026',
  },
  {
    value: '4.8/5',
    label: '4.8/5 Clutch rating',
    checkedOn: 'checked on 8 August 2026',
    sourceHref: UNRESOLVED_EXTERNAL,
  },
] as const satisfies readonly ProofFigure[];

/* Two dates in one set: the per-figure line comes back, because no single caption is true of all. */
const MIXED_DATE_FIGURES = [
  FIGURES[0],
  { ...FIGURES[1], checkedOn: 'checked on 2 September 2026' },
  FIGURES[3],
] as const satisfies readonly ProofFigure[];

const EIGHT_FIGURES = [
  ...FIGURES,
  ...FIGURES.map((figure) => ({
    ...figure,
    label: `second stress record · ${figure.label}`,
  })),
] as const satisfies readonly ProofFigure[];

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'Neutral-800 carries the long quote, neutral-950 carries audited values, and only the decorative rule uses Brandeis.',
  },
  {
    surface: 'tint',
    note: 'Quote and labels deepen against paper-deep while metadata remains quiet and above the normal-text floor.',
  },
  {
    surface: 'ink',
    note: 'Quote and value lift to white; neutral-400 supports attribution, label and checked date.',
  },
  {
    surface: 'blue',
    note: 'White leads, Brandeis-100 supports, and the quote rule is white (ch10 B2.07) — no longer peridot, which on the website is ::selection and an illustration’s carried item only.',
  },
] as const;

type TokenRows = readonly (readonly [string, string])[];

const PROOF_SURFACE_TOKENS = {
  paper: [
    ['--proof-quote-ink', '--color-neutral-800'],
    ['--proof-name-ink', '--color-neutral-900'],
    ['--proof-attribution-ink', '--color-neutral-600'],
    ['--proof-value-ink', '--color-neutral-950'],
    ['--proof-label-ink', '--color-neutral-700'],
    ['--proof-checked-ink', '--color-neutral-600'],
    ['--proof-quote-rule', '--color-brandeis-500'],
  ],
  tint: [
    ['--proof-quote-ink', '--color-neutral-800'],
    ['--proof-name-ink', '--color-neutral-900'],
    ['--proof-attribution-ink', '--color-neutral-700'],
    ['--proof-value-ink', '--color-neutral-950'],
    ['--proof-label-ink', '--color-neutral-800'],
    ['--proof-checked-ink', '--color-neutral-700'],
    ['--proof-quote-rule', '--color-brandeis-500'],
  ],
  ink: [
    ['--proof-quote-ink', '--color-white'],
    ['--proof-name-ink', '--color-white'],
    ['--proof-attribution-ink', '--color-neutral-400'],
    ['--proof-value-ink', '--color-white'],
    ['--proof-label-ink', '--color-neutral-400'],
    ['--proof-checked-ink', '--color-neutral-400'],
    ['--proof-quote-rule', '--color-brandeis-300'],
  ],
  blue: [
    ['--proof-quote-ink', '--color-white'],
    ['--proof-name-ink', '--color-white'],
    ['--proof-attribution-ink', '--color-brandeis-100'],
    ['--proof-value-ink', '--color-white'],
    ['--proof-label-ink', '--color-brandeis-100'],
    ['--proof-checked-ink', '--color-brandeis-100'],
    ['--proof-quote-rule', '--color-white'],
  ],
} as const satisfies Record<SectionSurface, TokenRows>;

const NESTED_INTERACTIVE_TOKENS = {
  tint: [
    ...PROOF_SURFACE_TOKENS.tint,
    ['--prose-link-ink', '--color-brandeis-500'],
    ['--prose-link-ink-hover', '--color-brandeis-600'],
    ['--prose-link-rule', '--color-brandeis-300'],
    ['--btn-link-neutral-fg', '--color-neutral-900'],
    ['--btn-link-neutral-fg-hover', '--color-brandeis-500'],
    ['--btn-link-neutral-fg-pressed', '--color-brandeis-600'],
  ],
  ink: [
    ...PROOF_SURFACE_TOKENS.ink,
    ['--prose-link-ink', '--color-brandeis-300'],
    ['--prose-link-ink-hover', '--color-brandeis-200'],
    ['--prose-link-rule', '--color-brandeis-400'],
    ['--btn-link-neutral-fg', '--color-white'],
    ['--btn-link-neutral-fg-hover', '--color-brandeis-300'],
    ['--btn-link-neutral-fg-pressed', '--color-brandeis-200'],
  ],
} as const satisfies Record<'tint' | 'ink', TokenRows>;

function ResolvedTokens({ tokens }: { tokens: TokenRows }) {
  return (
    <Layout as="dl" rowGap="tight">
      {tokens.map(([token, value]) => (
        <Cluster as="div" key={token} colGap="inline" rowGap="inline" align="baseline">
          <dt>
            <code>{token}</code>
          </dt>
          <dd>
            <code>{value}</code>
          </dd>
        </Cluster>
      ))}
    </Layout>
  );
}

const PROOF_SHAPES = ['quote', 'figures', 'combined'] as const;

function ProofFixture({ shape }: { shape: (typeof PROOF_SHAPES)[number] }) {
  if (shape === 'quote') return <Proof quote={ONE_SENTENCE_QUOTE} />;
  if (shape === 'figures') return <Proof figures={FIGURES.slice(0, 2)} />;
  return <Proof quote={ONE_SENTENCE_QUOTE} figures={FIGURES.slice(0, 2)} />;
}

export default function ProofSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>Proof</h1>
          <p>
            One evidence pattern with three display shapes: an attributed quotation, checked
            figures, or both. Compact is the embedded quote-only arrangement. Proof owns no
            ground; the nearest surface supplies it.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · Identity</h2>
            <p>
              This combined block is why Testimonial and Stat ship as one pattern. The rating is
              an ordinary checked figure, not a third component. From lg the quote leads in the
              wide track of a 2:1 and the figures stack beside it; below lg, one column.
            </p>
          </Layout>
          <Proof quote={THREE_SENTENCE_QUOTE} figures={FIGURES} />
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · Arrangement × size matrix</h2>
            <p>
              One size. Display accepts quote, figures, or both; compact accepts a quote only
              and embeds in a reading flow.
            </p>
          </Layout>
          <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack">
            <Specimen title="display · quote only">
              <Proof quote={ONE_SENTENCE_QUOTE} />
            </Specimen>
            <Specimen title="display · figures only">
              <Proof figures={FIGURES} />
            </Specimen>
            <Specimen title="display · combined">
              <Proof quote={ONE_SENTENCE_QUOTE} figures={FIGURES.slice(0, 2)} />
            </Specimen>
            <Specimen title="compact · quote only">
              <Proof arrangement="compact" quote={ONE_SENTENCE_QUOTE} />
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · Quote length ladder</h2>
            <p>
              Display is the large quote role, --text-quote-lg (34 / 28 / 22, italic in the
              composite), at the lead measure, from one sentence through six. Compact keeps the
              reading-flow quote composite (28 / 22); neither path sniffs length or clamps
              content. Size follows the quote&apos;s length and width, never its importance: a
              quote with the column to itself is display, a quote beside anything else is
              compact (1 Oct 2026).
            </p>
          </Layout>
          <Specimen
            title="display · with source"
            note="The case it came from, as a link beside the speaker. Wraps beneath at 390."
          >
            <Proof quote={SOURCED_QUOTE} />
          </Specimen>
          <Specimen title="display · one sentence" note="Resolved role: --text-quote-lg">
            <Proof quote={ONE_SENTENCE_QUOTE} />
          </Specimen>
          <Specimen title="display · three sentences" note="Resolved role: --text-quote-lg">
            <Proof quote={THREE_SENTENCE_QUOTE} />
          </Specimen>
          <Specimen title="display · six sentences" note="Resolved role: --text-quote-lg">
            <Proof quote={SIX_SENTENCE_QUOTE} />
          </Specimen>
          <Specimen title="compact · six sentences" note="Resolved role: --text-quote">
            <Proof arrangement="compact" quote={SIX_SENTENCE_QUOTE} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · Figure count ladder</h2>
            <p>
              Values keep one role, --text-stat-lg (54 / 43 / 40), while tile tracks prevent a
              partial final row from stretching. A date every figure shares is said once, as the
              set&apos;s caption; one figure keeps its own line, and mixed dates keep one each.
            </p>
          </Layout>
          {([1, 2, 3, 4] as const).map((count) => (
            <Specimen key={count} title={`${count} figure${count === 1 ? '' : 's'}`}>
              <Proof figures={FIGURES.slice(0, count)} />
            </Specimen>
          ))}
          <Specimen
            title="mixed dates · per-figure lines"
            note="Two dates in one set, so no caption is true of all three: each figure keeps its own."
          >
            <Proof figures={MIXED_DATE_FIGURES} />
          </Specimen>
          <Specimen
            title="8 figures · 2× expected"
            note="All records render; development warns."
          >
            <Proof figures={EIGHT_FIGURES} />
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>5 · Source treatment</h2>
            <p>
              The value stays static. The optional source is Button&apos;s neutral link
              treatment with a contextual accessible name and an extended 44px hit area. The
              unresolved external fixture is not a production URL.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="column" rowGap="stack">
            <Specimen title="without source">
              <Proof figures={[FIGURES[0]]} />
            </Specimen>
            <Specimen title="with source">
              <Proof figures={[FIGURES[3]]} />
            </Specimen>
          </Layout>
          <Specimen title="same destination used by a second record">
            <Proof figures={[{ ...FIGURES[0], sourceHref: UNRESOLVED_EXTERNAL }]} />
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>6 · States are delegated</h2>
            <p>
              Proof itself has only rest. Point, hold and Tab to the inline Prose link and the
              source Button below; those existing primitives own hover, pressed and keyboard
              focus, and no Proof prop forces them.
            </p>
          </Layout>
          <Proof quote={LINK_QUOTE} figures={[FIGURES[3]]} />
          <Layout columns={{ base: 1, md: [1, 3] }} colGap="gutter" rowGap="tight">
            {[
              ['rest', 'Static evidence ink and rule.'],
              ['hover', 'Delegated to Prose and Button links.'],
              ['focus', 'Delegated keyboard-only ring and link treatment.'],
              ['pressed', 'Delegated active treatment differs from hover.'],
            ].map(([state, note]) => (
              <div key={state}>
                <strong>{state}</strong>
                <p>{note}</p>
              </div>
            ))}
          </Layout>
        </Layout>
      </Section>

      {SURFACES.map(({ surface, note }, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <Layout rowGap="tight">
              {index === 0 ? <h2>7 · Four surfaces · identical markup</h2> : null}
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>{note}</p>
            </Layout>
            <Proof quote={FULL_QUOTE} figures={FIGURES} />
            <Proof arrangement="compact" quote={FULL_QUOTE} />
            <ResolvedTokens tokens={PROOF_SURFACE_TOKENS[surface]} />
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Nested surfaces</h2>
            <p>
              Each inner surface redeclares all seven Proof colours. Prose and Button
              independently resolve their complete palettes from the same nearest scope.
            </p>
          </Layout>
          <Section surface="tint" density="tight">
            <Layout columns={{ base: 1, lg: [2, 1] }} colGap="column" rowGap="stack">
              <Proof quote={LINK_QUOTE} figures={[FIGURES[0], FIGURES[3]]} />
              <ResolvedTokens tokens={NESTED_INTERACTIVE_TOKENS.tint} />
            </Layout>
          </Section>
        </Layout>
      </Section>
      <Section>
        <Section surface="ink" density="tight">
          <Layout columns={{ base: 1, lg: [2, 1] }} colGap="column" rowGap="stack">
            <Proof quote={LINK_QUOTE} figures={[FIGURES[0], FIGURES[3]]} />
            <ResolvedTokens tokens={NESTED_INTERACTIVE_TOKENS.ink} />
          </Layout>
        </Section>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Compact embedded in prose</h2>
            <p>
              The containing Layout owns both seams. Compact contributes no band or ground, so
              it reads as an interruption inside the argument rather than as a second section.
            </p>
          </Layout>
          <Layout rowGap="block">
            <Prose>
              <p>
                The team began by mapping where customer intent was being lost between
                configuration and checkout.
              </p>
            </Prose>
            <Proof arrangement="compact" quote={ONE_SENTENCE_QUOTE} />
            <Prose>
              <p>
                That evidence shaped the sequence of experiments that followed and the measures
                used to judge them.
              </p>
            </Prose>
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="block">
          <h2>10 · CTA contexts</h2>
          <p>
            CtaSection accepts Proof through its existing ReactNode seam. The patterns remain
            siblings and neither imports the other.
          </p>
        </Layout>
      </Section>
      {/* No split rows: CtaSection's split close refuses proof since cmp-cta fix round 1 (a close
          with the full form and a proof row ran past the 830 fold), so Proof meets the CTA family
          in the open close only. */}
      {PROOF_SHAPES.map((shape) => (
        <CtaSection
          key={`open-${shape}`}
          arrangement="open"
          eyebrow={`Open · ${shape}`}
          heading="Make the next decision with evidence"
          body={['Start with the outcome you need and the proof you already have.']}
          actions={[{ label: 'Start a project', href: ROUTES.contact }]}
          proof={<ProofFixture shape={shape} />}
          surface="ink"
        />
      ))}

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>11 · Long and invalid content</h2>
            <p>
              Long tokens wrap. Blank required fields remove only their own record, warn in
              development and leave no empty root when nothing valid remains.
            </p>
          </Layout>
          <Specimen title="long URL, attribution and figure fields">
            <Proof
              quote={{
                quoteHtml:
                  '<p>https://example.com/a-very-long-unbroken-evidence-path-that-must-wrap-without-widening-the-proof-track</p>',
                name: 'A very long client name that remains complete',
                role: 'Director of product strategy and service operations',
                company: 'A company with a deliberately long legal trading name',
              }}
              figures={[
                {
                  value: '123456789012345678901234567890',
                  label:
                    'A deliberately long audited figure label that remains complete inside its tile',
                  checkedOn:
                    'checked on a deliberately verbose evidence review date that remains visible',
                },
              ]}
            />
          </Specimen>
          <Specimen title="blank quote · no root">
            <Box>
              <Proof quote={{ ...ONE_SENTENCE_QUOTE, quoteHtml: '   ' }} />
              The Box is specimen chrome; the Proof above renders nothing.
            </Box>
          </Specimen>
          {(['name', 'company'] as const).map((field) => (
            <Specimen key={field} title={`blank ${field} · no root`}>
              <Box>
                <Proof quote={{ ...ONE_SENTENCE_QUOTE, [field]: ' ' }} />
                The Box is specimen chrome; the invalid quote above renders nothing.
              </Box>
            </Specimen>
          ))}
          {(['value', 'label', 'checkedOn'] as const).map((field) => (
            <Specimen key={field} title={`blank figure ${field} · valid neighbour remains`}>
              <Proof figures={[{ ...FIGURES[0], [field]: ' ' }, FIGURES[1]]} />
            </Specimen>
          ))}
          <Specimen title="zero figures · no root">
            <Box>
              <Proof figures={[]} />
              The Box is specimen chrome; the Proof above renders nothing.
            </Box>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>12 · Narrow and unsized parents</h2>
            <p>
              Display reflows through existing Layout tracks. The root fills a wrapping parent
              rather than collapsing to the intrinsic width of `4.8/5`. Known cost (spec §17
              Q13): the combined pair&apos;s 2:1 is breakpoint-driven, so at lg and above it
              holds even in these narrow tracks — shown as it is, for the owner to rule on.
            </p>
          </Layout>
          {[
            ['320px', s.narrowMd],
            ['256px', s.narrowSm],
            ['192px', s.trackXs],
          ].map(([label, className]) => (
            <Layout key={label} rowGap="block">
              <p className={s.specTitle}>{label} · combined and compact</p>
              <div className={className}>
                <Layout rowGap="stack">
                  <Proof quote={ONE_SENTENCE_QUOTE} figures={FIGURES.slice(0, 2)} />
                  <Proof arrangement="compact" quote={SIX_SENTENCE_QUOTE} />
                </Layout>
              </div>
            </Layout>
          ))}
          <Cluster colGap="text" rowGap="text">
            <Proof quote={ONE_SENTENCE_QUOTE} figures={FIGURES.slice(0, 2)} />
          </Cluster>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>13 · Adjacent Proof instances</h2>
            <p>
              The first pair uses the production stack relationship. The second is a zero-gap
              stress harness; neither Proof paints a joining panel or accidental separator.
            </p>
          </Layout>
          <Layout rowGap="stack">
            <Proof quote={ONE_SENTENCE_QUOTE} />
            <Proof figures={FIGURES.slice(0, 2)} />
          </Layout>
          <Layout rowGap="none">
            <Proof quote={ONE_SENTENCE_QUOTE} />
            <Proof figures={FIGURES.slice(0, 2)} />
          </Layout>
        </Layout>
      </Section>

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>14 · Semantics and focus order</h2>
            <p>
              Inspect one figure containing blockquote and figcaption, followed by a list of two
              checked figures. Tab order is the inline quote link, then two source links in
              figure order; Escape, Space and arrow navigation add no component behavior.
            </p>
          </Layout>
          <Proof
            quote={{ ...LINK_QUOTE, ...FULL_QUOTE, quoteHtml: LINK_QUOTE.quoteHtml }}
            figures={[{ ...FIGURES[0], sourceHref: UNRESOLVED_EXTERNAL }, FIGURES[3]]}
          />
          <p>
            Expected map: <code>figure → blockquote + figcaption</code>, then{' '}
            <code>ul → li + li</code>. Proof authors no role, tab index, live region, ARIA idref
            or generated ID. Its one ARIA attribute is <code>aria-hidden</code> on a client
            mark, which repeats the company already in the figcaption; the portrait is{' '}
            <code>alt=&quot;&quot;</code> for the same reason: it sits beside the name it shows.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>15 · Portrait</h2>
            <p>
              The site blockquote (ch10 B2.07): italic serif behind the 6px rule, attribution
              beneath. A portrait is small, 1:1 and radius 4 (on its own box: Media is told the
              placement rules the edge), flush on the left margin under the rule, with the name
              a bind to its right (ruling P1). Without one, the name is indented onto the
              quote&apos;s first letter and no gap is left. There is no client mark: it was
              removed on 30 Sep 2026, because the company is already named in the role line.
            </p>
          </Layout>
          <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack">
            {MEDIA_MATRIX.map(({ title, quote }) => (
              <Specimen key={`compact-${title}`} title={`compact · ${title}`}>
                <Proof arrangement="compact" quote={quote} />
              </Specimen>
            ))}
          </Layout>
          <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack">
            {MEDIA_MATRIX.map(({ title, quote }) => (
              <Specimen key={`display-${title}`} title={`display · ${title}`}>
                <Proof quote={quote} />
              </Specimen>
            ))}
          </Layout>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>16 · Attribution stress</h2>
            <p>
              Role is optional (strapi-changes.md entry 4): a missing or blank role leaves the
              company alone on the second line, with no stray comma. A long name and a long role
              wrap inside the text column beside the portrait and never push it narrower. A
              one-line quote and a six-sentence quote keep the same attribution geometry.
            </p>
          </Layout>
          <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack">
            <Specimen title="long name + long role · portrait">
              <Proof arrangement="compact" quote={LONG_ATTRIBUTION_QUOTE} />
            </Specimen>
            <Specimen title="missing role · portrait">
              <Proof arrangement="compact" quote={BRIGHTWELL_QUOTE} />
            </Specimen>
            <Specimen title="blank role string · text only">
              <Proof arrangement="compact" quote={{ ...DUNMERE_QUOTE, role: '  ' }} />
            </Specimen>
            <Specimen title="missing role · display">
              <Proof quote={BRIGHTWELL_QUOTE} />
            </Specimen>
            <Specimen title="one line · portrait">
              <Proof arrangement="compact" quote={FULL_QUOTE} />
            </Specimen>
            <Specimen title="six sentences · portrait">
              <Proof
                arrangement="compact"
                quote={{
                  ...DUNMERE_SIX_SENTENCES,
                  portrait: PORTRAIT,
                }}
              />
            </Specimen>
          </Layout>
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="stack">
            <Specimen
              title="off-square master"
              note="652 × 401. Centre-cropped to 1:1 and warned in development; never letterboxed, never a circle."
            >
              <Proof
                arrangement="compact"
                quote={{ ...DUNMERE_QUOTE, portrait: PORTRAIT_OFF_SQUARE }}
              />
            </Specimen>
            <Specimen
              title="blank portrait src"
              note="Omitted with a warning. The name returns to the indented position: no empty box."
            >
              <Proof
                arrangement="compact"
                quote={{ ...DUNMERE_QUOTE, portrait: { ...PORTRAIT, src: ' ' } }}
              />
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>17 · 326 · the phone column</h2>
            <p>
              The 390 viewport&apos;s content column (ch05 B3). The 64 portrait and its 24 bind
              leave the name a 238 measure; the long name and role wrap beside it rather than
              under it.
            </p>
          </Layout>
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="stack">
            {PHONE_ROWS.map(({ title, quote, arrangement }) => (
              <Layout key={title} rowGap="block">
                <p className={s.specTitle}>{title}</p>
                <div className={s.trackMobile}>
                  <Proof arrangement={arrangement} quote={quote} />
                </div>
              </Layout>
            ))}
          </Layout>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>18 · Testimonial group and stat group are compositions</h2>
            <p>
              Audit §4: a testimonial group is Proof compact × n in a Layout, and a stat group
              is Proof display with figures only. Neither is a variant or a new unit. Here three
              compact quotes share a <code>fit</code> Layout with a gutter between them; the
              marks are one colour, the ground&apos;s ink, because together they are a set (ch05
              §10).
            </p>
          </Layout>
          <Layout columns="fit" colGap="gutter" rowGap="stack">
            <Proof arrangement="compact" quote={FULL_QUOTE} />
            <Proof arrangement="compact" quote={ALDERMOOR_QUOTE} />
            <Proof arrangement="compact" quote={BRIGHTWELL_QUOTE} />
          </Layout>
          <Specimen title="stat group · Proof display, figures only">
            <Proof figures={FIGURES} />
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>19 · Manual checks</h2>
            <p>
              Resize through 1023 and 767, point and hold both link types, Tab and Shift+Tab
              through the semantic specimen, and enable reduced motion. Proof changes no type
              role or gap, adds no motion, and leaves delegated link transitions to their
              existing components.
            </p>
          </Layout>
          <Cluster colGap="text" rowGap="text">
            <a href={ROUTES.design}>Back to the proving ground</a>
            <a href={ROUTES.designCtaSection}>Review Proof inside CtaSection</a>
          </Cluster>
        </Layout>
      </Section>
    </>
  );
}
