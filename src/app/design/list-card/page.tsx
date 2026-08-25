import type { ReactNode } from 'react';

import { Cluster, Layout, Section, type SectionSurface } from '@/components';
import { ListCard, type ListCardMarker } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const THUMBNAIL = '/design/list-card-sample.svg';

const TERMS = [
  {
    title: 'Service blueprint',
    body: 'A shared view of the customer journey, the operational handoffs and the evidence each step produces.',
  },
  {
    title: 'Decision model',
    body: 'The smallest set of product rules a team needs to make the same call without another meeting.',
  },
  {
    title: 'Interaction contract',
    body: 'The states, language and response a control promises before visual treatment is added.',
  },
  {
    title: 'Evidence map',
    body: 'A record of which claims are measured, assumed or still waiting for a source.',
  },
  {
    title: 'Release slice',
    body: 'A coherent outcome small enough to ship and complete enough for a customer to judge.',
  },
] as const;

const SAMPLES = [
  'Recruit active customers',
  'Include recent cancellations',
  'Balance account sizes',
  'Separate buyers from users',
  'Cover assisted onboarding',
  'Include self-serve onboarding',
  'Represent support teams',
  'Find one failed rollout',
  'Find one successful rollout',
  'Include the longest-standing account',
  'Include a new account',
  'Reserve two replacements',
] as const;

const LINKED = [
  {
    title: 'Product design',
    body: 'Turn a difficult workflow into a product people can understand and operate.',
    href: ROUTES.productDesign,
    marker: { kind: 'icon', name: 'product-design' },
  },
  {
    title: 'Design systems',
    body: 'Build the decisions and reusable parts that keep a product coherent as it grows.',
    href: ROUTES.designSystems,
    marker: { kind: 'icon', name: 'design-systems' },
  },
  {
    title: 'Design engineering',
    body: 'Carry interaction decisions into production without losing their intent.',
    href: ROUTES.designEngineering,
    marker: { kind: 'icon', name: 'design-engineering' },
  },
] as const satisfies readonly {
  title: string;
  body: string;
  href: string;
  marker: ListCardMarker;
}[];

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'Neutral-900 title and marker, neutral-700 body, and a 500 → 600 → 700 ramp on the cue alone.',
  },
  {
    surface: 'tint',
    note: 'The text and cue ramps still pass unchanged; the decorative rule steps to neutral-400.',
  },
  {
    surface: 'ink',
    note: 'Title and marker lift to white, body to neutral-300, and the cue ramp lifts to 300 → 100 → 50.',
  },
  {
    surface: 'blue',
    note: 'Only the light end clears AA: cue 100 → white → 50, with a white focus ring against its blue gap.',
  },
] as const;

const NESTED_SURFACE_TOKENS = {
  tint: [
    ['--lcrd-title-ink', '--color-neutral-900'],
    ['--lcrd-body-ink', '--color-neutral-700'],
    ['--lcrd-marker-ink', '--color-neutral-900'],
    ['--lcrd-link-ink', '--color-brandeis-500'],
    ['--lcrd-link-ink-hover', '--color-brandeis-600'],
    ['--lcrd-link-ink-pressed', '--color-brandeis-700'],
    ['--lcrd-rule-ink', '--color-neutral-400'],
    ['--lcrd-ring-color', '--color-brandeis-500'],
    ['--lcrd-ring-gap-color', '--color-paper-deep'],
  ],
  ink: [
    ['--lcrd-title-ink', '--color-white'],
    ['--lcrd-body-ink', '--color-neutral-300'],
    ['--lcrd-marker-ink', '--color-white'],
    ['--lcrd-link-ink', '--color-brandeis-300'],
    ['--lcrd-link-ink-hover', '--color-brandeis-100'],
    ['--lcrd-link-ink-pressed', '--color-brandeis-50'],
    ['--lcrd-rule-ink', '--color-neutral-700'],
    ['--lcrd-ring-color', '--color-brandeis-300'],
    ['--lcrd-ring-gap-color', '--color-neutral-950'],
  ],
} as const;

