import { Cluster, Icon, Layout, type IconName } from '@/components';
import { cx } from '@/lib/cx';

import styles from './BlockCard.module.css';

/**
 * One optional media slot with two deliberately closed fills. Callers cannot pass a React node,
 * so the slot cannot acquire controls, overlays or call-site crop behaviour.
 */
export type BlockCardMedia =
  { kind: 'icon'; name: IconName } | { kind: 'image'; src: string; alt: string };

export type BlockCardTitleElement = 'h3' | 'h4';

/**
 * A closed card record. Grid geometry, surface, finish and action rendering all stay outside the
 * public API: the parent owns the grid, the nearest Section owns the surface, and BlockCard owns
 * its one edge and optional whole-card link.
 */
export type BlockCardProps = {
  /** Required card heading. Whitespace-only values render nothing and warn in development. */
  title: string;
  /** One supporting paragraph. Whitespace-only values omit the paragraph and warn. */
  body: string;
  /** Optional decorative icon or BlockCard-owned 3:2 image. */
  media?: BlockCardMedia;
  /** Heading semantics without a visual type change. Defaults to h3. */
  titleAs?: BlockCardTitleElement;
  /** A non-blank destination turns the entire card into one native link and adds its cue. */
  href?: string;
};

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`BlockCard: ${message}`);
}

function Media({ media }: { media: BlockCardMedia }) {
  if (media.kind === 'icon') {
    return (
      <span className={styles.iconMedia}>
        <Icon name={media.name} size="xl" />
      </span>
    );
  }

  if (media.src.trim().length === 0) {
    warn('image media received a blank src; omitting the media.');
    return null;
  }

  return (
    <span className={styles.imageMedia}>
      {/* The accepted contract owns a native image, its loading policy and intrinsic 3:2 size.
          `alt` remains required, including an intentional empty string for decorative imagery. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- accepted native-image contract */}
      <img
        className={styles.image}
        src={media.src}
        alt={media.alt}
        width={480}
        height={320}
        loading="lazy"
        decoding="async"
      />
    </span>
  );
}

/**
 * BlockCard — one bounded tile, built to docs/specs/BlockCard.md.
 *
 * The root is always an <li>. A non-blank href changes only the frame element and adds the cue:
 * the linked shape has one native anchor and one focus stop, while the static shape is complete
 * without an empty action row. Layout owns the block-axis groups and Cluster owns cue alignment;
 * this module contains no hand-written sibling arrangement.
 */
export function BlockCard({ title, body, media, titleAs: Title = 'h3', href }: BlockCardProps) {
  if (title.trim().length === 0) {
    warn('title is blank; rendering nothing.');
    return null;
  }

  const hasBody = body.trim().length > 0;
  if (!hasBody) warn(`body is blank for ${JSON.stringify(title)}; omitting the paragraph.`);

  const destination = href?.trim() ? href : undefined;
  const imageMedia = media?.kind === 'image' ? <Media media={media} /> : null;

  const inset = (
    <Layout rowGap="block" className={styles.content}>
      {media?.kind === 'icon' ? <Media media={media} /> : null}
      <Layout rowGap="tight">
        <Title className={styles.title}>{title}</Title>
        {hasBody ? <p className={styles.body}>{body}</p> : null}
      </Layout>
      {destination ? (
        <Cluster justify="end">
          <span className={styles.cue}>
            <Icon name="arrow-right" size="lg" />
          </span>
        </Cluster>
      ) : null}
    </Layout>
  );

  /* The frame stacks exactly two things: an optional edge-to-edge image and one inset content
     block. That is an arrangement, so it is a Layout and not the frame's own block flow —
     `rowGap="none"` is the explicit statement that the image and the inset share an edge, which is
     what keeps the crop flush to the frame's border on three sides. */
  const content = (
    <Layout rowGap="none">
      {imageMedia}
      {inset}
    </Layout>
  );

  return (
    <li className={styles.root}>
      {destination ? (
        <a className={cx(styles.frame, styles.link)} href={destination}>
          {content}
        </a>
      ) : (
        <div className={styles.frame}>{content}</div>
      )}
    </li>
  );
}
