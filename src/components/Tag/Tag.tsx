import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Tag.module.css';

/**
 * Which of the two things this is. They share a box and differ in enclosure, voice and behaviour.
 *
 *   mark    the inert taxonomy label — names what a page is filed under and does nothing.
 *           A `span`, 13px sans in the case somebody authored, a quiet ground and no edge.
 *   filter  the interactive chip — offers a query the reader can apply, and behaves like the
 *           control it is. An `a href`, 12px mono uppercase by role, an edge and no ground.
 *
 * The enclosure is an INVERSION rather than a degree: a ground with no edge against an edge with
 * no ground. There is no amount of fading that turns an outline into a fill, which is what stops
 * the two being read as one treatment at two strengths — and it is what makes it impossible to
 * mistake an inert mark for a SELECTED filter, since a held chip is a reversal to the far end of
 * the ramp and a mark is a tint at 1.12:1.
 *
 *   disclosure  the filter chip as the `<summary>` of a native `<details>` (critique 16 Oct 2026): a
 *           "More filters" trigger in a row of filter chips, the chip's own box, voice, edge and
 *           states, so the row reads as one control at one height. It opens a panel rather than
 *           applying a query, so it takes no `href` and no held state; its glyph (a chevron the
 *           caller passes) turns while the panel is open. The archive's filter row built its own
 *           34px button for this before, beside 24px chips.
 */
export type TagVariant = 'mark' | 'filter' | 'disclosure';

/* The inert half. It takes a string and nothing else — no href, because there is no taxonomy
   archive to link to (src/lib/routes.ts: "Insights — formats are index pages, not tags"), and no
   selected, because an inert mark has no held state to be in. Both are compile errors rather than
   review comments, which is the hard constraint expressed as a type. */
type MarkTag = {
  variant?: 'mark';
  href?: never;
  selected?: never;
  current?: never;
  icon?: never;
};

/* The interactive half. `href` is required: a control that navigates nowhere is a focusable dead
   end. `icon` is legal only here, because a glyph cannot be attached to a label that is not a
   control. */
type FilterTag = {
  variant: 'filter';
  /**
   * The destination. A query-string rewrite on the same route today; this component neither
   * builds it nor parses it. Paths come from `@/lib/routes`, never written out at the call site.
   */
  href: string;
  /**
   * The HELD state — this filter is the one in effect. Takes the `-pressed` ink, edge and ground,
   * holds them through hover and focus, and emits `aria-current="true"`.
   *
   * It is the one paint state that survives the pointer, and that is deliberate: the box is
   * already at the end of the ramp, so repainting it back into the pale hover tint would say
   * DESELECTED at the exact moment a reader is deciding whether to clear it.
   */
  selected?: boolean;
  /**
   * What the held chip IS, announced as `aria-current`. `'true'` (the default) for a filter state:
   * the page has not changed, the query has. `'page'` when the link is the page you are on — a row
   * of Tags used as a sub-nav between pages (the insights format row), where "current page" is the
   * truth and "current item" would mislead a screen reader. Ignored unless `selected`.
   */
  current?: 'true' | 'page';
  /**
   * One glyph, after the label, on the held chip.
   *
   * Taken as a node rather than a name because a primitive may not import `Icon` — the same
   * reason `Button` takes its own `icon`. The call site passes
   * `<Icon name="close-circle" label="Clear filter" />` beside an `href` that clears that group's
   * parameter, which is what makes the glyph a control rather than a decoration: with no "All"
   * chip in the row, it is the ONLY way back to an unfiltered group.
   *
   * The node must be presentational — an `Icon`, nothing focusable, no `href`, no `onClick`. A
   * control inside a chip would be a nested interactive.
   */
  icon?: ReactNode;
};

/* The disclosure half: a `<summary>`, so it must be the FIRST child of the caller's `<details>`.
   No href (it opens, it does not navigate) and no held state (what is held inside it is said by the
   chips in its panel, and by a count the caller writes into the label). */
type DisclosureTag = {
  variant: 'disclosure';
  href?: never;
  selected?: never;
  current?: never;
  /**
   * The chevron, after the label: `<Icon name="alt-arrow-down" />`. A node, as on the filter,
   * because a primitive may not import `Icon`. Presentational only. It turns half a turn while the
   * `<details>` is open.
   */
  icon?: ReactNode;
};