function Rows({ ordered = false, children }: { ordered?: boolean; children: ReactNode }) {
  return (
    <Layout as={ordered ? 'ol' : 'ul'} rowGap="none">
      {children}
    </Layout>
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

/** Identical markup for the four-surface and nested-surface proofs. */
function SurfaceRows() {
  return (
    <Rows ordered>
      <ListCard
        arrangement="stacked"
        title="Define the decision before the interface"
        body="The static row proves title, body, number marker and base rule together."
        marker={{ kind: 'number', value: 1 }}
      />
      <ListCard
        title="Design systems"
        body="The linked row proves the dark title, icon marker, cue link ink and focus ring."
        marker={{ kind: 'icon', name: 'design-systems' }}
        href={ROUTES.designSystems}
      />
    </Rows>
  );
}

function SampleList({ count = 12 }: { count?: number }) {
  return (
    <Rows ordered>
      {Array.from({ length: count }, (_, index) => {
        const title = SAMPLES[index % SAMPLES.length] ?? 'Additional perspective';
        return (
          <ListCard
            key={`${index}-${title}`}
            arrangement="stacked"
            title={title}
            body="Recruit this perspective before synthesis so the sample does not silently optimise for the easiest people to reach."
            marker={{ kind: 'number', value: index + 1 }}
          />
        );
      })}
    </Rows>
  );
}

export default function ListCardSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="block">
          <h1>ListCard</h1>
          <p>
            One ruled row in a semantic list: a number, icon, thumbnail or no marker; one title
            and body; and an optional whole-row link. It carries three jobs on purpose — a step
            in a process, a clickable article or guide on a listing page, and an item in a plain
            content list — which is why the marker, the heading level and the link are all
            independently optional. The title stays dark whether the row navigates or not, and
            the row never paints a fill.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · Arrangement × size</h2>
            <p>
              Two arrangements, one md row size. The copy is identical so the title/body
              relationship is the only visible difference.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="gutter">
            <Specimen
              title="split × md"
              note="The default: a 2:3 title/body split from md, one track below it."
            >
              <Rows>
                <ListCard title={TERMS[0].title} body={TERMS[0].body} />
                <ListCard title={TERMS[1].title} body={TERMS[1].body} />
              </Rows>
            </Specimen>
            <Specimen
              title="stacked × md"
              note="The same record, with the lead-in attached above its sentence at every width."
            >
              <Rows>
                <ListCard arrangement="stacked" title={TERMS[0].title} body={TERMS[0].body} />
                <ListCard arrangement="stacked" title={TERMS[1].title} body={TERMS[1].body} />
              </Rows>
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · Marker fill ladder</h2>
            <p>
              Four fills of one optional marker slot — not variants and not four components.
            </p>
          </Layout>
          <Rows ordered>
            <ListCard
              arrangement="stacked"
              title="Number marker"
              body="A two-digit index orders the sequence without outweighing the title it indexes."
              marker={{ kind: 'number', value: 1 }}
            />
            <ListCard
              arrangement="stacked"
              title="Icon marker"
              body="The existing solid glyph is decorative because this title already names its subject."
              marker={{ kind: 'icon', name: 'ai-product-ux' }}
            />
            <ListCard
              arrangement="stacked"
              title="Thumbnail marker"
              body="ListCard owns this native image, its intrinsic dimensions and its fixed centre crop."
              marker={{
                kind: 'thumbnail',
                src: THUMBNAIL,
                alt: 'Abstract landscape of overlapping product decisions',
              }}
            />
            <ListCard
              arrangement="stacked"
              title="No marker"
              body="Omitting the slot also removes its 24px seam; content returns to inline start."
            />
          </Rows>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · Content shapes</h2>
            <p>Real ordered, term-like and linked groups, each using the same row component.</p>
          </Layout>
          <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="stack">
            <Specimen title="Numbered sequence · 5 rows">
              <Rows ordered>
                {SAMPLES.slice(0, 5).map((title, index) => (
                  <ListCard
                    key={title}
                    arrangement="stacked"
                    title={title}
                    body="Name the evidence and owner before the next step begins."
                    marker={{ kind: 'number', value: index + 1 }}
                  />
                ))}
              </Rows>
            </Specimen>
            <Specimen title="Term list · 5 rows">
              <Rows>
                {TERMS.map((term) => (
                  <ListCard key={term.title} title={term.title} body={term.body} />
                ))}
              </Rows>
            </Specimen>
            <Specimen
              title="Linked set · 3 rows"
              note="Each title is an h3 and the row is one link."
            >
              <Rows>
                {LINKED.map((item) => (
                  <ListCard key={item.title} {...item} titleAs="h3" />
                ))}
              </Rows>
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · States</h2>
            <p>
              The static row has rest only. Point at, hold and Tab to the linked row: the{' '}
              <strong>rule</strong> changes colour across the whole row and the{' '}
              <strong>cue</strong> changes with it, which is the point — the target is up to
              1240px wide, and one 18px arrow at the far end of it is not feedback anybody
              notices. Both are colour only: the rule&rsquo;s width never moves, nothing wipes
              and nothing transforms. Pressed steps the cue again. Focus adds the surface-aware
              two-part ring on top, so keyboard focus is never carried by colour alone.
            </p>
          </Layout>
          <Rows ordered>
            <ListCard
              arrangement="stacked"
              title="Static · rest only"
              body="This row is inert and never enters the tab order."
              marker={{ kind: 'number', value: 1 }}
            />
            <ListCard
              arrangement="stacked"
              title="Linked · point, hold and Tab"
              body="One native anchor owns the title, summary and arrow cue."
              marker={{ kind: 'icon', name: 'design-engineering' }}
              href={ROUTES.designEngineering}
            />
          </Rows>
          <Layout columns={{ base: 1, md: [1, 3] }} colGap="gutter" rowGap="tight">
            {[
              [
                'rest',
                'Dark h4 title, quiet numeral, quiet base hairline, cue at --lcrd-link-ink.',
              ],
              [
                'hover',
                'The rule steps to --lcrd-rule-ink-hover across the row; the cue steps too.',
              ],
              ['focus', 'Exactly the hover rendering plus the two-part keyboard ring.'],
              [
                'pressed',
                'The cue steps to --lcrd-link-ink-pressed; the rule holds its hover value.',
              ],
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
              {index === 0 ? <h2>5 · Four surfaces · identical markup</h2> : null}
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>{note}</p>
            </Layout>
            <SurfaceRows />
          </Layout>
        </Section>
      ))}

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>6 · Nested surfaces</h2>
            <p>
              The tint panel below resolves all nine ListCard colour tokens from itself; no ink
              value may leak through an omitted declaration.
            </p>
          </Layout>
          <Section as="div" surface="tint" density="tight">
            <Layout columns={{ base: 1, md: [2, 1] }} colGap="gutter" rowGap="block">
              <SurfaceRows />
              <ResolvedTokens surface="tint" />
            </Layout>
          </Section>
        </Layout>
      </Section>
      <Section>
        <Layout rowGap="stack">
          <p>The ink panel below is nested back inside paper and must invert in full.</p>
          <Section as="div" surface="ink" density="tight">
            <Layout columns={{ base: 1, md: [2, 1] }} colGap="gutter" rowGap="block">
              <SurfaceRows />
              <ResolvedTokens surface="ink" />
            </Layout>
          </Section>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>7 · Twelve-row sample-finding block</h2>
            <p>
              One full-width ordered list with zero row gap. Narrow through 767: title/body
              stacks, two-digit markers hold the left rhythm quietly and the rules keep one list
              intact.
            </p>
          </Layout>
          <SampleList />
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · Content edge cases</h2>
            <p>
              All thirteen required cases, rendered or named where invalid markup is rejected.
            </p>
          </Layout>

          <Specimen title="1 · Long title and body · 2 · one unbroken URL">
            <Rows>
              <ListCard
                title="Interaction and interface design for regulated financial products with several operational owners"
                body="The complete naming record is available at https://tcules.com/services/product-design/design-systems/a-single-unbroken-token-that-must-wrap-before-it-can-widen-the-page and the row grows rather than truncating either field."
                marker={{ kind: 'icon', name: 'product-design' }}
              />
            </Rows>
          </Specimen>

          <Specimen
            title="3 · Zero items"
            note="No ul or ol is rendered inside the outlined harness."
          >
            <Box>Caller omitted the empty list.</Box>
          </Specimen>

          <Specimen title="4 · One item · 5 · 24 items">
            <Layout rowGap="stack">
              <Rows>
                <ListCard title="One item" body="Its own bottom rule still renders." />
              </Rows>
              <SampleList count={24} />
            </Layout>
          </Specimen>

          <Specimen
            title="6 · Missing optional marker and blank thumbnail source"
            note="The first omits marker; the second exercises the runtime guard and warning. Neither leaves an empty frame."
          >
            <Rows>
              <ListCard title="Marker omitted" body="Content begins at inline start." />
              <ListCard
                title="Blank thumbnail source"
                body="The image marker collapses without a placeholder."
                marker={{ kind: 'thumbnail', src: '   ', alt: '' }}
              />
            </Rows>
          </Specimen>

          <Specimen
            title="7 · Empty required-ish text"
            note="The blank title returns null; blank body keeps the title; blank href stays static without a cue."
          >
            <Rows>
              <ListCard title="   " body="This row must not render." />
              <ListCard title="Body omitted" body="   " />
              <ListCard title="Blank href is inert" body="No anchor and no cue." href="   " />
            </Rows>
          </Specimen>

          <Specimen
            title="8 · 767 track · 9 · unsized parent · 10 · logical placement"
            note="Use block/inline edges only. The cue stays at inline end; a larger thumbnail wraps before the xs content core collapses. The second harness is a wrapping Cluster with no track width: each ListCard must still take one complete line."
          >
            <Layout rowGap="block">
              <div className={s.trackSm}>
                <Rows>
                  <ListCard
                    title="A thumbnail in a narrow parent"
                    body="The 160px image wraps above a core that keeps its readable minimum."
                    marker={{ kind: 'thumbnail', src: THUMBNAIL, alt: '' }}
                    href={ROUTES.caseStudies}
                  />
                </Rows>
              </div>
              <Cluster as="ul">
                <ListCard
                  title="First full-line row in a wrapping parent"
                  body="No explicit track sizes this item."
                />
                <ListCard
                  title="Second full-line row in a wrapping parent"
                  body="It starts on the next line instead of sharing the first."
                />
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen title="11 · Nested surface · 12 · adjacent rows">
            <Section as="div" surface="ink" density="tight">
              <Rows>
                <ListCard title="First adjacent row" body="One rule at the shared seam." />
                <ListCard title="Second adjacent row" body="One final rule at block end." />
              </Rows>
            </Section>
          </Specimen>

          <Specimen
            title="13 · Interactive content inside a slot — rejected"
            note="title/body are strings, icon/number are inert, and thumbnail exposes only src/alt. The public type has no place for a nested link, button or control."
          >
            <Box>One linked row means one focus stop.</Box>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>9 · Adjacent seam</h2>
            <p>Two rows, no parent gap, one line at their shared edge and one at the end.</p>
          </Layout>
          <Rows>
            <ListCard title="Evidence before opinion" body="Write down what is known." />
            <ListCard
              title="Decision before detail"
              body="Name the choice the work must make."
            />
          </Rows>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>10 · Narrow tracks</h2>
            <p>
              The same number, icon and linked thumbnail rows at Layout&rsquo;s sm and xs track
              widths. Markers wrap without widening the page; the content core can shrink below
              xs only when the parent itself is smaller.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            <Specimen title="sm · 256px">
              <div className={s.trackSm}>
                <Rows ordered>
                  <ListCard
                    arrangement="stacked"
                    title="Step"
                    body="Compact sequence copy."
                    marker={{ kind: 'number', value: 1 }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Icon"
                    body="Compact subject copy."
                    marker={{ kind: 'icon', name: 'product-design' }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Link"
                    body="A compact linked row."
                    marker={{ kind: 'thumbnail', src: THUMBNAIL, alt: '' }}
                    href={ROUTES.caseStudies}
                  />
                </Rows>
              </div>
            </Specimen>
            <Specimen title="xs · 192px">
              <div className={s.trackXs}>
                <Rows ordered>
                  <ListCard
                    arrangement="stacked"
                    title="Step"
                    body="Compact sequence copy."
                    marker={{ kind: 'number', value: 1 }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Icon"
                    body="Compact subject copy."
                    marker={{ kind: 'icon', name: 'product-design' }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Link"
                    body="A compact linked row."
                    marker={{ kind: 'thumbnail', src: THUMBNAIL, alt: '' }}
                    href={ROUTES.caseStudies}
                  />
                </Rows>
              </div>
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>11 · Heading map</h2>
            <p>Three elements, identical h5 visual role. Only the document outline changes.</p>
          </Layout>
          <Rows>
            <ListCard titleAs="span" title="Span title" body="Term-list default." />
            <ListCard titleAs="h3" title="H3 title" body="Direct child of this section h2." />
            <ListCard titleAs="h4" title="H4 title" body="Available beneath an h3 grouping." />
          </Rows>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="block">
          <h2>12 · What this static page cannot force</h2>
          <p>
            Hold the pointer for pressed, Tab for keyboard focus, and narrow through exactly 767
            for the split collapse. Reduced motion is no longer on the list: the rule wipe was
            the row&rsquo;s only transform and it is gone, so there is nothing left for the
            preference to shorten. None has a prop; the absence is part of the contract.
          </p>
        </Layout>
      </Section>
    </>
  );
}
