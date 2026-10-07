import type { CSSProperties, ReactNode } from 'react';

import {
  Button,
  Cluster,
  Icon,
  Layout,
  Media,
  Section,
  type MediaImage,
  type SectionSurface,
} from '@/components';
import { FULL_COLUMN } from '@/lib/image-sizes';

import styles from './Banner.module.css';

/**
 * The three forms of the banner family (visual-direction § 3.4, I and the strip).
 *
 *   below   the H-row over a 3:1 photograph at the full column (1240 × 413 at 1470). Eyebrow on its
 *           own row, then the h2 in the 1 track and the lead and action in the 2 track of [1, 2],
 *           top edges level; then the photograph a `stack` beneath. Below 1024 one column, and the
 *           photograph crops 3:2 — a 3:1 at the 326 phone column is a 109px sliver.
 *   beside  a 3:2 photograph in 7 of [5, 7] (667) beside the copy in 5 (477), centred on it: the
 *           copy is a head and an action and nothing else, so it is centred, never stretched
 *           (§ 3.2 rule 1, its exception). `mediaSide` puts the photograph at either end. Below
 *           1024 the copy comes first and the photograph a `stack` beneath, at 3:2.
 *   strip   the announcement strip: one line of body-sm and one blue link on its own ground, at
 *           Section's `strip` density (24). Showcase pages only, above the hero (§ 8.3).
 *
 * Presentation, never a CMS field: the template that places the band chooses it.
 */
export type BannerForm = 'below' | 'beside' | 'strip';

/** Which inline end the `beside` image takes from 1024. Below 1024 it always follows the copy. */
export type BannerMediaSide = 'start' | 'end';

/** The strip's one link. A record, not a node: the strip owns its size, emphasis and glyph. */
export type BannerLink = { label: string; href: string };

type BannerHeadProps = {
  /** The band's h2, verbatim. Required: a banner is an argument with a name. */
  heading: string;
  /**
   * The heading's id, and therefore the band's accessible name and its in-page anchor. Supplied by
   * the caller, because it belongs to the content (ContentSection's reasoning).
   */
  headingId?: string;
  /** The label above the heading. Never repeats the heading or the crumb (§ 7.3). */
  eyebrow?: string;
  /** One sentence under the heading, ≤ 18 words (below) or ≤ 3 lines in 477 (beside). */
  lead?: string;
  /**
   * The head's action, a `stack` under the lead — in practice a `CtaRow` with `rule={false}`, so the
   * blue link (or one solid) is the caller's composition and a pattern never imports a pattern.
   *
   * A solid ask is the BLUE solid primary — `<CtaRow emphasis="solid" tone="primary" … />` — the
   * same treatment as the hero's first action (fix round 2). CtaRow's solid default is the neutral
   * (ink) solid, and on a page that put an ink "Book an audit" a scroll above a blue "Start a
   * project" the two asks read as two systems. One band, one ask, one colour for it: blue (§ 4.2,
   * "the ask: the solid primary button").
   */
  actions?: ReactNode;
  /**
   * The image. `below` takes a PHOTOGRAPH only (it is cropped 3:1, and only a photograph takes a
   * ratio). `beside` takes a photograph (cropped 3:2) or an illustration, which renders whole,
   * unboxed, centred on the copy (§ 5.3) — and a band with an illustration carries no texture.
   * Never type on the image (§ 5.1 rule 6): the banner has no overlay slot by construction.
   *
   * Choose a photograph with DEFINED EDGES. A banner photograph has no frame (§ 5.3), so its paper
   * edge is the photograph's own: a high-key source whose edge is blown window or white wall
   * dissolves into the paper and loses its shape and its radius on that side (fix round 1, I.4).
   * The edge has to hold a tone of its own; reject a source whose edge column is mostly near-white.
   */
  image: MediaImage;
  /** The ground. Default `paper`; tint only as a surface proof on a specimen (§ 8.6). */
  surface?: SectionSurface;
};

type BelowProps = BannerHeadProps & {
  form?: 'below';
  mediaSide?: never;
};

/**
 * Placement rule for `beside`: never two beside banners within sight of each other on a page —
 * not adjacent, and not separated only by a strip or a short band. Mirrored with `mediaSide`, two
 * of them are still the same copy-beside-photo rectangle flipped, and the page reads as one shape
 * repeated (CLAUDE.md § Design quality). Separate them by a band of a different arrangement, or make
 * one of them `below`. The family specimen shows three in a row as a specimen set only.
 */
