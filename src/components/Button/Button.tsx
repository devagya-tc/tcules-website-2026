import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Button.module.css';

/**
 * How loud the button is.
 *
 *   solid  the one action a view is asking for
 *   ghost  the default secondary — no outline, the fill is the whole affordance
 *   link   reading rather than doing; no box at all, so it can sit in a paragraph
 *
 * None of the three carries an outline. Separation comes from fill and from the space around it.
 */
export type ButtonEmphasis = 'solid' | 'ghost' | 'link';

/**
 * What the button claims. This is the token layer's colour axis — `primary` and `neutral` select
 * `--btn-{emphasis}-primary-*` and `--btn-{emphasis}-neutral-*` respectively.
 *
 * It is named `tone` rather than `color` for one reason: `color` is a real (if deprecated) HTML
 * attribute, so a prop of that name collides with React's own typing for every element this can
 * render as, and the resulting error points at the DOM rather than at the design system.
 *
 *   primary  Brandeis blue — this is the offer. On the web, blue means clickable, and nothing
 *            else on the page may borrow the colour.
 *   neutral  ink — claims nothing and gets the work done. Not a downgrade: neutral solid is the
 *            most legible button in the system at 17:1. It is where blue would make a utility
 *            sound like an offer — send, copy, download, close.
 */
export type ButtonTone = 'primary' | 'neutral';

/**
 * Three heights. Only the height, the label and the icon step — the box padding, the label margin
 * and the gap are identical at all three, so a button never looks like a different button at a
 * different size.
 *
 *   sm  32  table rows, toolbars, filter sets, anything inside a dense grid cell
 *   md  40  the default: headers, forms, cards, every button with no reason to be another size
 *   lg  48  heroes, closing calls, and every button on a phone
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/* Everything a <button> accepts, minus the two we redefine. `color` is dropped so `tone` can own
   the colour axis without colliding with the HTML attribute; `children` is dropped so each variant
   below can state its own rule about whether a label is required. */
type ButtonBase = Omit<ComponentPropsWithoutRef<'button'>, 'color' | 'children'> & {
  /**
   * Element to render. Defaults to `button`.
   *
   * A button that NAVIGATES is an anchor: `as="a"` with an href, or `as={Link}` for an internal
   * route. Link emphasis is almost always an anchor; solid and ghost are almost always buttons.
   * Paths come from `@/lib/routes`, never written out at the call site.
   *
   *     <Button as={Link} href={ROUTES.contact}>Start a project</Button>
   *     <Button as="a" href="https://example.com">Read the paper</Button>
   *
   * `type` and `disabled` are only emitted for a real `button`; an anchor gets `aria-disabled`
   * and leaves the tab order instead, because neither attribute means anything on an `<a>`.
   */
  as?: ElementType;
  /** Destination, when rendering as an anchor. Ignored by a native button. */
  href?: string;
  /** Loudness. Defaults to `solid`. */
  emphasis?: ButtonEmphasis;
  /** The token layer's colour axis. Defaults to `primary`. */
  tone?: ButtonTone;
  /** Height, label size and icon size together. Defaults to `md` (40). */
  size?: ButtonSize;
  /**
   * The HELD second step — this control is the current one. A selected filter, the current nav
   * item, an open panel. It reads the same value a press reads, so pressing a stateful control
   * previews the state it is about to take.
   *
   * A call to action never enters it. On a solid primary the deep step should only ever be
   * momentary, which is why this is a prop on segmented controls and navigation, not on a CTA.
   */
  active?: boolean;
  /**
   * Extend the hit area to the 44px touch floor without changing the box, for a control that
   * stays at 32 or 40 on touch — a toolbar, a dense table row.
   *
   * A button that can simply be `size="lg"` on a phone should do that instead: at 48 the box
   * already clears the floor and needs no extension.
   */
  extendHitArea?: boolean;
  /**
   * Extra classes. Do NOT set colour, background, padding, height or radius here — all six live
   * in the token layer, per surface, and a hand-set value is exactly the drift the layer exists
   * to prevent. Position and margin are the caller's business; nothing else is.
   *
   * A button never sets its own outer spacing either. Put it in a `Cluster` and let the container
   * own the gap.
   */
  className?: string;
};

