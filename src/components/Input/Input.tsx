import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cx } from '@/lib/cx';

import styles from './Input.module.css';

/* One treatment, and no `emphasis` prop. There were two — standard, and a `quiet` emphasis kept
   for SiteFooter's newsletter row — and on paper and ink the two rendered nearly identically: the
   same fill, the same rule, a placeholder a step apart. An emphasis nobody can see is worse than
   none, so quiet was merged into standard and deleted (29 Sep 2026, tracker 2.17), and a prop with
   one legal value went with it. The token names keep `standard` as the name of the treatment. */
type SharedProps = {
  /** Adds the invalid rule and emits aria-invalid without replacing native control semantics. */
  invalid?: boolean;
  /**
   * `box` (default) is the filled, ruled control. `line` is the unboxed field (kit cmp-form, 6 Oct
   * 2026): no fill, no side or top rule, one rule under the value that turns blue and thickens on
   * focus. references.md lists underline-only fields under the moves to adopt (Meridian, Executra);
   * it is for a short form that sits in a composition rather than being the band's whole argument,
   * where a stack of white boxes on warm paper read as a default template. Same height, same type,
   * same states, so a form can change appearance without changing size.
   */
  appearance?: 'box' | 'line';
  className?: string;
};

type NativeInputProps = SharedProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> & {
    as?: 'input';
  };

type NativeTextareaProps = SharedProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> & {
    as: 'textarea';
  };

export type InputProps = NativeInputProps | NativeTextareaProps;

/**
 * Input — the control box only. Labels, optional flags, validation messages and layout belong to
 * the pattern composing it. Both native variants keep every applicable HTML attribute.
 */
export function Input({
  as = 'input',
  invalid = false,
  appearance = 'box',
  className,
  'aria-invalid': ariaInvalid,
  ...rest
}: InputProps) {
  const nativeInvalid = invalid ? true : ariaInvalid;
  const invalidState =
    nativeInvalid === true ||
    nativeInvalid === 'true' ||
    nativeInvalid === 'grammar' ||
    nativeInvalid === 'spelling';
  const controlClassName = cx(
    styles.control,
    as === 'textarea' && styles.textarea,
    appearance === 'line' && styles.line,
    invalidState && styles.invalid,
    className,
  );

  if (as === 'textarea') {
    return (
      <textarea
        {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        aria-invalid={nativeInvalid}
        className={controlClassName}
      />
    );
  }

  return (
    <input
      {...(rest as InputHTMLAttributes<HTMLInputElement>)}
      aria-invalid={nativeInvalid}
      className={controlClassName}
    />
  );
}
