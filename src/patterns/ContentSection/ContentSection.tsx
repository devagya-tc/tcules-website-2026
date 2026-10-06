import { Children, type ReactNode } from 'react';

import {
  Layout,
  Media,
  Section,
  type MediaImage,
  type SectionDensity,
  type SectionSurface,
} from '@/components';
import { cx } from '@/lib/cx';
import { MEDIA_SPLIT } from '@/lib/image-sizes';

import styles from './ContentSection.module.css';

/**
 * Where the head group sits against the blocks. Four arrangements of the same beats; the layout
 * moves at 1024 and nowhere else, and below 1024 every one of them is a single column in DOM order.
 *
 *   stacked     the head above the blocks, at every width. The default.
 *   beside      from 1024, the head in a 1 : 2 leading track and the blocks in the trailing one, 96
 *               apart, the head static (it scrolls with the band; it does not stick, ruling O2). The
 *               head track may carry an `aside` (a 3:2 photograph or one stat figure) OR `actions`,
 *               never both (visual-direction § 1.4 rule 6). Below 1024 it is `stacked`, with the aside
 *               between the head and the body (§ 3.7 item 4). It splits only when there are BLOCKS
 *               for the trailing track; without them it is the stacked band, aside dropped.
 *   split-head  the H-row (§ 1.4): the head itself splits 1 : 2 from 1024 under its eyebrow — the
 *               heading in the leading track, lead and actions in the trailing one, top edges level;
 *               the blocks then run the full column beneath it. The head reads as one horizontal row, which is
 *               what a full-column body (a 3-up image set, a 3:1 banner) wants above it.
 *   media       the B media split (§ 3.4): a 4:5 photograph in 5 of [5, 7] beside a copy column
 *               holding the head, the blocks and the footer, 96 apart. `media.side` puts the photo at
 *               the start or the end. Below 1024 the photo sits ABOVE the copy, at 4:3.
 *
 * A PRESENTATION choice, and therefore never a CMS field (docs/strapi-changes.md §1): it changes
 * how a section looks, not what it says. The template that places the band chooses it.
 */
export type ContentSectionArrangement = 'stacked' | 'beside' | 'split-head' | 'media';

/**
 * How the head aligns (§ 3.5). `center` sets eyebrow, heading and lead centred, each on its own
 * measure, and centres the body beneath it AS A BLOCK — text inside the blocks stays start-aligned.
 * A centred head is always `stacked`, never beside, and never carries actions in its column: the
 * props union makes each of those a type error. Presentation, never a CMS field.
 */
export type ContentSectionAlign = 'start' | 'center';

/** Which inline end of the band the `media` photograph takes from 1024. Below 1024 it is always first. */
export type ContentSectionMediaSide = 'start' | 'end';

/**
 * The `media` arrangement's photograph. A record rather than a ReactNode because the CROP is the
 * arrangement's, not the caller's: 4:5 beside the copy from 1024 and 4:3 above it below (§ 3.7 item
 * 4), at the split track's `sizes`. A caller handing over a finished `<Media>` would have to know all
 * three at every call site, and the first one to forget would ship a 408-tall photo on a phone.
 *
 * A photograph (`kind: 'photograph'`), because only a photograph takes a ratio (Media, H3) and a
 * media split is "a photograph beside copy" (§ 3.2). An illustration beside copy is the hero's job.
 */
export type ContentSectionMedia = {
  image: MediaImage;
  /** Default `start` — the photo leads. Consecutive media bands on a page alternate it (§ 3.2 rule 4). */
  side?: ContentSectionMediaSide;
  /**
   * Whether a copy column that ends in a footer UNDER BLOCKS stretches to the photo and pins the
   * footer to its bottom edge (§ 3.2 rule 1). Default `true`. `false` centres that copy column on
   * the photo instead (rule 2's alignment), closing the gap between the last block and the footer to
   * the band's `stack`.
   *
   * Added in the fdn-section-head fix round (6 Oct 2026) so the owner can compare the two at 1440:
   * B with 2 tiles and a CtaRow, pinned, leaves ~180 of empty column between the tiles and the
   * footer's rule. It changes nothing where the band would centre anyway (no blocks, or no footer).
   * The default is open question 7 in docs/specs/ContentSection.md; `cmp-media-split` builds on the
   * owner's answer.
   */
  pin?: boolean;
};

