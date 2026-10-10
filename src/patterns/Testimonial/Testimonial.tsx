import type { ReactNode } from 'react';

import { Cluster, Icon, Layout, Prose, StarRating } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Testimonial.module.css';

/**
 * One client's testimonial, as a card renders it. Presentation-agnostic: the page maps its content
 * onto this, and the pattern never learns where a quote or its rating came from.
 */
export type TestimonialItem = {
  /** A stable key within a set (the testimonial id where the content has one). */
  id?: string;
  /** Trusted, content-seam-sanitised rich text, authored marks included. Never the attribution. */
  quoteHtml: string;
  /** The speaker. Required: a testimonial is always named. */
  name: string;
  /** The speaker's title. A blank role leaves no separator. */
  role?: string;
  /** The client, named after the role. */
  company: string;
  /**
   * What this client rated, out of 5, in halves. Optional: with none the card shows no stars rather
   * than a default score. Always the page's data, passed as a prop, never a value a pattern holds
   * (home round 2: the ratings are placeholders at the content seam until real ones replace them).
   */
  rating?: number;
};

/**
 * The card's weight.
 *
 *   md  the testimonial is the thing: a quote wall, a quote beside its case. The reading quote at its
 *       narrow measure (--text-quote-sm, 22), 18 stars, the monogram beside the name.
 *   sm  the testimonial SUPPORTS something beside it (owner, 10 Oct 2026: "the main highlight is the
 *       thing we claim to be doing and the testimonial supports it"). The same quote role in the
 *       quieter ink, 14 stars, no monogram: one step down everywhere, so the claim beside it leads.
 */
export type TestimonialSize = 'md' | 'sm';

/**
 * `box` sets the card on its own quiet ground (testimonial.css: the one card with a ground at rest,
 * because every reference the owner chose panels each review). `none` sets it straight on the
 * surface, for a supporting quote that should not read as a second object in its row.
 */
export type TestimonialFrame = 'box' | 'none';

function warn(message: string) {
  if (process.env.NODE_ENV !== 'production') console.warn(`Testimonial: ${message}`);
}

const filled = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

function valid(item: TestimonialItem): boolean {
  const blank = (['quoteHtml', 'name', 'company'] as const).filter((key) => !filled(item[key]));
  if (blank.length > 0) {
    warn(`"${item.name || '?'}" has blank ${blank.join(', ')}; omitting it.`);
    return false;
  }
  return true;
}

/** "Samy Melaine" → "SM"; "Jody O'Neill" → "JO"; one word → its first letter. */
export function initialsOf(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const first = words[0]?.[0] ?? '';
  const last = words.length > 1 ? (words.at(-1)?.[0] ?? '') : '';
  return `${first}${last}`.toUpperCase();
}

/**
 * Bind a one-letter word to the next with a no-break space in the text of trusted HTML, so a line
 * never ends on a lone "I" or "a" (Proof's typesetting rule, restated here on purpose: a pattern
 * does not import a pattern).
 */
function bindShortWords(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<') ? part : part.replace(/(^|[\s(“"‘'])(I|a|A) (?=\S)/g, '$1$2 '),
    )
    .join('');
}

/**
 * Set straight double quotes as typographic ones in the text of trusted HTML: an opening mark after
 * the start, a space or an opening bracket, a closing mark everywhere else. The corpus authors most
 * quotes with curly marks and some (About's three voices) with straight ones, so the site showed
 * both (critic, home round 2). Typesetting, like `bindShortWords`: the marks change, the words do
 * not. Tags are left alone, so attribute quotes are never touched.
 */
