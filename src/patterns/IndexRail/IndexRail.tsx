'use client';

import { type MouseEvent, type ReactNode, useEffect, useId, useRef, useState } from 'react';

import { Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './IndexRail.module.css';

/**
 * One destination in a list: an in-page section (`#id`) or another page. `current` marks the page
 * the reader is on (a picker of pages); an in-page item is marked by scrolling, not by the caller.
 */
export type IndexRailItem = { label: string; href: string; current?: boolean };

/**
 * One way of curating the page — "By type", "By topic" — with the list of sections it shows and,
 * when the modes are VIEWS, the view itself (`panel`): switching the mode then switches the whole
 * content column, not only the list.
 */
export type IndexRailMode = {
  id: string;
  label: string;
  items: readonly IndexRailItem[];
  panel?: ReactNode;
};

export type IndexRailProps = {
  /** One or two modes. With two, a switch heads the rail; with one, the list stands alone. */
  modes: readonly IndexRailMode[];
  /** The mode shown first: the page reads it from the URL, so a shared link opens the same view. */
  initialMode?: string;
  /**
   * The URL parameter the mode is held in (`?view=topic`). The first mode is the default and clears
   * it. The switch is a pair of links to those URLs, so it works before script and is shareable;
   * with script it swaps the view in place and rewrites the URL without a reload.
   */
  param?: string;
  /** The nav's accessible name. The rail shows no label of its own: the list is self-evident. */
  ariaLabel: string;
  /** The content column, when the modes carry no panels (a picker of pages beside one listing). */
  children?: ReactNode;
  className?: string;
};

const isHash = (href: string) => href.startsWith('#');

/**
 * TIER 2 — IndexRail, a curated listing page's rail beside its content (insights hub and format
 * pages, 16 Oct 2026; the IDEA of claude.com/resources).
 *
 * A SLIM INDEX, not a peer column (beauty round, 16 Oct 2026): from 1024 the rail takes one sixth of
 * the content column and the content the rest, so the feed owns the page. The rail and the content
 * are regions of different kind, so the seam between them is the split step.
 *
 *   views   two modes each carrying a `panel`: the switch changes the whole curated column, the
 *           list under it names the shown view's sections and marks the one in view. Both panels
 *           are server-rendered into the HTML; the hidden one carries `hidden`.
 *   picker  one mode whose items are pages (a format page's formats): the current one marked, the
 *           content passed as `children`.
 *
 * The switch is two links (`aria-current` on the shown view), not tabs: the lists are links and the
 * views are whole page sections with their own headings. Below 1024 the rail is one row above the
 * content — the switch, or the picker's formats, in a line that scrolls sideways when it must — and
 * an in-page jump list is dropped there: the switch alone heads the view.
 */
export function IndexRail({
  modes,
  initialMode,
  param,
  ariaLabel,
  children,
  className,
}: IndexRailProps) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const first = modes[0]?.id ?? '';
  const [mode, setMode] = useState(
    modes.some((m) => m.id === initialMode) ? (initialMode as string) : first,
  );
  const [current, setCurrent] = useState('');
  const active = modes.find((m) => m.id === mode) ?? modes[0];
  const views = modes.some((m) => m.panel !== undefined);

  /* Scrollspy. The section in view is the last one whose top has passed a line a fifth of the way
     down the screen — and, once the curated area's foot is on screen, the last section: a short last
     section never reaches the line before the rail unsticks, and the marker must match the screen. */
  useEffect(() => {
    const ids = (active?.items ?? [])
      .map((item) => (isHash(item.href) ? item.href.slice(1) : ''))
      .filter(Boolean);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);
    if (targets.length === 0) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.2;
      const foot = rootRef.current?.getBoundingClientRect().bottom ?? Infinity;
      let hit = '';
      if (foot <= window.innerHeight) {
        hit = targets[targets.length - 1]?.id ?? '';
      } else {
        for (const target of targets) {
          if (target.getBoundingClientRect().top <= line) hit = target.id;
        }
      }
      setCurrent(hit);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [active]);

  if (!active) return null;

  /* Without a param there is no URL for a mode; the switch then needs script, and says so by `#`. */
  const hrefFor = (id: string) => (param ? (id === first ? '?' : `?${param}=${id}`) : '#');

  const choose = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (id === mode) return;
    setMode(id);
    setCurrent('');
    if (param) {
      const url = new URL(window.location.href);
      if (id === first) url.searchParams.delete(param);
      else url.searchParams.set(param, id);
      url.hash = '';
      window.history.replaceState(window.history.state, '', url);
    }
    /* A reader in one view lands at the head of the other, the rail and its first heading lined up
       under the site nav — never mid-hero, and never somewhere in the other view's middle. The
       frame's scroll margin is the nav's clearance. */
    const frame = rootRef.current;
    if (frame) {
      const margin = Number.parseFloat(getComputedStyle(frame).scrollMarginBlockStart) || 0;
      if (frame.getBoundingClientRect().top < margin) frame.scrollIntoView({ block: 'start' });
    }
  };

  const inPage = active.items.length > 0 && active.items.every((item) => isHash(item.href));
  const count = active.items.length;

  const rail = (
    <nav aria-label={ariaLabel} className={cx(styles.root, className)}>
      <Layout rowGap="stack">
        {modes.length > 1 ? (
          <div role="group" aria-label="View" className={styles.row}>
            {/* Two labels, the shown one in ink and underlined: editorial chrome, not a control
                track. Content-sized tracks, so each underline is exactly its label's width. */}
            <Layout columns={{ base: ['auto', 'auto'] }} colGap="block" justify="start">
              {modes.map((m) => (
                <a
                  key={m.id}
                  href={hrefFor(m.id)}
                  className={styles.mode}
                  aria-current={m.id === active.id ? 'true' : undefined}
                  aria-controls={
                    views
                      ? `${uid}-panel-${m.id}`
                      : active.items.length > 0
                        ? `${uid}-list`
                        : undefined
                  }
                  onClick={choose(m.id)}
                >
                  {m.label}
                </a>
              ))}
            </Layout>
          </div>
        ) : null}
        {count > 0 ? (
          <div className={cx(styles.row, inPage && styles.jumps)}>
            {/* One list, two arrangements: a column beside the content from 1024, a single line of
                content-sized labels above it below 1024 (the row scrolls sideways when it must). */}
            <Layout
              as="ul"
              columns={{ base: Array.from({ length: count }, () => 'auto' as const), lg: 1 }}
              colGap="block"
              rowGap="text"
              justify="start"
              id={`${uid}-list`}
              key={active.id}
              className={styles.list}
            >
              {active.items.map((item) => {
                const here = item.current || item.href === `#${current}`;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={styles.item}
                      aria-current={item.current ? 'page' : here ? 'location' : undefined}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </Layout>
          </div>
        ) : null}
      </Layout>
    </nav>
  );

  return (
    <div ref={rootRef} className={styles.frame}>
      <Layout columns={{ lg: [1, 5] }} colGap="section" rowGap="stack" align="start">
        {rail}
        <div className={styles.content}>
          {views
            ? modes.map((m) => (
                <div
                  key={m.id}
                  id={`${uid}-panel-${m.id}`}
                  hidden={m.id !== active.id}
                  className={styles.panel}
                >
                  {m.panel}
                </div>
              ))
            : children}
        </div>
      </Layout>
    </div>
  );
}
