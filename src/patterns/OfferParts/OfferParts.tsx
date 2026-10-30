import type { ReactNode } from 'react';

import {
  Layout,
  Media,
  Section,
  Sketch,
  type MediaImage,
  type SketchName,
} from '@/components';
import { PART_TRACK } from '@/lib/image-sizes';

import styles from './OfferParts.module.css';

/** One deliverable: a title, what it means, and its drawing (this pattern renders drawn sets only). */
export type OfferPartsDeliverable = {
  /** "A tested brief". */
  title: string;
  /** Plain text. */
  body?: string;
  /** Or trusted HTML from the content seam (a body that names a service as a link). */
  bodyHtml?: string;
  scene: SketchName;
};

/** The visual that heads a peer part: a photograph, or a flat drawing on its plate. */
export type OfferPartsVisual =
  | { kind: 'photo'; image: MediaImage }
  | { kind: 'drawing'; scene?: SketchName };

/** One of the peer parts under the deliverables (who does the work, what we need, where we stop). */
export type OfferPart = {
  title: string;
  body?: string;
  bodyHtml?: string;
  visual: OfferPartsVisual;
};

export type OfferPartsProps = {
  id?: string;
  /** The band's h2 ("What you get from our …"). */
  heading: string;
  headingId: string;
  lead?: string;
  /** The first part's title: the authored label over the list ("What you receive"). */
  deliverablesTitle: string;
  /** Two to six; built for five. */
  deliverables: readonly OfferPartsDeliverable[];
  /** Zero to three; built for three. */
  parts: readonly OfferPart[];
  /** Whatever else the band carries, under the parts. A slot. */
  note?: ReactNode;
  /** Default `paper`. */
  surface?: 'paper' | 'tint';
};

/** Deliverable tracks from 1024: one per deliverable, and six read three over three. */
const TRACKS: Record<number, 2 | 3 | 4 | 5> = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 3 };

const PEER_COLUMNS: Record<number, { base: 1; lg?: 2 | 3 }> = {
  1: { base: 1 },
  2: { base: 1, lg: 2 },
  3: { base: 1, lg: 3 },
};

const words = (item: { body?: string; bodyHtml?: string }) =>
  item.bodyHtml ? (
    <p className={styles.body} dangerouslySetInnerHTML={{ __html: item.bodyHtml }} />
  ) : item.body ? (
    <p className={styles.body}>{item.body}</p>
  ) : null;

/**
 * OfferParts — "What you get" in four parts (owner, 30 Oct 2026, round 6;
 * decisions/2026-10-30-what-you-get-titled-terms-four-parts).
 *
 * The deliverables are one part across the full width, one row of drawn items under one title; the
 * other three parts are one row of peers beneath, each its title, then its visual over its words.
 * Equal standing comes from structure, not from equal rectangles: every part opens on an h3 at one
 * role, with the same head-to-content seam and the same part seam. The row of three runs on
 * different tracks (3, not 5) and a wider seam (column, not gutter), so it never reads as one more
 * row of the set. No numbers, no hairlines, no containers: sequence is the reading order.
 */
export function OfferParts({
  id,
  heading,
  headingId,
  lead,
  deliverablesTitle,
  deliverables,
  parts,
  note,
  surface = 'paper',
}: OfferPartsProps) {
  if (process.env.NODE_ENV !== 'production') {
    if (deliverables.length < 2 || deliverables.length > 6) {
      console.warn(`OfferParts: ${deliverables.length} deliverables; built for two to six.`);
    }
    if (parts.length !== 3) {
      console.warn(`OfferParts: ${parts.length} parts; built for three.`);
    }
    for (const part of parts) {
      if (part.visual.kind === 'drawing' && !part.visual.scene) {
        console.warn(`OfferParts: "${part.title}" has no drawing; the empty plate stands.`);
      }
    }
  }
  const tracks = TRACKS[deliverables.length] ?? 3;

  const visualOf = (visual: OfferPartsVisual) =>
    visual.kind === 'photo' ? (
      <Media image={visual.image} ratio="16/9" sizes={PART_TRACK} />
    ) : (
      <Sketch name={visual.scene} />
    );

  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="offer-parts">
      <Layout rowGap="stack">
        {lead ? (
          <Layout rowGap="block">
            <h2 id={headingId} className={styles.heading}>
              {heading}
            </h2>
            <p className={styles.lead}>{lead}</p>
          </Layout>
        ) : (
          <h2 id={headingId} className={styles.heading}>
            {heading}
          </h2>
        )}
        <Layout rowGap="column">
          <Layout rowGap="block">
            <h3 className={styles.partTitle}>{deliverablesTitle}</h3>
            <Layout
              as="ul"
              columns={{ base: 1, lg: tracks }}
              colGap="gutter"
              rowGap="stack"
              shareRows={2}
            >
              {deliverables.map((item) => (
                <Layout
                  as="li"
                  key={item.title}
                  columns={{ base: [5, 6], lg: 1 }}
                  colGap="gutter"
                  rowGap="block"
                  align="start"
                >
                  <Sketch name={item.scene} />
                  <Layout rowGap="text">
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    {words(item)}
                  </Layout>
                </Layout>
              ))}
            </Layout>
          </Layout>
          {parts.length > 0 ? (
            <Layout
              columns={PEER_COLUMNS[Math.min(parts.length, 3)] ?? { base: 1 }}
              colGap="column"
              rowGap="column"
              shareRows={2}
            >
              {parts.map((part) => (
                <Layout key={part.title} rowGap="block">
                  <h3 className={styles.partTitle}>{part.title}</h3>
                  <Layout
                    columns={{ base: 1, md: [5, 6], lg: 1 }}
                    colGap="gutter"
                    rowGap="block"
                    align="start"
                  >
                    {visualOf(part.visual)}
                    {words(part)}
                  </Layout>
                </Layout>
              ))}
            </Layout>
          ) : null}
          {note}
        </Layout>
      </Layout>
    </Section>
  );
}
