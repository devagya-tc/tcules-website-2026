import { Button, Cluster, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './CtaRow.module.css';

/** One action. `href` comes from `@/lib/routes` at the call site, never written out there. */
export type CtaRowAction = {
  label: string;
  href: string;
};

/**
 * How loud the FIRST action is. The second is always a neutral link, whichever this is.
 *
 *   link   a navigation row — "See the work", "All services". Link-style, a trailing arrow on every
 *          action (the kit's one link cue, BlockCard's per-card CTA and ListCard's linked row). The
 *          default, because a band's foot usually points somewhere rather than asks for something.
 *   solid  an ask — the band's one Accent (visual-direction § 4.2: ≤ 1 solid primary per band). The
 *          hero's shape exactly: solid first, a neutral link second, and no glyph on either (1 Oct
 *          2026, owner, on CtaSection: "no arrow here" — the label carries the ask).
 */
export type CtaRowEmphasis = 'link' | 'solid';

/**
 * The FIRST action's colour axis — Button's `tone`, passed through.
 *
 *   neutral  ink. Spends nothing (§ 4.2: "neutral link-style is not blue"). The default, so a band
 *            never spends blue on its foot without saying so.
 *   primary  blue. As a link it is the band's Signal; as a solid it is the band's Accent. The caller
 *            is spending one of the band's two (§ 4.2 band rule) and should know which.
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
  /** The first action's colour. Default `neutral`, so blue is only ever spent on purpose. */
  tone?: CtaRowTone;
  /**
   * The hairline above the row. Default `true`: a section-level CtaRow — a band's `footer` — takes
   * one (§ 3.1 item 5), because it marks where the body ends and the ask begins. `false` for a row
   * in a HEAD (ContentSection's `actions`), which sits a `stack` under the lead and has no body above
   * it to close off; a rule there would read as an underline on the lead. And `false` under a
   * RULED LADDER — an Accordion, a set of ListCard rows, a DataTable — whose last rule already closes
   * the body: a second hairline a `stack` under the first reads as a double rule, not as an edge.
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
 *   note ↔ actions    block (24) across, text (16) when they wrap
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
  tone = 'neutral',
  rule = true,
  align = 'start',
}: CtaRowProps) {
  const centred = align === 'center';
  /* Whitespace-only is absent, so a bad record cannot put an empty paragraph in front of the
     actions and turn a start row into a "between" row around nothing. */
  const hasNote = Boolean(note?.trim());
  const linkRow = emphasis === 'link';

  const buttons = actions.map((action, index) => {
    const first = index === 0;
    return (
      <Button
        key={`${index}-${action.href}-${action.label}`}
        as="a"
        href={action.href}
        emphasis={first && !linkRow ? 'solid' : 'link'}
        tone={first ? tone : 'neutral'}
        size="md"
        /* The box is 40 (solid) or the label line (link); the touch floor is 44 either way. */
        extendHitArea
        icon={linkRow ? <Icon name="arrow-right" /> : undefined}
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
        rowGap="text"
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
