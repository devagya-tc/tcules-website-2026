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
 *   solid  the band's main next step (visual-direction § 4.5) — blue when it converts, ink when it
 *          does not (see `converts`). The solid NEVER carries an arrow (the label carries the ask). Its optional partner is a
 *          GHOST — never a link — with the trailing arrow, because it navigates. That is PageHero's and CtaSection's shape exactly.
 *
 * Arrows are therefore the row's decision, not the caller's: link → arrow, solid → none, ghost
 * partner → arrow. There is no per-action emphasis and no icon prop.
 */
export type CtaRowEmphasis = 'link' | 'solid';

/**
 * Colour is not the caller's to choose (owner, 7 Oct 2026; visual-direction § 4.5). It follows the
 * KIND of action, and the row derives it:
 *
 *   link row       the link is blue — Button `tone="primary"`, always. A link spends Signal, and a
 *                  link and its arrow are the foreground blue the owner's ruling asks for.
 *   solid row      the solid is BLUE when it converts (`converts: true` — the reader starts something
 *                  with the studio: start a project, book a call, request an audit, contact, apply,
 *                  subscribe) and INK when it does not (`converts: false` — "See the work", "Meet the
 *                  team", "See open roles": a band's lead action that is a next step, not an ask).
 *   ghost partner  blue, always, whatever the solid beside it is. Ink solid + blue ghost is the
 *                  intended non-converting pair.
 *
 * `converts` is REQUIRED on a solid row and has no default: a silent default would pick a plausible
 * colour for an action nobody classified, which is the same mistake as a silent gap.
 */
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
  /** A link row has no solid to classify: its link is always blue (owner, 7 Oct 2026). */
  converts?: never;
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
   * Does the solid action CONVERT — does the reader start something with the studio by taking it?
   * `true` renders it blue (Button `tone="primary"`), `false` ink (`tone="neutral"`). Required, no
   * default: judge the action itself, not the page or the band — "Apply" converts, "See open roles"
   * does not (owner, 7 Oct 2026; visual-direction § 4.5). The ghost partner is blue either way.
   */
  converts: boolean;
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
  /* The solid's colour is the action's kind (see `converts`); every other action is blue. */
  const solidTone = props.emphasis === 'solid' && !props.converts ? 'neutral' : 'primary';

  /* The owner's pairing (7 Oct 2026), decided here and nowhere else:
       link row     one link, blue, trailing arrow — the link cue.
       solid row    the solid, blue if it converts and ink if not, NO arrow — the label carries
                    the ask; then at most
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
        tone={solid ? solidTone : 'primary'}
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
