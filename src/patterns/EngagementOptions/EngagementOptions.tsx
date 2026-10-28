import type { ReactNode } from 'react';

import { Layout, Section, Sketch, type SectionSurface } from '@/components';
import { cx } from '@/lib/cx';

import styles from './EngagementOptions.module.css';

/**
 * What an option's scope drawing shows. Each draws only what the option's name says:
 *   feature   one workflow: a single line through three screens
 *   area      a product area or a whole product: a region holding several workflows
 *   embedded  a designer in your team: one blue node among your team's
 *   build     design and build: a drawn region becoming a built one
 * How an engagement runs (about, "How Tcules works", owner 11 Oct 2026):
 *   start      start where the uncertainty is: the first node lit, the rest of the path optional
 *   direct     work directly with the people doing the work: our node joined to each of theirs
 *   inside     work inside the client's product environment: our workflow inside their window
 *   overlap    across time zones: two working days, the overlap between them marked
 *   commercial the commercial shape follows the work: a fixed piece, a defined project, a monthly run
 */
export type EngagementScope =
  | 'feature'
  | 'area'
  | 'embedded'
  | 'build'
  | 'start'
  | 'direct'
  | 'inside'
  | 'overlap'
  | 'commercial';

export type EngagementOption = {
  /** The option's name as authored, its full stop kept ("A designer in your team."). */
  title: string;
  /** What it is: plain text, or inline content the caller renders (a link to the team that builds). */
  body: ReactNode;
  /** The scope drawing. Absent, the option shows its words alone. */
  scope?: EngagementScope;
};

/**
 * How the options are set (owner, 11 Oct 2026).
 *   grid  image cards two by two (one column below 768): the scope drawing on its plate at 16:9 as
 *         each card's image, then the name and what it is. THE BAND (product design).
 *   rows  one alternating row per option, the drawing in 5 of [5, 7] beside its words, sides
 *         swapping row by row. Explored: roomier, but four rows run to about two folds (1,551 at
 *         1440).
 */
export type EngagementArrangement = 'grid' | 'rows';

export type EngagementOptionsProps = {
  /** The band's anchor. */
  id?: string;
  /** The h2, the band's accessible name. */
  heading: string;
  headingId: string;
  lead?: string;
  /**
   * Two to five options, peers: none is featured (a featured option reads as a recommendation). Five
   * set five across from 1440 (three from 1024) at the denser card steps, h5 over body-sm.
   */
  options: readonly EngagementOption[];
  /** The limit on the claim, composed by the caller: in practice a `Callout`. A `stack` under the row. */
  note?: ReactNode;
  /** Default `paper`. */
  surface?: SectionSurface;
  /** Default `grid`. See `EngagementArrangement`. */
  arrangement?: EngagementArrangement;
};

/** The scope's drawing: a kit scene, on its plate, in the grammar every flat drawing shares. */
function Drawing({ scope }: { scope: EngagementScope }) {
  return <Sketch name={`scope-${scope}`} />;
}

/**
 * EngagementOptions — the ways an engagement can be shaped, comparable at a glance (product-design
 * round 6, 11 Oct 2026; page-mapping § 23).
 *
 * The reader is choosing a shape for their own project, so the options are genuinely comparable
 * objects: peers, set as image cards two by two (owner, 11 Oct: four across was too tight, the
 * alternating rows ran to two folds — "what about 4 image cards in a 2x2 grid?"). See
 * `EngagementArrangement`. The drawings are what make them
 * comparable before reading: the same plate, a different scene for each scope, drawn by Sketch. The limit on the
 * claim (when we are not the right team) closes the band as a note, a `stack` under the row.
 *
 * Not a Thread: the options are not stages in order. Not icon cards: the specialist services band
 * on the same page already is one, and a glyph cannot show scope. No boxes round the card, no discs:
 * the plate is the card's image, as a photograph would be.
 */
export function EngagementOptions({
  id,
  heading,
  headingId,
  lead,
  options,
  note,
  surface = 'paper',
  arrangement = 'grid',
}: EngagementOptionsProps) {
  const shown = options.filter((option) => option.title.trim().length > 0);
  /* Five options: five across from 1440 at the denser card steps. */
  const dense = shown.length >= 5;
  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="engagement-options">
      <Layout rowGap="stack">
        <Layout rowGap="block">
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
          {lead ? <p className={styles.lead}>{lead}</p> : null}
        </Layout>
        {arrangement === 'grid' ? (
          /* Image cards, four across from 1024 (owner, 11 Oct: "make it 4x1"), two by two from 768, one
             column below: a borderless tile each (the drawing's plate is the image, the
             name and its words under it), 32 across and a `column` down the set — the row seam of
             every borderless card set. */
          <Layout
            as="ul"
            columns={dense ? { base: 1, md: 2, lg: 3, xl: 5 } : { base: 1, md: 2, lg: 4 }}
            colGap="gutter"
            rowGap="column"
          >
            {shown.map((option) => (
              <li key={option.title}>
                <Layout rowGap="block">
                  {option.scope ? <Drawing scope={option.scope} /> : null}
                  <Layout rowGap="text">
                    <h3 className={cx(styles.title, dense && styles.titleDense)}>{option.title}</h3>
                    <p className={cx(styles.body, dense && styles.bodyDense)}>{option.body}</p>
                  </Layout>
                </Layout>
              </li>
            ))}
          </Layout>
        ) : (
          <Layout as="ul" rowGap="column">
            {shown.map((option, index) => (
              <li key={option.title}>
                {/* One row per option, the drawing and the words side by side, swapping sides row
                    by row from 768. Below 768 the drawing heads its words, full width at 2:1:
                    beside them, the column gap left both too narrow. */}
                <Layout
                  columns={option.scope ? { base: 1, md: [5, 7] } : { base: 1 }}
                  reverse={{ md: index % 2 === 1 }}
                  colGap="column"
                  rowGap="block"
                  align="center"
                >
                  {option.scope ? <Drawing scope={option.scope} /> : null}
                  <Layout rowGap="block">
                    <h3 className={styles.title}>{option.title}</h3>
                    <p className={cx(styles.body, styles.bodyRows)}>{option.body}</p>
                  </Layout>
                </Layout>
              </li>
            ))}
          </Layout>
        )}
        {note}
      </Layout>
    </Section>
  );
}
