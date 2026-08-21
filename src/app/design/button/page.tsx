import { Fragment } from 'react';

import { Button, Cluster, Icon, Layout, Section } from '@/components';

import { Specimen, specimenStyles as s } from '../_specimen/Specimen';

/**
 * Button specimen — the six combinations, three sizes, three variants, and every state the
 * component can be put into from the outside.
 *
 * Hover, pressed and tab focus deliberately have no props: they are the stylesheet's business,
 * driven by :hover, :active and :focus-visible. That means this page cannot print them in a
 * column, and it says so where it matters rather than quietly showing five states and calling it
 * seven. Point at a button, hold it down, and tab to it — that is the rest of the specification, and
 * it has to be exercised on each of the four surfaces below.
 */

const COMBOS = [
  { emphasis: 'solid', tone: 'primary', name: 'Solid · blue', sub: 'The primary ask' },
  { emphasis: 'solid', tone: 'neutral', name: 'Solid · ink', sub: 'Utility on paper' },
  { emphasis: 'ghost', tone: 'primary', name: 'Ghost · blue', sub: 'Secondary, same offer' },
  { emphasis: 'ghost', tone: 'neutral', name: 'Ghost · ink', sub: 'Default secondary' },
  { emphasis: 'link', tone: 'primary', name: 'Link · blue', sub: 'In the text column' },
  { emphasis: 'link', tone: 'neutral', name: 'Link · ink', sub: 'Navigation' },
] as const;

const SURFACES = [
  {
    surface: 'paper',
    note: 'The default and the origin. Every other surface is measured against it.',
  },
  {
    surface: 'tint',
    note: 'Both ghost fills step down one — hover 50→100, pressed 100→200 — because a tint that worked on paper is already the colour of this panel. Hover a ghost here and on paper to see it.',
  },
  {
    surface: 'ink',
    note: 'The neutrals reverse; blue does not move. Solid primary keeps 500 with a white label, so the primary action is the same object here. A ghost fills with neutral rather than a blue tint — at the pale end of the blue ramp there is no tint left to see. Blue as ink lifts to 200 and the focus ring to 300, both contrast floors rather than preferences.',
  },
  {
    surface: 'blue',
    note: 'The one surface where the primary cannot be blue: solid primary inverts to paper with an ink label. Ghost and link collapse — primary and neutral both read white, because on a blue field there is one voice. Tab to a button here: the ring is white, and the gap in it is the blue ground.',
  },
] as const;

/** One surface's full set of six, plus the busy, disabled and held states on that ground. */
function SurfaceMatrix() {
  return (
    <Layout rowGap="gutter">
      <Layout columns={3} colGap="gutter" rowGap="gutter">
        {COMBOS.map((c) => (
          <Layout key={c.emphasis + c.tone} rowGap="tight" justifyItems="start">
            <p className={s.specTitle}>{c.name}</p>
            <Button emphasis={c.emphasis} tone={c.tone}>
              {c.emphasis === 'link' ? 'Read case study' : 'See the work'}
            </Button>
          </Layout>
        ))}
      </Layout>
      <Layout rowGap="tight">
        <p className={s.specTitle}>Held · active — busy — and disabled, on this ground</p>
        <Cluster colGap="text" rowGap="text">
          <Button emphasis="ghost" tone="neutral" active>
            All work
          </Button>
          <Button emphasis="link" tone="neutral" active>
            Approach
          </Button>
          <Button busy>Send enquiry</Button>
          <Button disabled>Send enquiry</Button>
          <Button emphasis="ghost" tone="neutral" disabled>
            All work
          </Button>
          <Button emphasis="link" tone="primary" disabled>
            Read case study
          </Button>
        </Cluster>
      </Layout>
    </Layout>
  );
}

