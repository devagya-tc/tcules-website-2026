import { Button, Icon, Input, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './NewsletterCard.module.css';

export type NewsletterCardProps = {
  /** The newsletter's name ("Beyond Interfaces"). */
  title: string;
  /** One or two lines on what arrives. */
  description: string;
  /** Where the form posts. See ENDPOINTS in @/lib/routes: nothing serves it yet. */
  action: string;
  /** The field's accessible name. Visually hidden; a placeholder is not a label. */
  fieldLabel: string;
  placeholder: string;
  /** The arrow's accessible name ("Subscribe"): the button shows no words. */
  submitLabel: string;
  /** The title's element. Default `p`: in a rail it heads no section of the page. */
  titleAs?: 'p' | 'h2' | 'h3';
  className?: string;
};

/**
 * NewsletterCard — the newsletter's sign-up as one small panel (owner, 25 Oct 2026, after
 * claude.com/resources: "a subscribe to newsletter card in the left rail"). The same newsletter the
 * footer carries, set where a reader browsing a listing already is.
 *
 *   glyph   the letter, heading the card on its own row (an icon heads its card, 2026-10-09)
 *   title   the newsletter's name, then its line in the quieter ink
 *   field   the address, and the arrow that sends it inside the field's box
 *
 * A panel and not a card in a set, so it keeps its edge (cards have no boxes, 2026-10-05): a white
 * ground and a hairline, as the menu and the filter panel beside it have. A plain POST with no
 * script, as the footer's form is. The arrow is a ghost: the page's one solid ask is its close.
 */
export function NewsletterCard({
  title,
  description,
  action,
  fieldLabel,
  placeholder,
  submitLabel,
  titleAs: Title = 'p',
  className,
}: NewsletterCardProps) {
  return (
    <div className={cx(styles.root, className)}>
      <Layout rowGap="block">
        <Layout rowGap="text">
          <span className={styles.glyph} aria-hidden="true">
            <Icon name="letter" />
          </span>
          <Layout rowGap="tight">
            <Title className={styles.title}>{title}</Title>
            <p className={styles.body}>{description}</p>
          </Layout>
        </Layout>
        <form action={action} method="post">
          {/* The arrow inside the field's box (claude.com's arrangement): the address gets the
              card's whole width rather than sharing it with a button beside it. The box is this
              card's, drawn round a bare Input, and shows focus while the address has it. */}
          <Layout
            columns={{ base: [1, 'auto'] }}
            colGap="tight"
            align="center"
            className={styles.well}
          >
            {/* Wrapped by its label, so the card needs no generated id (the footer's reason). */}
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
      </Layout>
    </div>
  );
}