type BesideProps = BannerHeadProps & {
  form: 'beside';
  /** Default `end`: copy first, photograph after, as it reads. Consecutive media bands alternate. */
  mediaSide?: BannerMediaSide;
};

type StripProps = {
  form: 'strip';
  /** The announcement, one sentence of body-sm, ≤ 14 words so it holds one line at 1440. */
  message: string;
  /**
   * A short mono label before the message ("New", "Event"). Blue, as the family's accent: the label
   * is the strip's mark, the eyebrow's blue rule in another form (fix round 1). The message stays ink.
   */
  label?: string;
  /** The one link. Blue at rest, the arrow after it (§ 4.2: every link-style action). */
  link?: BannerLink;
  /** The ground. Default `tint` (§ 1.7: the strip may sit on tint; it is a strip, not a band). */
  surface?: SectionSurface;
  /** The landmark's name. Default "Announcement". */
  'aria-label'?: string;
};

export type BannerProps = BelowProps | BesideProps | StripProps;

/**
 * The `beside` photograph's rendered width as a `sizes` list: 7 of [5, 7] at the split seam, the
 * full column below 1024. Derived exactly as `MEDIA_SPLIT` is in `@/lib/image-sizes` (5 of 12):
 * (1240 − 96) × 7 / 12 = 667 at the cap.
 */
const BESIDE_SIZES =
  '(min-width: 1304px) 667px, (min-width: 1024px) calc((100vw - 160px) * 7 / 12), calc(100vw - 64px)';

/**
 * The phone crop's horizontal shift for an illustration, as the one custom property the zoom reads
 * (Media's --media-focus precedent: a class cannot express a per-asset value). The window is
 * 1 / zoom of the drawing, centred on `focus.x` and clamped so it never runs past either edge.
 * Kept in step with --bnr-illustration-zoom-phone (1.8, as 180%) in tokens/components/banner.css.
 */
const ILLUSTRATION_ZOOM_PHONE = 1.8;
function illustrationShift(image: MediaImage): CSSProperties | undefined {
  const x = image.focus?.x;
  if (x === undefined) return undefined;
  const window = 1 / ILLUSTRATION_ZOOM_PHONE;
  const start = Math.min(Math.max(x - window / 2, 0), 1 - window);
  return { '--bnr-illustration-shift': `${(-start * 100).toFixed(2)}%` } as CSSProperties;
}

/**
 * Banner — the I band: one photograph carrying the band, a head that names it, and at most one
 * action; or the slim announcement strip.
 *
 * Its rhythm is ContentSection's (§ 1.1): eyebrow → heading → lead at `block` (24), lead → action
 * and head → photograph at `stack` (48), a split at `section` (96). Every seam is a Layout prop;
 * this file chooses none of the distances and draws no box. The photograph's 8 radius and no frame
 * are Media's (`kind="photograph"`, § 5.3). The band's air is Section's `tight` (64) for the banner
 * and `strip` (24) for the strip — so a banner fits the fold with room (§ 1.4: below 617 of 702,
 * beside 445).
 *
 * Built from primitives rather than on ContentSection, because a pattern does not import a pattern
 * (CLAUDE.md § Scope). The head is twelve lines of Layout; the rule it shares with ContentSection is
 * the gap ladder, which both read from the same scale.
 *
 * Route-blind and data-blind like every pattern.
 */