type ContentSectionBaseProps = {
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
   * `CtaSection` give their own opening line. In a split `beside` head track it steps to
   * `--text-body-lg` from 1024 (§ 7.1: the track is 381 wide, and a 20px lead there runs five words
   * a line).
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
   * The band's foot: in practice one `CtaRow` (a hairline, then a row of actions — § 3.1). It is the
   * body's last row, a `stack` (48) under the blocks (§ 1.2: body → CtaRow), in every arrangement:
   * under the blocks in `stacked` and `split-head`, in the body track under `beside`, and pinned to
   * the photograph's bottom edge in `media` when blocks sit above it.
   *
   * A footer is not a body on its own: `beside` with a footer and no blocks degrades to `stacked`
   * (the footer a stack under the head), because a lone CtaRow in the two-thirds track sits level
   * with the eyebrow over an empty track, a shape no § 3.4 archetype sanctions.
   *
   * WITH NO BLOCKS, PASS THE CtaRow `rule={false}`. Its hairline marks where a body ends and the ask
   * begins; with no body above it, it sits a `stack` under the lead and reads as an underline on it
   * (fix round, 6 Oct 2026). The band cannot reach into the node it is handed — a pattern does not
   * import a pattern, nor read its classes — so the caller states it, as it does under a ruled ladder.
   *
   * A slot and not a list of CtaRow props, because a pattern does not import a pattern (CLAUDE.md §
   * Scope): the caller composes `<CtaRow>` and hands it over, as `Button` takes `icon`.
   */
  footer?: ReactNode;
  /**
   * The blocks. Each becomes one row of the body stack at `--gap-stack`.
   *
   * Every block takes the full body track — the band cannot tell a paragraph from a card grid by
   * looking at a child. Running text is therefore MARKED by the caller: wrap a rich-text block in
   * `ContentSectionText` and it reads at the body measure while its siblings keep the track.
   *
   * What goes in a `beside` body: a body that reads DOWN (rows, an accordion, a record), or two pair
   * cards, or icon cards (§ 1.4 rule 5). Never a 3-up card set or a 2 × 2 image grid — a set that
   * reads across goes `stacked`, `split-head` or centred (1 Oct 2026, owner, on "Go deeper").
   *
   * "No blocks" is decided with `Children.toArray`, which drops `null`, `undefined` and booleans —
   * so an empty array (a CMS section with zero blocks, mapped) renders no body row and no 48 seam
   * beneath the head, the same as omitting the prop.
   */
  children?: ReactNode;
};

/* ── The axes, as a union ─────────────────────────────────────────────────────────
   Five members, and each one is a rule from visual-direction that would otherwise be a review
   comment. They discriminate on WHICH SLOTS are filled rather than on `arrangement` alone, so a
   caller that passes a union-typed arrangement (a template's `'stacked' | 'beside'` from its story)
   with no head slots matches one member outright instead of asking the compiler to split it.

     plain        no head slot: stacked, beside or split-head, start-aligned.
     centred      § 3.5 — a centred head is always stacked, never beside, and never carries actions
                  in its column (nor an aside, which only a beside head track has).
     withActions  stacked, beside or split-head, with the head's own actions. Never an aside beside
                  them: § 1.4 rule 6 — the head track takes an aside OR actions, never both (411 +
                  254 overflows the 638 a band has).
     withAside    beside only — an aside belongs to a head TRACK, and only `beside` has one.
     media        the photograph is required — a media split without one is `stacked`. Actions are
                  allowed (they sit under the lead in the copy column); an aside is not.

   `actions` and `aside` are ReactNode slots for the same reason `footer` is: the caller composes a
   CtaRow (rule off) or a Media, and this band only places them. */