function curlQuotes(html: string): string {
  return html
    .split(/(<[^>]*>)/)
    .map((part) =>
      part.startsWith('<')
        ? part
        : part
            .replace(/&quot;/g, '"')
            .replace(/(^|[\s([{—–])"/g, '$1“')
            .replace(/"/g, '”'),
    )
    .join('');
}

/** A rough height for a card, from its quote's length: enough to balance column stacks. */
const weightOf = (item: TestimonialItem) => item.quoteHtml.replace(/<[^>]*>/g, '').length + 220;

/* ── The card ─────────────────────────────────────────────────────────────────────── */

export type TestimonialCardProps = {
  item: TestimonialItem;
  size?: TestimonialSize;
  frame?: TestimonialFrame;
  /**
   * `li` when the card is one of a list (a wall); `div` (default) when it stands alone beside
   * something. The figure inside carries the quote semantics either way.
   */
  as?: 'li' | 'div';
  /** Stretch to the row's height, the attribution pinned to the foot (a row of peers). */
  fill?: boolean;
};

/**
 * TestimonialCard — stars, the client's words, and who said them, in that order (the owner's
 * references 1 and 3: the rating heads the card, the person closes it). The attribution opens on a
 * hairline, so the speaker reads as the card's foot rather than a fourth paragraph.
 */
export function TestimonialCard({
  item,
  size = 'md',
  frame = 'box',
  as: Root = 'div',
  fill = false,
}: TestimonialCardProps) {
  if (!valid(item)) return null;
  const role = filled(item.role) ? `${item.role}, ${item.company}` : item.company;
  const quiet = size === 'sm';
  return (
    <Root className={cx(styles.item, fill && styles.fill)}>
      <Layout
        as="figure"
        rowGap={quiet ? 'text' : 'block'}
        pinLast={fill}
        className={cx(
          styles.card,
          frame === 'box' && styles.box,
          quiet && styles.sm,
          fill && styles.fillCard,
        )}
      >
        {typeof item.rating === 'number' ? (
          <StarRating
            value={item.rating}
            size={quiet ? 'sm' : 'md'}
            glyph={<Icon name="star" />}
            onCard={frame === 'box'}
          />
        ) : null}
        <blockquote className={styles.quote}>
          <Prose
            html={bindShortWords(curlQuotes(item.quoteHtml))}
            className={styles.quoteProse}
          />
        </blockquote>
        <Cluster
          as="figcaption"
          nowrap
          colGap="text"
          align="center"
          className={cx(styles.attribution, frame === 'box' && styles.attributionRuled)}
        >
          {quiet ? null : (
            <span className={styles.monogram} aria-hidden="true">
              {initialsOf(item.name)}
            </span>
          )}
          <Layout rowGap="inline" className={styles.who}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.role}>{role}</span>
          </Layout>
        </Cluster>
      </Layout>
    </Root>
  );
}

/* ── The wall ─────────────────────────────────────────────────────────────────────── */

/**
 * Split items into `count` CONTIGUOUS runs whose estimated heights are as even as possible, so the
 * columns end near one line and a phone, which reads the runs one after another, still reads the
 * quotes in the order they were written.
 */
function partition(items: readonly TestimonialItem[], count: number): TestimonialItem[][] {
  const weights = items.map(weightOf);
  const n = items.length;
  /* best[k][i]: the smallest possible tallest column for the first i items in k columns. */
  const best: number[][] = Array.from({ length: count + 1 }, () => Array(n + 1).fill(Infinity));
  const cut: number[][] = Array.from({ length: count + 1 }, () => Array(n + 1).fill(0));
  const prefix = [0];
  for (const w of weights) prefix.push((prefix.at(-1) ?? 0) + w);
  best[0]![0] = 0;
  for (let k = 1; k <= count; k++) {
    for (let i = 1; i <= n; i++) {
      for (let j = k - 1; j < i; j++) {
        const tallest = Math.max(best[k - 1]![j]!, prefix[i]! - prefix[j]!);
        if (tallest < best[k]![i]!) {
          best[k]![i] = tallest;
          cut[k]![i] = j;
        }
      }
    }
  }
  const runs: TestimonialItem[][] = [];
  let end = n;
  for (let k = count; k >= 1; k--) {
    const start = cut[k]![end]!;
    runs.unshift(items.slice(start, end));
    end = start;
  }
  return runs.filter((run) => run.length > 0);
}

export type TestimonialWallProps = {
  items: readonly TestimonialItem[];
  /**
   * Tracks from 1024. Default by count: one or two take their count, four take two (a 2 × 2), three
   * and five or more take three. Below 1024 the wall is one column.
   */
  columns?: 1 | 2 | 3;
  /**
   * From 1024 every second column drops by the `section` step (Layout `stagger`), so the cards read
   * as placed rather than tiled (the owner's reference 2). Only where the wall has more cards than
   * columns: a single row of peers stays level.
   */
  stagger?: boolean;
};

/**
 * TestimonialWall — a set of rated cards (the owner's references 1, 3 and 4). Up to one card per
 * track it is ONE row of peers, each stretched to the tallest, the attributions on one line. With
 * more cards than tracks it is a wall of column stacks: the cards run down each column in the order
 * they were written, split where the columns come out most even, so a long quote and a short one
 * share a column instead of leaving a ragged row of holes.
 */
export function TestimonialWall({ items, columns, stagger = false }: TestimonialWallProps) {
  const accepted = items.filter(valid);
  if (accepted.length === 0) {
    warn('wall has no valid testimonials; rendering nothing.');
    return null;
  }
  const count =
    columns ??
    (accepted.length <= 2 ? (accepted.length as 1 | 2) : accepted.length === 4 ? 2 : 3);
  const key = (item: TestimonialItem, index: number) => item.id ?? `${index}-${item.name}`;

  if (accepted.length <= count) {
    return (
      <Layout
        as="ul"
        columns={{ lg: count }}
        colGap="gutter"
        rowGap="gutter"
        className={styles.wall}
      >
        {accepted.map((item, index) => (
          <TestimonialCard key={key(item, index)} item={item} as="li" fill />
        ))}
      </Layout>
    );
  }

  const runs = partition(accepted, count);
  return (
    <Layout
      columns={{ lg: runs.length }}
      colGap="gutter"
      rowGap="gutter"
      stagger={stagger && runs.length > 1}
      className={styles.wall}
    >
      {runs.map((run, column) => (
        <Layout as="ul" key={column} rowGap="gutter">
          {run.map((item, index) => (
            <TestimonialCard key={key(item, index)} item={item} as="li" />
          ))}
        </Layout>
      ))}
    </Layout>
  );
}

/* ── Beside the work ──────────────────────────────────────────────────────────────── */

export type TestimonialBesideProps = {
  /**
   * The work the client is talking about, composed by the caller — in practice one linked BlockCard
   * in a one-item `<ul>` (a pattern does not import a pattern). It keeps its own description: the
   * quote sits NEXT to the case, never inside it (owner, 10 Oct 2026).
   */
  work: ReactNode;
  item: TestimonialItem;
  /**
   * The quote on the START from 1024, the work at the end. Visual only (Layout `reverse`): the DOM
   * keeps the work first, so a phone and a screen reader meet the case, then what the client said.
   */
  reverse?: boolean;
};

/**
 * TestimonialBeside — a featured case and its client's rated quote, side by side (owner, 10 Oct
 * 2026: "the quote somewhere close to the case study but not embedded in it"). The work takes the 7
 * of [7, 5] and the card the 5, a `column` apart, the card centred on the work's height so the two
 * read as one row and neither hangs from the other's top. Stacked below 1024, the work first.
 */
export function TestimonialBeside({ work, item, reverse = false }: TestimonialBesideProps) {
  if (!valid(item)) return <>{work}</>;
  return (
    <Layout
      columns={{ base: 1, lg: [7, 5] }}
      reverse={reverse ? { lg: true } : undefined}
      colGap="column"
      rowGap="block"
      align="center"
      className={styles.beside}
    >
      {work}
      <TestimonialCard item={item} />
    </Layout>
  );
}
