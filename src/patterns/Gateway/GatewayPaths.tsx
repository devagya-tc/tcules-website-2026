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
};

export type GatewayPathsProps = {
  paths: readonly GatewayPath[];
  /**
   * ONE drawing across both paths (owner, 29 Oct 2026: "one drawing, two states"), composed by the
   * caller: the same product drawn in the paths' two states, each half over its own path. It spans
   * the content column above the paths and is scaled whole at every width. Decorative: aria-hidden;
   * the paths' words carry the meaning.
   */
  visual?: ReactNode;
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
 * One drawing, two states (owner, 29 Oct 2026; decisions/2026-10-29-paths-one-drawing-two-states;
 * references: Figma home's second band, one wide image over two equal columns, and Vanta's "Built for
 * you", one drawn subject in a setting per path). The drawing runs across the content column; under
 * it the two paths are EQUAL peers side by side from 1024, `column` (64) apart, each under its half
 * of the drawing, and one above the other below 1024 with the drawing still one piece above them.
 * Each path reads down: the title (h3, the serif: the path's hero), its paragraphs, then its links
 * stacked as link buttons. No box, no ground, no rule: the space separates them.
 *
 * The drawing sits a `block` above the paths, the step from a head to its body: it is the paths'
 * picture, read with them, not a band of its own.
 */
export function GatewayPaths({ paths, visual, titleAs = 'h3', className }: GatewayPathsProps) {
  const Title = titleAs;
  const list = (
    <Layout
      as="ul"
      columns={{ lg: 2 }}
      colGap="column"
      rowGap="stack"
      className={cx(styles.root, visual == null ? className : undefined)}
    >
      {paths.map((path) => (
        <li key={path.id}>
          <Layout rowGap="block">
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
  if (visual == null) return list;
  return (
    <Layout rowGap="block" className={cx(styles.root, className)}>
      <span className={styles.pathsVisual} aria-hidden="true">
        {visual}
      </span>
      {list}
    </Layout>
  );
}
