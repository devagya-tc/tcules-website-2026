import type { ReactNode } from 'react';

import { Button, Cluster, Icon, Layout, Section, type SectionSurface } from '@/components';
import {
  BlockCard,
  BlockCardSet,
  ContentSection,
  CtaRow,
  CtaSection,
  ListCard,
  PageHero,
  Slider,
  type BlockCardMedia,
  type BlockCardSetItem,
} from '@/patterns';
import { getKitPhoto, type PhotoId } from '@/lib/photos';
import { ROUTES } from '@/lib/routes';

import { specimenStyles as s } from '../_specimen/Specimen';
import t from '../_specimen/typeroles.module.css';

/**
 * Button — the kit showcase (r7-buttons, 8 Oct 2026).
 *
 * The owner's ruling of 7 Oct as corrected on 8 Oct (docs/kit/review-7-oct.md) leaves three kinds,
 * one job each, and this route is laid out to argue exactly that rather than to print a matrix:
 *
 *   blue solid   the page's ONE main action — the hero's and/or the bottom close's ask
 *   blue ghost   the alternative beside the solid, and nowhere else in content
 *   link         every other action, which navigates — a band's foot, a card's foot, a mid-page offer
 *
 * The ink solid is gone (types, tokens on every surface, and this page). Neutral survives on ghost
 * and link for site CHROME only — the nav's triggers, a filter set — and is shown as such, late.
 *
 * Shape: the intro hero is itself the first proof (the solid and its ghost), then an index, then
 * each variation under a titled head. Bands 02 to 04 are the kinds IN A PAGE, real patterns edge to
 * edge under a title band of their own; 05 onward is anatomy, each head and its stage one band —
 * sizes, states, icons, the stepper, chrome, the four surfaces and nesting, and the touch floor.
 * Hover, pressed and tab focus have no props by design; the anatomy bands say where to point, hold
 * and tab rather than pretending to print them.
 *
 * Photographs: nine, none twice — the hero, the three engagement cards, the offer and the four
 * slides in the stepper band (visual-direction § 5.5).
 */

const photo = (id: PhotoId) => getKitPhoto(id);
const cover = (id: PhotoId): BlockCardMedia => ({ type: 'image', image: getKitPhoto(id) });

const VARIATIONS = [
  { id: 'kinds', index: '01', name: 'Three kinds, one job each' },
  { id: 'in-band', index: '02', name: 'In a band · links' },
  { id: 'offer', index: '03', name: 'A mid-page offer · a link' },
  { id: 'close', index: '04', name: 'The close · solid + ghost' },
  { id: 'solid', index: '05', name: 'Blue solid' },
  { id: 'ghost', index: '06', name: 'Blue ghost' },
  { id: 'link', index: '07', name: 'Link button' },
  { id: 'icons', index: '08', name: 'Label, arrow, glyph, icon alone' },
  { id: 'stepper', index: '09', name: 'Outline · stepper and pair' },
  { id: 'chrome', index: '10', name: 'Site chrome · neutral' },
  { id: 'surfaces', index: '11', name: 'Four surfaces, and nesting' },
  { id: 'touch', index: '12', name: 'The 44px touch floor' },
] as const;

type VariationId = (typeof VARIATIONS)[number]['id'];

/**
 * A variation's head: an index and a name in the head track, what to look for in the body track,
 * on the kit's top hairline. The `spec` class lets the shots harness crop it.
 */
function Head({ id, note }: { id: VariationId; note: ReactNode }) {
  const variation = VARIATIONS.find((v) => v.id === id)!;
  return (
    <Layout
      className={s.spec}
      columns={{ lg: [1, 2] }}
      colGap="section"
      rowGap="text"
      align="end"
    >
      <Layout rowGap="tight">
        <p className={s.kitIndex}>{variation.index}</p>
        {/* An h2 at h3 scale: the variation names sit under the page's h1, beside the bands' own
            h2s, so the outline never steps h1 → h3 → h2. */}
        <h2 className={t.h3}>{variation.name}</h2>
      </Layout>
      <p className={s.specNote}>{note}</p>
    </Layout>
  );
}

/**
 * The titled band in front of a PATTERN variation (02 to 04): a band of its own, so the pattern band
 * under it sits edge to edge exactly as on a route. (kit/cta's Title, the kit's shape.)
 */
