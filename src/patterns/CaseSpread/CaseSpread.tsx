import type { ReactNode } from 'react';

import { Layout, Media, Section, type MediaImage, type SectionSurface } from '@/components';
import { CASE_SPREAD_MEDIA } from '@/lib/image-sizes';

import styles from './CaseSpread.module.css';

/** A titled part of the story ("The problem.", "What we did."). */
export type CaseSpreadPart = {
  /** As authored, its full stop kept. */
  title: string;
  /** Inline content the caller renders (it may carry a link). */
  body: ReactNode;
};

export type CaseSpreadProps = {
  /** The band's anchor. */
  id?: string;
  /** "Example: Dealpath": the h2, the band's accessible name. */
  heading: string;
  headingId: string;
  /** The outcome ("The result."): the band's claim, set large beside the evidence. */
  claim: CaseSpreadPart;
  /** The way to the whole case: in practice a `CtaRow` with `rule={false}`. A slot. */
  action?: ReactNode;
  /** The evidence: one image, framed at 16:9 (the site's one card ratio), cover-cropped at `focus`. */
  image: MediaImage;
  /** The backstory, in order: in practice the problem, then what we did. One to three parts. */
  story: readonly CaseSpreadPart[];
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * CaseSpread — one worked example, with the emphasis where the argument is (product-design round 6,
 * 11 Oct 2026; page-mapping § 23).
 *
 * A worked example on a service page argues one thing: we changed a real product, and this is what
 * it got. So the OUTCOME is the claim and the evidence image is its proof; the problem and what we
 * did are the backstory a reader takes after deciding the example is worth it. From 1024:
 *
 *   row 1, [5, 7]  the h2, then the outcome as the claim — its title, its sentence at lead-lg in the
 *                  full ink, behind a blue start rule — and the action a `stack` under it · the
 *                  evidence at 16:9, beside, its top on the heading's.
 *   row 2, [5, 7]  the story parts on hairlines, on the same tracks, so the short problem sits under
 *                  the claim and the longer account under the image (three parts: three equal).
 *
 * Below 1024 one column in that order: heading, claim, action, image, story. The reading order is
 * claim-first (claim leads, proof supports); every word stays, only the IA is designed.
 */
export function CaseSpread({
  id,
  heading,
  headingId,
  claim,
  action,
  image,
  story,
  surface = 'paper',
}: CaseSpreadProps) {
  const parts = story.filter((part) => part.title.trim().length > 0);
  const storyColumns = parts.length === 2 ? [5, 7] : Math.max(1, parts.length);
  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="case-spread">
      <Layout rowGap="stack">
        <Layout columns={{ base: 1, lg: [5, 7] }} colGap="column" rowGap="stack" align="start">
          <Layout rowGap="stack">
            <Layout rowGap="block">
              <h2 id={headingId} className={styles.heading}>
                {heading}
              </h2>
              <div className={styles.claim}>
                <Layout rowGap="text">
                  <h3 className={styles.claimTitle}>{claim.title}</h3>
                  <p className={styles.claimBody}>{claim.body}</p>
                </Layout>
              </div>
            </Layout>
            {action}
          </Layout>
          <div className={styles.frame}>
            <Media image={image} sizes={CASE_SPREAD_MEDIA} fit="fill" edge="placement" />
          </div>
        </Layout>
        {parts.length > 0 ? (
          <Layout
            as="ul"
            columns={{ base: 1, lg: storyColumns }}
            colGap="column"
            rowGap="stack"
          >
            {parts.map((part) => (
              <li key={part.title} className={styles.story}>
                <Layout rowGap="text">
                  <h3 className={styles.storyTitle}>{part.title}</h3>
                  <p className={styles.storyBody}>{part.body}</p>
                </Layout>
              </li>
            ))}
          </Layout>
        ) : null}
      </Layout>
    </Section>
  );
}
