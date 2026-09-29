import type { ReactNode } from 'react';

import { Cluster, Layout, Section, type MediaImage, type SectionSurface } from '@/components';
import { ListCard, type ListCardMarker } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

/* ── Thumbnail records ────────────────────────────────────────────────────────────
   Whole `MediaImage` records, the shape a page receives from `@/content`. The kind is the record's,
   and Media draws the edge from it; ListCard only owns the 160 × 3:2 box. The assets are the brand
   framework's own (the Media specimen's set), not 2560 masters — this proves the mechanism. */

/* One part, no panel: a single workflow node whose own edge holds against the light grounds. The
   ch05 § 9 case for a case-study thumbnail. Portrait, so the 3:2 fill crops it top and bottom —
   which is what the central-safe-area supply rule is for. */
const CUT_OUT: MediaImage = {
  src: '/design/media/cutout-node.png',
  alt: 'One workflow node: an AI feature card with a provider field.',
  width: 902,
  height: 1088,
  kind: 'cut-out',
};

/* A light-UI part whose pale edge does not hold 3:1 against paper — the B5 case, on a panel. It is
   3:2 already, so the crop takes nothing and only the inset decides what is left of it. */
const PANEL_PART: MediaImage = {
  src: '/design/media/cutout-reviews.png',
  alt: 'Review-analysis panel: user reviews summarised as benefit chips.',
  width: 855,
  height: 570,
  kind: 'cut-out',
  panel: 'paper-deep',
};

/* One illustration shape: never boxed, never on blue (ch05 § 4a). The insight/resource case. */
const ILLUSTRATION: MediaImage = {
  src: '/design/media/illustration-seam.svg',
  alt: '',
  width: 881,
  height: 544,
  kind: 'illustration',
};

/* A capture, with derived widths, so its srcset has the 320 rung a 160 `sizes` asks for at 2×.
   OFF-BRAND at this size — a whole screen is a flat capture at full column only (ch05 § 2), and § 9
   gives the thumbnail no edge — rendered so the hairline M3 gives it is visible, not hidden. */
const CAPTURE: MediaImage = {
  src: '/design/media/capture-listing.webp',
  alt: 'Listing editor with bullet fields and an assistance panel.',
  width: 1436,
  height: 883,
  kind: 'capture',
  sources: [320, 652, 1240].map((width) => ({
    src: `/design/media/capture-listing-${width}.jpg`,
    width,
  })),
};

/* No kind: what every record is until Strapi records one (strapi-changes.md 3). Renders as a
   capture (M3), hairline and all — the same off-brand edge as above, arriving by default. */
const KINDLESS: MediaImage = {
  src: '/design/list-card-sample.svg',
  alt: '',
  width: 480,
  height: 320,
};

const thumb = (image: MediaImage): ListCardMarker => ({ type: 'thumbnail', image });

/* Off tcules.com, for the external rows. A literal on purpose: ROUTES names this site's paths, and
   an external destination is by definition not one of them. */
