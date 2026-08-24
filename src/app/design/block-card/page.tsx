import type { ComponentProps, ReactNode } from 'react';

import { Cluster, Layout, Section, type SectionSurface } from '@/components';
import { BlockCard, type BlockCardMedia } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const IMAGE = '/design/list-card-sample.svg';

const CARDS = [
  {
    title: 'Product direction',
    body: 'Frame the decision, the evidence it needs and the outcome a customer should notice.',
    media: { kind: 'icon', name: 'product-design' },
  },
  {
    title: 'Design systems',
    body: 'Turn recurring interface decisions into a shared, durable product language.',
    media: { kind: 'icon', name: 'design-systems' },
  },
  {
    title: 'Design engineering',
    body: 'Carry interaction intent into production with the implementation team.',
    media: { kind: 'icon', name: 'design-engineering' },
  },
  {
    title: 'AI product UX',
    body: 'Make model behaviour legible enough for people to judge and correct it.',
    media: { kind: 'icon', name: 'ai-product-ux' },
  },
] as const satisfies readonly { title: string; body: string; media: BlockCardMedia }[];

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'Neutral title, icon and body; a quiet neutral edge; and the 500 → 600 → 700 linked ramp.',
  },
  {
    surface: 'tint',
    note: 'The light-surface text ramps hold while the decorative edge steps to neutral-400.',
  },
  {
    surface: 'ink',
    note: 'Title and icon lift to white, body to neutral-300 and linked ink to 300 → 100 → 50.',
  },
  {
    surface: 'blue',
    note: 'White and the light Brandeis steps carry text, link states, edge and focus on blue.',
  },
] as const;

const NESTED_SURFACE_TOKENS = {
  tint: [
    ['--bcrd-title-ink', '--color-neutral-900'],
    ['--bcrd-body-ink', '--color-neutral-700'],
    ['--bcrd-media-ink', '--color-neutral-900'],
    ['--bcrd-link-ink', '--color-brandeis-500'],
    ['--bcrd-link-ink-hover', '--color-brandeis-600'],
    ['--bcrd-link-ink-pressed', '--color-brandeis-700'],
    ['--bcrd-edge-ink', '--color-neutral-400'],
    ['--bcrd-ring-color', '--color-brandeis-500'],
    ['--bcrd-ring-gap-color', '--color-paper-deep'],
  ],
  ink: [
    ['--bcrd-title-ink', '--color-white'],
    ['--bcrd-body-ink', '--color-neutral-300'],
    ['--bcrd-media-ink', '--color-white'],
    ['--bcrd-link-ink', '--color-brandeis-300'],
    ['--bcrd-link-ink-hover', '--color-brandeis-100'],
    ['--bcrd-link-ink-pressed', '--color-brandeis-50'],
    ['--bcrd-edge-ink', '--color-neutral-700'],
    ['--bcrd-ring-color', '--color-brandeis-300'],
    ['--bcrd-ring-gap-color', '--color-neutral-950'],
  ],
} as const;

type CardColumns = ComponentProps<typeof Layout>['columns'];

function Cards({
  columns = { base: 1, md: 2 },
  gap = true,
  children,
}: {
  columns?: CardColumns;
  gap?: boolean;
  children: ReactNode;
}) {
  return (
    <Layout
      as="ul"
      columns={columns}
      colGap={gap ? 'gutter' : 'none'}
      rowGap={gap ? 'gutter' : 'none'}
      equalRows
    >
      {children}
    </Layout>
  );
}

/** Identical three-card markup for every surface proof. */
function SurfaceCards() {
  return (
    <Cards columns={{ base: 1, lg: 3 }}>
      <BlockCard
        title="Static icon card"
        body="The title, icon, body and complete edge resolve without interactive ink."
        media={{ kind: 'icon', name: 'design-systems' }}
      />
      <BlockCard
        title="Static no-media card"
        body="Omitting media removes the slot and its seam; the bounded object stays complete."
      />
      <BlockCard
        title="Linked image card"
        body="One anchor resolves linked ink, cue, wipe and keyboard focus ring."
        media={{ kind: 'image', src: IMAGE, alt: '' }}
        href={ROUTES.caseStudies}
      />
    </Cards>
  );
}

