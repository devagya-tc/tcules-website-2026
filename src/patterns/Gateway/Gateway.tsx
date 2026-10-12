'use client';

import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { Button, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Gateway.module.css';

/**
 * One situation and where it leads. The title is the reader's own reason in their words ("Launch a
 * new product"), the body its one sentence, and `service` the name of the page that answers it,
 * which is also the link's destination name.
 */
export type GatewayItem = {
  /** Stable key, unique in the set. */
  id: string;
  title: string;
  body: string;
  href: string;
  /** The destination's name — "Product Design". Pass authored case; mono uppercases it. */
  service: string;
  /**
   * A drawing for the answer (owner, 12 Oct 2026: "some visual element with the text on the right
   * side"), composed by the caller — a `Sketch` or an illustration. When the items carry visuals the
   * selector's answer pane leads with the current one on its 16:9 plate above the sentence, and the
   * columns open to [7, 5] to give it room. Decorative: the pane is aria-hidden.
   */
  visual?: ReactNode;
};

/**
 * How the situations are presented (home round 7, 11 Oct 2026; both on /design/kit/gateway).
 *
 *   select  THE SELECTOR (home). Six titles down one column, every one at full ink. A marker — a
 *           raised ground — sits behind the current situation and SLIDES to whichever one the
 *           pointer or focus is on, and the answer beside the list slides with it, level with the
 *           title. Running the pointer down the list glides the marker and the answer through each
 *           option in turn: browsing, not clicking.
 *   expand  The accordion of situations: ruled rows, the current one open in place with its
 *           sentence and service under its title. Explored alternative: in-flow, so the rows move as
 *           one opens and another closes.
 *
 * A presentation choice, never a CMS field.
 */
export type GatewayArrangement = 'select' | 'expand';

export type GatewayProps = {
  items: readonly GatewayItem[];
  arrangement?: GatewayArrangement;
  /** The element each situation's title renders as. h3 under a band's h2 (the default). */
  titleAs?: 'h3' | 'h4';
  className?: string;
};

/* `expand` only: the rows reflow as one opens, so the pointer must rest a beat before a row opens,
   or the row under it moves away and the next one opens in a cascade. The selector needs none —
   nothing in its list moves — and reacts at once, which is what makes running down it feel like
   browsing. Behaviour, not a token: nothing in CSS reads it. */
const EXPAND_INTENT_MS = 140;

/**
 * TIER 2 — Gateway, the situation selector (home "What do you need next?", rounds 6–7, 11 Oct 2026).
 *
 * The band's job (owner): "as a visitor, i may not know if i need product design service or design
 * system service, but i'll probably know if i want to launch a new product or get teams building
 * from one system." So the reader's first act is RECOGNITION across six situations, then reading
 * one sentence, then going. The IA follows that order:
 *
 *   1. The six situations are the band's largest, and only, repeated thing: h3 titles down one
 *      column, all visible at once, ALL AT FULL INK (round 7, owner: "not fading the text out").
 *   2. The current situation is marked by a raised ground behind it and a blue arrow after it. The
 *      marker is the eye's entry and it moves to whatever the reader points at or tabs to.
 *   3. The current situation's answer — its sentence and its service — stands beside it, level with
 *      it, and travels with the marker. One sentence on screen at a time, so the band is never dense.
 *
 * Below 1024 there is no pointer and no column to answer in, so every situation shows its sentence
 * and its service under its title, all at once.
 *
 * SEARCH: every word is in the server-rendered HTML at every width. Each situation's sentence and
 * service live inside its own anchor (shown below 1024, `display: none` from 1024, where the answer
 * column mirrors the current one). Google indexes content present in the HTML at full weight even
 * where it is collapsed (mobile-first indexing; Mueller, 2020) — and the mobile render, which is the
 * one Google indexes, shows everything anyway. Nothing loads on interaction.
 *
 * ACCESSIBILITY: each situation is one anchor, one tab stop, to its service; its sentence is its
 * description (`aria-describedby`, which reads hidden content). The answer column is a visual
 * mirror: `aria-hidden`, its link out of the tab order, because the title the reader is on already
 * goes to the same place.
 */
export function Gateway({ items, arrangement = 'select', titleAs = 'h3', className }: GatewayProps) {
  const Title = titleAs;
  const uid = useId();
  const [active, setActive] = useState(0);
  const [geo, setGeo] = useState({ markY: 0, markH: 0, shift: 0 });
  const trackRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIntent = () => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = null;
  };
  const pointTo = (i: number) => {
    clearIntent();
    if (arrangement === 'expand') intent.current = setTimeout(() => setActive(i), EXPAND_INTENT_MS);
    else setActive(i);
  };
  useEffect(() => clearIntent, []);

  /* Where the marker and the answer stand: the marker on the current row; the answer level with
     its title, clamped so it never runs below the list's end. */
  const measure = useCallback(() => {
    const track = trackRef.current;
    const item = itemRefs.current[active];
    if (!track || !item) return;
    const pane = paneRef.current;
    const max = pane ? Math.max(0, track.offsetHeight - pane.offsetHeight) : 0;
    setGeo({
      markY: item.offsetTop,
      markH: item.offsetHeight,
      shift: Math.min(item.offsetTop, max),
    });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  const lit = items[active] ?? items[0];
  if (!lit) return null;

  const linkCue = (label: string) => (
    <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
      {label}
    </Button>
  );

  const situation = (item: GatewayItem, i: number) => {
    const descId = `${uid}-${item.id}-desc`;
    return (
      <li
        key={item.id}
        ref={(el) => {
          itemRefs.current[i] = el;
        }}
        className={styles.item}
        data-lit={i === active ? '' : undefined}
      >
        <a
          href={item.href}
          className={styles.link}
          aria-describedby={descId}
          onPointerEnter={() => pointTo(i)}
          onPointerLeave={clearIntent}
          onFocus={() => {
            clearIntent();
            setActive(i);
          }}
          data-btn-link-group=""
        >
          <Layout rowGap="none">
            <Title className={styles.title}>
              {item.title}
              <span className={styles.arrow} aria-hidden="true">
                <Icon name="arrow-right" size="xl" />
              </span>
            </Title>
            <span className={styles.detail}>
              <span className={styles.detailInner}>
                {/* The sentence keeps a reading measure: the leading 7 of [7, 5] in a full-width
                    row (expand); in the selector's 8-of-12 track it is already a column. */}
                <Layout columns={{ lg: [7, 5] }} colGap="column" rowGap="none" className={styles.detailBody}>
                  <Layout rowGap="text">
                    <span id={descId} className={styles.body}>
                      {item.body}
                    </span>
                    <span>{linkCue(item.service)}</span>
                  </Layout>
                </Layout>
              </span>
            </span>
          </Layout>
        </a>
      </li>
    );
  };

  if (arrangement === 'expand') {
    return (
      <Layout as="ul" rowGap="none" className={cx(styles.root, styles.expand, className)}>
        {items.map(situation)}
      </Layout>
    );
  }

  const withVisuals = items.some((item) => item.visual != null);
  const placed = {
    '--gwy-marker-y': `${geo.markY}px`,
    '--gwy-marker-h': `${geo.markH}px`,
  } as CSSProperties;

  return (
    <Layout
      columns={{ lg: withVisuals ? [7, 5] : [8, 4] }}
      colGap="column"
      rowGap="none"
      className={cx(styles.root, styles.select, className)}
    >
      <div ref={trackRef} className={styles.track} style={placed}>
        <span className={styles.marker} aria-hidden="true" data-ready={geo.markH ? '' : undefined} />
        <Layout as="ul" rowGap="none" className={styles.list}>
          {items.map(situation)}
        </Layout>
      </div>

      <div className={styles.answerTrack} aria-hidden="true">
        <div
          ref={paneRef}
          className={styles.answer}
          style={{ '--gwy-answer-shift': `${geo.shift}px` } as CSSProperties}
        >
          {/* Keyed on the current situation so its words re-enter (a short fade) as it changes,
              while the answer's box glides. */}
          <Layout key={lit.id} rowGap="block" className={styles.answerBody}>
            {lit.visual != null ? <div className={styles.answerVisual}>{lit.visual}</div> : null}
            <p className={styles.answerText}>{lit.body}</p>
            <span>
              <Button
                as="a"
                href={lit.href}
                tabIndex={-1}
                emphasis="link"
                tone="primary"
                size="lg"
                icon={<Icon name="arrow-right" />}
              >
                {lit.service}
              </Button>
            </span>
          </Layout>
        </div>
      </div>
    </Layout>
  );
}