type PlainProps = {
  align?: 'start';
  arrangement?: 'stacked' | 'beside' | 'split-head';
  actions?: never;
  aside?: never;
  media?: never;
};

type CentredProps = {
  align: 'center';
  arrangement?: 'stacked';
  actions?: never;
  aside?: never;
  media?: never;
};

type WithActionsProps = {
  align?: 'start';
  arrangement?: 'stacked' | 'beside' | 'split-head';
  /**
   * The head's own action row, a `stack` (48) under the lead (§ 1.2: lead → actions) — in practice
   * a `CtaRow` with `rule={false}`. Stacked, under the lead; `beside`, in the head track
   * (H-beside-actions); `split-head`, in the trailing track under the lead (H-row); `media`, under
   * the lead in the copy column. Never on a centred head (§ 3.5), never beside an aside (§ 1.4 rule 6).
   */
  actions: ReactNode;
  aside?: never;
  media?: never;
};

type WithAsideProps = {
  align?: 'start';
  arrangement: 'beside';
  /**
   * The head track's one large object, a `stack` (48) under the head text: a 3:2 photograph
   * (`<Media ratio="3/2" sizes={HEAD_TRACK} />`, § 1.4 "photo aside, 3:2 at 381") or one stat-lg
   * figure (§ 3.3: D always has one). Below 1024 it sits between the head and the body (§ 3.7).
   *
   * Rendered only when the band actually splits (a head AND blocks). A degraded band has no head
   * track, so the aside is DROPPED rather than set full column: at 1240 a 3:2 photo is ~827 tall,
   * past the fold on its own, and HEAD_TRACK's `sizes` would serve it a 381-wide file, upscaled.
   */
  aside: ReactNode;
  actions?: never;
  media?: never;
};

type MediaSplitProps = {
  align?: 'start';
  arrangement: 'media';
  /** The photograph beside the copy. Required: a media split without one is `stacked`. */
  media: ContentSectionMedia;
  actions?: ReactNode;
  aside?: never;
};

export type ContentSectionProps = ContentSectionBaseProps &
  (PlainProps | CentredProps | WithActionsProps | WithAsideProps | MediaSplitProps);

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
 * sits at the start of the track like every other block (under a centred head the BLOCK is centred
 * and its text stays start-aligned), and in a track narrower than the measure the track wins. It
 * lives in ContentSection's folder and carries its name because it means nothing outside the band —
 * a long-form route states its own reading column.
 */
export function ContentSectionText({ children }: ContentSectionTextProps) {
  return <div className={styles.text}>{children}</div>;
}

/** Is there anything here to render? `Children.toArray` drops null, undefined and booleans. */
const present = (node: ReactNode) => Children.toArray(node).length > 0;

