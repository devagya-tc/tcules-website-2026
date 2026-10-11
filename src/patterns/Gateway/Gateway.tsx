'use client';

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

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
};

export type GatewayProps = {
  items: readonly GatewayItem[];
  /** The element each situation's title renders as. h3 under a band's h2 (the default). */
  titleAs?: 'h3' | 'h4';
  className?: string;
};

/* How long the pointer must rest on a situation before the answer follows it. Long enough that a
   diagonal move from a lower title to the answer does not re-select every title it crosses; short
   enough to read as immediate. Behaviour, not a token: nothing in CSS reads it. */
const HOVER_INTENT_MS = 90;

/**
 * TIER 2 — Gateway, the situation selector (home "What do you need next?", round 6, 11 Oct 2026).
 *
 * What the band is for (owner): "as a visitor, i may not know if i need product design service or
 * design system service, but i'll probably know if i want to launch a new product or get teams
 * building from one system." So the reader's first act is RECOGNITION across six situations, and
 * only then reading one sentence and going. The IA follows that order:
 *
 *   1. The six situations are the band's largest, and only, repeated thing: h3 titles down one
 *      column, all visible at once, nothing between them but air. Scanning them is the job.
 *   2. One situation is lit — ink and a blue arrow — and the other five rest in a quieter ink. The
 *      lit one is the eye's entry; pointing at, or tabbing to, another lights it instead.
 *   3. The lit situation's answer — its sentence and the service that delivers it — stands beside
 *      it, level with the chosen title: the answer is anchored to its question, and it moves with
 *      the choice. One sentence on screen at a time, not six, so the band is never dense.
 *
 * Below 1024 there is no pointer to point with and no column to answer in, so every situation shows
 * its sentence and its service under its title, all at once.
 *
 * Every word is in the server-rendered HTML at every width: each situation's sentence and service
 * live inside its own anchor (shown below 1024, `display: none` from 1024, where the answer column
 * shows the lit one). Nothing is hidden behind a click, so nothing is lost to search.
 *
 * Accessibility: each situation is one anchor, one tab stop, to its service. Its sentence is its
 * description (`aria-describedby`, which reads hidden content). The answer column is a visual mirror
 * of the lit situation: `aria-hidden`, its link out of the tab order, because the title the reader
 * is on already goes to the same place.
 *
 * Rounds 1–5 set this band as cards and ruled grids in five styles; the owner rejected each as a
 * restyle of the same shape rather than a design for the band's job (page-mapping § 22).
 */
export function Gateway({ items, titleAs = 'h3', className }: GatewayProps) {
  const Title = titleAs;
  const uid = useId();
  const [active, setActive] = useState(0);
  const [shift, setShift] = useState(0);
  const listRef = useRef<HTMLElement>(null);
  const paneRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearIntent = () => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = null;
  };
  const pointTo = (i: number) => {
    clearIntent();
    intent.current = setTimeout(() => setActive(i), HOVER_INTENT_MS);
  };
  useEffect(() => clearIntent, []);

  /* The answer stands level with the lit title, clamped so it never runs below the list's end. */
  const measure = useCallback(() => {
    const list = listRef.current;
    const pane = paneRef.current;
    const item = itemRefs.current[active];
    if (!list || !pane || !item) return;
    const max = Math.max(0, list.offsetHeight - pane.offsetHeight);
    setShift(Math.min(item.offsetTop - list.offsetTop, max));
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

  return (
    <Layout columns={{ lg: [8, 4] }} colGap="column" rowGap="none" className={cx(styles.root, className)}>
      <Layout as="ul" rowGap="gutter" ref={listRef} className={styles.list}>
        {items.map((item, i) => {
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
                <Layout rowGap="text">
                  <Title className={styles.title}>
                    {item.title}
                    <span className={styles.arrow} aria-hidden="true">
                      <Icon name="arrow-right" size="xl" />
                    </span>
                  </Title>
                  <span className={styles.detail}>
                    <Layout rowGap="text">
                      <span id={descId} className={styles.body}>
                        {item.body}
                      </span>
                      <span>
                        <Button as="span" emphasis="link" tone="primary" icon={<Icon name="arrow-right" />}>
                          {item.service}
                        </Button>
                      </span>
                    </Layout>
                  </span>
                </Layout>
              </a>
            </li>
          );
        })}
      </Layout>

      <div className={styles.answerTrack} aria-hidden="true">
        <div
          ref={paneRef}
          className={styles.answer}
          style={{ '--gwy-answer-shift': `${shift}px` } as CSSProperties}
        >
          {/* Keyed on the lit situation so the answer re-enters (a short fade) when it changes. */}
          <Layout key={lit.id} rowGap="block" className={styles.answerBody}>
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