const EXTERNAL_HREF = 'https://www.figma.com/community';

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
    marker: { type: 'icon', name: 'document-text' },
  },
  {
    title: 'Design systems',
    body: 'Build the decisions and reusable parts that keep a product coherent as it grows.',
    href: ROUTES.designSystems,
    marker: { type: 'icon', name: 'check' },
  },
  {
    title: 'Design engineering',
    body: 'Carry interaction decisions into production without losing their intent.',
    href: ROUTES.designEngineering,
    marker: { type: 'icon', name: 'copy' },
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
        marker={{ type: 'number', value: 1 }}
      />
      <ListCard
        title="Design systems"
        body="The linked row proves the dark title, icon marker, cue link ink and focus ring."
        marker={{ type: 'icon', name: 'check' }}
        href={ROUTES.designSystems}
      />
      <ListCard
        title="A case study, told off-site"
        body="A cut-out thumbnail and the leaves-the-site cue: no edge on the part, and the square arrow in the cue's own ink."
        marker={thumb(CUT_OUT)}
        href={EXTERNAL_HREF}
        external
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
            marker={{ type: 'number', value: index + 1 }}
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
            the row paints no ground at rest.
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
              marker={{ type: 'number', value: 1 }}
            />
            <ListCard
              arrangement="stacked"
              title="Icon marker"
              body="The existing solid glyph is decorative because this title already names its subject."
              marker={{ type: 'icon', name: 'document-text' }}
            />
            <ListCard
              arrangement="stacked"
              title="Thumbnail marker"
              body="ListCard owns the 160 × 3:2 box; Media fills it with its srcset, lazy load and edge by kind."
              marker={thumb(CUT_OUT)}
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
            <h2>2a · The thumbnail, by kind</h2>
            <p>
              The thumbnail is <code>Media</code> in <code>fit=&quot;fill&quot;</code>, inside
              ListCard&rsquo;s own 160 × 3:2 box (<code>--ratio-cover</code>), lazy, with{' '}
              <code>sizes=&quot;160px&quot;</code> from <code>LIST_CARD_THUMBNAIL</code>. The
              edge is the record&rsquo;s kind, drawn by Media — ListCard never restyles it. Per
              ch05 § 9 and ruling C1 a thumbnail belongs only to case-study and insight/resource
              rows, and carries one cut-out part or one illustration shape. The last two rows
              are the failures the pattern cannot refuse, shown so they are recognisable.
            </p>
          </Layout>
          <Rows>
            <ListCard
              arrangement="stacked"
              title="Cut-out · one part · legal"
              body="No edge: the part's own silhouette is the frame. The 3:2 fill crops a portrait part top and bottom, so its subject must sit in the central safe area."
              marker={thumb(CUT_OUT)}
              href={ROUTES.caseStudies}
            />
            <ListCard
              arrangement="stacked"
              title="Illustration · one shape · legal"
              body="Never boxed — no edge, no panel, no shadow — and never on a blue band. The insight/resource case."
              marker={thumb(ILLUSTRATION)}
              href={ROUTES.insights}
            />
            <ListCard
              arrangement="stacked"
              title="Capture · off-brand at 160"
              body="A whole screen is a flat capture at full column only (ch05 § 2), and § 9 gives a thumbnail no edge. Media draws the capture hairline because the record says capture; the fix is the record."
              marker={thumb(CAPTURE)}
            />
            <ListCard
              arrangement="stacked"
              title="No kind · renders as a capture (M3)"
              body="Every record until Strapi records kind. Same hairline, arriving by default — which is why a thumbnail record should carry its kind before it ships."
              marker={thumb(KINDLESS)}
            />
          </Rows>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2b · The panel inset at 160 (Media § 17 Q2)</h2>
            <p>
              A B5 cut-out on its contrast panel keeps Media&rsquo;s <code>--gap-gutter</code>{' '}
              inset at every size, so in a 160 × 107 box the part gets 96 × 43. Media cannot see
              the box it fills, so it cannot choose a smaller step for it, and ListCard may not
              set Media&rsquo;s token. <strong>Shipped: Media unchanged; a supply rule.</strong>{' '}
              A thumbnail&rsquo;s part must hold its own edge (no panel), or the row takes the
              case&rsquo;s illustration. The right-hand cell is the rejected alternative — the
              inset at <code>--gap-text</code>, &ldquo;cell padding&rdquo; — overridden in this
              harness only, so the owner can judge the two.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 3 }} colGap="gutter" rowGap="stack">
            <Specimen
              title="panel · --gap-gutter 32 · shipped"
              note="96 × 43 of part. Fails ch05 § 9's 160 check: not one recognisable shape."
            >
              <Rows>
                <ListCard
                  arrangement="stacked"
                  title="Panelled part"
                  body="The inset Media ships."
                  marker={thumb(PANEL_PART)}
                />
              </Rows>
            </Specimen>
            <Specimen
              title="panel · --gap-text 16 · NOT shipped"
              note="128 × 75 of part. A harness-only override of --media-panel-inset, for comparison."
            >
              <div className={s.panelInsetCell}>
                <Rows>
                  <ListCard
                    arrangement="stacked"
                    title="Panelled part"
                    body="The alternative inset."
                    marker={thumb(PANEL_PART)}
                  />
                </Rows>
              </div>
            </Specimen>
            <Specimen
              title="no panel · the supply rule's answer"
              note="A part whose own edge holds on the ground: the whole 160 × 107 box."
            >
              <Rows>
                <ListCard
                  arrangement="stacked"
                  title="Unpanelled part"
                  body="What the rule asks for."
                  marker={thumb(CUT_OUT)}
                />
              </Rows>
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2c · Ordered and unordered sets</h2>
            <p>
              The <code>number</code> fill is the Mechanism&rsquo;s &ldquo;ordered steps&rdquo;
              variant, so a numbered set is a real <code>&lt;ol&gt;</code>: the numeral is
              aria-hidden and the list announces position. An unordered set is a{' '}
              <code>&lt;ul&gt;</code>. The list element is the caller&rsquo;s{' '}
              <code>Layout as</code>, never the row&rsquo;s — one boolean on every route drives
              both the element and the marker. A <code>&lt;ul&gt;</code> of numerals is the one
              wrong composition, and it is named here rather than rendered.
            </p>
          </Layout>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            <Specimen
              title={'<Layout as="ol"> · number markers'}
              note="“List, 3 items. 1 of 3. Name the decision…” — order from the markup, not the numeral."
            >
              <Rows ordered>
                {SAMPLES.slice(0, 3).map((title, index) => (
                  <ListCard
                    key={title}
                    arrangement="stacked"
                    title={title}
                    body="Name the decision this step must make."
                    marker={{ type: 'number', value: index + 1 }}
                  />
                ))}
              </Rows>
            </Specimen>
            <Specimen
              title={'<Layout as="ul"> · no marker, or an icon'}
              note="No order to announce, so no number fill."
            >
              <Rows>
                {TERMS.slice(0, 3).map((term, index) => (
                  <ListCard
                    key={term.title}
                    arrangement="stacked"
                    title={term.title}
                    body={term.body}
                    marker={index === 0 ? { type: 'icon', name: 'document-text' } : undefined}
                  />
                ))}
              </Rows>
            </Specimen>
          </Layout>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2d · External rows</h2>
            <p>
              <code>external</code> swaps the cue for ch04&rsquo;s &ldquo;leaves the site&rdquo;
              glyph, <code>square-arrow-right-up</code> — one glyph per meaning, replacing the
              arrow rather than joining it — opens a new tab, and appends a visually hidden
              &ldquo;(opens in a new tab)&rdquo; to the row&rsquo;s accessible name. Same slot,
              size (18) and ink as the arrow. It is the first route-visible Solar glyph, so the
              site footer&rsquo;s legal line now carries the CC BY 4.0 credit.
            </p>
          </Layout>
          <Rows>
            <ListCard
              title="Internal destination"
              body="arrow-right: go, next. Same tab."
              href={ROUTES.caseStudies}
            />
            <ListCard
              title="External destination"
              body="square-arrow-right-up: leaves the site. New tab, said in words to a screen reader."
              href={EXTERNAL_HREF}
              external
            />
            <ListCard
              title="External with a thumbnail"
              body="The cue and the marker are independent; the row is still one link and one focus stop."
              marker={thumb(ILLUSTRATION)}
              href={EXTERNAL_HREF}
              external
            />
            <ListCard
              title="An external flag with no href"
              body="No destination, so no anchor, no cue and no hint."
              external
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
                    marker={{ type: 'number', value: index + 1 }}
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
              The static row has rest only. Point at, hold and Tab to the linked row: a{' '}
              <strong>ground</strong> appears under the whole row on hover and the{' '}
              <strong>cue holds still</strong> — then press deepens the ground and steps the cue
              together. That is <code>Button</code>&rsquo;s ghost model, values and state
              machine both: a ghost button moves its background under the pointer and its label
              only on the click. Hover moves one thing, press moves two. The target is up to
              1240px wide and about 82px tall, so the signal has to cover it, and it paints only
              under a pointer — a list of these is still a list of ruled rows, not a stack of
              tiles. Focus adds the surface-aware two-part ring on top, so keyboard focus is
              never carried by colour alone.
            </p>
          </Layout>
          <Rows ordered>
            <ListCard
              arrangement="stacked"
              title="Static · rest only"
              body="This row is inert and never enters the tab order."
              marker={{ type: 'number', value: 1 }}
            />
            <ListCard
              arrangement="stacked"
              title="Linked · point, hold and Tab"
              body="One native anchor owns the title, summary and arrow cue."
              marker={{ type: 'icon', name: 'copy' }}
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
                'The frame paints --lcrd-ground-hover across the whole row. The cue holds.',
              ],
              ['focus', 'Exactly the hover rendering plus the two-part keyboard ring.'],
              [
                'pressed',
                'The ground steps to --lcrd-ground-pressed AND the cue to its pressed ink.',
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
                marker={{ type: 'icon', name: 'document-text' }}
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
                marker={thumb({ src: '   ', alt: '', width: 480, height: 320 })}
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
                    marker={thumb(ILLUSTRATION)}
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
              Thumbnail rows in the phone&rsquo;s 326px column, then the same number, icon and
              linked thumbnail rows at Layout&rsquo;s sm and xs track widths. This is where the
              inline inset is proved: it takes 32px from each track, so the copy gets 224px at
              sm and 160px at xs — below the 192px core minimum at xs, where the marker wraps
              above the core instead of squeezing it. Nothing overflows at either width, because
              padding sits inside the border box. Markers wrap without widening the page; the
              content core can shrink below xs only when the parent itself is smaller.
            </p>
          </Layout>
          <Specimen
            title="326 · mobile column"
            note="The width every card image is approved at (ch05 B3): a 390 viewport less two 32px gutters, derived by the harness rather than written. Stacked only — the frame cannot fire a media query, and split collapses to stacked below 767 anyway. The thumbnail keeps its own 160px slot at this width, so the asset is judged at 160, not 326: that is the narrowest it renders anywhere, and the reason a cover asset shared with BlockCard has to read at both sizes."
          >
            <div className={s.trackMobile}>
              <Rows>
                <ListCard
                  arrangement="stacked"
                  title="A linked thumbnail in the phone's column"
                  body="The cover crop at the thumbnail's own width, with the copy taking what is left of 326."
                  marker={thumb(ILLUSTRATION)}
                  href={ROUTES.caseStudies}
                />
                <ListCard
                  arrangement="stacked"
                  title="The same thumbnail, unlinked"
                  body="No cue, so the core gets the cue's width back."
                  marker={thumb(ILLUSTRATION)}
                />
                <ListCard
                  arrangement="stacked"
                  title="A cut-out part, off-site"
                  body="The leaves-the-site cue at the phone's width: the square arrow keeps the arrow's slot."
                  marker={thumb(CUT_OUT)}
                  href={EXTERNAL_HREF}
                  external
                />
                <ListCard
                  arrangement="stacked"
                  title="A capture — off-brand"
                  body="The M3 hairline at 160, in the 326 column."
                  marker={thumb(CAPTURE)}
                />
              </Rows>
            </div>
          </Specimen>
          <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
            <Specimen title="sm · 256px">
              <div className={s.trackSm}>
                <Rows ordered>
                  <ListCard
                    arrangement="stacked"
                    title="Step"
                    body="Compact sequence copy."
                    marker={{ type: 'number', value: 1 }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Icon"
                    body="Compact subject copy."
                    marker={{ type: 'icon', name: 'document-text' }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Link"
                    body="A compact linked row."
                    marker={thumb(ILLUSTRATION)}
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
                    marker={{ type: 'number', value: 1 }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Icon"
                    body="Compact subject copy."
                    marker={{ type: 'icon', name: 'document-text' }}
                  />
                  <ListCard
                    arrangement="stacked"
                    title="Link"
                    body="A compact linked row."
                    marker={thumb(ILLUSTRATION)}
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
