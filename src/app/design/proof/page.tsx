import { Cluster, Layout, Prose, Section, type SectionSurface } from '@/components';
import { CtaSection, EnquiryForm, Proof, type ProofFigure, type ProofQuote } from '@/patterns';
import { ENDPOINTS, ROUTES, UNRESOLVED_EXTERNAL } from '@/lib/routes';

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
    note: 'White leads, Brandeis-100 supports, and peridot appears only on the decorative quote rule.',
  },
] as const;

type TokenRows = readonly (readonly [string, string])[];

const PROOF_SURFACE_TOKENS = {
  paper: [
    ['--proof-quote-ink', '--color-neutral-800'],
    ['--proof-attribution-ink', '--color-neutral-600'],
    ['--proof-value-ink', '--color-neutral-950'],
    ['--proof-label-ink', '--color-neutral-700'],
    ['--proof-checked-ink', '--color-neutral-600'],
    ['--proof-quote-rule', '--color-brandeis-500'],
  ],
  tint: [
    ['--proof-quote-ink', '--color-neutral-800'],
    ['--proof-attribution-ink', '--color-neutral-700'],
    ['--proof-value-ink', '--color-neutral-950'],
    ['--proof-label-ink', '--color-neutral-800'],
    ['--proof-checked-ink', '--color-neutral-700'],
    ['--proof-quote-rule', '--color-brandeis-500'],
  ],
  ink: [
    ['--proof-quote-ink', '--color-white'],
    ['--proof-attribution-ink', '--color-neutral-400'],
    ['--proof-value-ink', '--color-white'],
    ['--proof-label-ink', '--color-neutral-400'],
    ['--proof-checked-ink', '--color-neutral-400'],
    ['--proof-quote-rule', '--color-brandeis-300'],
  ],
  blue: [
    ['--proof-quote-ink', '--color-white'],
    ['--proof-attribution-ink', '--color-brandeis-100'],
    ['--proof-value-ink', '--color-white'],
    ['--proof-label-ink', '--color-brandeis-100'],
    ['--proof-checked-ink', '--color-brandeis-100'],
    ['--proof-quote-rule', '--color-peridot-400'],
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

const CTA_FORM_PROPS = {
  action: `${ENDPOINTS.enquiryDesign}?outcome=success`,
  context: {
    originRoute: ROUTES.designProof,
    placement: 'proof-specimen',
    family: 'design-system',
    serviceOrAudit: 'proof',
    referrer: '',
    campaign: '',
  },
} as const;

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
              an ordinary checked figure, not a third component.
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
              Display remains h3 from one sentence through six. Compact uses the established
              quote composite; neither path sniffs length or clamps content.
            </p>
          </Layout>
          <Specimen title="display · one sentence" note="Resolved role: --text-h3">
            <Proof quote={ONE_SENTENCE_QUOTE} />
          </Specimen>
          <Specimen title="display · three sentences" note="Resolved role: --text-h3">
            <Proof quote={THREE_SENTENCE_QUOTE} />
          </Specimen>
          <Specimen title="display · six sentences" note="Resolved role: --text-h3">
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
              Values keep one stat role while tile tracks prevent a partial final row from
              stretching. Dates remain visible per item at every count.
            </p>
          </Layout>
          {([1, 2, 3, 4] as const).map((count) => (
            <Specimen key={count} title={`${count} figure${count === 1 ? '' : 's'}`}>
              <Proof figures={FIGURES.slice(0, count)} />
            </Specimen>
          ))}
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
            <Proof quote={ONE_SENTENCE_QUOTE} figures={FIGURES} />
            <ResolvedTokens tokens={PROOF_SURFACE_TOKENS[surface]} />
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Nested surfaces</h2>
            <p>
              Each inner surface redeclares all six Proof colours. Prose and Button
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
      {PROOF_SHAPES.map((shape) => (
        <CtaSection
          key={`split-${shape}`}
          eyebrow={`Split · ${shape}`}
          heading="Tell us what you are trying to ship"
          body={[
            'Bring the problem as it is. We will help decide what the work needs to become.',
          ]}
          points={[
            { label: 'A written plan' },
            { label: 'A named team' },
            { label: 'A delivery window' },
          ]}
          form={<EnquiryForm {...CTA_FORM_PROPS} />}
          scheduleHref={ROUTES.contact}
          proof={<ProofFixture shape={shape} />}
          surface="tint"
        />
      ))}
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
          {(['name', 'role', 'company'] as const).map((field) => (
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
              rather than collapsing to the intrinsic width of `4.8/5`.
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
            quote={LINK_QUOTE}
            figures={[{ ...FIGURES[0], sourceHref: UNRESOLVED_EXTERNAL }, FIGURES[3]]}
          />
          <p>
            Expected map: <code>figure → blockquote + figcaption</code>, then{' '}
            <code>ul → li + li</code>. Proof authors no role, tab index, live region, ARIA idref
            or generated ID.
          </p>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>15 · Portrait and logo provisions</h2>
            <p>
              Future media belongs immediately before the attribution text. This is an
              annotation, not a placeholder: the public type, DOM, CSS classes and token layer
              contain no image, portrait, avatar or logo part today.
            </p>
          </Layout>
          <Proof quote={ONE_SENTENCE_QUOTE} />
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>16 · Manual checks</h2>
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
