import { Button, Cluster, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './CtaRow.module.css';

/** One action. `href` comes from `@/lib/routes` at the call site, never written out there. */
export type CtaRowAction = {
  label: string;
  href: string;
};

/**
 * How loud the FIRST action is. Every later action is a link: in the first's tone on a link row, in
 * the primary tone (blue at rest) after a solid — a text link is blue at rest (fdn-blue, 6 Oct 2026).
 *
 *   link   a navigation row — "See the work", "All services". Link-style, a trailing arrow on every
 *          action (the kit's one link cue, BlockCard's per-card CTA and ListCard's linked row). The
 *          default, because a band's foot usually points somewhere rather than asks for something.
 *   solid  an ask — the band's one Accent (visual-direction § 4.2: ≤ 1 solid primary per band). The
 *          hero's shape exactly: solid first with no glyph (1 Oct 2026, owner, on CtaSection: "no
 *          arrow here" — the label carries the ask), then a blue link with the arrow, as every
 *          link-style action has it (cmp-services fix round 2).
 */
export type CtaRowEmphasis = 'link' | 'solid';

/**
 * The FIRST action's colour axis — Button's `tone`, passed through.
 *
 *   primary  blue. As a link it is the band's Signal; as a solid it is the band's Accent (§ 4.2).
 *            The default for a LINK-led row (amended 6 Oct 2026, fdn-section-head fix round): the
 *            owner's binding ruling wants more blue in the foreground — links, arrows, small marks —
 *            so a band's foot points somewhere in blue unless the caller says otherwise. A link row
 *            spends Signal, the cheap tier, counted once per band however many links it holds.
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

export type CtaRowProps = {
  /**
   * One or two actions. A third does not compile: a band's foot is one way on and at most one
   * alternative, and three links in a row is a nav strip.
   *
   * Position decides emphasis, as in CtaSection and PageHero — there is no per-action emphasis.
   */
  actions: readonly [CtaRowAction] | readonly [CtaRowAction, CtaRowAction];
  /**
   * One sentence before the actions — what the action is FOR ("Every engagement starts with a
   * thirty-minute call."). Body-sm, the row's small voice. Absent renders no element; a
   * whitespace-only string is treated as absent.
   */
  note?: string;
  /** The first action's loudness. Default `link`. See `CtaRowEmphasis`. */
  emphasis?: CtaRowEmphasis;
  /**
   * The first action's colour. Default `primary` for a link-led row and `neutral` for a solid-led
   * one — Signal spent by default, Accent never. See `CtaRowTone`.
   */
  tone?: CtaRowTone;
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
 * CtaRow — a band's row of actions, built to docs/specs/CtaRow.md (fdn-section-head, 6 Oct 2026).
 *
 * The section-level CTA the kit needs in four families (visual-direction § 1.4): under a card set,
 * under a read-down, under a quote, under an FAQ, at the foot of a media split's copy column — and,
 * with the rule off, in a section head's actions slot. Before it, each of those would have been a
 * Cluster of Buttons written at the call site, each with its own guess at emphasis, glyph and gap.
 *
 *   ┌───────────────────────────────────────────── rule (hairline, neutral) ─┐
 *   │                              block (24)                                │
 *   │ note (body-sm, ≤ 56ch)           between           Action →   Action → │
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
 *   action ↔ action   block (24)   PageHero's argument: a bare link label 8 from a filled box reads
 *                                  as part of it, and wrapped targets need clear air between them
 *
 * It contributes the rule and the note only. `Button` owns every interactive value and state,
 * `Cluster` and `Layout` every seam, the band its ground. No `'use client'`, no state, no ref.
 *
 * A pattern for the usual two reasons: it consumes a content shape (`{ label, href }`) and it
 * composes Button, Icon, Cluster and Layout. It is placed by a band — ContentSection's `footer` or
 * `actions`, or a template's own row — and never imports one.
 */
export function CtaRow({
  actions,
  note,
  emphasis = 'link',
  tone,
  rule = true,
  align = 'start',
}: CtaRowProps) {
  const centred = align === 'center';
  /* Whitespace-only is absent, so a bad record cannot put an empty paragraph in front of the
     actions and turn a start row into a "between" row around nothing. */
  const hasNote = Boolean(note?.trim());
  const linkRow = emphasis === 'link';
  /* Signal by default, Accent only on request (see CtaRowTone). */
  const firstTone: CtaRowTone = tone ?? (linkRow ? 'primary' : 'neutral');

  const buttons = actions.map((action, index) => {
    const first = index === 0;
    return (
      <Button
        key={`${index}-${action.href}-${action.label}`}
        as="a"
        href={action.href}
        emphasis={first && !linkRow ? 'solid' : 'link'}
        tone={first || linkRow ? firstTone : 'primary'}
        size="md"
        /* The box is 40 (solid) or the label line (link); the touch floor is 44 either way. */
        extendHitArea
        /* The arrow belongs to the LINK role, not to the row (cmp-services fix round 2): every
           link-style action carries it, and only the solid ask goes without — PageHero's and
           CtaSection's shape ("no arrow here" was the ask). Before, a solid-led row dropped it from
           its second link too, so "All services" had an arrow in the hero and none in a head. */
        icon={first && !linkRow ? undefined : <Icon name="arrow-right" />}
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
