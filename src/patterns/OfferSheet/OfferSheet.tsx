import type { ReactNode } from 'react';

import {
  Layout,
  Media,
  Section,
  Sketch,
  type MediaImage,
  type SectionSurface,
  type SketchName,
} from '@/components';
import { HEAD_TRACK } from '@/lib/image-sizes';

import styles from './OfferSheet.module.css';

/** One promise: what the buyer gets, then what it means. */
export type OfferSheetItem = {
  /** The promise in a few words, as authored, its full stop kept ("Complex rules, simple screens."). */
  title: string;
  /** The sentence that says what the promise means. Plain text. */
  body?: string;
  /** Or trusted HTML from the content seam, for a body that carries a link or emphasis. */
  bodyHtml?: string;
  /**
   * The promise drawn: what it changes in the product, a Sketch scene drawn for this promise
   * (owner, 26 Oct 2026, product-design page). Set on every item or on none; with all four drawn the
   * sheet is two rows of two, each drawing beside its words.
   */
  scene?: SketchName;
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
  /**
   * An image as the aside instead (the audit's "What you receive", owner 11 Oct 2026): it fills the
   * trailing 1 from the promises' top to their foot, cover-cropped, as the testimonial does; 16:9
   * where it stacks below 1024. Ignored when `aside` is given.
   */
  asideImage?: MediaImage;
  /** A closing line under the promises, in their column (in practice the next step). A slot. */
  note?: ReactNode;
  /**
   * Promises per row from 1024 when there is no aside: 2 (default) or 3. Five principles set two up
   * left the fifth alone on a third row; three up they read 3 + 2 (healthtech, 11 Oct 2026).
   */
  across?: 2 | 3;
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
  asideImage,
  note,
  across = 2,
  surface = 'paper',
}: OfferSheetProps) {
  const shown = items.filter((item) => item.title.trim().length > 0);
  if (process.env.NODE_ENV !== 'production' && (shown.length < 2 || shown.length > 6)) {
    console.warn(`OfferSheet: ${shown.length} promises; the sheet is built for two to six.`);
  }

  /* Drawn: every promise beside its own drawing, two up at full width, no rule (the drawing opens the
     item). The quote has its own band after the offer (owner, 26 Oct 2026: a quote beside or under
     the set "reads as noise"), so a drawn sheet takes no aside. */
  const drawn = shown.length > 0 && shown.every((item) => item.scene);
  if (process.env.NODE_ENV !== 'production' && !drawn && shown.some((item) => item.scene)) {
    console.warn('OfferSheet: some promises carry a scene and some do not; drawing none.');
  }
  const words = (item: OfferSheetItem) => (
    <Layout rowGap="text">
      <h3 className={styles.title}>{item.title}</h3>
      {item.bodyHtml ? (
        <p className={styles.body} dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
      ) : item.body ? (
        <p className={styles.body}>{item.body}</p>
      ) : null}
    </Layout>
  );
  const promises = drawn ? (
    <Layout as="ul" columns={{ base: 1, lg: 2 }} colGap="gutter" rowGap="stack">
      {shown.map((item) => (
        <li key={item.title}>
          <Layout
            columns={{ base: 1, md: [5, 6] }}
            colGap="gutter"
            rowGap="block"
            align="center"
          >
            {item.scene ? <Sketch name={item.scene} /> : null}
            {words(item)}
          </Layout>
        </li>
      ))}
    </Layout>
  ) : (
    <Layout
      as="ul"
      columns={{ base: 1, md: 2, lg: aside || asideImage ? 2 : across }}
      colGap="gutter"
      rowGap="stack"
    >
      {shown.map((item) => (
        <li key={item.title} className={styles.item}>
          {words(item)}
        </li>
      ))}
    </Layout>
  );

  const sheet = note ? (
    <Layout rowGap="stack">
      {promises}
      {note}
    </Layout>
  ) : (
    promises
  );
  const side = drawn
    ? undefined
    : (aside ??
      (asideImage ? (
        <div className={styles.asideFrame}>
          <Media image={asideImage} fit="fill" sizes={HEAD_TRACK} />
        </div>
      ) : undefined));

  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="offer-sheet">
      <Layout rowGap="stack">
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        {side ? (
          <Layout columns={{ base: 1, lg: [2, 1] }} colGap="column" rowGap="stack">
            {sheet}
            {side}
          </Layout>
        ) : (
          sheet
        )}
      </Layout>
    </Section>
  );
}
