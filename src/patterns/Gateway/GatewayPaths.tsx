import type { ReactNode } from 'react';

import { Icon, Layout, Sketch } from '@/components';
import { cx } from '@/lib/cx';
import type { SketchName } from '@/lib/sketches';

import styles from './Gateway.module.css';

/** One path: the reader's situation, what it means, and the two or three pages that serve it. */
export type GatewayPath = {
  /** Stable key, unique in the set. */
  id: string;
  /** The situation in the reader's words ("Creating a new product"). The item's hero. */
  title: string;
  /** Its sentences, one string per paragraph, as authored. */
  body: readonly string[];
  /**
   * Where it leads, in the authored order: each a service, as a compact service row. `label` is the
   * action's authored words ("Design and launch your MVP"), never the service's name; `scene` is the
   * service's own flat Sketch scene, the one its service tile draws (`serviceSceneFor`). A service with
   * no scene of its own yet takes no other subject's: its row shows the empty plate until one is drawn.
   */
  links: readonly GatewayPathLink[];
  /**
   * The situation's drawing (a `SituationFigure`), composed by the caller. It stands in a box of one
   * height for both paths and plays when the path is pointed at. Decorative: aria-hidden.
   */
  visual?: ReactNode;
};

/** One of a path's services: the action's words, where it goes and the service's own scene. */
export type GatewayPathLink = { label: string; href: string; scene?: SketchName };

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
 * Two EQUAL peers side by side from 1024, `column` (64) apart like the board (no box, no ground: the
 * space is what separates them), one above the other below it. Each path reads down: its own drawing
 * in a box of one height (so the two titles sit on one line), the title (h3, the serif: the path's
 * hero), its paragraphs, then its services as COMPACT SERVICE ROWS, one per line (owner, 29 Oct 2026;
 * decisions/2026-10-29-paths-service-rows): the service's small flat Sketch scene on its plate, the
 * action's authored words, an arrow, the whole row the link. No container and no button: two rows
 * against three only makes one column a row longer. Pointing anywhere on a path plays its drawing
 * (SituationFigure's own rest → end move); pointing at a row moves its arrow (transform only).
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
            <Layout as="ul" rowGap="text">
              {path.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.serviceRow}>
                    <Layout columns={{ base: ['auto', 1] }} colGap="text" align="center">
                      <span className={styles.serviceArt} aria-hidden="true">
                        <Sketch name={link.scene} />
                      </span>
                      {/* The arrow follows the words inline, so it stays with the last one when the
                          label wraps, rather than standing apart at the column's far edge. */}
                      <span className={styles.serviceLabel}>
                        {link.label}
                        <span className={styles.serviceArrow} aria-hidden="true">
                          <Icon name="arrow-right" />
                        </span>
                      </span>
                    </Layout>
                  </a>
                </li>
              ))}
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );
}
