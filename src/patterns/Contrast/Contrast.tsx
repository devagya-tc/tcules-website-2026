import { Cluster, Icon, Layout } from '@/components';

import styles from './Contrast.module.css';

/** One side of the contrast: a heading that says which side it is, and its items. */
export type ContrastList = {
  /** The list's heading, verbatim — it carries the polarity in words ("Not the right service when"). */
  heading: string;
  /** One to four items, each ≤ 14 words, two lines at most in a 588 half (visual-direction § 1.5). */
  items: readonly string[];
};

/** The two list headings' element: `h3` under a band's h2, `h4` when the pair sits under an h3. */
export type ContrastHeadingElement = 'h3' | 'h4';

export type ContrastProps = {
  /** What it is for, or needs: every item takes `check-circle`, blue. */
  yes: ContrastList;
  /** What it is not for: every item takes `close-circle`, quiet ink. */
  no: ContrastList;
  /** Default `h3`. See `ContrastHeadingElement`. */
  headingAs?: ContrastHeadingElement;
};

type Polarity = 'yes' | 'no';

const GLYPH = { yes: 'check-circle', no: 'close-circle' } as const;

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Contrast: ${message}`);
}

function List({
  list,
  polarity,
  Heading,
}: {
  list: ContrastList;
  polarity: Polarity;
  Heading: ContrastHeadingElement;
}) {
  const items = list.items.filter((item) => item.trim().length > 0);
  if (items.length !== list.items.length)
    warn(`"${list.heading}" has a blank item; omitting it.`);
  if (items.length > 4)
    warn(`"${list.heading}" has ${items.length} items; the designed maximum is four.`);

  return (
    <Layout rowGap="block">
      <Heading className={styles.heading}>{list.heading}</Heading>
      <Layout as="ul" rowGap="none" className={styles.rows}>
        {items.map((item, index) => (
          <li key={`${index}-${item}`} className={styles.row}>
            <Cluster nowrap colGap="text" align="start">
              {/* The heading says which side this is, so the glyph is decoration: aria-hidden,
                  and the item's own words are what a screen reader hears. */}
              <span
                className={polarity === 'yes' ? styles.markYes : styles.markNo}
                aria-hidden="true"
              >
                <Icon name={GLYPH[polarity]} size="xl" />
              </span>
              <span className={styles.text}>{item}</span>
            </Cluster>
          </li>
        ))}
      </Layout>
    </Layout>
  );
}

/**
 * Contrast — the N band's body (visual-direction § 3.4 N, § 3.6): two lists that mean opposite
 * things, in peer halves. Promoted from the service page's Fit (owner-approved, 1 Oct 2026) by
 * `cmp-readdown`, unchanged in look; built to docs/specs/Contrast.md.
 *
 *   THE GLYPH CARRIES THE POLARITY, never colour alone and never green and red (ch04's fixed pair).
 *   The check is blue, the recurring foreground accent (§ 4.2); the cross stays quiet ink, because
 *   it only says "not this one" (§ 4.3).
 *
 *   PEER HALVES AT `column`. [1, 1] at 64 from 1024 (§ 3.2: peer halves are `column`, a split is
 *   `section`), one column below with the second list a `stack` under the first. Top-aligned, so the
 *   two headings share a line however long either list runs.
 *
 *   A LADDER, NOT A TABLE. Each list opens on a strong rule and closes every item with a hairline:
 *   the strong rule is the list's top edge, the hairlines the seams. No ground, no box (§ 3.1).
 *
 * A block, not a band: it goes in a ContentSection's body under an H-title, and a footer CtaRow under
 * it takes `rule={false}`, because the ladder's last hairline already closes the body (§ 3.1).
 */
export function Contrast({ yes, no, headingAs = 'h3' }: ContrastProps) {
  return (
    <Layout columns={{ base: 1, lg: 2 }} colGap="column" rowGap="stack" align="start">
      <List list={yes} polarity="yes" Heading={headingAs} />
      <List list={no} polarity="no" Heading={headingAs} />
    </Layout>
  );
}
