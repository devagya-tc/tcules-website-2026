import { cx } from '@/lib/cx';

import { glyphs, type IconName } from './glyphs';
import styles from './Icon.module.css';

export type { IconName };

/**
 * The four size roles, mapped onto the ramp in tokens/components/icon.css.
 *
 *   sm  14  inside a 32px control
 *   md  16  inside a 40px control — the default
 *   lg  18  inside a 48px control
 *   xl  24  the glyph at its native size, standing on its own rather than inside a control
 *
 * A control that owns its icon size overrides all four. `Button` does: it sizes the `<svg>` it
 * contains from --btn-icon-size-*, so `<Button size="sm" icon={<Icon name="copy" />} />` gets a
 * 14px glyph without the call site restating it, and a `size` passed to that Icon is ignored.
 * That is deliberate — the spec's rule is that the icon steps with the BUTTON, so the button is
 * the component that gets to decide.
 */
export type IconSize = 'sm' | 'md' | 'lg' | 'xl';

export type IconProps = {
  /** Which glyph. A union of the set in glyphs.ts, so a typo fails to compile. */
  name: IconName;
  /** Size role. Defaults to `md` (16). Ignored inside a control that sizes its own icons. */
  size?: IconSize;
  /**
   * An accessible name, for an icon that carries meaning ON ITS OWN — a status glyph in a table
   * cell with no text beside it.
   *
   * Leave it off for the overwhelmingly common case: an icon beside a label, or inside a button
   * that already has one. There the glyph is decorative and a name would make a screen reader
   * announce the same thing twice. Unlabelled icons are `aria-hidden`, which is why an icon-only
   * Button requires its own `aria-label` rather than relying on the glyph to supply it.
   */
  label?: string;
  className?: string;
};

/**
 * Icon — a line glyph from the system's set, drawn in `currentColor`.
 *
 * It has no colour of its own and takes no colour prop. The glyph is stroked in `currentColor`,
 * so it inherits the ink of the surface or the foreground of the control it sits in and is
 * correct on all four surfaces without being told which one. There is no coloured icon inside a
 * button anywhere in this system, in either colour variant.
 *
 * Stroke weight is 1.5 in the box's own units, not 1.5 device pixels: scaled into a 16px control
 * the glyph renders at a true 1px, which is what keeps a small icon from looking heavier than the
 * label beside it. That is the Solar convention and the reason the ramp is expressed as a viewBox
 * rather than a set of separately drawn sizes.
 */
export function Icon({ name, size = 'md', label, className }: IconProps) {
  const named = label !== undefined;

  return (
    <svg
      className={cx(styles.icon, styles[size], className)}
      viewBox="0 0 24 24"
      /* A glyph beside a label is decoration and is hidden; a glyph that IS the content gets a
         role and a <title>. focusable="false" is for IE/legacy Edge, where an inline SVG is a
         tab stop by default — cheap to keep and invisible everywhere else. */
      role={named ? 'img' : undefined}
      aria-hidden={named ? undefined : true}
      focusable="false"
    >
      {named ? <title>{label}</title> : null}
      {glyphs[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