function ResolvedTokens({ surface }: { surface: keyof typeof NESTED_SURFACE_TOKENS }) {
  return (
    <Layout as="dl" rowGap="tight">
      {NESTED_SURFACE_TOKENS[surface].map(([token, value]) => (
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

function ManyCards({ count }: { count: number }) {
  return (
    <Cards columns={{ base: 1, md: 2, xl: 4 }}>
      {Array.from({ length: count }, (_, index) => (
        <BlockCard
          key={index}
          title={`Card ${index + 1}`}
          body="The component does not clamp, paginate, count siblings or hide later rows."
          media={index % 3 === 0 ? { kind: 'icon', name: 'product-design' } : undefined}
        />
      ))}
    </Cards>
  );
}

export default function BlockCardSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>BlockCard</h1>
          <p>
            One edge-bounded tile in a semantic grid: title and body, optional icon or 3:2
            image, and a whole-card link with an automatic cue only when a destination exists.
            It has no fill and never decides its grid.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · Identity and finish</h2>
            <p>
              Both objects keep a complete four-sided hairline and expose the Section ground.
              This bounded tile is distinct from ListCard&rsquo;s single block-end row rule.
            </p>
          </Layout>
          <Cards>
            <BlockCard
              title="Static and complete"
              body="No destination means no anchor, cue, blank action row or interactive state."
            />
            <BlockCard
              title="Linked as one target"
              body="A non-blank destination adds one native anchor and its arrow cue."
              href={ROUTES.productDesign}
            />
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · Grid-count ladder</h2>
            <p>
              The parent states columns, gutter seams and equal rows; no card knows its count.
            </p>
          </Layout>
          <Specimen title="2 cards · md:2">
            <Cards>
              {CARDS.slice(0, 2).map((card) => (
                <BlockCard key={card.title} {...card} />
              ))}
            </Cards>
          </Specimen>
          <Specimen title="3 cards · md:2, lg:3">
            <Cards columns={{ base: 1, md: 2, lg: 3 }}>
              {CARDS.slice(0, 3).map((card) => (
                <BlockCard key={card.title} {...card} />
              ))}
            </Cards>
          </Specimen>
          <Specimen title="4 cards · md:2, xl:4">
            <Cards columns={{ base: 1, md: 2, xl: 4 }}>
              {CARDS.map((card) => (
                <BlockCard key={card.title} {...card} />
              ))}
            </Cards>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · Media fill ladder</h2>
            <p>
              Icon, image and absence fill one optional slot. Image is edge-to-edge above the
              content; icon sits inside the same inset as the copy.
            </p>
          </Layout>
          <Cards columns={{ base: 1, lg: 3 }}>
            <BlockCard
              title="Icon fill"
              body="A decorative xl glyph begins the inset content stack."
              media={{ kind: 'icon', name: 'ai-product-ux' }}
            />
            <BlockCard
              title="Image fill"
              body="The owned native image is a centred 3:2 cover crop above copy."
              media={{ kind: 'image', src: IMAGE, alt: 'Abstract product decision landscape' }}
            />
            <BlockCard
              title="Media omitted"
              body="No empty frame or placeholder remains when the optional slot is absent."
            />
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · Static majority and linked minority</h2>
            <p>Eight cards, exactly two links: six static objects remain visually complete.</p>
          </Layout>
          <Cards columns={{ base: 1, md: 2, xl: 4 }}>
            {Array.from({ length: 8 }, (_, index) => {
              const linked = index === 1 || index === 5;
              return (
                <BlockCard
                  key={index}
                  title={linked ? `Linked card ${index + 1}` : `Static card ${index + 1}`}
                  body="The same title, body, inset and edge hold whether or not navigation exists."
                  media={
                    index % 2 === 0 ? { kind: 'icon', name: 'design-engineering' } : undefined
                  }
                  href={linked ? ROUTES.designEngineering : undefined}
                />
              );
            })}
          </Cards>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>5 · States</h2>
            <p>
              Point at, hold and Tab to the linked image card. The block-end wipe is the only
              motion; pressed doubles it and keyboard focus adds the surface-aware two-part
              ring.
            </p>
          </Layout>
          <Cards columns={{ base: 1, md: 2 }}>
            <BlockCard
              title="Point, hold and Tab"
              body="Rest, hover, focus and pressed all come from this one native link."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
            <Layout rowGap="tight">
              {[
                ['rest', 'Quiet surrounding edge and rest link ink.'],
                ['hover', 'Hover ink and a hairline wipe across block end.'],
                ['focus', 'Hover rendering plus the keyboard-only two-part ring.'],
                ['pressed', 'Pressed ink and an instant two-hairline block-end edge.'],
              ].map(([state, note]) => (
                <Layout key={state} rowGap="inline">
                  <strong>{state}</strong>
                  <p>{note}</p>
                </Layout>
              ))}
            </Layout>
          </Cards>
        </Layout>
      </Section>

      {SURFACES.map(({ surface, note }, index) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <Layout rowGap="tight">
              {index === 0 ? <h2>6 · Four surfaces · identical markup</h2> : null}
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>{note}</p>
            </Layout>
            <SurfaceCards />
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>7 · Nested surfaces</h2>
            <p>
              The nearest surface resolves all nine colour tokens; no outer palette leaks in.
            </p>
          </Layout>
          <Section as="div" surface="tint" density="tight">
            <Layout columns={{ base: 1, lg: [2, 1] }} colGap="gutter" rowGap="block">
              <SurfaceCards />
              <ResolvedTokens surface="tint" />
            </Layout>
          </Section>
        </Layout>
      </Section>
      <Section>
        <Layout rowGap="stack">
          <p>The ink panel below is nested back inside paper and must invert in full.</p>
          <Section as="div" surface="ink" density="tight">
            <Layout columns={{ base: 1, lg: [2, 1] }} colGap="gutter" rowGap="block">
              <SurfaceCards />
              <ResolvedTokens surface="ink" />
            </Layout>
          </Section>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Equal-height challenge</h2>
            <p>
              The parent&rsquo;s <code>equalRows</code> makes every root and frame fill the row.
              Inspect their computed heights: all four must match despite the copy lengths.
            </p>
          </Layout>
          <Cards columns={{ base: 1, xl: 4 }}>
            <BlockCard title="One line" body="Short body." />
            <BlockCard title="A title intended to wrap across two lines" body="Short body." />
            <BlockCard
              title="A deliberately long card title that should occupy about five lines in the four-column track"
              body="Short body."
            />
            <BlockCard
              title="Long body"
              body="This longer paragraph challenges the shared row height with substantially more supporting copy while preserving the same inset, type, edge and natural wrapping behaviour."
            />
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Content edge cases</h2>
            <p>
              All thirteen section 12 cases are rendered or named where the API rejects them.
            </p>
          </Layout>

          <Specimen title="1 · Long title/body · 2 · unbroken URL">
            <Cards columns={{ base: 1, md: 2 }}>
              <BlockCard
                title="Interaction design for regulated products with several operational owners today."
                body="This long supporting paragraph keeps every part of the content visible while it explains the evidence, constraints, decision owners, handoffs and customer outcome that a service team must align before implementation begins without clamping."
              />
              <BlockCard
                title="Unbroken content"
                body="https://tcules.com/services/product-design/design-systems/a-single-unbroken-token-that-must-wrap-before-it-can-widen-the-page"
              />
            </Cards>
          </Specimen>

          <Specimen
            title="3 · Zero items"
            note="No ul is rendered inside this visible empty harness."
          >
            <Box>Caller omitted the empty grid.</Box>
          </Specimen>

          <Specimen title="4 · One item · 5 · sixteen items">
            <Layout rowGap="stack">
              <Cards columns={{ base: 1, md: 2, xl: 4 }}>
                <BlockCard
                  title="One item"
                  body="Its complete boundary remains visible alone."
                />
              </Cards>
              <ManyCards count={16} />
            </Layout>
          </Specimen>

          <Specimen
            title="6 · Omitted media and blank image source"
            note="Both remove the media element and seam; blank runtime src also warns in development."
          >
            <Cards>
              <BlockCard title="Media omitted" body="The content starts at the normal inset." />
              <BlockCard
                title="Blank image source"
                body="No broken image or placeholder frame remains."
                media={{ kind: 'image', src: '   ', alt: '' }}
              />
            </Cards>
          </Specimen>

          <Specimen
            title="7 · Blank title, body and href"
            note="Blank title returns null; blank body keeps the heading; blank href remains a static div without cue."
          >
            <Cards>
              <BlockCard title="   " body="This card must not render." />
              <BlockCard title="Body omitted" body="   " />
              <BlockCard title="Blank href is inert" body="No anchor or cue." href="   " />
            </Cards>
          </Specimen>

          <Specimen
            title="8 · Single track through 767 · 9 · unsized wrapping parent · 10 · logical placement"
            note="Narrow the viewport through 767. Image remains above copy, cue stays at inline end, and each li takes a complete line without physical left/right rules."
          >
            <Layout rowGap="block">
              <div className={s.trackSm}>
                <Cards columns={{ base: 1 }}>
                  <BlockCard
                    title="Narrow image card"
                    body="Copy wraps without changing the fixed content relationships."
                    media={{ kind: 'image', src: IMAGE, alt: '' }}
                    href={ROUTES.caseStudies}
                  />
                </Cards>
              </div>
              <Cluster as="ul" rowGap="block">
                <BlockCard
                  title="First complete line"
                  body="No explicit track sizes this item."
                />
                <BlockCard title="Second complete line" body="It wraps below the first." />
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen title="11 · Nested surface · 12 · zero-gap adjacent cards">
            <Section as="div" surface="ink" density="tight">
              <Cards columns={2} gap={false}>
                <BlockCard title="First bounded object" body="It keeps all four edges." />
                <BlockCard
                  title="Second bounded object"
                  body="The shared seam is two hairlines."
                />
              </Cards>
            </Section>
          </Specimen>

          <Specimen
            title="13 · Interactive slot — rejected"
            note="Title/body are strings and media is a closed union. The public type cannot accept a nested link, Button, control or arbitrary child."
          >
            <Box>One linked card means exactly one focus stop.</Box>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>10 · Four-card breakpoint proof</h2>
            <p>
              The same group is 2×2 at exactly 1439 and one row at 1440. Resize the viewport to
              both values and inspect the computed <code>grid-template-columns</code>.
            </p>
          </Layout>
          <Cards columns={{ base: 1, md: 2, xl: 4 }}>
            {CARDS.map((card) => (
              <BlockCard key={card.title} {...card} />
            ))}
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>11 · Narrow tracks</h2>
            <p>
              Icon, image and no-media cards at Layout&rsquo;s 256px and 192px track sizes. Text
              wraps, the image shrinks and the cue never collides or widens the page.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            {(
              [
                ['sm · 256px', s.trackSm],
                ['xs · 192px', s.trackXs],
              ] as const
            ).map(([label, className]) => (
              <Specimen key={label} title={label}>
                <div className={className}>
                  <Cards columns={{ base: 1 }}>
                    <BlockCard
                      title="Icon"
                      body="Compact subject copy."
                      media={{ kind: 'icon', name: 'product-design' }}
                    />
                    <BlockCard
                      title="Image link"
                      body="Compact linked copy."
                      media={{ kind: 'image', src: IMAGE, alt: '' }}
                      href={ROUTES.caseStudies}
                    />
                    <BlockCard title="No media" body="Compact text-only copy." />
                  </Cards>
                </div>
              </Specimen>
            ))}
          </Layout>
        </Layout>
      </Section>

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>12 · Heading map</h2>
            <p>H3 and h4 elements retain the same h4 visual type; only the outline changes.</p>
          </Layout>
          <Cards>
            <BlockCard titleAs="h3" title="H3 element" body="Directly below a section h2." />
            <BlockCard titleAs="h4" title="H4 element" body="Available below an h3 grouping." />
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>13 · Adjacent boundary</h2>
            <p>
              Zero gap deliberately shows two complete edges at the shared seam. The production
              composition follows with the required gutter, preserving two separate objects.
            </p>
          </Layout>
          <Specimen title="zero gap · stress only">
            <Cards columns={2} gap={false}>
              <BlockCard title="First card" body="Keeps its trailing edge." />
              <BlockCard title="Second card" body="Keeps its leading edge." />
            </Cards>
          </Specimen>
          <Specimen title="gutter · production">
            <Cards columns={2}>
              <BlockCard title="First card" body="Reads as one bounded tile." />
              <BlockCard title="Second card" body="Reads as another bounded tile." />
            </Cards>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="block">
          <h2>14 · What this static page cannot force</h2>
          <p>
            Hold the pointer for pressed, Tab for keyboard focus, test viewport widths 767, 1439
            and 1440 exactly, and enable reduced motion to make the edge wipe instant. None has
            a component prop; the absence is part of the contract.
          </p>
        </Layout>
      </Section>
    </>
  );
}