export type TagProps = (MarkTag | FilterTag | DisclosureTag) & {
  /**
   * The label, in the capitalisation somebody authored — "Product Modernisation Assessment", never
   * PRODUCT MODERNISATION ASSESSMENT in the data. The filter's uppercase is `text-transform` in
   * the stylesheet, so the accessible name keeps the author's case either way.
   *
   * A `string` and not a `ReactNode`, and that is the enforcement mechanism rather than a
   * preference: markup in a label is how a case, a weight or a second colour gets smuggled past
   * the stylesheet.
   */
  children: string;
};

/**
 * Tag — the site's small label mark, built to docs/specs/Tag.md.
 *
 * Two variants, ONE size, and one box. It contributes no colour and no distance of its own: every
 * value comes from `--tag-*` in tokens/components/tag.css, which re-declares the whole set once
 * per surface. So the same markup is correct on paper, on a tint panel, in an ink band and on a
 * blue pivot — including a tint panel nested inside an ink section — without being told where it
 * is. Put it inside a `Section` and `data-surface` does the rest.
 *
 * IT IS NOT A ROW. `Cluster` is the row: it owns the wrap and both gaps, and it is already at all
 * eleven call sites. There is no `TagList`, no `tags: string[]` and no overflow affordance — a
 * component that owns its own row is a pattern, and this is a mark.
 *
 *     <Cluster as="ul" colGap="text" rowGap="tight">
 *       {tags.map((t) => <li key={t}><Tag>{t}</Tag></li>)}
 *     </Cluster>
 *
 * The props type is CLOSED — no `className`, no `style`, no `...rest`, no index signature. The
 * only reasons to reach in are colour, spacing and width, and all three are answered by the token
 * layer, by `Cluster` and by the box itself.
 */
function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Tag: ${message}`);
}

export function Tag({
  variant = 'mark',
  href,
  selected,
  current = 'true',
  icon,
  children,
}: TagProps) {
  /* A blank label renders NOTHING, matching BlockCard's handling of a whitespace title. The
     alternative is a 24 x 24 empty box — and for the filter, a focusable control with no
     accessible name, which is a target a keyboard user can reach and cannot identify. Returning
     null is the only handling that cannot ship one. The type says `string`, so this is the
     whitespace case rather than a missing prop: `''` and `'   '` both type-check. */
  if (children.trim().length === 0) {
    warn('children is blank; rendering nothing.');
    return null;
  }

  /* The inert half returns early rather than sharing a ternary with the anchor. It has no states,
     no glyph and no attributes: a styled text node, announced as text, not in the tab order, and
     with no `role` — the element supplies it. */
  if (variant === 'mark') {
    return (
      <span className={cx(styles.tag, styles.mark)}>
        <span className={styles.label}>{children}</span>
      </span>
    );
  }

  /* The disclosure: the filter chip's box as a native summary. The element is the button; its text
     is its accessible name, and `<details>` announces expanded and collapsed by itself. */
  if (variant === 'disclosure') {
    return (
      <summary
        className={cx(
          styles.tag,
          styles.filter,
          styles.disclosure,
          icon !== undefined && styles.hasGlyph,
        )}
      >
        <span className={styles.label}>{children}</span>
        {icon}
      </summary>
    );
  }

  return (
    <a
      href={href}
      /* The held state, announced. `aria-current` and not `aria-pressed`: this is a link, the URL
         is the state, and `aria-pressed` on an anchor is a role contradiction. `"true"` for a
         filter (the page has not changed, the query has); `"page"` only where the caller says the
         link is the page itself (`current`). */
      aria-current={selected ? current : undefined}
      className={cx(
        styles.tag,
        styles.filter,
        selected && styles.selected,
        /* Drives the glyph gap and restores the inline-end padding the label trim took: with a
           glyph there, the trailing element is no longer a tracked capital, so there is no
           letter-space left to take back. */
        icon !== undefined && styles.hasGlyph,
      )}
    >
      <span className={styles.label}>{children}</span>
      {icon}
    </a>
  );
}
