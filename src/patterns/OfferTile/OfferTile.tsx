import type { ReactNode } from 'react';

import { Button, Icon, Island, Layout, TextureCorner } from '@/components';

import styles from './OfferTile.module.css';

export type OfferTileProps = {
  /** The offer's name ("Tcules Labs experiments"). */
  title: string;
  /** One or two lines on what it is. */
  body?: string;
  /** Where it goes. The label is the button's, authored case. */
  action: { label: string; href: string };
  /** The glyph that heads it, composed by the caller (`<Icon name="stars" />`). */
  glyph?: ReactNode;
  /** The tile's ground. Default `tint`: the quiet step off a paper band. */
  surface?: 'tint' | 'ink';
  /** The title's element. Default h3, a card's under its group's h2. */
  titleAs?: 'h3' | 'h4' | 'p';
};

/**
 * OfferTile — one offer standing in a grid of cards, as a cell of its own (owner, 25 Oct 2026, a
 * listing's CTA among its pieces). Not a piece and not dressed as one: an island at the tile size,
 * its own ground, the pixel field arriving in its far corner, and as tall as the cards beside it.
 *
 *   glyph   heading the tile on its own row (an icon heads its card, 2026-10-09)
 *   title   a card title's sans, then its line
 *   action  the link's arrow, the cue a card's lead carries
 *
 * Its row decides its height: Island `sm` fills the cell, so a tile beside two cards ends level
 * with them whatever its own copy needs.
 */
export function OfferTile({
  title,
  body,
  action,
  glyph,
  surface = 'tint',
  titleAs: Title = 'h3',
}: OfferTileProps) {
  return (
    <Island surface={surface} size="sm">
      <TextureCorner />
      <Layout rowGap="block">
        <Layout rowGap="text">
          {glyph ? (
            <span className={styles.glyph} aria-hidden="true">
              {glyph}
            </span>
          ) : null}
          <Layout rowGap="tight">
            <Title className={styles.title}>{title}</Title>
            {body ? <p className={styles.body}>{body}</p> : null}
          </Layout>
        </Layout>
        <div>
          <Button as="a" href={action.href} emphasis="link" icon={<Icon name="arrow-right" />}>
            {action.label}
          </Button>
        </div>
      </Layout>
    </Island>
  );
}
