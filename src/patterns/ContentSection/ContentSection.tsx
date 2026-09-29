import { Children, type ReactNode } from 'react';

import { Layout, Section, type SectionDensity, type SectionSurface } from '@/components';

import styles from './ContentSection.module.css';

/**
 * Where the head group sits against the blocks.
 *
 *   stacked  the head above the blocks, at every width. The default, and today's behaviour.
 *   beside   from 1024 up, the head in a narrow leading track and the blocks in the wide trailing
 *            one, tracks 1 : 2, the head static (it scrolls with the band; it does not stick).
 *            Below 1024 it is `stacked`, exactly — same DOM order, same 48 beat.
 *
 * A PRESENTATION choice, and therefore never a CMS field (docs/strapi-changes.md §1): it changes
 * how a section looks, not what it says. The template that places the band chooses it.
 */
export type ContentSectionArrangement = 'stacked' | 'beside';

export type ContentSectionProps = {
  /**
   * The band's `h2`, verbatim. Absent renders no heading and no seam — an untitled section is a
   * real shape in the content model (the run of blocks before the first heading), not a fault.
   *
   * A `string` and not a `ReactNode`, for the same reason CtaSection types it that way: it makes
   * a second heading impossible to smuggle into a band that already sits under a route's one h1.
   */
  heading?: string;
  /**
   * The heading's id, and therefore the band's accessible name. Supplied by the CALLER rather
   * than generated with `useId`, because this id is also the in-page anchor a table of contents
   * links to and a URL fragment lands on — so it belongs to the content, which knows what the
   * section is called, not to the render, which does not.
   *
   * Only applied when `heading` is present. Without a heading there is nothing to name the
   * region, so the band renders as a plain `div` and takes no `aria-labelledby` it could not
   * honour.
   */
  headingId?: string;
  /** The category label above the heading. Absent renders no element and no seam. */
  eyebrow?: string;
  /**
   * One sentence under the heading — what this section is about, before the blocks that argue it.
   *
   * Named for the type role it takes (`--text-lead`), which is the same name `PageHero` and
   * `CtaSection` give their own opening line. The difference between this and theirs is the API
   * rather than the word: there, the lead is `body[0]` of a tuple and a second paragraph may
   * follow it in the same slot. Here it stands alone — the body is `children`, and it is blocks
   * rather than prose.
   *
   * This is the slot that makes the rhythm work. Without it the heading and the first block are
   * the only two things in the band, so a single gap step has to serve both "heading to its own
   * lead" and "lead to the evidence under it" — and those are different distances. With it, the
   * eyebrow, heading and lead group into ONE unit and the blocks are a separate beat.
   */
  lead?: string;
  /**
   * Which ground `Section` paints under this band. Passed straight through and read nowhere
   * else — this component paints nothing, so taking the prop is not the same as owning the
   * ground.
   */
  surface?: SectionSurface;
  /**
   * Vertical air, passed through to `Section`. A band holding one paragraph and a band holding a
   * five-card grid do not want the same air, and that is a property of what is IN the band —
   * which only the caller knows.
   */
  density?: SectionDensity;
  /**
   * Head above the blocks (`stacked`, the default) or beside them from 1024 up (`beside`). See
   * `ContentSectionArrangement`.
   *
   * `beside` needs both halves to mean anything, so it degrades rather than drawing an empty
   * track: with no head group the blocks take the full column, and with no blocks the head takes
   * the full column — in both cases the band renders exactly as `stacked` would. A one-third track
   * holding nothing, or a two-thirds track holding nothing, is a hole in the page, not a layout.
   */
  arrangement?: ContentSectionArrangement;
  /**
   * The blocks. Each becomes one row of the body stack at `--gap-stack`.
   *
   * Every block takes the full body track — the band cannot tell a paragraph from a card grid by
   * looking at a child. Running text is therefore MARKED by the caller: wrap a rich-text block in
   * `ContentSectionText` and it reads at the body measure (68ch) while its siblings keep the track.
   *
   * "No blocks" is decided with `Children.toArray`, which drops `null`, `undefined` and booleans —
   * so an empty array (a CMS section with zero blocks, mapped) renders no body row and no 48 seam
   * beneath the head, the same as omitting the prop.
   */
  children?: ReactNode;
};

export type ContentSectionTextProps = {
  /** The running text — in practice one `Prose`. */
  children: ReactNode;
};

/**
 * ContentSectionText — the body measure, for the rich-text blocks of a ContentSection.
 *
 * Prose has no measure, by ruling: a reading column belongs to whoever places the flow, because a
 * cap inside the primitive could only be narrowed by a caller and never widened, and half the
 * call sites are not reading columns. ContentSection is that caller for every non-long-form band,
 * and without this its text ran the whole track — about 150 characters a line stacked in the 1240
 * column, about 110 in `beside`'s two-thirds track.
 *
 * WHY A SLOT AND NOT A RULE ON THE BAND. The band receives arbitrary children, and routes hand
 * them over through keyed Fragments from a block switch, so ContentSection has no honest way to
 * know which child is text: matching on `child.type === Prose` breaks on the first Fragment, and
 * capping every child would crush a card grid or a five-column table into a reading column — the
 * exact failure the ruling removed from Prose. The one place that DOES know a block is rich text
 * is the route's `case 'rich-text'`, so that is where the mark goes, and this is the mark.
 *
 * It is a ceiling, not a width: `max-inline-size` only, no grid, no margin, no alignment. The text
 * sits at the start of the track like every other block, and in a track narrower than 68ch the
 * track wins. It lives in ContentSection's folder and carries its name because it means nothing
 * outside the band — a long-form route states its own reading column.
 */
