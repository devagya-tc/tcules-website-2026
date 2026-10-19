import type { ReactNode } from 'react';

import { Layout, Media, Section, type MediaImage, type SectionSurface } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Reasons.module.css';

/** One reason: the claim in the reader's words, the sentence that argues it, and its drawing. */
export type ReasonsItem = {
  /** The claim in about five words ("Senior people, start to finish"). */
  title: string;
  /** One sentence that argues it, about fourteen words. Plain text. */
  body: string;
  /**
   * The drawing of the claim: an isometric figure from the ch05 §4a kit, facing left, set before its
   * words, exported on the band's ground (`.paper.svg` on paper, `.paper-deep.svg` on tint). It
   * illustrates the sentence and carries no data, so it is decorative: `alt` is empty, because the
   * title and body beside it already say everything it shows.
   */
  figure: MediaImage;
};

/**
 * How the set is held together (owner, 16 Oct 2026, why-us mocks rounds 3–4). One item shape, three
 * ways of ordering six of them without making them read as boxed cards.
 *
 *   open    no rules at all: the gap scale alone draws the grid, `column` (64) between columns and
 *           rows — the row seam of a borderless set, and between columns because each reason is a
 *           peer that must read as separate: at `gutter` one reason's drawing ran into the next
 *           one's words. Each drawing sits before its words, on their left.
 *           The head reads across the top with the action at its end. (Mock S1.)
 *   boxed   LogoGrid's closed frame: the cells are ruled between, the whole set sits in one rounded
 *           box, and each cell holds its words and drawing at the gutter inset. The frame makes six
 *           different reasons read as one set of equals, as it does for nine marks. (Mock C2a.)
 *   beside  a split: the head takes the leading third as an argued sentence, the action pinned to
 *           its foot, and the set sits in the trailing two thirds, three across, each drawing above
 *           its words, hairline verticals between the columns only. (Mock C2b.)
 */
export type ReasonsArrangement = 'open' | 'boxed' | 'beside';

export type ReasonsProps = {
  /** The band's anchor. */
  id?: string;
  /** A short label above the heading ("Why Tcules"). Mono, uppercase in presentation only. */
  eyebrow?: string;
  /** The claim the band makes: the h2, the band's accessible name with `headingTail`. */
  heading: string;
  /**
   * The heading's second clause, set in the same h2 and stepped back in ink, so the claim leads and
   * its gloss follows in one sentence ("A studio built for what ships." + "Six reasons teams stay.").
   * Optional; part of the accessible name, so it must read on from `heading`.
   */
  headingTail?: string;
  headingId: string;
  /** Three or six reasons — the shapes that fill whole rows at three across. Built for six. */
  items: readonly ReasonsItem[];
  /** One way to go deeper, composed by the caller: in practice a link `Button` with an arrow. */
  action?: ReactNode;
  /** Default `open`. See `ReasonsArrangement`. */
  arrangement?: ReasonsArrangement;
  /**
   * Default `paper`. Paper or tint only: the drawings are exported on those two grounds, and a
   * figure's occluding faces are its ground's own colour (§4a), so on ink or blue they would show as
   * light patches. Pass figures exported on the matching ground.
   */
  surface?: Extract<SectionSurface, 'paper' | 'tint'>;
};

/** The drawing's rendered width: one figure box, the side step being the widest (156). */
const FIGURE_SIZES = '160px';

/**
 * Reasons — why a buyer should choose the studio, as argued reasons each with a drawing of its claim
 * (why-us, owner 16 Oct 2026). The band fits one fold at 1440 with six reasons in every arrangement.
 *
 * The reasons are not cards: nobody clicks or compares them, so no arrangement frames one on its
 * own. `open` uses no line, `beside` divides columns, and `boxed` frames the SET (LogoGrid's
 * device), never a reason.
 *
 * Each item is one Layout: the drawing first (it is decorative and hidden, so source order is the
 * words' order) in the `['auto', 1]` tracks' auto track, so wherever the two share a row the
 * drawing leads and its words follow on the right (owner, 19 Oct 2026). In `beside` from 768 the
 * item is one track and the drawing heads its words.
 */
export function Reasons({
  id,
  eyebrow,
  heading,
  headingTail,
  headingId,
  items,
  action,
  arrangement = 'open',
  surface = 'paper',
}: ReasonsProps) {
  const shown = items.filter((item) => item.title.trim().length > 0);
  if (process.env.NODE_ENV !== 'production' && shown.length !== 3 && shown.length !== 6) {
    console.warn(
      `Reasons: ${shown.length} reasons; the set is built for three or six, which fill whole rows.`,
    );
  }

  const above = arrangement === 'beside';

  const head = (
    <Layout rowGap="block">
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h2 id={headingId} className={styles.heading}>
        {heading}
        {headingTail ? (
          <>
            {' '}
            <span className={styles.headingTail}>{headingTail}</span>
          </>
        ) : null}
      </h2>
    </Layout>
  );

  const set = (
    <Layout
      as="ul"
      className={cx(
        arrangement === 'boxed' && styles.cells,
        arrangement === 'boxed' && shown.length === 3 && styles.three,
        arrangement === 'beside' && styles.ruled,
      )}
      columns={
        above ? { base: 1, md: 3 } : shown.length === 3 ? { base: 1, xl: 3 } : { base: 1, lg: 2, xl: 3 }
      }
      colGap={arrangement === 'open' ? 'column' : 'none'}
      rowGap={arrangement === 'open' ? 'column' : arrangement === 'beside' ? 'stack' : 'none'}
    >
      {shown.map((item, index) => (
        <li key={`${index}-${item.title}`} className={styles.item}>
          <Layout
            columns={above ? { base: ['auto', 1], md: 1 } : { base: ['auto', 1] }}
            colGap="block"
            rowGap="block"
            align="center"
            justifyItems="start"
          >
            <div className={cx(styles.figure, above && styles.figureAbove)}>
              <Media image={{ ...item.figure, alt: '' }} sizes={FIGURE_SIZES} fit="contain" />
            </div>
            <Layout rowGap="tight">
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.body}>{item.body}</p>
            </Layout>
          </Layout>
        </li>
      ))}
    </Layout>
  );

  const framed = arrangement === 'boxed' ? <div className={styles.frame}>{set}</div> : set;

  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="reasons">
      {arrangement === 'beside' ? (
        <Layout columns={{ base: 1, xl: [1, 2] }} colGap="section" rowGap="stack">
          {action ? (
            <Layout rowGap="stack" pinLast>
              {head}
              <div>{action}</div>
            </Layout>
          ) : (
            head
          )}
          {framed}
        </Layout>
      ) : (
        <Layout rowGap="stack">
          {action ? (
            <Layout columns={{ base: 1, md: [1, 'auto'] }} colGap="column" rowGap="stack" align="baseline">
              {head}
              <div>{action}</div>
            </Layout>
          ) : (
            head
          )}
          {framed}
        </Layout>
      )}
    </Section>
  );
}
