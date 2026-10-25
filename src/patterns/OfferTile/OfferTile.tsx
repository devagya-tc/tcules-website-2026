import type { ReactNode } from 'react';

import { Button, Icon, Island, Layout, TextureCorner } from '@/components';

import styles from './OfferTile.module.css';

type OfferTileBase = {
  /** What kind of offer it is ("Newsletter", "Lab"), in the cards' eyebrow voice. Authored case. */
  eyebrow?: string;
  /** The offer's name ("Tcules Labs experiments"). */
  title: string;
  /** One or two lines on what it is. */
  body?: string;
  /** The glyph that heads it, composed by the caller (`<Icon name="stars" />`). */
  glyph?: ReactNode;
  /** The tile's ground. Default `tint`: the quiet step off a paper band. */
  surface?: 'tint' | 'ink';
  /** The title's element. Default h3, a card's under its group's h2. */
  titleAs?: 'h3' | 'h4' | 'p';
};

/** The foot: a link onward, or a form that acts in place (a NewsletterField). Never both. */
export type OfferTileProps = OfferTileBase &
  (
    | { action: { label: string; href: string }; form?: never }
    | { form: ReactNode; action?: never }
  );

/**
 * OfferTile — one offer standing in a grid of cards, as a cell of its own (owner, 25 Oct 2026, a
 * listing's CTA among its pieces). Not a piece and not dressed as one: an island at the tile size,
 * its own ground, the pixel field arriving in its far corner, and as tall as the cards beside it.
 *
 *   glyph    heading the tile on its own row (an icon heads its card, 2026-10-09)
 *   eyebrow  what kind of offer, in the voice of the cards' topics, so the tile reads in its row
 *   title    a card title's sans, then its line
 *   foot     pinned to the tile's foot: the link's arrow, or a form (the newsletter's field)
 *
 * Its row decides its height: Island `sm` fills the cell, and the foot rides its floor, so a tile
 * beside two cards ends level with them and its words hang from the top.
 */
export function OfferTile({
  eyebrow,
  title,
  body,
  glyph,
  surface = 'tint',
  titleAs: Title = 'h3',
  action,
  form,
}: OfferTileProps) {
  return (
    <Island surface={surface} size="sm">
      <TextureCorner />
      <Layout rowGap="block" pinLast className={styles.stack}>
        <Layout rowGap="text">
          {glyph ? (
            <span className={styles.glyph} aria-hidden="true">
              {glyph}
            </span>
          ) : null}
          <Layout rowGap="tight">
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            <Title className={styles.title}>{title}</Title>
            {body ? <p className={styles.body}>{body}</p> : null}
          </Layout>
        </Layout>
        {action ? (
          <div>
            <Button
              as="a"
              href={action.href}
              emphasis="link"
              icon={<Icon name="arrow-right" />}
            >
              {action.label}
            </Button>
          </div>
        ) : (
          form
        )}
      </Layout>
    </Island>
  );
}
