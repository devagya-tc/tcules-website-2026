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
  /** "Example": a label over the heading, naming what kind of band this is. */
  eyebrow?: string;
  /** "Dealpath" (or "Example: Dealpath" without an eyebrow): the h2, the band's accessible name. */
  heading: string;
  headingId: string;
  /** The outcome ("The result."): the story's last step, its payoff. */
  claim: CaseSpreadPart;
  /** The way to the whole case: in practice a `CtaRow` with `rule={false}`. A slot. */
  action?: ReactNode;
  /** The evidence: one image, framed at 16:9 (the site's one card ratio), cover-cropped at `focus`. */
  image: MediaImage;
  /** The steps before the result, in order: in practice the problem, then what we did. */
  story: readonly CaseSpreadPart[];
  /**
   * The STRIP (owner, 26 Oct 2026, product-design page): the problem and what we did drawn, one Sketch
   * scene each, on the same screen so the change is the only difference, then the evidence as the
   * result's picture. Three pictures on one ground, read left to right and joined by the route, each
   * step's words under its picture. Given for a two-step story; otherwise the spread.
   */
  scenes?: readonly [SketchName, SketchName];
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
 *   problem, what we did, the result — read down in one column, held by type and spacing alone (no
 *   rail, no rules: owner, 26 Oct 2026), the action closing it · the evidence at 16:9 beside it,
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
  scenes,
  eyebrow,
  surface = 'paper',
}: CaseSpreadProps) {
  const parts = story.filter((part) => part.title.trim().length > 0);
  const eyebrowEl = eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null;
  const headingEl = (
    <h2 id={headingId} className={styles.heading}>
      {heading}
    </h2>
  );
  const head = (
    <Layout rowGap="tight">
      {eyebrowEl}
      {headingEl}
    </Layout>
  );

  if (scenes && parts.length === 2) {
    const [problem, did] = scenes;
    const steps = [...parts, claim];
    return (
      <Section id={id} surface={surface} aria-labelledby={headingId} data-band="case-spread">
        <Layout rowGap="stack">
          {action ? (
            /* The action at the heading's end, its top on the heading's FIRST line (owner, 29 Oct
               2026, home review; ContentSection `actionsAt="end"`): the eyebrow on its own line
               above, so it is the title the action aligns with, never the head's foot. */
            <Layout rowGap="tight">
              {eyebrowEl}
              <Layout
                columns={{ base: 1, md: [1, 'auto'] }}
                colGap="column"
                rowGap="block"
                align="start"
              >
                {headingEl}
                {action}
              </Layout>
            </Layout>
          ) : (
            head
          )}
          {/* Each step is ONE unit, its picture over its words, on one grid of three equal tracks, so
              every picture sits on its own words' edges (owner, 26 Oct 2026: "each drawing needs to
              be associated with the card below it so there's symmetry"). The route between pictures
              sits in the seam, centred in it and level with the pictures' middle, so the joins are
              evenly spaced by construction. Below 1024 the steps stack in order and the joins go. */}
          <Layout as="ol" columns={{ base: 1, lg: 3 }} colGap="column" rowGap="stack">
            {steps.map((part, index) => (
              <li key={part.title}>
                <Layout rowGap="block">
                  <div className={styles.picture}>
                    {index === 0 ? (
                      <Sketch name={problem} />
                    ) : index === 1 ? (
                      <Sketch name={did} />
                    ) : (
                      <div className={styles.frame}>
                        <Media
                          image={image}
                          sizes={CASE_SPREAD_MEDIA}
                          fit="fill"
                          edge="placement"
                        />
                      </div>
                    )}
                    {index < steps.length - 1 ? (
                      <span className={styles.join} aria-hidden="true" />
                    ) : null}
                  </div>
                  <Layout rowGap="tight">
                    <h3 className={styles.storyTitle}>{part.title}</h3>
                    <p className={styles.storyBody}>{part.body}</p>
                  </Layout>
                </Layout>
              </li>
            ))}
          </Layout>
        </Layout>
      </Section>
    );
  }

  return (
    <Section id={id} surface={surface} aria-labelledby={headingId} data-band="case-spread">
      <Layout rowGap="stack">
        {head}
        <Layout columns={{ base: 1, lg: [5, 7] }} colGap="column" rowGap="stack" align="start">
          {/* The story, in the order it happened, held together by type and spacing alone (owner, 26 Oct
              2026: no rail and no rules beside or above the steps). Previously: a rail ran down the
              problem and what we did and turns blue at the result, the payoff, so the three read as
              one argument rather than a claim with notes under it. The action follows on the section's
              edge, not the rail's inset (owner, 11 Oct 2026). */}
          <Layout rowGap="stack">
            <Layout as="ol" rowGap="block">
              {parts.map((part) => (
                <li key={part.title}>
                  <Layout rowGap="text">
                    <h3 className={styles.storyTitle}>{part.title}</h3>
                    <p className={styles.storyBody}>{part.body}</p>
                  </Layout>
                </li>
              ))}
              <li>
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