/* A labelled button. The label is the whole button in the common case: two to four words, terse
   and literal, uppercased by the stylesheet rather than by the copy. */
type WithLabel = {
  iconOnly?: false;
  children: ReactNode;
};

/* One icon, one side — never both. A trailing glyph means the click changes where you are; a
   leading glyph names the KIND of action. Together they read as two claims about one action, and
   the label loses the middle of the box. The `never`s are what make that a type error rather than
   a review comment. */
type TrailingIcon = { icon?: ReactNode; iconLeft?: never };
type LeadingIcon = { iconLeft?: ReactNode; icon?: never };

/* Icon alone. Square at the size's height, and it MUST carry its own accessible name — the glyph
   is `aria-hidden`, so without one the control is unlabelled to a screen reader and unfindable in
   a test. Requiring it here is why that cannot be forgotten.
 *
 * `emphasis` narrows to solid or ghost: intersecting with the base's wider union removes `link`.
 * Strip the box from an icon-only button and what is left is a bare glyph, indistinguishable from
 * the decorative icons above a feature cell. An icon that must be clickable keeps its box. */
type IconAlone = {
  iconOnly: true;
  icon: ReactNode;
  emphasis?: Exclude<ButtonEmphasis, 'link'>;
  'aria-label': string;
  children?: never;
  iconLeft?: never;
};

export type ButtonProps = ButtonBase & ((WithLabel & (TrailingIcon | LeadingIcon)) | IconAlone);

/**
 * Button — the control, built to the Button Spec Sheet.
 *
 * Six combinations (three emphases × two tones), three sizes, three variants (label, label and
 * icon, icon alone) and six states. It contributes no colour and no distance: every value comes
 * from `--btn-*` in tokens/components/button.css, which re-declares the whole set once per
 * surface. So the same markup is correct on paper, on a tint panel, in the ink footer and on the
 * blue pivot — including a tint panel nested inside an ink section — without being told where it
 * is. Put it inside a `Section` and the `data-surface` attribute does the rest.
 *
 * Hover, pressed, focus and disabled are the stylesheet's business and take no props. `active` is
 * the one state a caller holds, because only application state knows which filter is selected.
 */
export function Button({
  as: Tag = 'button',
  emphasis = 'solid',
  tone = 'primary',
  size = 'md',
  icon,
  iconLeft,
  iconOnly = false,
  active = false,
  disabled = false,
  extendHitArea = false,
  type,
  className,
  children,
  ...rest
}: ButtonProps) {
  /* A real <button> takes the attributes; anything else takes the ARIA equivalent, because
     `disabled` is not valid on an anchor and would be dropped silently. `type` defaults to
     "button" so a control inside a form does not submit it by accident — the browser's default is
     "submit", which is a bug waiting for the first form on the site. */
  const isNativeButton = Tag === 'button';
  const nativeState = isNativeButton
    ? { type: type ?? 'button', disabled: disabled || undefined }
    : { 'aria-disabled': disabled || undefined, tabIndex: disabled ? -1 : undefined };

  return (
    <Tag
      {...rest}
      {...nativeState}
      className={cx(
        styles.button,
        styles[emphasis],
        styles[tone],
        /* md is the base rule, so it emits no class — matching the token layer, where
           --btn-height-md is what `.button` reads and sm/lg are the deltas. */
        size !== 'md' && styles[size],
        iconOnly && styles.iconOnly,
        active && styles.active,
        /* `live` is what every hover, press, active and focus rule is gated on, and it is derived
           here rather than passed: a caller cannot make a disabled button interactive by
           forgetting a prop. It exists as a class rather than a `:not(:disabled)` selector
           because an anchor has no `:disabled` to negate. */
        disabled ? styles.disabled : styles.live,
        extendHitArea && styles.hit,
        className,
      )}
    >
      {iconOnly ? (
        icon
      ) : (
        <>
          {iconLeft}
          <span className={styles.label}>
            <span className={styles.labelInk}>{children}</span>
          </span>
          {icon}
        </>
      )}
    </Tag>
  );
}