function Title({ id, children }: { id: VariationId; children: ReactNode }) {
  return (
    <Section id={id}>
      <Head id={id} note={children} />
    </Section>
  );
}

/**
 * An ANATOMY variation (05 onward): the head and its stage in one band, `column` (64) apart. A stage
 * is not a band, and a title band above it left 192 of paper between a head and the thing it named.
 */
function Band({
  id,
  note,
  children,
}: {
  id: VariationId;
  note: ReactNode;
  children: ReactNode;
}) {
  return (
    <Section id={id}>
      <Layout rowGap="column">
        <Head id={id} note={note} />
        {children}
      </Layout>
    </Section>
  );
}

/**
 * One cell of an anatomy stage: a hairline, a mono label, an optional note, then the controls. The
 * hairline is the kit's top rule (the one edge a cell is allowed); no box.
 */
function Cell({
  label,
  note,
  children,
}: {
  label: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <Layout rowGap="block" className={s.spec} justifyItems="start">
      <Layout rowGap="tight">
        <p className={s.specTitle}>{label}</p>
        {note ? <p className={s.specNote}>{note}</p> : null}
      </Layout>
      {children}
    </Layout>
  );
}

/** A stage of cells: three across from md (or `across`), a stack on a phone. */
function Stage({ across = 3, children }: { across?: 2 | 3 | 4; children: ReactNode }) {
  return (
    <Layout
      columns={across === 4 ? { base: 1, md: 2, lg: 4 } : { base: 1, md: across }}
      colGap="gutter"
      rowGap="stack"
      align="start"
    >
      {children}
    </Layout>
  );
}

/** A size ladder row: the height as a mono figure, then the control at that size. */
function Rung({ size, children }: { size: 'sm' | 'md' | 'lg'; children: ReactNode }) {
  const px = size === 'sm' ? 32 : size === 'md' ? 40 : 48;
  return (
    <Cluster colGap="block" rowGap="tight" align="center">
      <span className={s.specTitle}>{`${px} · ${size}`}</span>
      {children}
    </Cluster>
  );
}

const SIZES = ['lg', 'md', 'sm'] as const;
const arrow = <Icon name="arrow-right" />;

/* ── The in-page demonstrations (02 to 04) ─────────────────────────────────────────────────────
   Copy at the kit's ceilings: card titles ≤ 6 words, bodies one line at 381. */

const ENGAGEMENTS: readonly BlockCardSetItem[] = [
  {
    id: 'btn-sprint',
    title: 'A two-week discovery sprint',
    body: 'Interviews, a map of the work and a ranked list of decisions.',
    media: cover('workshop-hands-writing'),
    href: ROUTES.howWeWork,
    ctaLabel: 'See the sprint',
  },
  {
    id: 'btn-audit',
    title: 'An audit of the live product',
    body: 'Where the product loses people, ranked by what it costs you.',
    media: cover('board-review-backs'),
    href: ROUTES.uxProductAudit,
    ctaLabel: 'See the audit',
  },
  {
    id: 'btn-team',
    title: 'An embedded product team',
    body: 'Designers and design engineers inside your roadmap, week by week.',
    media: cover('stylus-tablet-sketch'),
    href: ROUTES.services,
    ctaLabel: 'See the team',
  },
];

/* The stepper's Slider (09): four quiet photographs not used elsewhere on the page. */
const WORK: readonly { title: string; body: string; image: PhotoId }[] = [
  {
    title: 'A claims workflow, rebuilt',
    body: 'An adjuster’s day, redesigned around the decisions it makes.',
    image: 'designer-monitor-ui',
  },
  {
    title: 'One library, three platforms',
    body: 'A component system a fintech now ships in step.',
    image: 'pair-laptop-notebook',
  },
  {
    title: 'A field app that works offline',
    body: 'Inspections that no longer wait for a signal.',
    image: 'hands-trackpad',
  },
  {
    title: 'An analytics product, simplified',
    body: 'Twelve dashboards became one question at a time.',
    image: 'desk-flatlay-devices',
  },
];

