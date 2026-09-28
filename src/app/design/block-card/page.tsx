import type { ComponentProps, ReactNode } from 'react';

import { Cluster, Layout, Section, type SectionSurface } from '@/components';
import { BlockCard, type BlockCardMedia } from '@/patterns';
import { ROUTES } from '@/lib/routes';

import { Box, Specimen, specimenStyles as s } from '../_specimen/Specimen';

const IMAGE = '/design/list-card-sample.svg';
const WIDE_IMAGE = '/design/figure-sample-wide.svg';

const CARDS = [
  {
    title: 'Product direction',
    body: 'Frame the decision, the evidence it needs and the outcome a customer should notice.',
    media: { kind: 'icon', name: 'document-text' },
  },
  {
    title: 'Design systems',
    body: 'Turn recurring interface decisions into a shared, durable product language.',
    media: { kind: 'icon', name: 'check' },
  },
  {
    title: 'Design engineering',
    body: 'Carry interaction intent into production with the implementation team.',
    media: { kind: 'icon', name: 'copy' },
  },
  {
    title: 'AI product UX',
    body: 'Make model behaviour legible enough for people to judge and correct it.',
    media: { kind: 'icon', name: 'document-text' },
  },
] as const satisfies readonly { title: string; body: string; media: BlockCardMedia }[];

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'Neutral title and icon, body at 700, eyebrow at 600. The cta is a link Button and takes its ramp from Button.',
  },
  {
    surface: 'tint',
    note: 'The light-surface text inks hold; the eyebrow steps to neutral-700 because 600 would be 4.39:1 here.',
  },
  {
    surface: 'ink',
    note: 'Title and icon lift to white, body to neutral-300, eyebrow to 400; Button lifts the cta on its own ink block.',
  },
  {
    surface: 'blue',
    note: 'White and the light Brandeis steps carry title, body, eyebrow and focus; Button carries the cta.',
  },
] as const;

const NESTED_SURFACE_TOKENS = {
  tint: [
    ['--bcrd-title-ink', '--color-neutral-900'],
    ['--bcrd-body-ink', '--color-neutral-700'],
    ['--bcrd-eyebrow-ink', '--color-neutral-700'],
    ['--bcrd-media-ink', '--color-neutral-900'],
    ['--btn-link-primary-fg', '--color-brandeis-500'],
    ['--btn-link-primary-fg-hover', '--color-brandeis-600'],
    ['--btn-link-primary-fg-pressed', '--color-brandeis-700'],
    ['--bcrd-ring-color', '--color-brandeis-500'],
    ['--bcrd-ring-gap-color', '--color-paper-deep'],
  ],
  ink: [
    ['--bcrd-title-ink', '--color-white'],
    ['--bcrd-body-ink', '--color-neutral-300'],
    ['--bcrd-eyebrow-ink', '--color-neutral-400'],
    ['--bcrd-media-ink', '--color-white'],
    ['--btn-link-primary-fg', '--color-brandeis-300'],
    ['--btn-link-primary-fg-hover', '--color-brandeis-200'],
    ['--btn-link-primary-fg-pressed', '--color-brandeis-100'],
    ['--bcrd-ring-color', '--color-brandeis-300'],
    ['--bcrd-ring-gap-color', '--color-neutral-950'],
  ],
} as const;

type CardColumns = ComponentProps<typeof Layout>['columns'];

/** The vertical grid: the parent owns columns, both gutter seams and equal rows. */
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

/**
 * The horizontal stack. One track, `rowGap="section"`, and deliberately no separator rule: a
 * borderless card is bounded by distance, and a rule between rows would put ListCard's finish on
 * BlockCard's object. `equalRows` is absent because a single-track stack has no peers to match.
 */
function Rows({ children }: { children: ReactNode }) {
  return (
    <Layout as="ul" rowGap="section">
      {children}
    </Layout>
  );
}