/**
 * ContentSection — one CMS section as one band, built for the shape every non-long-form page type
 * in this repo produces (services, expertise, audits, tools: see `ContentSectionText`) and for the
 * kit's band archetypes (visual-direction § 3.4): an optional eyebrow, one heading, an optional
 * lead, the head's own actions or aside, then a run of blocks and a foot.
 *
 * IT EXISTS FOR THE RHYTHM, and the rhythm is nesting rather than a knob (CLAUDE.md § Layout rule
 * 4 — tighten by grouping, loosen by separating):
 *
 *   block    (24)  eyebrow → heading → lead       the head text, one group (S1)
 *   stack    (48)  lead → actions · head → aside · head → body · block → block · body → footer
 *   section  (96)  head track → body track · photograph → copy      a split (CLAUDE.md gap rule 2)
 *
 * Inside the head, the eyebrow-to-title seam and the title-to-lead seam are the same step, so the
 * head text is one Layout — PageHero's and CtaSection's head rhythm, the one every section head in
 * the kit carries (§ 1.1, S1). Hierarchy inside the head comes from scale, not from a second gap.
 * Nothing here is a distance this file chose: every one is a gap-scale step, and none of them
 * shifts at a breakpoint. The ARRANGEMENT changes at 1024; the distances never do (CLAUDE.md § the
 * gap scale, rule 4).
 *
 * It contributes TYPE AND INK only. `Section` paints the band from the `surface` handed to it,
 * `Layout` owns every seam and every track, `Media` owns the photograph, and the blocks, actions,
 * aside and footer own themselves. There are no state tokens, which is the assertion that this
 * component's rendering is a function of its props: nothing in it responds to a pointer and
 * nothing opens.
 *
 * FOUR ARRANGEMENTS × TWO ALIGNMENTS, which is what lets a page change shape at every seam (§ 1.7)
 * without a new band component: stacked, beside (with an aside or actions in the head track),
 * split-head (the H-row) and media (the B split), each start-aligned, and stacked also centred.
 * Every one is Layout's props; there is no local grid.
 *
 * Route-blind and data-blind like every pattern — it never learns that Strapi exists.
 */