const KINDS = [
  {
    name: 'Blue solid',
    job: 'The page’s one main action. The hero asks, the close asks again, and nothing in between does.',
    where: 'PageHero · CtaSection close · EnquiryForm submit',
    never: 'Never in a band, never ink, never with an arrow: the label carries the ask.',
    control: (
      <Button as="a" href="#solid" size="lg">
        Start a project
      </Button>
    ),
  },
  {
    name: 'Blue ghost',
    job: 'The alternative, beside the solid. No fill at rest; the box arrives with the pointer.',
    where: 'Beside a solid, in the hero and the close',
    never: 'Never alone in content: a ghost without its solid is a link with a box.',
    control: (
      <Button as="a" href="#ghost" emphasis="ghost" size="lg" icon={arrow}>
        See the work
      </Button>
    ),
  },
  {
    name: 'Link button',
    job: 'Every other action. It points somewhere, so it carries the arrow and no box at all.',
    where: 'A band’s foot · a card’s foot · a mid-page offer · a line of text',
    never: 'Never beside a solid, and never two side by side.',
    control: (
      <Button as="a" href="#link" emphasis="link" size="lg" icon={arrow}>
        Start with an audit
      </Button>
    ),
  },
] as const;

const SURFACES: readonly { surface: SectionSurface; note: string }[] = [
  {
    surface: 'paper',
    note: 'The origin. Every other surface restates every token rather than carrying deltas from here.',
  },
  {
    surface: 'tint',
    note: 'The ghost fills step down one, hover 100 and pressed 200, because 50 is already the colour of this ground.',
  },
  {
    surface: 'ink',
    note: 'Blue does not move: the solid keeps 500 and its white label. Blue as text lifts to 200 and the ring to 300, contrast floors rather than preferences.',
  },
  {
    surface: 'blue',
    note: 'The one ground where the solid cannot be blue, so it inverts to paper with an ink label: still the primary, not an ink solid. Ghost and link read white.',
  },
];

/** One surface's proof: the pair, the link, then the unavailable states, on that ground. */
function SurfaceRow() {
  return (
    <Stage>
      <Cell label="The ask · solid + ghost">
        <Cluster colGap="block" rowGap="block" align="center">
          <Button as="a" href="#surfaces">
            Start a project
          </Button>
          <Button as="a" href="#surfaces" emphasis="ghost" icon={arrow}>
            See the work
          </Button>
        </Cluster>
      </Cell>
      <Cell label="Every other action · link">
        <Button as="a" href="#surfaces" emphasis="link" icon={arrow}>
          Start with an audit
        </Button>
      </Cell>
      <Cell label="Busy · disabled">
        <Cluster colGap="block" rowGap="block" align="center">
          <Button busy>Sending</Button>
          <Button disabled>Send enquiry</Button>
          <Button emphasis="link" disabled icon={arrow}>
            Read more
          </Button>
        </Cluster>
      </Cell>
    </Stage>
  );
}