export function Banner(props: BannerProps) {
  if (props.form === 'strip') return <Strip {...props} />;

  const { heading, headingId, eyebrow, lead, actions, image, surface } = props;
  const form = props.form ?? 'below';
  const labelled = Boolean(headingId);
  const illustration = image.kind === 'illustration';

  if (
    process.env.NODE_ENV !== 'production' &&
    form === 'below' &&
    image.kind !== 'photograph'
  ) {
    console.warn(
      `Banner: the below form crops its image 3:1, and only a photograph takes a ratio (got kind "${image.kind ?? 'unset'}"). Use form="beside" for an illustration.`,
    );
  }

  const eyebrowEl = eyebrow ? (
    <p className={styles.eyebrow} data-copy="eyebrow">
      {eyebrow}
    </p>
  ) : null;
  const headingEl = (
    <h2 id={headingId} className={styles.heading} data-copy="h2">
      {heading}
    </h2>
  );
  const leadEl = lead ? (
    <p className={styles.lead} data-copy="lead">
      {lead}
    </p>
  ) : null;

  let arranged: ReactNode;

  if (form === 'below') {
    /* The H-row (§ 1.4, as amended by fdn-section-head): the eyebrow labels the whole row, so it
       keeps its own row; then heading | lead + action, top-aligned. With no lead and no action the
       row has no trailing half, and the heading sits alone under its eyebrow.

       Lead to action is `block` (24) here, not ContentSection's `stack` (48): in the H-row the lead
       and its link are ONE trailing unit set against the heading, and at 48 the link floated loose in
       a mostly empty two-thirds track and the row read as a form (fix round 1). In the beside form the
       copy is a column of its own, and the action keeps the `stack` beat under it. */
    const trailing = leadEl || actions;
    arranged = (
      <Layout rowGap="stack">
        <Layout rowGap="block">
          {eyebrowEl}
          {trailing ? (
            <Layout columns={{ lg: [1, 2] }} colGap="section" rowGap="block" align="start">
              {headingEl}
              <Layout rowGap="block">
                {leadEl}
                {actions}
              </Layout>
            </Layout>
          ) : (
            headingEl
          )}
        </Layout>
        <Media image={image} ratio={{ base: '3/2', lg: '3/1' }} sizes={FULL_COLUMN} />
      </Layout>
    );
  } else {
    /* beside: copy in 5, image in 7. The copy is first in the DOM (it reads first on a phone, where
       the image follows it); `reverse` mirrors the template from 1024 for `mediaSide="start"`, so
       the image keeps its 7 on the other side. Visual only — the image carries no meaning against
       the copy (alt="" atmosphere photograph, or an illustration of the band's argument). */
    const side = props.form === 'beside' ? (props.mediaSide ?? 'end') : 'end';
    arranged = (
      <Layout
        columns={{ lg: [5, 7] }}
        colGap="section"
        rowGap="stack"
        align="center"
        reverse={side === 'start' ? { lg: true } : undefined}
      >
        <Layout rowGap="stack">
          <Layout rowGap="block">
            {eyebrowEl}
            {headingEl}
            {leadEl}
          </Layout>
          {actions}
        </Layout>
        {/* A plain wrapper so the image keeps its crop in a row that centres it. A photograph crops
            3:2 at every width. An illustration renders whole and unboxed from 768; on a phone it
            is ZOOMED into its main object (fix round 1): a 962-wide drawing at the 326 column is
            0.34×, and its mono callouts came out at 4 to 6px. The phone window is
            --bnr-illustration-zoom-phone of the column, centred on the record's `focus.x` and
            clamped to the drawing, so a callout at the far edge falls outside the crop rather
            than being shrunk past reading. */}
        {illustration ? (
          <div className={styles.illustration}>
            <div className={styles.illustrationZoom} style={illustrationShift(image)}>
              <Media image={image} sizes={BESIDE_SIZES} />
            </div>
          </div>
        ) : (
          <div>
            <Media image={image} ratio="3/2" sizes={BESIDE_SIZES} />
          </div>
        )}
      </Layout>
    );
  }

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      surface={surface}
      density="tight"
      aria-labelledby={labelled ? headingId : undefined}
      data-arrangement={form}
      data-band="I"
    >
      {arranged}
    </Section>
  );
}

/**
 * The announcement strip. An `aside` landmark — it is related to the page, not part of its argument
 * — named "Announcement" by default, so a screen reader can find and skip it. One line from 768 up;
 * below it the link wraps under the message, `tight` (8) beneath, because a label and its action are
 * a tight pair (§ 1.2).
 */
function Strip({
  message,
  label,
  link,
  surface = 'tint',
  'aria-label': ariaLabel,
}: StripProps) {
  return (
    <Section
      as="aside"
      surface={surface}
      density="strip"
      aria-label={ariaLabel ?? 'Announcement'}
      data-band="strip"
    >
      <Cluster colGap="block" rowGap="tight" align="center">
        {label ? <p className={styles.stripLabel}>{label}</p> : null}
        <p className={styles.strip} data-copy="body-sm">
          {message}
        </p>
        {link ? (
          <Button
            as="a"
            href={link.href}
            emphasis="link"
            tone="primary"
            size="sm"
            extendHitArea
            icon={<Icon name="arrow-right" />}
          >
            {link.label}
          </Button>
        ) : null}
      </Cluster>
    </Section>
  );
}
