import type { ReactNode } from 'react';

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
  /**
   * The destination's glyph, an `Icon` the caller composes (a pattern takes a primitive as a node
   * rather than choosing it). Read by the grid's `mark` only; a set where any item lacks one renders
   * unmarked, never one cell bare.
   */
  icon?: ReactNode;
};

/**
 * How the set is arranged (rounds 4 and 5, 11 Oct 2026; all on /design/kit/gateway).
 *
 *   grid   THE ROUTER (home, round 5). A ruled cell per situation, 3 across from 1024 (2 from 768,
 *          1 below): with `mark="hang"` the destination's glyph in a tinted disc hangs at the title's
 *          start, and the title, the quiet sentence and the service's link (`cue="link"`, pinned to
 *          the cell's foot) share one edge beside it. Rows a `stack` apart; under the pointer or on
 *          focus a ground hangs from the cell's rule. The owner preferred the grid to the index in
 *          round 5, then found its round-4 cell "too dense and boring": see `GatewayMark` and
 *          `GatewayCue` for what changed.
 *   index  one column of situations: each title at h3 on one line, the service named under it on
 *          Button's link cue, and the sentence beside them in the trailing 5 of [7, 5], quiet. Home
 *          in round 4; kept as an alternative (a long list in a full-width band).
 *   rows   ruled rows for a narrow track (ContentSection `beside`): the title and the service on
 *          one line, the sentence under them. Explored alternative.
 *
 * A presentation choice, never a CMS field.
 */
export type GatewayArrangement = 'index' | 'rows' | 'grid';

/**
 * The grid cell's entry point (home round 5, explored on /design/kit/gateway). `none` leads with the
 * title; `disc` sets the destination's glyph in a tinted disc above it; `hang` hangs the glyph in a
 * disc beside the title, in its own track, so the copy keeps one edge. Grid only.
 */
export type GatewayMark = 'none' | 'disc' | 'hang';
/* Round 5 verdicts (page-mapping § 21): `none` was calm but left six grey blocks with no entry;
   `disc` gave the entry but repeated What we do's glyph-over-title skeleton and ran past the fold
   (922); `hang` gives each cell a shape at no height (822) in a skeleton of its own — home's. */

/**
 * How the grid cell names its destination. `link` (round 5): the service as Button's link cue at
 * the cell's foot, its arrow after it — the call the reader can act on. `arrow` (round 4): the
 * service as a quiet mono line over the title and a lone arrow at the foot. Grid only.
 */
export type GatewayCue = 'link' | 'arrow';

export type GatewayProps = {
  items: readonly GatewayItem[];
  arrangement?: GatewayArrangement;
  /** Grid only. Default `none`. See `GatewayMark`. */
  mark?: GatewayMark;
  /** Grid only. Default `link`. See `GatewayCue`. */
  cue?: GatewayCue;
  /** The element each situation's title renders as. h3 under a band's h2 (the default). */
  titleAs?: 'h3' | 'h4';
  className?: string;
};

/**
 * TIER 2 — Gateway, the situation router: "which of these is me?" answered in one scan, each
 * situation a whole link to its service (home "What do you need next?", rounds 4 and 5).
 *
 * Why its own pattern rather than BlockCardSet: a card set is a set of OBJECTS whose cover or title
 * stands alone. A router entry is a sentence in three parts — the situation, where it leads, why —
 * and it reads only when those parts hold one relationship across the set, which no card
 * arrangement draws. The whole row is the anchor (one tab stop per destination; a heading inside an
 * anchor is valid flow content), the service is Button's link cue rendered as a span, and the
 * anchor's `data-btn-link-group` hands the row's hover, focus and press to that cue.
 *
 * Layout and Cluster do every arrangement; the module supplies type, ink, rules, the anchor's
 * inset and its states.
 */
export function Gateway({
  items,
  arrangement = 'grid',
  mark = 'none',
  cue = 'link',
  titleAs = 'h3',
  className,
}: GatewayProps) {
  const Title = titleAs;
  const linkCue = (label: string) => (
    <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
      {label}
    </Button>
  );

  if (arrangement === 'grid') {
    const marked = mark !== 'none' && items.every((item) => Boolean(item.icon));
    const disc = (item: GatewayItem) => (
      <span className={styles.disc} aria-hidden="true">
        {item.icon}
      </span>
    );
    return (
      <Layout
        as="ul"
        columns={{ md: 2, lg: 3 }}
        colGap="gutter"
        rowGap={cue === 'link' ? 'stack' : 'gutter'}
        className={cx(styles.root, className)}
      >
        {items.map((item) => {
          const title = (
            <Title
              className={cx(styles.title, styles.titleMd, cue === 'link' && !(marked && mark === 'hang') && styles.titleReserve)}
            >
              {item.title}
            </Title>
          );
          const body = <p className={styles.body}>{item.body}</p>;
          if (cue === 'arrow') {
            return (
              <li key={item.id} className={styles.cell}>
                <a href={item.href} className={styles.link} data-btn-link-group="">
                  <Layout rowGap="block" pinLast className={styles.fill}>
                    <Layout rowGap="text">
                      <span className={styles.service}>{item.service}</span>
                      <Title className={cx(styles.title, styles.titleMd)}>{item.title}</Title>
                      {body}
                    </Layout>
                    <span className={styles.arrow} aria-hidden="true">
                      <Icon name="arrow-right" />
                    </span>
                  </Layout>
                </a>
              </li>
            );
          }
          const text = (
            <Layout rowGap="text">
              {title}
              {body}
            </Layout>
          );
          /* The copy and its call: the title and sentence, the link pinned to the cell's foot so the
             calls of a row share one line whatever the sentences' lengths. */
          const copy = (
            <Layout rowGap="block" pinLast className={styles.fill}>
              {marked && mark === 'disc' ? (
                <Layout rowGap="block">
                  {disc(item)}
                  {text}
                </Layout>
              ) : (
                text
              )}
              <Cluster>{linkCue(item.service)}</Cluster>
            </Layout>
          );
          return (
            <li key={item.id} className={styles.cell}>
              <a
                href={item.href}
                className={cx(styles.link, styles.groundLink, styles.groundCell)}
                data-btn-link-group=""
              >
                {marked && mark === 'hang' ? (
                  /* The disc hangs in its own track at the copy's start; the title, the sentence
                     and the link share the second track's edge. The disc's track stretches with
                     the cell and the disc keeps its own size at the track's head. */
                  <Layout
                    columns={{ base: ['auto', 1] }}
                    colGap="text"
                    equalRows
                    className={styles.fill}
                  >
                    <span className={styles.discTrack}>{disc(item)}</span>
                    {copy}
                  </Layout>
                ) : (
                  copy
                )}
              </a>
            </li>
          );
        })}
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
                  <Cluster>{linkCue(item.service)}</Cluster>
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
            className={cx(styles.link, styles.groundLink, styles.indexLink)}
            data-btn-link-group=""
          >
            <Layout columns={{ lg: [7, 5] }} colGap="gutter" rowGap="text" align="start">
              <Layout rowGap="tight">
                <Title className={cx(styles.title, styles.titleLg)}>{item.title}</Title>
                <Cluster>{linkCue(item.service)}</Cluster>
              </Layout>
              <p className={styles.body}>{item.body}</p>
            </Layout>
          </a>
        </li>
      ))}
    </Layout>
  );
}
