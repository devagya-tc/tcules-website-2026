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
 *   below   a stacked head over a 3:1 photograph at the full column (1240 × 413 at 1470): eyebrow →
 *           heading → lead in one column at `block`, the action a `stack` under the lead, then the
 *           photograph a `stack` beneath. One column at every width (owner, 7 Oct 2026: the H-row,
 *           heading in a 1 track and lead + action in a 2 track, is retired — a text-only head is
 *           never split left/right). Below 1024 the photograph crops 3:2 — a 3:1 at the 326 phone
 *           column is a 109px sliver.
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

/**
 * The heading of a RUN of banners that together make one band (home round 3, 11 Oct 2026: "Why
 * teams choose Tcules", one beside banner per reason, alternating sides). Set at the display role
 * on the band's h2, a `stack` above the first banner's split, inside that banner's own Section, so
 * the run's heading and its first argument share one band's air rather than a head band and a
 * banner each spending a full padding. Its id names the band.
 */
export type BannerBandHead = { heading: string; headingId: string };

type BannerHeadProps = {
  /** The banner's heading, verbatim. Required: a banner is an argument with a name. */
  heading: string;
  /**
   * The heading's element. `h2` (default) for a banner that is a band of its own; `h3` for one
   * banner in a run under a band heading (`bandHead` on the run's first). The ROLE does not change:
   * the claim is still the banner's one large voice, set at the h2 role — the element is the
   * outline, the role is the design.
   */
  headingAs?: 'h2' | 'h3';
  /**
   * The run's band heading, on the run's FIRST banner only. See `BannerBandHead`. With it, the
   * Section is labelled by the band heading.
   */
  bandHead?: BannerBandHead;
  /** The band's in-page anchor, on the Section. */
  id?: string;
  /**
   * Something that SUPPORTS the heading, composed by the caller, a `stack` under the lead (and the
   * action) in the copy column — in practice a quiet testimonial (TestimonialCard `sm`, unboxed):
   * the claim leads, the client's words support it (home review patterns, 10 Oct 2026). A pattern
   * does not import a pattern, so the caller composes it.
   */
  support?: ReactNode;
  /**
   * The run's closing action, a `stack` under the split, on the run's LAST banner — in practice a
   * CtaRow with its rule. Composed at the call site.
   */
  footer?: ReactNode;
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
   * one blue link is the caller's composition and a pattern never imports a pattern.
   *
   * ONE link, never a solid (r7-buttons, 8 Oct 2026): a banner is in-band, and the page's one main
   * action — the blue solid and its ghost — belongs to the hero and the close. Until then a solid
   * CtaRow that took `converts` was allowed here.
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
  /**
   * Where the head's action sits (owner, 7 Oct 2026) — ContentSection's `actionsAt`, the same
   * decision. `below` (default) a `stack` under the lead; `end` at the inline end of the heading's
   * row from 1024, its top on the heading's top, in a content-sized track a `column` (64) from the
   * text, the eyebrow on its own line above both. Below 1024 it falls back under the lead.
   */
  actionsAt?: 'below' | 'end';
};

/**
 * Placement rule for `beside`: never two beside banners within sight of each other on a page —
 * not adjacent, and not separated only by a strip or a short band. Mirrored with `mediaSide`, two
 * of them are still the same copy-beside-photo rectangle flipped, and the page reads as one shape
 * repeated (CLAUDE.md § Design quality). Separate them by a band of a different arrangement, or make
 * one of them `below`. The family specimen shows three in a row as a specimen set only.
 *
 * The one exception is a RUN (home round 3, 11 Oct 2026, owner: "each section should be one fold"):
 * a band too long for a fold split into one beside banner per part, alternating `mediaSide`, under
 * one `bandHead` on the first and one `footer` on the last. The run is one band in parts, not two
 * bands that happen to match, so it is the band's arrangement rather than a repeated shape — and
 * the bands either side of it still follow the rule.
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

  const {
    heading,
    headingId,
    headingAs: Heading = 'h2',
    bandHead,
    id,
    support,
    footer,
    eyebrow,
    lead,
    actions,
    image,
    surface,
  } = props;
  const form = props.form ?? 'below';
  const labelledBy = bandHead?.headingId ?? headingId;
  const labelled = Boolean(labelledBy);
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
    <Heading id={headingId} className={styles.heading} data-copy="h2">
      {heading}
    </Heading>
  );
  const supportEl = support ?? null;
  const leadEl = lead ? (
    <p className={styles.lead} data-copy="lead">
      {lead}
    </p>
  ) : null;

  let arranged: ReactNode;

  const actionsAtEnd =
    form === 'below' && Boolean(actions) && 'actionsAt' in props && props.actionsAt === 'end';

  if (form === 'below' && actionsAtEnd) {
    /* Actions at the end (owner, 7 Oct 2026): the eyebrow on its own line, then heading and lead
       in the 1fr track and the action in a content-sized one from 1024, both on the heading's
       top, `column` (64) apart. Below 1024 one track, the action a `stack` under the lead. */
    arranged = (
      <Layout rowGap="stack">
        <Layout rowGap="block">
          {eyebrowEl}
          <Layout columns={{ lg: [1, 'auto'] }} colGap="column" rowGap="stack" align="start">
            <Layout rowGap="block">
              {headingEl}
              {leadEl}
            </Layout>
            {actions}
          </Layout>
        </Layout>
        <Media image={image} ratio={{ base: '3/2', lg: '3/1' }} sizes={FULL_COLUMN} />
      </Layout>
    );
  } else if (form === 'below') {
    /* The head is one column, the ContentSection stacked head (owner, 7 Oct 2026): eyebrow →
       heading → lead at `block`, the action a `stack` under the lead (§ 1.2), the photograph a
       `stack` under the head. It was the H-row — heading | lead + action — and with no image beside
       the text the reading order was unclear and the action floated in a mostly empty track. */
    arranged = (
      <Layout rowGap="stack">
        <Layout rowGap="block">
          {eyebrowEl}
          {headingEl}
          {leadEl}
        </Layout>
        {actions}
        {supportEl}
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
          {supportEl}
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

  /* A run's band heading over the first banner's split, and its closing action under the last
     one's, each a `stack` from the split: one band's head-to-body and body-to-footer seams. */
  const bandHeadEl = bandHead ? (
    <h2 id={bandHead.headingId} className={styles.bandHeading}>
      {bandHead.heading}
    </h2>
  ) : null;
  const content =
    bandHeadEl || footer ? (
      <Layout rowGap="stack">
        {bandHeadEl}
        {arranged}
        {footer ?? null}
      </Layout>
    ) : (
      arranged
    );

  return (
    <Section
      as={labelled ? 'section' : 'div'}
      id={id}
      surface={surface}
      aria-labelledby={labelled ? labelledBy : undefined}
      data-arrangement={form}
      data-band="I"
    >
      {content}
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
