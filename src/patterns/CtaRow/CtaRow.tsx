import { Button, Cluster, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './CtaRow.module.css';

/** One action. `href` comes from `@/lib/routes` at the call site, never written out there. */
export type CtaRowAction = {
  label: string;
  href: string;
};

/**
 * What the row is. The pairing rules are the owner's (7 Oct 2026) and the TYPES carry them, so a page
 * cannot get one wrong:
 *
 *   link   a navigation row — "See the work", "All services". ONE link-style action with the trailing
 *          arrow (the kit's link cue). One, because two links side by side are two actions of the
 *          same emphasis, which a group never is: a second destination is a second band's, or the
 *          row is an ask and takes `solid`. The default, because a band's foot usually points
 *          somewhere rather than asks for something.
 *   solid  an ask — the band's one Accent (visual-direction § 4.2: ≤ 1 solid primary per band). The
 *          main next step (the conversion when there is one; visual-direction § 4.5) is solid
 *          and NEVER carries an arrow (the label carries the ask). Its optional partner is a
 *          GHOST — never a link — with the trailing arrow, because it navigates. That is PageHero's and CtaSection's shape exactly.
 *
 * Arrows are therefore the row's decision, not the caller's: link → arrow, solid → none, ghost
 * partner → arrow. There is no per-action emphasis and no icon prop.
 */
export type CtaRowEmphasis = 'link' | 'solid';

/**
 * The FIRST action's colour axis — Button's `tone`, passed through. A solid row's ghost partner is
 * always primary and takes no tone.
 *
 *   primary  blue. As a link it is the band's Signal; as a solid it is the band's Accent (§ 4.2).
 *            The default for a LINK-led row (amended 6 Oct 2026, fdn-section-head fix round): the
 *            owner's binding ruling wants more blue in the foreground — links, arrows, small marks —
 *            so a band's foot points somewhere in blue unless the caller says otherwise. A link row
 *            spends Signal, the cheap tier.
 *   neutral  ink. Spends nothing (§ 4.2: "neutral link-style is not blue"). The default for a SOLID-
 *            led row, because a solid primary spends Accent (≤ 1 per band, the scarcest tier) and the
 *            caller spends that on purpose. Pass it on a link row only when the band already spends a
 *            different KIND of Signal — G's quote rule, E's diagram line (§ 4.2: ≤ 1 kind per band) —
 *            or has already spent its two of Accent, Signal, Field and Texture.
 */
export type CtaRowTone = 'neutral' | 'primary';

/**
 * Where the row sits in its box.
 *
 *   start   note at the start and actions at the end ("between") when there is a note; the actions
 *           at the start when there is not. Every left-weighted band.
 *   center  note and actions centred, and the whole row — rule included — capped at the body
 *           measure, for a band under a centred head (D-faq, S, G typographic: § 3.5). The band
 *           centres the capped row as a block; the row centres its own content.
 */
export type CtaRowAlign = 'start' | 'center';

type CtaRowCommon = {
  /**
   * One sentence before the actions — what the action is FOR ("Every engagement starts with a
   * thirty-minute call."). Body-sm, the row's small voice. Absent renders no element; a
   * whitespace-only string is treated as absent.
   */
  note?: string;
  /**
   * The hairline above the row. Default `true`: a section-level CtaRow — a band's `footer` — takes
   * one (§ 3.1 item 5), because it marks where the body ends and the ask begins. `false` for a row
   * in a HEAD (ContentSection's `actions`), which sits a `stack` under the lead and has no body above
   * it to close off; a rule there would read as an underline on the lead. And `false` under a
   * RULED LADDER — an Accordion, a set of ListCard rows, a DataTable — whose last rule already closes
   * the body: a second hairline a `stack` under the first reads as a double rule, not as an edge.
   * And `false` for a FOOTER IN A BAND WITH NO BLOCKS (a footer-only band, a media split that is a
   * head and its ask): there is no body for the rule to close, so it sits a `stack` under the lead
   * and reads as the same underline. The row cannot see what is above it, so the placing caller
   * states it; ContentSection's `footer` doc says so.
   */
  rule?: boolean;
  /** Default `start`. See `CtaRowAlign`. */
  align?: CtaRowAlign;
};

/**
 * A navigation row: one link with the arrow. A second action does not compile (two links side by
 * side — owner, 7 Oct 2026).
 */
type CtaRowLink = {
  /** Default `link`. See `CtaRowEmphasis`. */
  emphasis?: 'link';
  actions: readonly [CtaRowAction];
  /** The link's colour. Default `primary` — Signal, a blue foot. See `CtaRowTone`. */
  tone?: CtaRowTone;
};

/**
 * An ask: the solid main next step (no arrow), and at most one ghost partner (trailing arrow).
 * Position decides emphasis — the first is the solid, the second the ghost — so a page cannot pair a
 * solid with a link button or put two solids together.
 */
type CtaRowSolid = {
  emphasis: 'solid';
  actions: readonly [CtaRowAction] | readonly [CtaRowAction, CtaRowAction];
  /**
   * The SOLID's colour. Default `neutral`: a primary solid spends Accent, and the caller spends that
   * on purpose. The ghost partner is always `primary` — its blue label and arrow are the foreground
   * accent (§ 4.2), and a ghost has no fill at rest to compete with the solid.
   */
  tone?: CtaRowTone;
};

export type CtaRowProps = CtaRowCommon & (CtaRowLink | CtaRowSolid);

/**
 * CtaRow — a band's row of actions, built to docs/specs/CtaRow.md (fdn-section-head, 6 Oct 2026).
 *
 * The section-level CTA the kit needs in four families (visual-direction § 1.4): under a card set,
 * under a read-down, under a quote, under an FAQ, at the foot of a media split's copy column — and,
 * with the rule off, in a section head's actions slot. Before it, each of those would have been a
 * Cluster of Buttons written at the call site, each with its own guess at emphasis, glyph and gap.
 *
 *   ┌───────────────────────────────────────────── rule (hairline, neutral) ─┐
 *   │                              block (24)                                │
 *   │ note (body-sm, ≤ 56ch)         between       [ ASK ]  [ PARTNER → ]   │
 *   │                              or, a link row:                  LINK → │
 *   └────────────────────────────────────────────────────────────────────────┘
 *
 * § 1.4 budgets it at "48 seam + one 48 row": the band supplies the 48 above it (its `footer` is a
 * `stack` under the body), and the row is the 1px rule, the 24 `block` step and a link label line
 * of about 22 — 47. A solid action makes the row 65 (a 40 box), which the 40px slack absorbs.
 *
 * Distances, every one a gap-scale step and none of them responsive:
 *   rule → row        block (24)   head to body inside a block: the rule is the row's head
 *   note ↔ actions    block (24) across and when they wrap — at 326 the note wraps above the
 *                                  actions, and 16 there sat the mono label tight under body-sm
 *                                  (fix round, 6 Oct: the owner rules spacing is never cramped)
 *   action ↔ action   block (24)   solid ↔ ghost partner: PageHero's argument — two boxes need clear
 *                                  air between them, wrapped or across
 *
 * It contributes the rule and the note only. `Button` owns every interactive value and state,
 * `Cluster` and `Layout` every seam, the band its ground. No `'use client'`, no state, no ref.
 *
 * A pattern for the usual two reasons: it consumes a content shape (`{ label, href }`) and it
 * composes Button, Icon, Cluster and Layout. It is placed by a band — ContentSection's `footer` or
 * `actions`, or a template's own row — and never imports one.
 */
export function CtaRow(props: CtaRowProps) {
  const { actions, note, rule = true, align = 'start' } = props;
  const centred = align === 'center';
  /* Whitespace-only is absent, so a bad record cannot put an empty paragraph in front of the
     actions and turn a start row into a "between" row around nothing. */
  const hasNote = Boolean(note?.trim());
  const ask = props.emphasis === 'solid';
  /* Signal by default, Accent only on request (see CtaRowTone). */
  const firstTone: CtaRowTone = props.tone ?? (ask ? 'neutral' : 'primary');

  /* The owner's pairing (7 Oct 2026), decided here and nowhere else:
       link row     one link, `firstTone`, trailing arrow — the link cue.
       solid row    the solid ask, `firstTone`, NO arrow — the label carries the ask; then at most
                    one ghost partner, primary, trailing arrow — it navigates.
     Every action is an anchor, so a ghost here always navigates and always takes the arrow. */
  const buttons = actions.map((action, index) => {
    const solid = ask && index === 0;
    return (
      <Button
        key={`${index}-${action.href}-${action.label}`}
        as="a"
        href={action.href}
        emphasis={solid ? 'solid' : ask ? 'ghost' : 'link'}
        tone={index === 0 ? firstTone : 'primary'}
        size="md"
        /* The box is 40 (solid, ghost) or the label line (link); the touch floor is 44 either way. */
        extendHitArea
        icon={solid ? undefined : <Icon name="arrow-right" />}
      >
        {action.label}
      </Button>
    );
  });

  return (
    <Layout rowGap="block" className={centred ? styles.centredBox : undefined}>
      {rule ? <div className={styles.rule} /> : null}
      {/* `between` only when there is a note to sit opposite the actions: a lone action at the far
          end of a 1240 row reads as stranded, so without a note the actions start the row. Centred
          rows centre everything. `center` on the cross axis, because a link has no box and its
          label must sit on the solid's label line and on the note's. */}
      <Cluster
        colGap="block"
        rowGap="block"
        align="center"
        justify={centred ? 'center' : hasNote ? 'between' : 'start'}
      >
        {hasNote ? <p className={cx(styles.note, centred && styles.centred)}>{note}</p> : null}
        <Cluster colGap="block" rowGap="block" align="center">
          {buttons}
        </Cluster>
      </Cluster>
    </Layout>
  );
}
