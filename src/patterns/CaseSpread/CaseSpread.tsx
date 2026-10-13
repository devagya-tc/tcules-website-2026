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
  /** The outcome ("The result."): the story's last step, its payoff, marked on the rail. */
  claim: CaseSpreadPart;
  /** The way to the whole case: in practice a `CtaRow` with `rule={false}`. A slot. */
  action?: ReactNode;
  /** The evidence: one image, framed at 16:9 (the site's one card ratio), cover-cropped at `focus`. */
  image: MediaImage;
  /** The steps before the result, in order: in practice the problem, then what we did. */
  story: readonly CaseSpreadPart[];
  /** Default `paper`. */
  surface?: SectionSurface;
};

/**
 * CaseSpread — one worked example, with the emphasis where the argument is (product-design round 6,
 * 11 Oct 2026; page-mapping § 23).
 *
 * A worked example on a service page argues one thing: we changed a real product, and this is what
 * it got. Round 6 led with the outcome and left the problem and what we did as a ruled row under
 * the image; the owner found them "quite disconnected from the content above" (11 Oct 2026). Now:
 *
 *   the h2 across the band, then [5, 7] from 1024: the story in the order it happened — the
 *   problem, what we did, the result — as one connected line down a rail that turns blue and full
 *   ink at the result (the payoff), the action closing the line · the evidence at 16:9 beside it,
 *   its top on the problem's, sticky while the story is read.
 *
 * Below 1024 one column: heading, story, action, image. Every word stays, in its authored order.
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
  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="case-spread">
      <Layout rowGap="stack">
        <h2 id={headingId} className={styles.heading}>
          {heading}
        </h2>
        <Layout columns={{ base: 1, lg: [5, 7] }} colGap="column" rowGap="stack" align="start">
          {/* The story, in the order it happened, as one connected line: a rail runs down the
              problem and what we did and turns blue at the result, the payoff, so the three read as
              one argument rather than a claim with notes under it. The action follows on the section's
              edge, not the rail's inset (owner, 11 Oct 2026). */}
          <Layout rowGap="stack">
            <Layout as="ol" rowGap="none">
              {parts.map((part) => (
                <li key={part.title} className={styles.step}>
                  <Layout rowGap="text">
                    <h3 className={styles.storyTitle}>{part.title}</h3>
                    <p className={styles.storyBody}>{part.body}</p>
                  </Layout>
                </li>
              ))}
              <li className={styles.result}>
                <Layout rowGap="text">
                  <h3 className={styles.claimTitle}>{claim.title}</h3>
                  <p className={styles.claimBody}>{claim.body}</p>
                </Layout>
              </li>
            </Layout>
            {action}
          </Layout>
          {/* The evidence holds beside the story while it is read (sticky from 1024). */}
          <div className={styles.evidence}>
            <div className={styles.frame}>
              <Media image={image} sizes={CASE_SPREAD_MEDIA} fit="fill" edge="placement" />
            </div>
          </div>
        </Layout>
      </Layout>
    </Section>
  );
}
