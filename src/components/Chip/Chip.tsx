import type { InputHTMLAttributes, ReactNode } from 'react';

import { cx } from '@/lib/cx';

import styles from './Chip.module.css';

/**
 * Chip — one choice in a set, as a pill (19 Oct 2026, the chip enquiry form; docs/specs/Chip.md).
 *
 * A real `<input type="checkbox">` or `<input type="radio">`, visually hidden inside its own
 * `<label>`, so the browser owns checking, the keyboard (Space toggles a checkbox; the arrow keys
 * move a radio group), form posting and the accessible name. The pill is drawn by the label: an
 * edge and no ground at rest, a full fill with the label reversed and a tick when checked. Hover is
 * a small lift (transform only); focus is a ring on the pill.
 *
 * What it is NOT:
 *   · Tag `filter` — a LINK chip that applies a query, mono uppercase by role. A chip is a form
 *     input whose label keeps the author's case, so it is sans.
 *   · a group. The question a set of chips answers is the composing pattern's `<fieldset>` and
 *     `<legend>`, and the row is a `Cluster`, which owns the gaps. A chip owns no distance outside
 *     its own box.
 *   · a Button. It changes a value; it never submits or navigates.
 *
 * The tick is a ReactNode (`tick`), as Button takes `icon`: the caller passes the glyph
 * (`<Icon name="chrome-check" />`) and the chip only sizes and reveals it. Uncontrolled by default
 * (`defaultChecked`); `checked` + `onChange` control it. Every other input attribute passes through.
 */
export type ChipProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className' | 'children' | 'size' | 'style'
> & {
  /** `checkbox` for a pick-any set, `radio` for a pick-one set (same `name` across the set). */
  type: 'checkbox' | 'radio';
  /** The posted field name. A set of chips shares one. */
  name: string;
  /** The posted value. */
  value: string;
  /** The label, in sentence case as authored: "Product design". */
  children: string;
  /** The glyph shown when checked. Decorative: the input's checked state is what is announced. */
  tick: ReactNode;
  /**
   * `pill` (default): the pill, for a set of answers in a row. `index` (a listing's filter rail,
   * owner 28 Oct 2026: "checkboxes look old school"): the rail's typeset-index entry — the name
   * alone, quiet at rest; picked, it takes the ink and the blue tick at its start edge, as the
   * rail's current entry does. The `tick` glyph is not drawn.
   */
  look?: 'pill' | 'index';
};

export function Chip({ type, children, tick, look = 'pill', ...input }: ChipProps) {
  return (
    <label className={cx(styles.chip, look === 'index' && styles.index)}>
      <input {...input} type={type} className={styles.input} />
      <span className={styles.face}>
        <span className={styles.tick} aria-hidden="true">
          {tick}
        </span>
        <span className={styles.label}>{children}</span>
      </span>
    </label>
  );
}