/** Identical three-card markup for every surface proof. */
function SurfaceCards() {
  return (
    <Cards columns={{ base: 1, lg: 3 }}>
      <BlockCard
        eyebrow="Capability"
        title="Static icon card"
        body="Title, eyebrow, icon and body resolve without any interactive ink."
        media={{ kind: 'icon', name: 'check' }}
      />
      <BlockCard
        title="Static no-media card"
        body="Omitting media removes the slot and its seam; the object stays complete."
      />
      <BlockCard
        eyebrow="Case study"
        title="Linked image card"
        body="One anchor resolves the cta ink and the keyboard focus ring. The title stays dark."
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
          media={index % 3 === 0 ? { kind: 'icon', name: 'document-text' } : undefined}
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
            One borderless card in a semantic grid: an optional eyebrow, title and body, an
            optional icon or image, and a whole-card link whose destination is named by a
            read-more cta. It has no edge and no fill, and it never decides its grid.
          </p>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>1 · Identity and finish</h2>
            <p>
              Neither object draws a border on any side, in any state. The tile is bounded by
              the parent gutter alone, and its copy is flush to the media rather than inset from
              an edge that no longer exists. Compare the two titles: the linked one is the same
              dark ink as the static one, and only the cta &mdash; a real link Button &mdash; is
              blue.
            </p>
          </Layout>
          <Cards>
            <BlockCard
              title="Static and complete"
              body="No destination means no anchor, no cta, no blank action row and no interactive state."
            />
            <BlockCard
              title="Linked as one target"
              body="A non-blank destination adds one native anchor and the cta that names it."
              href={ROUTES.productDesign}
            />
          </Cards>
          <Specimen
            title="Title ink · linked and static, side by side"
            note="Inspect both computed colours. Both must be --bcrd-title-ink. The card declares no link ink at all now: only the cta is blue, and Button owns that."
          >
            <Cards>
              <BlockCard
                eyebrow="Case study"
                title="The same title ink when linked"
                body="The card navigates and the heading stays dark."
                media={{ kind: 'image', src: IMAGE, alt: '' }}
                href={ROUTES.caseStudies}
              />
              <BlockCard
                eyebrow="Case study"
                title="The same title ink when static"
                body="Identical markup with the destination removed."
                media={{ kind: 'image', src: IMAGE, alt: '' }}
              />
            </Cards>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>2 · Eyebrow ladder</h2>
            <p>
              One optional plain string above the title, in uppercase mono at the quiet-label
              ink. What it holds is the caller&rsquo;s composition — a client, a content type, a
              topic or a kicker — because the right line differs by page and a structured record
              would have to guess.
            </p>
          </Layout>
          <Cards columns={{ base: 1, md: 2, xl: 4 }}>
            <BlockCard
              eyebrow="ConnectX"
              title="A client name"
              body="The eyebrow names whose work this is."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
            <BlockCard
              eyebrow="Case study"
              title="A content type"
              body="The eyebrow names what kind of page this is."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
            <BlockCard
              eyebrow="Featured —"
              title="A kicker"
              body="The eyebrow is editorial rather than taxonomic."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
            <BlockCard
              title="Eyebrow omitted"
              body="No element and no seam remain; the title starts the copy group."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
          </Cards>
          <Specimen
            title="Eyebrow without media, and a long eyebrow"
            note="The label wraps like any other copy; there is no clamp and no truncation."
          >
            <Cards>
              <BlockCard
                eyebrow="Design systems"
                title="Text-only with an eyebrow"
                body="The three copy parts stay one tight group."
              />
              <BlockCard
                eyebrow="A deliberately long eyebrow line that has to wrap in a narrow track"
                title="Long eyebrow"
                body="It wraps rather than widening the card."
              />
            </Cards>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>3 · The cta</h2>
            <p>
              The shipped link <code>Button</code>, rendered <code>as=&quot;span&quot;</code>{' '}
              inside the one frame anchor so it is a label for that anchor rather than a second
              control: it never enters the tab order and there is no nested link. Button owns
              the type, the case, the seam, the glyph size, the colour ramp and the underline.
              It renders exactly when a non-blank destination does, defaults to a
              content-type-agnostic label, and takes a caller&rsquo;s wording where the page can
              name where it goes. Tab to a card and count focus stops: one.
            </p>
          </Layout>
          <Cards columns={{ base: 1, lg: 3 }}>
            <BlockCard
              eyebrow="Case study"
              title="Default label"
              body="No ctaLabel passed, so the component supplies its own."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
            <BlockCard
              eyebrow="ConnectX"
              title="Caller-named label"
              body="The page knows the destination well enough to say so."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
              ctaLabel="Read the ConnectX case"
            />
            <BlockCard
              eyebrow="Capability"
              title="No destination, no cta"
              body="A static card is complete without an empty action row."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
            />
          </Cards>
          <Specimen
            title="Blank ctaLabel · long ctaLabel in a narrow track"
            note="A whitespace-only label falls back to the default and warns. Button keeps its label and glyph on one line by design, so a long label in a narrow track is the case to watch here."
          >
            <Layout columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="block">
              <Cards columns={{ base: 1 }}>
                <BlockCard
                  title="Blank label"
                  body="Falls back to the default wording."
                  href={ROUTES.caseStudies}
                  ctaLabel="   "
                />
              </Cards>
              <div className={s.trackXs}>
                <Cards columns={{ base: 1 }}>
                  <BlockCard
                    title="Long label at 192px"
                    body="The arrow stays with the last word."
                    href={ROUTES.caseStudies}
                    ctaLabel="Read the whole engagement write-up"
                  />
                </Cards>
              </div>
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>4 · Orientation</h2>
            <p>
              One anatomy, two arrangements. Vertical fills a grid track with media above copy;
              horizontal takes two equal tracks with the media and copy centred against each
              other and the crop stepped to 4:3. <code>imageSide</code> is set per card — there
              is no alternation logic inside the component, because a card that alternated would
              have to know its own index.
            </p>
          </Layout>

          <Specimen
            title='orientation="horizontal" · imageSide="left" and "right"'
            note="Inspect the DOM order: it follows the visual order, so no CSS order property is needed and the reading order is never reversed."
          >
            <Rows>
              <BlockCard
                orientation="horizontal"
                imageSide="left"
                eyebrow="ConnectX · Case study"
                title="Media on the inline start"
                body="The copy column holds the same eyebrow, title, body and cta as a grid tile. Nothing about the anatomy changes; only the axis it arranges on does."
                media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                href={ROUTES.caseStudies}
                ctaLabel="Read the ConnectX case"
              />
              <BlockCard
                orientation="horizontal"
                imageSide="right"
                eyebrow="Northwind · Case study"
                title="Media on the inline end"
                body="The same card with the media side flipped. The DOM puts the copy first, so a screen reader reaches the title before the image either way."
                media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                href={ROUTES.caseStudies}
                ctaLabel="Read the Northwind case"
              />
            </Rows>
          </Specimen>

          <Specimen
            title="A stacked horizontal group · no separator rule"
            note={`rowGap="section" is the only thing between these rows. There is no border, and a rule here would put ListCard's finish on BlockCard's object.`}
          >
            <Rows>
              {[
                {
                  client: 'ConnectX',
                  title: 'Rebuilding a claims workflow around the adjuster',
                },
                {
                  client: 'Northwind',
                  title: 'One design language across four acquired products',
                },
                { client: 'Halden', title: "Making a forecasting model's reasoning legible" },
              ].map(({ client, title }, index) => (
                <BlockCard
                  key={client}
                  orientation="horizontal"
                  imageSide={index % 2 === 0 ? 'left' : 'right'}
                  eyebrow={`${client} · Case study`}
                  title={title}
                  body="The caller alternates the side by index. Squint at the group: the alternation is the only rhythm, and it comes from the composition rather than from a card prop."
                  media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                  href={ROUTES.caseStudies}
                  ctaLabel={`Read the ${client} case`}
                />
              ))}
            </Rows>
          </Specimen>

          <Specimen
            title="Horizontal without an image · both fall back to the stack"
            note="The row needs something to fill its media track. An icon is a mark rather than a picture and stays in the copy stack; no media at all leaves no second track. Neither renders a row with an empty half."
          >
            <Rows>
              <BlockCard
                orientation="horizontal"
                imageSide="left"
                eyebrow="Capability"
                title="Icon media, horizontal requested"
                body="The icon keeps its place at the head of the copy stack and the card stays single-column."
                media={{ kind: 'icon', name: 'document-text' }}
                href={ROUTES.aiProductUx}
              />
              <BlockCard
                orientation="horizontal"
                imageSide="right"
                eyebrow="Capability"
                title="No media, horizontal requested"
                body="Same fallback for the same reason."
                href={ROUTES.designSystems}
              />
            </Rows>
          </Specimen>

          <Specimen
            title="Media ratio · 3:2 vertical against 4:3 horizontal"
            note="Inspect the two wrappers' computed aspect-ratio. Both ratios are named tokens; neither is a fallback for the other."
          >
            <Layout rowGap="stack">
              <Cards columns={{ base: 1, md: 2 }}>
                <BlockCard
                  eyebrow="Vertical · 3:2"
                  title="The grid tile crop"
                  body="Wide enough that the image does not dominate the copy beneath it."
                  media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                  href={ROUTES.caseStudies}
                />
                <BlockCard
                  eyebrow="Vertical · 3:2"
                  title="Its grid peer"
                  body="Both tracks resolve the same vertical ratio."
                  media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                  href={ROUTES.caseStudies}
                />
              </Cards>
              <Rows>
                <BlockCard
                  orientation="horizontal"
                  eyebrow="Horizontal · 4:3"
                  title="The row crop"
                  body="Taller, so the media column is not left shorter than the copy beside it."
                  media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                  href={ROUTES.caseStudies}
                />
              </Rows>
            </Layout>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>5 · Grid-count ladder</h2>
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

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>6 · Media fill ladder</h2>
            <p>
              Icon, image and absence fill one optional slot. The image is edge-to-edge with the
              copy flush beneath it at one <code>--gap-block</code> seam; the icon heads the
              copy stack. Both distances belong to a container, not to a child&rsquo;s padding.
            </p>
          </Layout>
          <Cards columns={{ base: 1, lg: 3 }}>
            <BlockCard
              title="Icon fill"
              body="A decorative xl glyph begins the copy stack."
              media={{ kind: 'icon', name: 'document-text' }}
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

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>7 · Static majority and linked minority</h2>
            <p>Eight cards, exactly two links: six static objects remain visually complete.</p>
          </Layout>
          <Cards columns={{ base: 1, md: 2, xl: 4 }}>
            {Array.from({ length: 8 }, (_, index) => {
              const linked = index === 1 || index === 5;
              return (
                <BlockCard
                  key={index}
                  title={linked ? `Linked card ${index + 1}` : `Static card ${index + 1}`}
                  body="The same title ink, copy and flush media hold whether or not navigation exists."
                  media={index % 2 === 0 ? { kind: 'icon', name: 'copy' } : undefined}
                  href={linked ? ROUTES.designEngineering : undefined}
                />
              );
            })}
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>8 · States</h2>
            <p>
              Point at, hold and Tab to the linked card. The cta is the only part that moves,
              and it is the shipped link <code>Button</code>: pointing anywhere on the card
              wipes its underline in and steps its label colour, because the frame carries{' '}
              <code>data-btn-link-group</code> and Button reads the card&rsquo;s states from it.
              Nothing else in the card moves and no part of it transforms. Keyboard focus adds
              the surface-aware two-part ring around the whole card, so focus is never carried
              by colour alone.
            </p>
          </Layout>
          <Cards columns={{ base: 1, md: 2 }}>
            <BlockCard
              eyebrow="Case study"
              title="Point, hold and Tab"
              body="Rest, hover, focus and pressed all come from this one native link."
              media={{ kind: 'image', src: IMAGE, alt: '' }}
              href={ROUTES.caseStudies}
            />
            <Layout rowGap="tight">
              {[
                ['rest', 'Dark title, quiet eyebrow, and the cta at --btn-link-primary-fg.'],
                [
                  'hover',
                  'The cta underline wipes in and its label steps to --btn-link-primary-fg-hover.',
                ],
                [
                  'focus',
                  'The hover cta plus the keyboard-only two-part ring around the card.',
                ],
                ['pressed', 'The cta steps to --btn-link-primary-fg-pressed, underline held.'],
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
              {index === 0 ? <h2>9 · Four surfaces · identical markup</h2> : null}
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
            <h2>10 · Nested surfaces</h2>
            <p>
              The nearest surface resolves every colour below, the cta&rsquo;s three Button
              steps included; no outer palette leaks in. The card&rsquo;s own set is six tokens
              now that the link inks belong to <code>Button</code>.
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
            <h2>11 · Equal-height challenge</h2>
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
              body="This longer paragraph challenges the shared row height with substantially more supporting copy while preserving the same copy group, type, flush media and natural wrapping behaviour."
            />
          </Cards>
        </Layout>
      </Section>

      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>12 · Content edge cases</h2>
            <p>
              All thirteen section 12 cases are rendered or named where the API rejects them.
            </p>
          </Layout>

          <Specimen title="1 · Long title/body · 2 · unbroken URL">
            <Cards columns={{ base: 1, md: 2 }}>
              <BlockCard
                eyebrow="Product modernisation"
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
                <BlockCard title="One item" body="It reads as one object alone in its track." />
              </Cards>
              <ManyCards count={16} />
            </Layout>
          </Specimen>

          <Specimen
            title="6 · Omitted media and blank image source"
            note="Both remove the media element and seam; blank runtime src also warns in development. A horizontal card with a blank src falls back to the stack for the same reason an icon does."
          >
            <Cards>
              <BlockCard title="Media omitted" body="The copy group starts the card." />
              <BlockCard
                title="Blank image source"
                body="No broken image or placeholder frame remains."
                media={{ kind: 'image', src: '   ', alt: '' }}
              />
            </Cards>
          </Specimen>

          <Specimen
            title="7 · Blank title, body, eyebrow, href and ctaLabel"
            note="Blank title returns null; blank body keeps the heading; blank eyebrow omits the label; blank href remains a static div with no cta; blank ctaLabel falls back to the default. All five warn in development."
          >
            <Cards>
              <BlockCard title="   " body="This card must not render." />
              <BlockCard title="Body omitted" body="   " />
              <BlockCard eyebrow="   " title="Eyebrow omitted" body="No blank label line." />
              <BlockCard title="Blank href is inert" body="No anchor and no cta." href="   " />
            </Cards>
          </Specimen>

          <Specimen
            title="8 · Single track through 767 · 9 · unsized wrapping parent · 10 · logical placement"
            note="Narrow the viewport through 767. The horizontal card collapses to one track and its rowGap takes over from the column gutter; imageSide describes nothing below that boundary, so a right-side card reads copy-then-image."
          >
            <Layout rowGap="block">
              <div className={s.trackSm}>
                <Cards columns={{ base: 1 }}>
                  <BlockCard
                    eyebrow="Case study"
                    title="Narrow image card"
                    body="Copy wraps without changing the fixed content relationships."
                    media={{ kind: 'image', src: IMAGE, alt: '' }}
                    href={ROUTES.caseStudies}
                  />
                </Cards>
              </div>
              <Rows>
                <BlockCard
                  orientation="horizontal"
                  imageSide="right"
                  eyebrow="Case study"
                  title="Horizontal collapsing to one track"
                  body="Below md there are no sides, so DOM order decides and the copy comes first."
                  media={{ kind: 'image', src: WIDE_IMAGE, alt: '' }}
                  href={ROUTES.caseStudies}
                />
              </Rows>
              <Cluster as="ul" rowGap="block">
                <BlockCard
                  title="First complete line"
                  body="No explicit track sizes this item."
                />
                <BlockCard title="Second complete line" body="It wraps below the first." />
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen
            title="11 · Nested surface · 12 · zero-gap adjacent cards"
            note="With no edge to meet, two cards at zero gap run together — which is exactly why the gutter is required rather than optional. This is a stress harness, not a composition."
          >
            <Section as="div" surface="ink" density="tight">
              <Cards columns={2} gap={false}>
                <BlockCard title="First object" body="Nothing marks where it ends." />
                <BlockCard title="Second object" body="Nothing marks where it begins." />
              </Cards>
            </Section>
          </Specimen>

          <Specimen
            title="13 · Interactive slot — rejected"
            note="Title, body, eyebrow and ctaLabel are strings and media is a closed union. The public type cannot accept a nested link, Button, control or arbitrary child, and the cta is a span rather than a second anchor."
          >
            <Box>One linked card means exactly one focus stop.</Box>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h2>13 · Four-card breakpoint proof</h2>
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
            <h2>14 · Narrow tracks</h2>
            <p>
              Icon, image and no-media cards at Layout&rsquo;s 256px and 192px track sizes. Text
              wraps, the image shrinks and the cta never collides or widens the page.
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
                      eyebrow="Capability"
                      title="Icon"
                      body="Compact subject copy."
                      media={{ kind: 'icon', name: 'document-text' }}
                    />
                    <BlockCard
                      eyebrow="Case study"
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
            <h2>15 · Heading map</h2>
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
            <h2>16 · Adjacent boundary</h2>
            <p>
              A borderless card is separated by distance and nothing else, so the gutter is the
              boundary rather than a decoration on top of one. Compare the two harnesses: at
              zero gap the objects merge, and at the required gutter they read as separate
              without a single rule between them.
            </p>
          </Layout>
          <Specimen title="zero gap · stress only">
            <Cards columns={2} gap={false}>
              <BlockCard title="First card" body="Its copy runs into the next card's." />
              <BlockCard title="Second card" body="Nothing separates the two." />
            </Cards>
          </Specimen>
          <Specimen title="gutter · production">
            <Cards columns={2}>
              <BlockCard title="First card" body="Reads as one object." />
              <BlockCard title="Second card" body="Reads as another." />
            </Cards>
          </Specimen>
        </Layout>
      </Section>

      <Section surface="tint">
        <Layout rowGap="block">
          <h2>17 · What this static page cannot force</h2>
          <p>
            Hold the pointer for pressed, Tab for keyboard focus, and test viewport widths 767,
            1439 and 1440 exactly. Reduced motion is no longer on the list: the wipe transform
            was the component&rsquo;s only motion and it is gone, so there is nothing left for
            the preference to shorten. None of these has a component prop; the absence is part
            of the contract.
          </p>
        </Layout>
      </Section>
    </>
  );
}
