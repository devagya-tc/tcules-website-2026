import { Button, Cluster, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Gateway.module.css';

/**
 * One situation and where it leads. The title is the reader's own reason in their words ("Launch a
 * new product"), the body its one sentence, and `service` the name of the page that answers it,
 * which is also the link's destination name.
 */
export type GatewayItem = {
  /** Stable key, unique in the set. */
  id: string;
  title: string;
  body: string;
  href: string;
  /** The destination's name — "Product Design". Pass authored case; mono uppercases it. */
  service: string;
};

/**
 * How the set is arranged (home round 4, 11 Oct 2026; all three on /design/kit/gateway).
 *
 *   index  THE ROUTER (home). One column of situations under the band's head: each title at h3 on
 *          one line, the service named under it on Button's link cue, and the sentence beside them
 *          in the trailing 5 of [7, 5], quiet. The six titles run down one edge, so they scan in a
 *          single pass. No rule between rows: the rows sit a `block` apart, and under the pointer a
 *          row raises a ground across both tracks, so it answers as one target. Below 1024 each row
 *          stacks title, cue, sentence.
 *   rows   ruled rows for a narrow track (ContentSection `beside`): the title and the service on
 *          one line, the sentence under them. Explored alternative.
 *   grid   a ruled cell per situation, 3 across from 1024 (2 from 768): the service as a quiet
 *          mono line over the title, the sentence, a blue arrow at the foot. Explored alternative.
 *
 * A presentation choice, never a CMS field.
 */
export type GatewayArrangement = 'index' | 'rows' | 'grid';

export type GatewayProps = {
  items: readonly GatewayItem[];
  arrangement?: GatewayArrangement;
  /** The element each situation's title renders as. h3 under a band's h2 (the default). */
  titleAs?: 'h3' | 'h4';
  className?: string;
};

/**
 * TIER 2 — Gateway, the situation router: "which of these is me?" answered in one scan, each
 * situation a whole link to its service (home "What do you need next?", round 4).
 *
 * Why its own pattern rather than BlockCardSet: a card set is a set of OBJECTS whose cover or title
 * stands alone. A router row is a sentence in three parts — the situation, where it leads, why —
 * and it reads only when those parts hold one relationship across the set, which no card
 * arrangement draws. The whole row is the anchor (one tab stop per destination; a heading inside an
 * anchor is valid flow content), the service is Button's link cue rendered as a span, and the
 * anchor's `data-btn-link-group` hands the row's hover, focus and press to that cue.
 *
 * Layout and Cluster do every arrangement; the module supplies type, ink, rules, the anchor's
 * inset and its states.
 */
export function Gateway({ items, arrangement = 'index', titleAs = 'h3', className }: GatewayProps) {
  const Title = titleAs;
  const cue = (label: string) => (
    <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
      {label}
    </Button>
  );

  if (arrangement === 'grid') {
    return (
      <Layout
        as="ul"
        columns={{ md: 2, lg: 3 }}
        colGap="gutter"
        rowGap="gutter"
        className={cx(styles.root, className)}
      >
        {items.map((item) => (
          <li key={item.id} className={styles.cell}>
            <a href={item.href} className={styles.link} data-btn-link-group="">
              <Layout rowGap="block" pinLast className={styles.fill}>
                <Layout rowGap="text">
                  <span className={styles.service}>{item.service}</span>
                  <Title className={cx(styles.title, styles.titleMd)}>{item.title}</Title>
                  <p className={styles.body}>{item.body}</p>
                </Layout>
                <span className={styles.arrow} aria-hidden="true">
                  <Icon name="arrow-right" />
                </span>
              </Layout>
            </a>
          </li>
        ))}
      </Layout>
    );
  }

  if (arrangement === 'rows') {
    return (
      <Layout as="ul" rowGap="none" className={cx(styles.root, styles.ruled, className)}>
        {items.map((item) => (
          <li key={item.id} className={styles.row}>
            <a href={item.href} className={styles.link} data-btn-link-group="">
              <Layout rowGap="tight">
                <Layout columns={[1, 'auto']} colGap="block" rowGap="tight" align="baseline">
                  <Title className={cx(styles.title, styles.titleMd)}>{item.title}</Title>
                  <Cluster>{cue(item.service)}</Cluster>
                </Layout>
                <p className={styles.body}>{item.body}</p>
              </Layout>
            </a>
          </li>
        ))}
      </Layout>
    );
  }

  return (
    <Layout as="ul" rowGap="block" className={cx(styles.root, className)}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <a
            href={item.href}
            className={cx(styles.link, styles.indexLink)}
            data-btn-link-group=""
          >
            <Layout columns={{ lg: [7, 5] }} colGap="gutter" rowGap="text" align="start">
              <Layout rowGap="tight">
                <Title className={cx(styles.title, styles.titleLg)}>{item.title}</Title>
                <Cluster>{cue(item.service)}</Cluster>
              </Layout>
              <p className={styles.body}>{item.body}</p>
            </Layout>
          </a>
        </li>
      ))}
    </Layout>
  );
}
