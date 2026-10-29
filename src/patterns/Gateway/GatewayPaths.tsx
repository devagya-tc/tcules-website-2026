import type { ReactNode } from 'react';

import { Button, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Gateway.module.css';

/** One path: the reader's situation, what it means, and the two or three pages that serve it. */
export type GatewayPath = {
  /** Stable key, unique in the set. */
  id: string;
  /** The situation in the reader's words ("Creating a new product"). The item's hero. */
  title: string;
  /** Its sentences, one string per paragraph, as authored. */
  body: readonly string[];
  /** Where it leads, in the authored order. Pass the authored case; the link label sets it. */
  links: readonly { label: string; href: string }[];
  /**
   * The situation's drawing (a `SituationFigure`), composed by the caller. It stands in a box of one
   * height for both paths and plays when the path is pointed at. Decorative: aria-hidden.
   */
  visual?: ReactNode;
};

export type GatewayPathsProps = {
  paths: readonly GatewayPath[];
  /** The element each path's title renders as. h3 under a band's h2 (the default). */
  titleAs?: 'h3' | 'h4';
  className?: string;
};

/**
 * TIER 2 — GatewayPaths, the two-door form of the Gateway (home, 29 Oct 2026; component-map C10).
 *
 * The 26 Oct copy turned home's six single-link situations into TWO paths ("Creating a new
 * product", "Taking an established product further"), each with its sentences and two or three
 * links. The board is drawn for six items that are each one link; a path with three destinations
 * cannot be one link, so the path is not a card: its title and words are read, and its links are
 * the actions.
 *
 * Two peers side by side from 1024, `column` (64) apart like the board (no box, no ground: the
 * space is what separates them), one above the other below it. Each path reads down: its drawing in
 * a box of one height (so the two titles sit on one line), the title, its paragraphs, then its links
 * stacked as link buttons. Pointing anywhere on a path plays its drawing (SituationFigure's own rest →
 * end move), so the drawing still answers the reader as on the board.
 */
export function GatewayPaths({ paths, titleAs = 'h3', className }: GatewayPathsProps) {
  const Title = titleAs;
  return (
    <Layout
      as="ul"
      columns={{ lg: 2 }}
      colGap="column"
      rowGap="stack"
      className={cx(styles.root, className)}
    >
      {paths.map((path) => (
        <li key={path.id} data-sfig-host="">
          <Layout rowGap="block">
            {path.visual != null ? (
              <span className={styles.pathVisual} aria-hidden="true">
                {path.visual}
              </span>
            ) : null}
            <Layout rowGap="text">
              <Title className={styles.pathTitle}>{path.title}</Title>
              {path.body.map((paragraph, index) => (
                <p key={index} className={styles.pathBody}>
                  {paragraph}
                </p>
              ))}
            </Layout>
            <Layout rowGap="text" justifyItems="start">
              {path.links.map((link) => (
                <Button
                  key={link.href}
                  as="a"
                  href={link.href}
                  emphasis="link"
                  tone="primary"
                  size="md"
                  extendHitArea
                  icon={<Icon name="arrow-right" />}
                >
                  {link.label}
                </Button>
              ))}
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}