export default function ButtonSpecimenPage() {
  return (
    <>
      {/* ── Intro — itself the first proof: the hero's solid and its ghost ─────────────────── */}
      <PageHero
        arrangement="beside"
        eyebrow="Tcules UI kit · Button"
        title="Ask once. Point everywhere else."
        body={[
          'Three buttons, one job each. The blue solid is the page’s one main action; its blue ghost is the alternative beside it; every other action is a link.',
        ]}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See the work', href: ROUTES.caseStudies },
        ]}
        media={{ type: 'image', image: photo('screen-over-shoulder') }}
      />

      {/* The index: every variation, linked to its band. */}
      <Section>
        <Layout as="ol" columns={{ base: 1, md: 2, lg: 3 }} colGap="gutter" rowGap="none">
          {VARIATIONS.map((v, i) => (
            <ListCard
              key={v.id}
              title={v.name}
              href={`#${v.id}`}
              marker={{ type: 'number', value: i + 1, tone: 'neutral' }}
              size="sm"
            />
          ))}
        </Layout>
      </Section>

      {/* ── 01 · The three kinds ────────────────────────────────────────────────────────────── */}
      <Band
        id="kinds"
        note={
          <>
            The owner&rsquo;s ruling of 7 Oct, as corrected on 8 Oct. Kind follows WHERE the
            action sits, not what it does: the hero and the close carry the page&rsquo;s one
            ask, and a band points. There is no ink solid, so nothing on a page has to classify
            an action any more.
          </>
        }
      >
        <Layout columns={{ base: 1, lg: 3 }} colGap="gutter" rowGap="stack" align="start">
          {KINDS.map((kind) => (
            <Layout key={kind.name} rowGap="stack" className={s.spec}>
              <Layout rowGap="block">
                <h3 className={t.h4}>{kind.name}</h3>
                <p className={t.body}>{kind.job}</p>
              </Layout>
              {/* Held at the lg box's height, so the solid, the ghost and the bare link put the
                  Where / Never lines below them on one line across the row. */}
              <Cluster align="center" className={s.controlRow}>
                {kind.control}
              </Cluster>
              <Layout rowGap="text">
                <Layout rowGap="inline">
                  <p className={s.specTitle}>Where</p>
                  <p className={s.specNote}>{kind.where}</p>
                </Layout>
                <Layout rowGap="inline">
                  <p className={s.specTitle}>Never</p>
                  <p className={s.specNote}>{kind.never}</p>
                </Layout>
              </Layout>
            </Layout>
          ))}
        </Layout>
      </Band>

      {/* ── 02 · In a band ──────────────────────────────────────────────────────────────────── */}
      <Title id="in-band">
        A feature band as it ships: each card names its destination in a blue link under its
        copy, and the band&rsquo;s own action is a CtaRow, one link with its note. Nothing here
        asks: the page&rsquo;s solid is the hero&rsquo;s.
      </Title>
      <ContentSection
        eyebrow="Engagements"
        heading="Pick a starting point"
        headingId="btn-in-band"
        footer={
          <CtaRow
            note="Every engagement starts with a thirty-minute call."
            actions={[{ label: 'How we work', href: ROUTES.howWeWork }]}
          />
        }
      >
        <BlockCardSet items={ENGAGEMENTS} lead="none" cue="cta" />
      </ContentSection>

      {/* ── 03 · The mid-page offer ─────────────────────────────────────────────────────────── */}
      <Title id="offer">
        The owner&rsquo;s own example: &ldquo;Start with a UX Product Audit&rdquo; inside a band
        is a link, not a button. CtaSection&rsquo;s offer takes ONE action and renders it as the
        link button; its type no longer accepts a second, so an offer cannot grow a solid pair.
      </Title>
      <CtaSection
        arrangement="offer"
        markers="icon"
        eyebrow="Recognise the workflow?"
        heading="A workflow that keeps raising questions?"
        body={[
          'Examine that slice of rules, roles and recovery before the team commits to more screens.',
        ]}
        points={[
          { icon: 'check-circle', label: 'The workflow, walked through with its people' },
          { icon: 'check-circle', label: 'The rules, roles and way back beneath it' },
          { icon: 'check-circle', label: 'What to design first, and what can wait' },
        ]}
        actions={[{ label: 'Start with a UX Product Audit', href: ROUTES.uxProductAudit }]}
        media={{ image: photo('whiteboard-two-hands') }}
      />

      {/* ── 04 · The close ──────────────────────────────────────────────────────────────────── */}
      <Title id="close">
        The bottom of the page asks again, and it is the same object as the hero&rsquo;s: the
        blue solid with no arrow, its blue ghost partner with one, 24 between them, on the
        close&rsquo;s tint.
      </Title>
      <CtaSection
        arrangement="open"
        eyebrow="Next step"
        heading="Tell us what you are building"
        body={[
          'A thirty-minute call with the person who would lead your project, and a written first phase within a week.',
        ]}
        actions={[
          { label: 'Start a project', href: ROUTES.contact },
          { label: 'See the work', href: ROUTES.caseStudies },
        ]}
      />

      {/* ── 05 · Blue solid ─────────────────────────────────────────────────────────────────── */}
      <Band
        id="solid"
        note="Brandeis 500, a white label, radius 8, no shadow, no outline and no arrow. Only the height, the label and the icon step between sizes; the 8 / 4 / 4 of padding, label margin and gap hold at all three. Point at it (600), hold it down (700), tab to it (the hover fill plus the ring)."
      >
        <Stage>
          <Cell label="Size" note="lg in heroes, closes and on a phone; md everywhere else.">
            <Layout rowGap="block">
              {SIZES.map((size) => (
                <Rung key={size} size={size}>
                  <Button as="a" href="#solid" size={size}>
                    Start a project
                  </Button>
                </Rung>
              ))}
            </Layout>
          </Cell>
          <Cell
            label="The label is the ask"
            note="A verb first, two to four words, no arrow. One solid per page view: a second means the page has not decided what it wants."
          >
            <Layout rowGap="block" justifyItems="start">
              <Button as="a" href="#solid">
                Book a call
              </Button>
              <Button as="a" href="#solid">
                Request the audit
              </Button>
            </Layout>
          </Cell>
          <Cell
            label="Busy · disabled"
            note="Busy keeps its label and its focus; disabled answers nothing and leaves the tab order."
          >
            <Layout rowGap="block" justifyItems="start">
              <Button busy>Sending enquiry</Button>
              <Button disabled>Send enquiry</Button>
            </Layout>
          </Cell>
        </Stage>
      </Band>

      {/* ── 06 · Blue ghost ─────────────────────────────────────────────────────────────────── */}
      <Band
        id="ghost"
        note="The partner: a blue label and arrow, no fill and no outline at rest, so it reads as the alternative before the label is parsed. The fill (blue 50, then 100) arrives with the pointer. It only ever stands beside a solid; alone, it is a link with a box."
      >
        <Stage>
          <Cell label="The pair, at three sizes" note="24 between them, wrapped or across.">
            <Layout rowGap="block">
              {SIZES.map((size) => (
                <Cluster key={size} colGap="block" rowGap="tight" align="center">
                  <Button as="a" href="#ghost" size={size}>
                    Start a project
                  </Button>
                  <Button as="a" href="#ghost" size={size} emphasis="ghost" icon={arrow}>
                    See the work
                  </Button>
                </Cluster>
              ))}
            </Layout>
          </Cell>
          <Cell
            label="Rest, then pressed"
            note="Pressed shows the box the pointer brings: blue 100, the value a held control reads."
          >
            <Layout rowGap="block" justifyItems="start">
              <Button as="a" href="#ghost" emphasis="ghost" icon={arrow}>
                See the work
              </Button>
              <Button as="a" href="#ghost" emphasis="ghost" icon={arrow} active>
                See the work
              </Button>
            </Layout>
          </Cell>
          <Cell label="Busy · disabled" note="The form's second action, while times load.">
            <Layout rowGap="block" justifyItems="start">
              <Button emphasis="ghost" busy icon={arrow}>
                Loading times
              </Button>
              <Button emphasis="ghost" disabled icon={arrow}>
                See available times
              </Button>
            </Layout>
          </Cell>
        </Stage>
      </Band>

      {/* ── 07 · Link button ────────────────────────────────────────────────────────────────── */}
      <Band
        id="link"
        note="Every action that is not the page’s one ask. No box, so it sits under a card’s copy, at a band’s foot or inside a sentence; the trailing arrow says it takes you somewhere. Its underline is a rule that wipes in from the left on hover; reduced motion keeps the rule and drops the travel."
      >
        <Stage>
          <Cell label="Size" note="The label steps; there is no box to step.">
            <Layout rowGap="block">
              {SIZES.map((size) => (
                <Rung key={size} size={size}>
                  <Button as="a" href="#link" emphasis="link" size={size} icon={arrow}>
                    Read the case study
                  </Button>
                </Rung>
              ))}
            </Layout>
          </Cell>
          <Cell label="In a line of text" note="Hover it: the rule draws under the label only.">
            <p className={t.bodyLg}>
              Not sure where to start?{' '}
              <Button as="a" href="#link" emphasis="link" icon={arrow}>
                Start with an audit
              </Button>
            </p>
          </Cell>
          <Cell label="Held · busy · disabled">
            <Layout rowGap="block" justifyItems="start">
              <Button as="a" href="#link" emphasis="link" icon={arrow} active>
                Approach
              </Button>
              <Button emphasis="link" busy icon={arrow}>
                Loading
              </Button>
              <Button emphasis="link" disabled icon={arrow}>
                Read the case study
              </Button>
            </Layout>
          </Cell>
        </Stage>
      </Band>

      {/* ── 08 · Icons ──────────────────────────────────────────────────────────────────────── */}
      <Band
        id="icons"
        note="A button says what it does in words. One icon, one side: a trailing arrow means the click changes where you are, a leading glyph names the kind of action, and both at once is a type error. Icon alone is square at the size’s height and must carry an aria-label."
      >
        <Stage across={4}>
          <Cell label="Label" note="Most buttons. Two to four words.">
            <Button as="a" href="#icons">
              Start a project
            </Button>
          </Cell>
          <Cell label="Trailing arrow" note="It navigates: the ghost and the link.">
            <Layout rowGap="block" justifyItems="start">
              <Button as="a" href="#icons" emphasis="ghost" icon={arrow}>
                See the work
              </Button>
              <Button as="a" href="#icons" emphasis="link" icon={arrow}>
                All services
              </Button>
            </Layout>
          </Cell>
          <Cell label="Leading glyph" note="It names the kind of action.">
            <Button as="a" href="#icons" emphasis="link" iconLeft={<Icon name="download" />}>
              Download the report
            </Button>
          </Cell>
          <Cell
            label="Icon alone"
            note="Solid and ghost keep their box; a bare glyph reads as decoration."
          >
            <Cluster colGap="text" rowGap="text" align="center">
              <Button iconOnly icon={arrow} aria-label="Next case" />
              <Button
                emphasis="ghost"
                iconOnly
                icon={<Icon name="download" />}
                aria-label="Download"
              />
            </Cluster>
          </Cell>
        </Stage>
      </Band>

      {/* ── 09 · Outline stepper ────────────────────────────────────────────────────────────── */}
      <Band
        id="stepper"
        note="The fourth emphasis, and the only one with an edge. Icon alone, a round hairline control that steps through a set, a slider’s previous and next; hover fills the disc, and at the end of its row it keeps its circle, off. Labelled (owner, 29 Oct 2026), at the button’s own radius, it leads an in-band pair whose second is the link — a Banner’s two actions — and never stands beside a solid."
      >
        {/* Varied on purpose: the sizes as a ladder in the head track, and the stepper where it
            lives, a Slider of case cards, in the body track — the one image row in the anatomy. */}
        <Layout columns={{ base: 1, lg: [1, 2] }} colGap="column" rowGap="stack" align="start">
          <Layout rowGap="stack">
            <Cell
              label="Labelled · the first of a pair"
              note="Outlined button, then the quieter link, one row a block apart (CtaRow’s pair)."
            >
              <Cluster colGap="block" rowGap="text" align="center">
                <Button as="a" href={ROUTES.about} emphasis="outline">
                  Meet the studio
                </Button>
                <Button
                  as="a"
                  href={ROUTES.careers}
                  emphasis="link"
                  extendHitArea
                  icon={<Icon name="arrow-right" />}
                >
                  Careers at Tcules
                </Button>
              </Cluster>
            </Cell>
            <Cell
              label="Size · rest, then unavailable"
              note="At the start of its row previous keeps its circle, off."
            >
              <Layout rowGap="block">
                {SIZES.map((size) => (
                  <Rung key={size} size={size}>
                    <Cluster colGap="text" rowGap="text" align="center">
                      <Button
                        emphasis="outline"
                        iconOnly
                        size={size}
                        disabled
                        icon={<Icon name="arrow-left" />}
                        aria-label={`Previous, ${size}`}
                      />
                      <Button
                        emphasis="outline"
                        iconOnly
                        size={size}
                        icon={<Icon name="arrow-right" />}
                        aria-label={`Next, ${size}`}
                      />
                    </Cluster>
                  </Rung>
                ))}
              </Layout>
            </Cell>
          </Layout>
          <Cell label="Where it lives · a Slider" note="Step through the row, or swipe it.">
            <Slider label="Case studies" perView={3}>
              {WORK.map((card) => (
                <BlockCard
                  key={card.title}
                  title={card.title}
                  body={card.body}
                  href={ROUTES.caseStudies}
                  tracks={3}
                  size="sm"
                  media={cover(card.image)}
                />
              ))}
            </Slider>
          </Cell>
        </Layout>
      </Band>

      {/* ── 10 · Site chrome ────────────────────────────────────────────────────────────────── */}
      <Band
        id="chrome"
        note="Neutral survives on ghost and link for one place: site chrome, meaning the nav’s menu triggers and quiet links, a segmented filter, a utility glyph. It claims nothing, so it never stands for an action in a band, and there is no neutral solid at all."
      >
        <Stage>
          <Cell label="A filter set" note="active is the held second step: the selected item.">
            <Cluster colGap="tight" rowGap="tight">
              {['All', 'Product', 'Systems', 'Research'].map((label, i) => (
                <Button key={label} size="sm" emphasis="ghost" tone="neutral" active={i === 0}>
                  {label}
                </Button>
              ))}
            </Cluster>
          </Cell>
          <Cell label="Nav links" note="Ink at rest, blue on hover: the link's affordance.">
            <Cluster colGap="block" rowGap="tight">
              {['Services', 'Work', 'About'].map((label, i) => (
                <Button
                  key={label}
                  as="a"
                  href="#chrome"
                  emphasis="link"
                  tone="neutral"
                  active={i === 1}
                >
                  {label}
                </Button>
              ))}
            </Cluster>
          </Cell>
          <Cell
            label="Utility glyphs"
            note="Copy, close: a control, never an action in a band."
          >
            <Cluster colGap="text" rowGap="text">
              <Button
                emphasis="ghost"
                tone="neutral"
                iconOnly
                icon={<Icon name="copy" />}
                aria-label="Copy link"
              />
              <Button
                emphasis="ghost"
                tone="neutral"
                iconOnly
                icon={<Icon name="close-circle" />}
                aria-label="Close"
              />
            </Cluster>
          </Cell>
        </Stage>
      </Band>

      {/* ── 11 · Four surfaces, and nesting ─────────────────────────────────────────────────── */}
      <Band
        id="surfaces"
        note="Identical markup on every ground. The token layer restates every value once per surface, so the same button is right on paper, on tint, in the ink footer and on the blue pivot without being told where it is. Tab through each band: the ring’s gap is the ground. Last, a tint panel inside ink, the case the restating exists for."
      >
        <Layout rowGap="tight">
          <p className={s.specTitle}>surface=&quot;paper&quot;</p>
          <p className={s.specNote}>{SURFACES[0]!.note}</p>
        </Layout>
        <SurfaceRow />
      </Band>
      {SURFACES.slice(1).map(({ surface, note }) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="column">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>{note}</p>
            </Layout>
            <SurfaceRow />
          </Layout>
        </Section>
      ))}
      <Section surface="ink">
        <Layout rowGap="column">
          <Layout rowGap="tight">
            <p className={s.specTitle}>A tint panel inside ink</p>
            <p className={s.specNote}>
              A tint block that declared only its deltas would inherit ink&rsquo;s values for
              everything it left out; this panel once rendered its link at 2.09:1. Its buttons
              should be indistinguishable from the tint band above.
            </p>
          </Layout>
          <Section as="div" surface="tint">
            <SurfaceRow />
          </Section>
        </Layout>
      </Section>

      {/* ── 12 · Touch ──────────────────────────────────────────────────────────────────────── */}
      <Band
        id="touch"
        note={
          <>
            A 32 or 40 box is under the 44 this control aims for. <code>extendHitArea</code>{' '}
            reaches past the box with a pseudo-element, vertically only, so the row does not
            move. A button that can simply be <code>size=&quot;lg&quot;</code> on a phone should
            do that instead.
          </>
        }
      >
        <Stage across={2}>
          <Cell label="32 box · 44 target" note="The dashed frame is the 44 floor.">
            <Cluster colGap="block" rowGap="block" align="center">
              <span className={s.hitFloor}>
                <Button size="sm" extendHitArea>
                  Send
                </Button>
              </span>
              <span className={s.hitFloor}>
                <Button size="sm" emphasis="ghost" extendHitArea icon={arrow}>
                  Details
                </Button>
              </span>
            </Cluster>
          </Cell>
          <Cell
            label="40 box · 44 target"
            note="Every hero, close and CtaRow action: md with the extension."
          >
            <Cluster colGap="block" rowGap="block" align="center">
              <span className={s.hitFloor}>
                <Button as="a" href="#touch" extendHitArea>
                  Start a project
                </Button>
              </span>
              <span className={s.hitFloor}>
                <Button as="a" href="#touch" emphasis="ghost" extendHitArea icon={arrow}>
                  See the work
                </Button>
              </span>
            </Cluster>
          </Cell>
        </Stage>
      </Band>
    </>
  );
}