export function ContentSection(props: ContentSectionProps) {
  const { heading, headingId, eyebrow, lead, surface, density, footer, children } = props;
  const arrangement: ContentSectionArrangement = props.arrangement ?? 'stacked';
  const centred = props.align === 'center';
  const actions = props.actions;
  const media = props.arrangement === 'media' ? props.media : undefined;

  const hasText = Boolean(eyebrow || heading || lead);
  const hasActions = present(actions);
  const hasBlocks = present(children);
  const hasFooter = present(footer);
  const hasBody = hasBlocks || hasFooter;

  /* `beside` only splits when there are two halves to split: a head (text, actions or an aside) and
     BLOCKS. A footer alone is not a trailing half — a lone CtaRow in the two-thirds track sits level
     with the eyebrow over an empty track. Either half missing and the band is the stacked band: an
     empty one-third or two-thirds track is a hole in the page, not a layout. The lead's role follows
     the SPLIT, not the prop, so a degraded band reads exactly as stacked. */
  const requestedAside = props.arrangement === 'beside' ? props.aside : undefined;
  const besideSplit =
    arrangement === 'beside' && (hasText || hasActions || present(requestedAside)) && hasBlocks;

  /* The aside belongs to the head TRACK, so it exists only when the track does. A degraded band
     drops it: set full column at 1240 a 3:2 photo is ~827 tall (past the fold by itself), and the
     HEAD_TRACK `sizes` it was placed at would serve a 381-wide file, upscaled and soft. */
  const aside = besideSplit ? requestedAside : undefined;
  const hasAside = present(aside);
  const hasHead = hasText || hasActions || hasAside;

  /* `split-head` needs a heading for its leading track and a lead or actions for its trailing one.
     Without either, the head is the stacked head. */
  const headSplit =
    arrangement === 'split-head' && Boolean(heading) && (Boolean(lead) || hasActions);

  /* A `section` element is only honest when the band has a name. Unheaded, it is a `div` —
     an unnamed <section> is a region a screen reader announces and cannot identify. */
  const labelled = Boolean(heading && headingId);

  /* ── The head text's three parts ─────────────────────────────────────────────
     Built once, placed by the arrangement. `.centred` sets the text centred inside each part's own
     measure; the Layout holding the parts centres the parts themselves (justifyItems). */
  const eyebrowEl = eyebrow ? (
    <p className={cx(styles.eyebrow, centred && styles.centred)}>{eyebrow}</p>
  ) : null;
  const headingEl = heading ? (
    <h2 id={headingId} className={cx(styles.heading, centred && styles.centred)}>
      {heading}
    </h2>
  ) : null;
  const leadEl = lead ? (
    <p className={cx(styles.lead, besideSplit && styles.leadBeside, centred && styles.centred)}>
      {lead}
    </p>
  ) : null;

  /* The eyebrow-to-title seam and the title-to-lead seam are the same step, so one Layout at
     `block` (24): the rhythm PageHero and CtaSection already use (S1). */
  const headText = hasText ? (
    <Layout rowGap="block" justifyItems={centred ? 'center' : undefined}>
      {eyebrowEl}
      {headingEl}
      {leadEl}
    </Layout>
  ) : null;

  /* The body beat: the blocks, then the foot as the last row, every seam `stack`. A Layout of its
     own rather than spreading the children into the outer one, so the head group is ONE row of the
     outer stack no matter how many blocks follow.

     Centred (§ 3.5), the body is centred AS A BLOCK: `justifyItems="center"` centres each row in
     the column, and `.bodyCentred` gives every row the full column as its width, so a row with no
     measure of its own (a card set, a table) still spans the column and a row that caps itself (an
     accordion in ContentSectionText, a centred CtaRow) sits in the middle at its cap. Without that
     width, `center` would shrink every row to its content — a card set to whatever its copy needs. */
  const body = hasBody ? (
    <Layout
      rowGap="stack"
      justifyItems={centred ? 'center' : undefined}
      className={centred ? styles.bodyCentred : undefined}
    >
      {children}
      {footer}
    </Layout>
  ) : null;

  let arranged: ReactNode;

  if (arrangement === 'media' && media) {
    arranged = (
      <MediaSplit
        media={media}
        headText={headText}
        actions={hasActions ? actions : null}
        blocks={hasBlocks ? <Layout rowGap="stack">{children}</Layout> : null}
        footer={hasFooter ? footer : null}
        /* § 3.2 rule 1: a copy column that ENDS in an action stretches to the photograph's height
           and pins that action to its bottom edge — but only when blocks sit between the head and
           the action (§ 3.4 B: H-full + tiles, or ≤ 2 tiles + a CtaRow). With no blocks there is
           nothing to fill the stretch, and pinning opens a 350–400 hole between the lead and the
           action at 1440; that copy column is centred on the photo instead (rule 2), as is any
           copy that does not end in an action — and any whose caller passed `media.pin: false`
           (the owner comparison, open question 7 in the spec). */
        pinFooter={hasBlocks && hasFooter && media.pin !== false}
      />
    );
  } else if (headSplit) {
    /* split-head (the H-row). The eyebrow keeps its own row above the split — it labels the whole
       row, not the title's column — and then the heading and the lead (with the actions under it)
       sit side by side: [1, 2] from 1024 at the split seam (96), TOP-aligned, so the heading's line
       box and the lead's start on one edge and the row reads as one horizontal unit.

       Why not the eyebrow inside the leading track: whichever way that pair is aligned, the two
       tracks disagree. Top-aligned, the 20px lead starts level with the 12px eyebrow and floats
       beside a label; bottom-aligned, the trailing track (lead + 48 + action, ≈ 128) is the taller
       one, so the heading drops below the lead's first line and the eyebrow lands mid-paragraph.
       Measured on the specimen at 1440 (6 Oct 2026); § 1.4's H-row arithmetic changes from 156 to
       14 + 24 + max(94, 128) = 166, still 40 under the C-image-3 target with a 381 set (595).

       Below 1024 the split is one track and every seam is the stacked head's: eyebrow → heading
       24 (the outer `block`), heading → lead 24 (the split's `rowGap`), lead → actions 48. */
    arranged = (
      <Layout rowGap="stack">
        <Layout rowGap="block">
          {eyebrowEl}
          <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
            {headingEl}
            <Layout rowGap="stack">
              {leadEl}
              {hasActions ? actions : null}
            </Layout>
          </Layout>
        </Layout>
        {body}
      </Layout>
    );
  } else {
    /* stacked, beside, and every degraded case. One outer Layout; `beside` touches it only through
       Layout's own props.

         rowGap  stack (48)   head → body when the two are rows: always under `stacked`, and under
                              `beside` below 1024, which is what makes the collapse identical to
                              `stacked` rather than merely similar.
         colGap  section (96) head track → body track under `beside` — a split, two kinds of thing
                              sharing a row (CLAUDE.md § gap scale, rule 2).
         columns {lg: [1,2]}  1 : 2 from 1024 (O2), one track below. Undefined when not split.
         align   start        the head is STATIC (O2): it sits at the top of its track and scrolls
                              away with the band, sized to its content rather than stretched to the
                              body's height.

       The head group is the head text, then the actions or the aside a `stack` beneath it — lead →
       actions and head → aside are both block-to-block seams (§ 1.2). */
    const headGroup =
      hasActions || hasAside ? (
        <Layout rowGap="stack">
          {headText}
          {hasActions ? actions : null}
          {hasAside ? aside : null}
        </Layout>
      ) : (
        headText
      );

    arranged = (
      <Layout
        rowGap="stack"
        colGap={besideSplit ? 'section' : undefined}
        columns={besideSplit ? { lg: [1, 2] } : undefined}
        align={besideSplit ? 'start' : undefined}
      >
        {hasHead ? headGroup : null}
        {body}
      </Layout>
    );
  }

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      surface={surface}
      density={density}
      aria-labelledby={labelled ? headingId : undefined}
      data-arrangement={arrangement}
    >
      {arranged}
    </Section>
  );
}

