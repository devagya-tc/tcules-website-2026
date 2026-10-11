import { useId, type ReactNode } from 'react';

import { Layout, Section, type SectionSurface } from '@/components';
import { cx } from '@/lib/cx';

import styles from './EngagementOptions.module.css';

/**
 * What an option's scope drawing shows. Each draws only what the option's name says:
 *   feature   one workflow: a single line through three screens
 *   area      a product area or a whole product: a region holding several workflows
 *   embedded  a designer in your team: one blue node among your team's
 *   build     design and build: a drawn region becoming a built one
 */
export type EngagementScope = 'feature' | 'area' | 'embedded' | 'build';

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
 *   rows  one alternating row per option, the 2:1 drawing in 5 of [5, 7] beside its words, sides
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
  /** Two to four options, peers: none is featured (a featured option reads as a recommendation). */
  options: readonly EngagementOption[];
  /** The limit on the claim, composed by the caller: in practice a `Callout`. A `stack` under the row. */
  note?: ReactNode;
  /** Default `paper`. */
  surface?: SectionSurface;
  /** Default `grid`. See `EngagementArrangement`. */
  arrangement?: EngagementArrangement;
};

const W = 320;
const H = 180;
/* `rows`: from 768 the drawing shares a row with its words, so its field is cropped to 2:1 (top and
   bottom strips of dots only; every shape sits between y 30 and 150) to keep four rows from
   towering. `grid` shows the whole 16:9 field on its plate — the card image ratio (one ratio on
   every card, owner 11 Oct). */
const CROP = 10;

function Drawing({ scope, uid, cropped }: { scope: EngagementScope; uid: string; cropped?: boolean }) {
  const crop = cropped ? CROP : 0;
  const grid = `${uid}-field`;
  return (
    <svg
      className={cx(styles.drawing, !cropped && styles.plate)}
      viewBox={`0 ${crop} ${W} ${H - 2 * crop}`} focusable="false" aria-hidden="true">
      <defs>
        <pattern id={grid} width="20" height="20" patternUnits="userSpaceOnUse">
          <circle className={styles.field} cx="10" cy="10" r="1.1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={`url(#${grid})`} />

      {scope === 'feature' ? (
        <>
          <path className={styles.line} d="M90,90 L230,90" />
          <circle className={styles.nodeOpen} cx="90" cy="90" r="7" />
          <circle className={styles.nodeShut} cx="160" cy="90" r="5" />
          <circle className={styles.halo} cx="230" cy="90" r="14" />
          <circle className={styles.nodeShut} cx="230" cy="90" r="7" />
        </>
      ) : null}

      {scope === 'area' ? (
        <>
          <rect className={styles.region} x="50" y="30" width="220" height="120" rx="8" />
          <path className={styles.line} d="M80,60 L210,60" />
          <path className={styles.line} d="M80,90 L240,90" />
          <path className={styles.line} d="M80,120 L170,120" />
          {[
            [80, 60, 210],
            [80, 90, 240],
            [80, 120, 170],
          ].map(([x1, y, x2]) => (
            <g key={y}>
              <circle className={styles.nodeOpen} cx={x1} cy={y} r="5" />
              <circle className={styles.nodeShut} cx={x2} cy={y} r="5" />
            </g>
          ))}
        </>
      ) : null}

      {scope === 'embedded' ? (
        <>
          {[
            [100, 70],
            [140, 70],
            [180, 70],
            [220, 70],
            [120, 110],
            [200, 110],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} className={styles.member} cx={cx} cy={cy} r="8" />
          ))}
          <circle className={styles.halo} cx="160" cy="110" r="16" />
          <circle className={styles.nodeShut} cx="160" cy="110" r="8" />
        </>
      ) : null}

      {scope === 'build' ? (
        <>
          <rect className={styles.drawn} x="40" y="50" width="100" height="80" rx="8" />
          <path className={styles.line} d="M152,90 L170,90" />
          <path className={styles.line} d="M163,83 L170,90 L163,97" />
          <rect className={styles.built} x="180" y="50" width="100" height="80" rx="8" />
        </>
      ) : null}
    </svg>
  );
}

/**
 * EngagementOptions — the ways an engagement can be shaped, comparable at a glance (product-design
 * round 6, 11 Oct 2026; page-mapping § 23).
 *
 * The reader is choosing a shape for their own project, so the options are genuinely comparable
 * objects: peers, set as image cards two by two (owner, 11 Oct: four across was too tight, the
 * alternating rows ran to two folds — "what about 4 image cards in a 2x2 grid?"). See
 * `EngagementArrangement`. The drawings are what make them
 * comparable before reading: the same field, a different blue shape for each scope. The limit on the
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
  const uid = useId().replace(/:/g, '');
  const shown = options.filter((option) => option.title.trim().length > 0);
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
          <Layout as="ul" columns={{ base: 1, md: 2, lg: 4 }} colGap="gutter" rowGap="column">
            {shown.map((option, index) => (
              <li key={option.title}>
                <Layout rowGap="block">
                  {option.scope ? <Drawing scope={option.scope} uid={`${uid}-${index}`} /> : null}
                  <Layout rowGap="text">
                    <h3 className={styles.title}>{option.title}</h3>
                    <p className={styles.body}>{option.body}</p>
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
                  {option.scope ? <Drawing scope={option.scope} uid={`${uid}-${index}`} cropped /> : null}
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