export function ContentSectionText({ children }: ContentSectionTextProps) {
  return <div className={styles.text}>{children}</div>;
}

/**
 * ContentSection — one CMS section as one band, built for the shape every long-form page type in
 * this repo produces: an optional eyebrow, one heading, an optional lead, then a run of blocks.
 *
 * IT EXISTS FOR THE RHYTHM, and the rhythm is nesting rather than a knob. The old composition put
 * the h2 and every block in one `Layout rowGap="stack"`, so all of them were flat siblings and
 * 48 was the only distance available: heading to body read exactly as far apart as body to the
 * cards beneath it, and the page had no internal grouping at any scale. CLAUDE.md § Layout rule 4
 * is the fix and this component is where it is applied — tighten by grouping, loosen by
 * separating:
 *
 *   tight  (8)   eyebrow → heading      a label and the thing it labels
 *   block  (24)  heading → lead         a statement and its own opening line
 *   stack  (48)  head group → blocks    and between the blocks themselves
 *
 * So the head group reads as one object with air beneath it, rather than as three evenly spaced
 * rows. Nothing here is a distance this file chose: all three are gap-scale steps, and none of
 * them shifts at a breakpoint. The one thing that does change at a breakpoint is the ARRANGEMENT
 * under `beside` — the layout moves at 1024, the distances never do (CLAUDE.md § the gap scale,
 * rule 3).
 *
 * It contributes TYPE AND INK only. `Section` paints the band from the `surface` handed to it,
 * `Layout` owns every seam, and the blocks own themselves. There are no state tokens, which is
 * the assertion that this component's rendering is a function of its props: nothing in it
 * responds to a pointer and nothing opens.
 *
 * TWO ARRANGEMENTS of the same three beats. `stacked` puts the head group above the blocks;
 * `beside` (ruling O2) puts it in a one-third leading track from 1024 up, static, with the blocks in
 * the two-thirds track beside it, 64 apart. It is the arrangement that breaks the "heading +
 * paragraph + three cards" silhouette a long page otherwise repeats, and it needs no new component
 * and no new token: it is one Layout's props.
 *
 * Route-blind and data-blind like every pattern — it never learns that Strapi exists.
 */
export function ContentSection({
  heading,
  headingId,
  eyebrow,
  lead,
  surface,
  density,
  arrangement = 'stacked',
  children,
}: ContentSectionProps) {
  /* The head group is only rendered when something is in it. An untitled section is the run of
     blocks before the first heading, and it wants no empty row above it. */
  const hasHead = Boolean(eyebrow || heading || lead);
  const hasBody = Children.toArray(children).length > 0;

  /* `beside` only splits when there are two halves to split. Either one missing and the band is
     the stacked band — see the `arrangement` prop for why an empty track is never drawn. */
  const split = arrangement === 'beside' && hasHead && hasBody;

  /* A `section` element is only honest when the band has a name. Unheaded, it is a `div` —
     an unnamed <section> is a region a screen reader announces and cannot identify. */
  const labelled = Boolean(heading && headingId);

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      surface={surface}
      density={density}
      aria-labelledby={labelled ? headingId : undefined}
    >
      {/* The outer Layout is the only thing `arrangement` touches, and it touches it through
          Layout's own props — no local grid.

            rowGap  stack (48)   head group → body when the two are rows: always under `stacked`,
                                 and under `beside` below 1024, which is what makes the collapse
                                 identical to `stacked` rather than merely similar.
            colGap  column (64)  head track → body track under `beside`. Not gutter (32): that is
                                 the seam between peers in a set, and a head and its blocks are not
                                 peers. These are two halves that must read as separate, which is
                                 the step the scale names for exactly that.
            columns {lg: [1,2]}  1 : 2 from 1024 up (O2), one track below. Undefined when not
                                 split, so the stacked band renders the Layout it always did.
            align   start        the head is STATIC (O2): it sits at the top of its track and
                                 scrolls away with the band. `start` sizes it to its content rather
                                 than stretching it to the body's height, so nothing pretends to be
                                 a rail it is not. */}
      <Layout
        rowGap="stack"
        colGap={split ? 'column' : undefined}
        columns={split ? { lg: [1, 2] } : undefined}
        align={split ? 'start' : undefined}
      >
        {hasHead ? (
          /* 24 between the heading and its lead. The eyebrow+heading pair nests one level
             deeper at 8, so the three rows are two groups rather than three evenly spaced
             lines — which is the whole reason this component is not a flat Layout. */
          <Layout rowGap="block">
            {eyebrow || heading ? (
              <Layout rowGap="tight">
                {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
                {heading ? (
                  <h2 id={headingId} className={styles.heading}>
                    {heading}
                  </h2>
                ) : null}
              </Layout>
            ) : null}
            {lead ? <p className={styles.lead}>{lead}</p> : null}
          </Layout>
        ) : null}

        {/* The body beat. A second Layout rather than spreading the children into the outer one,
            so the head group is ONE row of the outer stack no matter how many blocks follow —
            without it, a band with no lead would be indistinguishable from the flat composition
            this component replaces. */}
        {hasBody ? <Layout rowGap="stack">{children}</Layout> : null}
      </Layout>
    </Section>
  );
}