/**
 * The `media` arrangement's two tracks: the photograph and the copy column (§ 3.2, § 3.4 B).
 *
 *   columns {lg: [5, 7]}    the photo in 5 (477 at 1470), the copy in 7 (667), from 1024
 *   colGap  section (96)    a split: copy beside an image (CLAUDE.md gap rule 2)
 *   rowGap  stack (48)      below 1024, photo above copy — a block-to-block seam
 *   reverse {lg: true}      `side="end"`: the photo moves to the end track AND keeps its 5 — Layout
 *                           mirrors the template with the children. Visual only: the photo stays
 *                           first in the DOM, which is the phone's order (photo above the copy in B,
 *                           § 3.7), and it carries no meaning against the copy (an atmosphere photo,
 *                           alt="").
 *   align   stretch|center  the copy column stretches to the photo's height when blocks sit above
 *                           a footer (unless `media.pin` is false), and is centred on it otherwise
 *                           (§ 3.2 rules 1 and 2)
 *
 * The photograph sits in a plain `div` because the row may STRETCH: a stretched `<img>` would take
 * the row's height and lose its 4:5. The div stretches; the image inside keeps its crop at the top
 * of it, so a copy column taller than the photo (stress copy, a narrow window) leaves air under the
 * photo rather than distorting it.
 *
 * The copy column is FLAT — head text, actions, blocks, footer as direct rows at `stack` — because
 * `pinLast` pins the last child, and the last child must be the action itself, not a group that
 * happens to end in one.
 */
function MediaSplit({
  media,
  headText,
  actions,
  blocks,
  footer,
  pinFooter,
}: {
  media: ContentSectionMedia;
  headText: ReactNode;
  actions: ReactNode;
  blocks: ReactNode;
  footer: ReactNode;
  pinFooter: boolean;
}) {
  return (
    <Layout
      columns={{ lg: [5, 7] }}
      colGap="section"
      rowGap="stack"
      reverse={media.side === 'end' ? { lg: true } : undefined}
      align={pinFooter ? 'stretch' : 'center'}
    >
      <div>
        {/* 4:5 beside the copy, 4:3 above it (§ 3.7 item 4): a 4:5 at the 326 phone column would be
            408 tall before the first word of the copy. */}
        <Media image={media.image} ratio={{ base: '4/3', lg: '4/5' }} sizes={MEDIA_SPLIT} />
      </div>
      <Layout rowGap="stack" pinLast={pinFooter}>
        {headText}
        {actions}
        {blocks}
        {footer}
      </Layout>
    </Layout>
  );
}
