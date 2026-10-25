import { Button, Icon, Input, Layout } from '@/components';

import styles from './NewsletterField.module.css';

export type NewsletterFieldProps = {
  /** Where the form posts. See ENDPOINTS in @/lib/routes: nothing serves it yet. */
  action: string;
  /** The field's accessible name. Visually hidden; a placeholder is not a label. */
  fieldLabel: string;
  placeholder: string;
  /** The arrow's accessible name ("Subscribe"): the button shows no words. */
  submitLabel: string;
};

/**
 * NewsletterField — the newsletter's sign-up as one field: the address, and the arrow that sends it
 * inside the field's box (owner, 25 Oct 2026, after claude.com/resources), so the address keeps the
 * whole width it is given. The box is this pattern's, drawn round a bare Input, and rings while the
 * address has focus. A plain POST with no script, as the footer's form is. The arrow is a ghost: the
 * page's one solid ask is its close.
 *
 * It is the field alone; the words over it belong to whatever holds it (an OfferTile's foot).
 */
export function NewsletterField({
  action,
  fieldLabel,
  placeholder,
  submitLabel,
}: NewsletterFieldProps) {
  return (
    <form action={action} method="post">
      <Layout
        columns={{ base: [1, 'auto'] }}
        colGap="tight"
        align="center"
        className={styles.well}
      >
        {/* Wrapped by its label, so the field needs no generated id (the footer's reason). */}
        <label className={styles.field}>
          <span className={styles.hidden}>{fieldLabel}</span>
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder={placeholder}
            appearance="bare"
            required
          />
        </label>
        <Button
          type="submit"
          size="sm"
          iconOnly
          emphasis="ghost"
          icon={<Icon name="arrow-right" />}
          aria-label={submitLabel}
        />
      </Layout>
    </form>
  );
}