export default function ButtonSpecimenPage() {
  return (
    <>
      <Section>
        <Layout rowGap="stack">
          <Layout rowGap="block">
            <h1>Button</h1>
            <p>
              Three emphases against two tones, three sizes, three variants and seven states.
              The component contributes no colour and no distance — every value comes from{' '}
              <code>--btn-*</code>, which the token layer re-declares once per surface. The same
              markup is therefore correct on all four grounds without being told which one it is
              standing on.
            </p>
            <p>
              The box is 8 / 4 / 4: eight of box padding, a further four of label margin, four
              of icon gap. The three differ because the things they space differ, and none of
              them scales with the size.
            </p>
          </Layout>

          <Specimen
            title="The six combinations"
            note="Emphasis is how loud the button is; tone is what it claims. Blue claims that this is the offer, ink claims nothing and gets the work done. None of the three carries an outline — separation comes from fill and from the space around it."
          >
            <Layout columns={3} colGap="gutter" rowGap="stack">
              {COMBOS.map((c) => (
                <Layout key={c.emphasis + c.tone} rowGap="tight" justifyItems="start">
                  <p className={s.specTitle}>{c.name}</p>
                  <p className={s.specNote}>{c.sub}</p>
                  <Button
                    emphasis={c.emphasis}
                    tone={c.tone}
                    icon={c.emphasis === 'link' ? <Icon name="arrow-right" /> : undefined}
                  >
                    {c.emphasis === 'link' ? 'Read case study' : 'See the work'}
                  </Button>
                </Layout>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="States — four of seven are printable"
            note="Rest, active, busy and disabled are below. Busy keeps its label and focusability while suppressing pointer states. Hover, pressed and tab focus have no props by design, so point at each button, hold it down, and tab to it."
          >
            <Layout columns={[2, 1, 1, 1, 1]} colGap="text" rowGap="text" align="center">
              <p className={s.specTitle}>Emphasis · tone</p>
              <p className={s.specTitle}>Rest</p>
              <p className={s.specTitle}>Active — held</p>
              <p className={s.specTitle}>Busy — progress</p>
              <p className={s.specTitle}>Disabled</p>
              {/* Layout fills tracks in order, so the five cells of each row are emitted as one
                  flat run. Grouping them per row would need a nested Layout per row and a second
                  grid to keep the columns aligned — this is the arrangement the primitive is for. */}
              {COMBOS.map((c) => (
                <Fragment key={c.emphasis + c.tone}>
                  <Layout rowGap="none" justifyItems="start">
                    <p className={s.specTitle}>{c.name}</p>
                    <p className={s.specNote}>{c.sub}</p>
                  </Layout>
                  <Button emphasis={c.emphasis} tone={c.tone}>
                    All work
                  </Button>
                  <Button emphasis={c.emphasis} tone={c.tone} active>
                    All work
                  </Button>
                  <Button emphasis={c.emphasis} tone={c.tone} busy>
                    All work
                  </Button>
                  <Button emphasis={c.emphasis} tone={c.tone} disabled>
                    All work
                  </Button>
                </Fragment>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="Variants — label, label and icon, icon alone"
            note="A button says what it does in words unless the words are redundant. One icon per button and one side only: a trailing arrow means the click changes where you are, a leading glyph names the kind of action. Both together is a type error, not a review comment."
          >
            <Layout columns={3} colGap="gutter" rowGap="block">
              <Layout rowGap="tight" justifyItems="start">
                <p className={s.specTitle}>Label</p>
                <p className={s.specNote}>
                  Two to four words, terse and literal. Most buttons should be this.
                </p>
                <Cluster colGap="text" rowGap="text">
                  <Button>Start a project</Button>
                  <Button emphasis="ghost" tone="neutral">
                    All work
                  </Button>
                </Cluster>
              </Layout>
              <Layout rowGap="tight" justifyItems="start">
                <p className={s.specTitle}>Label + icon</p>
                <p className={s.specNote}>
                  Trailing for movement, leading to name the kind of action. Never both.
                </p>
                <Cluster colGap="text" rowGap="text">
                  <Button icon={<Icon name="arrow-right" />}>Read case study</Button>
                  <Button emphasis="ghost" tone="neutral" iconLeft={<Icon name="download" />}>
                    Download
                  </Button>
                </Cluster>
              </Layout>
              <Layout rowGap="tight" justifyItems="start">
                <p className={s.specTitle}>Icon only</p>
                <p className={s.specNote}>
                  Square at the size&rsquo;s height, and an <code>aria-label</code> the type
                  system requires. Glyphs that need no gloss only.
                </p>
                <Cluster colGap="text" rowGap="text">
                  <Button
                    emphasis="ghost"
                    tone="neutral"
                    iconOnly
                    icon={<Icon name="close-circle" />}
                    aria-label="Close"
                  />
                  <Button
                    emphasis="ghost"
                    tone="neutral"
                    iconOnly
                    icon={<Icon name="copy" />}
                    aria-label="Copy"
                  />
                  <Button
                    tone="neutral"
                    iconOnly
                    icon={<Icon name="arrow-right" />}
                    aria-label="Next case"
                  />
                  <Button
                    emphasis="ghost"
                    iconOnly
                    icon={<Icon name="download" />}
                    aria-label="Download"
                  />
                </Cluster>
              </Layout>
            </Layout>
          </Specimen>

          <Specimen
            title="Size — 32 / 40 / 48"
            note="Only the height, the label and the icon step. Padding, label margin and gap are identical at all three, so a button never looks like a different button at a different size. Heights are explicit rather than derived from padding, so a button lines up with an input on the same row without either being measured."
          >
            <Layout rowGap="block">
              {(['sm', 'md', 'lg'] as const).map((size) => (
                <Cluster key={size} colGap="text" rowGap="text">
                  <span className={s.ruler}>
                    {size} · {size === 'sm' ? 32 : size === 'md' ? 40 : 48}
                  </span>
                  <Button size={size}>Start a project</Button>
                  <Button
                    size={size}
                    emphasis="ghost"
                    tone="neutral"
                    icon={<Icon name="arrow-right" />}
                  >
                    See the work
                  </Button>
                  <Button
                    size={size}
                    emphasis="ghost"
                    tone="neutral"
                    iconOnly
                    icon={<Icon name="copy" />}
                    aria-label="Copy"
                  />
                  <Button size={size} tone="neutral">
                    Send
                  </Button>
                  <Button size={size} emphasis="link" tone="primary">
                    Read case study
                  </Button>
                </Cluster>
              ))}
            </Layout>
          </Specimen>

          <Specimen
            title="Groups, and the one-solid rule"
            note="A row of buttons is a Cluster, which owns the gap — never a margin on the button. One solid per view: a second solid of any colour means the page has not decided which action it wants, and the reader will not decide for it."
          >
            <Layout rowGap="block">
              <Cluster colGap="text" rowGap="text">
                <Button size="lg">Start a project</Button>
                <Button
                  size="lg"
                  emphasis="ghost"
                  tone="primary"
                  icon={<Icon name="arrow-right" />}
                >
                  See the work
                </Button>
              </Cluster>
              <Cluster colGap="tight" rowGap="tight">
                <Button size="sm" emphasis="ghost" tone="neutral" active>
                  All
                </Button>
                <Button size="sm" emphasis="ghost" tone="neutral">
                  Product
                </Button>
                <Button size="sm" emphasis="ghost" tone="neutral">
                  Brand
                </Button>
                <Button size="sm" emphasis="ghost" tone="neutral">
                  Research
                </Button>
              </Cluster>
              <p className={s.specNote}>
                The segmented set above is what <code>active</code> is for — the held second
                step, the same value a press reads. Pressing an item therefore previews the
                state it is about to take. A call to action never enters it.
              </p>
            </Layout>
          </Specimen>

          <Specimen
            title="Anchors — a button that navigates"
            note="as='a' with an href, or as={Link} for an internal route. Link emphasis is almost always an anchor; solid and ghost are almost always buttons. type and disabled are only emitted for a real button — an anchor takes aria-disabled and leaves the tab order instead."
          >
            <Cluster colGap="text" rowGap="text">
              <Button as="a" href="#anchor-demo" emphasis="link" tone="primary">
                Read case study
              </Button>
              <Button as="a" href="#anchor-demo" emphasis="link" tone="neutral">
                Approach
              </Button>
              <Button as="a" href="#anchor-demo" emphasis="ghost" tone="neutral">
                All work
              </Button>
              <Button as="a" href="#anchor-demo" disabled>
                Unavailable
              </Button>
            </Cluster>
          </Specimen>

          <Specimen
            title="The link in a text column"
            note="Link emphasis has no box, so it can sit under a case title or inside a paragraph. Its underline is drawn as a rule rather than text-decoration, and wipes in from the left on the same 140ms as the colours — the one animated property in the system that is not a colour. Reduced motion keeps the rule and drops the travel."
          >
            <Layout rowGap="text">
              <p className={s.specNote}>
                A link is reading rather than doing. Hover the two below: on paper a neutral
                link runs ink → blue 500 → blue 600, because without that move it would have no
                hover affordance at all — and since focus is the hover treatment plus the ring,
                a link with no fill would degrade to ring-only.
              </p>
              <Cluster colGap="block" rowGap="text">
                <Button
                  as="a"
                  href="#link-demo"
                  emphasis="link"
                  icon={<Icon name="arrow-right" />}
                >
                  Read case study
                </Button>
                <Button as="a" href="#link-demo" emphasis="link" tone="neutral">
                  Approach
                </Button>
              </Cluster>
            </Layout>
          </Specimen>

          <Specimen
            title="extendHitArea — 44px without changing the box"
            note="A 32 or 40 box is below the touch floor. The hit area is extended past the box with a pseudo-element rather than the box being inflated, so the row it sits in does not move and the target is still legal. For toolbars and dense table rows; a button that can simply be size='lg' should do that instead, since 48 already clears the floor."
          >
            <Cluster colGap="text" rowGap="text">
              <Button size="sm" emphasis="ghost" tone="neutral" extendHitArea>
                Extended
              </Button>
              <Button size="sm" emphasis="ghost" tone="neutral">
                Not extended
              </Button>
              <span className={s.ruler}>
                both boxes 32 high — the first answers the pointer 6px above and below it
              </span>
            </Cluster>
          </Specimen>
        </Layout>
      </Section>

      {/* ── The four surfaces ────────────────────────────────────────────────────────────
          The whole reason the token layer re-declares every value four times. Each band below
          is a sibling Section with its own ground; the buttons inside are identical markup. */}
      {SURFACES.map(({ surface, note }) => (
        <Section key={surface} surface={surface}>
          <Layout rowGap="block">
            <Layout rowGap="tight">
              <p className={s.specTitle}>surface=&quot;{surface}&quot;</p>
              <p className={s.specNote}>{note}</p>
            </Layout>
            <SurfaceMatrix />
          </Layout>
        </Section>
      ))}

      {/* ── The nesting case ─────────────────────────────────────────────────────────────
          This is the specimen the token layer's repetition exists for, so it gets its own band. */}
      <Section surface="ink">
        <Layout rowGap="stack">
          <Layout rowGap="tight">
            <p className={s.specTitle}>A tint panel nested inside an ink section</p>
            <p className={s.specNote}>
              The reason every surface block in the token layer restates every token instead of
              carrying deltas from paper. A tint block that declared only its two ghost fills
              would inherit ink&rsquo;s values for everything else it omitted — and this panel
              used to render ghost-neutral at 1.13:1, link-primary at 2.09:1, and a focus ring
              at 2.09:1 against its own gap. The buttons in the panel below should be
              indistinguishable from the ones on the tint band above; tab through them to check
              the ring.
            </p>
          </Layout>
          <Section as="div" surface="tint" density="tight">
            <SurfaceMatrix />
          </Section>
        </Layout>
      </Section>
    </>
  );
}
