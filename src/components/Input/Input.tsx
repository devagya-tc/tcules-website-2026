import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import { cx } from '@/lib/cx';

import styles from './Input.module.css';

export type InputEmphasis = 'standard' | 'quiet';

type SharedProps = {
  /** Standard is the form treatment; quiet preserves the footer's lower-chrome treatment. */
  emphasis?: InputEmphasis;
  /** Adds the invalid rule and emits aria-invalid without replacing native control semantics. */
  invalid?: boolean;
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
  emphasis = 'standard',
  invalid = false,
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
    styles[emphasis],
    as === 'textarea' && styles.textarea,
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
