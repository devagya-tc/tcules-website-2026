import type { ReactNode } from 'react';

import { Layout, Section, type SectionSurface } from '@/components';

import styles from './OfferSheet.module.css';

/** One promise: what the buyer gets, then what it means. */
export type OfferSheetItem = {
  /** The promise in a few words, as authored, its full stop kept ("Complex rules, simple screens."). */
  title: string;
  /** The sentence that says what the promise means. Plain text. */
  body?: string;
  /** Or trusted HTML from the content seam, for a body that carries a link or emphasis. */
  bodyHtml?: string;
};

export type OfferSheetProps = {
  /** The band's anchor. */
  id?: string;
  /** "What you get": the h2, the band's accessible name. */
  heading: string;
  headingId: string;
  /** Two to six promises. Four is the shape: two rows of two beside the aside. */
  items: readonly OfferSheetItem[];
  /**
   * The SUPPORTING voice, composed by the caller: in practice a `TestimonialCard` with `fill`, so it
   * stretches to the sheet's height and shares its top and bottom edges. A pattern does not import a
   * pattern, so the panel is a slot. Absent, the sheet takes the full column, promises two up.
   */
  aside?: ReactNode;
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * OfferSheet — what the buyer gets, as ONE offer, with the client's words anchored beside it
 * (product-design round 6, 11 Oct 2026; page-mapping § 23).
 *
 * The band's job is the sentence "this is what I get when I buy this service". So the promises are
 * the primary object and read as one sheet under one heading: the h2, then the promises in the leading
 * 2 of [2, 1] from 1024, two promises a row, each opening on a hairline with a blue mark (Stat's
 * device) and its title at the h3 role. The aside — the testimonial — fills the trailing 1 from the
 * first promise's rule to the last promise's foot, so the panel and the promises share both edges
 * and the voice reads as the offer's proof rather than a second band. (Stretched from the heading's
 * top it held a quarter of its height empty between the quote and the speaker.) Below 1024 one column: heading,
 * promises (two up from 768), then the aside.
 *
 * Why not cards: the promises are not objects a reader compares or clicks. Framing each one made
 * four separate rectangles of equal weight with nothing to guide the eye (owner, round 6: "it feels
 * boring and nothing guides me eye"). Only the voice, a different kind of thing, takes a panel.
 */
export function OfferSheet({
  id,
  heading,
  headingId,
  items,
  aside,
  surface = 'paper',
}: OfferSheetProps) {
  const shown = items.filter((item) => item.title.trim().length > 0);
  if (process.env.NODE_ENV !== 'production' && (shown.length < 2 || shown.length > 6)) {
    console.warn(`OfferSheet: ${shown.length} promises; the sheet is built for two to six.`);
  }

  const promises = (
    <Layout as="ul" columns={{ base: 1, md: 2 }} colGap="gutter" rowGap="stack">
      {shown.map((item) => (
        <li key={item.title} className={styles.item}>
          <Layout rowGap="text">
            <h3 className={styles.title}>{item.title}</h3>
            {item.bodyHtml ? (
              <p className={styles.body} dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
            ) : item.body ? (
              <p className={styles.body}>{item.body}</p>
            ) : null}
          </Layout>
        </li>
      ))}
    </Layout>
  );

  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="offer-sheet">
      <Layout rowGap="stack">
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        {aside ? (
          <Layout columns={{ base: 1, lg: [2, 1] }} colGap="column" rowGap="stack">
            {promises}
            {aside}
          </Layout>
        ) : (
          promises
        )}
      </Layout>
    </Section>
  );
}
