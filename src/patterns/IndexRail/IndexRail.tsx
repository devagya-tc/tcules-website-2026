'use client';

import {
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import { Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './IndexRail.module.css';

/**
 * One destination in a list: an in-page section (`#id`) or another page. `current` marks the page
 * the reader is on (a picker of pages); an in-page item is marked by scrolling, not by the caller.
 * `count` is how many pieces it holds, set as a tabular mono figure at the entry's end on the label's
 * baseline — an index's page number — so the list reads as a typeset index rather than a menu.
 */
export type IndexRailItem = { label: string; href: string; current?: boolean; count?: number };

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
  /**
   * The rail's one label, over everything in it ("Curate", "Formats"): the small mono word that
   * makes the column read as an index with a heading. Authored case; mono uppercases it. From 1024
   * only — in a phone's bar the switch speaks for itself.
   */
  label?: string;
  /** The nav's accessible name. */
  ariaLabel: string;
  /** The content column, when the modes carry no panels (a picker of pages beside one listing). */
  children?: ReactNode;
  className?: string;
};

const isHash = (href: string) => href.startsWith('#');

/* Measuring the shown label's box before paint on the client, and nothing on the server. */
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * TIER 2 — IndexRail, a curated listing page's rail beside its content (insights hub and format
 * pages, 16 Oct 2026; the IDEA of claude.com/resources).
 *
 * A TYPESET INDEX, not a sidebar (beauty round 3, 16 Oct 2026): from 1024 the rail is one sixth of
 * the column (about 235 at 1440, wide enough that a topic's name keeps to one line) at the column
 * step from the content, headed by one mono label, its entries a sans label with its tabular mono
 * count at the row's end, the current one in ink with a blue tick at its start.
 * Its top edge is the content's top edge: the label sits on the line of the first section's head.
 *
 *   views   two modes each carrying a `panel`: the switch changes the whole curated column, the
 *           list under it names the shown view's sections and marks the one in view. Both panels
 *           are server-rendered into the HTML; the hidden one carries `hidden`. A switch slides its
 *           rule to the chosen label and the arriving view rises in.
 *   picker  one mode whose items are pages (a format page's formats): the current one marked, the
 *           content passed as `children`.
 *
 * The switch is two links (`aria-current` on the shown view), not tabs: the lists are links and the
 * views are whole page sections with their own headings. Below 1024 the rail is a slim bar of ONE
 * line that sticks under the site nav (beauty round 4): with views, the switch and, at the row's
 * end, the section in view as a button that opens the jump list under the bar; a picker, its pages
 * in one line that scrolls sideways under an end fade, opening with the current page in view.
 */
export function IndexRail({
  modes,
  initialMode,
  param,
  label,
  ariaLabel,
  children,
  className,
}: IndexRailProps) {
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);
  const first = modes[0]?.id ?? '';
  const [mode, setMode] = useState(
    modes.some((m) => m.id === initialMode) ? (initialMode as string) : first,
  );
  /* Whether the reader has switched: the arriving view animates only then, never on page load. */
  const [switched, setSwitched] = useState(false);
  /* The sliding rule's place under the shown label, measured. Until it is, each label draws its
     own rule (the server's and a script-less page's rendering). */
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);
  const [current, setCurrent] = useState('');
  /* The phone bar's jump list, open or shut (views only). */
  const [open, setOpen] = useState(false);
  const lineRef = useRef<HTMLDivElement>(null);
  const active = modes.find((m) => m.id === mode) ?? modes[0];
  const views = modes.some((m) => m.panel !== undefined);

  useIsoLayoutEffect(() => {
    const group = switchRef.current;
    if (!group) return;
    const measure = () => {
      const shown = group.querySelector<HTMLElement>('[aria-current="true"]');
      if (shown) setIndicator({ x: shown.offsetLeft, w: shown.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    /* Web fonts arriving change the labels' widths. */
    void document.fonts?.ready.then(measure);
    return () => window.removeEventListener('resize', measure);
  }, [mode]);

  /* Scrollspy. The section in view is the last one whose top has passed a line a third of the way
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
      const line = window.innerHeight * 0.3;
      const box = rootRef.current?.getBoundingClientRect();
      let hit = '';
      if (box && box.bottom <= window.innerHeight) {
        hit = targets[targets.length - 1]?.id ?? '';
      } else if (box && box.top <= line) {
        /* Inside the curated area, the first section is current until the next one reaches the line. */
        hit = targets[0]?.id ?? '';
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

  /* The opened list shuts on Escape and on a press outside the rail. */
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    const onPress = (event: PointerEvent) => {
      if (!rootRef.current?.querySelector('nav')?.contains(event.target as Node))
        setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPress);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPress);
    };
  }, [open]);

  /* A picker's line on a phone opens with the current page's entry in view, never cut at the edge. */
  useEffect(() => {
    const line = lineRef.current;
    const marked = line?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!line || !marked || line.scrollWidth <= line.clientWidth) return;
    line.scrollLeft = marked.offsetLeft - (line.clientWidth - marked.offsetWidth) / 2;
  }, [mode]);

  if (!active) return null;

  /* Without a param there is no URL for a mode; the switch then needs script, and says so by `#`. */
  const hrefFor = (id: string) => (param ? (id === first ? '?' : `?${param}=${id}`) : '#');

  const choose = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (id === mode) return;
    setMode(id);
    setSwitched(true);
    setCurrent('');
    setOpen(false);
    if (param) {
      const url = new URL(window.location.href);
      if (id === first) url.searchParams.delete(param);
      else url.searchParams.set(param, id);
      url.hash = '';
      window.history.replaceState(window.history.state, '', url);
    }
    /* A reader deep in one view lands at the head of the other, the rail and its first heading lined
       up under the site nav — never somewhere in the other view's middle. A reader who can already
       see the column's top stays where they are. The frame's scroll margin is the nav's clearance. */
    const frame = rootRef.current;
    if (frame) {
      const margin = Number.parseFloat(getComputedStyle(frame).scrollMarginBlockStart) || 0;
      if (frame.getBoundingClientRect().top < margin) frame.scrollIntoView({ block: 'start' });
    }
  };

  const count = active.items.length;
  /* The phone bar's one line when the modes are VIEWS: the switch, and at the row's end the section
     in view as a button that opens the jump list (beauty round 4). A picker keeps its list as the
     bar's scrolling line. */
  const collapsible = views && modes.length > 1;
  const here = active.items.find((item) => item.href === `#${current}`) ?? active.items[0];

  const rail = (
    <nav aria-label={ariaLabel} className={cx(styles.root, className)}>
      <Layout rowGap="text">
        {label ? <p className={styles.label}>{label}</p> : null}
        <Layout
          columns={collapsible ? { base: [1, 'auto'], lg: 1 } : undefined}
          colGap="block"
          rowGap="block"
          align="center"
          className={styles.bar}
        >
          {modes.length > 1 ? (
            <div
              role="group"
              aria-label="View"
              ref={switchRef}
              className={cx(styles.row, styles.switch)}
              data-measured={indicator ? '' : undefined}
              style={
                indicator
                  ? ({
                      '--irl-indicator-x': `${indicator.x}px`,
                      '--irl-indicator-w': `${indicator.w}px`,
                    } as CSSProperties)
                  : undefined
              }
            >
              {/* Two labels, the shown one in ink over a rule that slides between them. Content-sized
                  tracks, so the rule is exactly its label's width. */}
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
              <span className={styles.indicator} aria-hidden="true" />
            </div>
          ) : null}
          {collapsible && count > 0 ? (
            /* Below 1024 only: the section in view, opening the list. */
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls={`${uid}-list`}
              onClick={() => setOpen((was) => !was)}
            >
              <Layout columns={{ base: ['auto', 'auto'] }} colGap="tight" align="center">
                <span className={styles.toggleLabel}>{here?.label}</span>
                <span className={styles.toggleMark} aria-hidden="true">
                  <Icon name="alt-arrow-down" size="sm" />
                </span>
              </Layout>
            </button>
          ) : null}
          {count > 0 ? (
            <div
              ref={lineRef}
              className={cx(styles.row, styles.line, collapsible && styles.pop)}
              data-open={open ? '' : undefined}
            >
              {/* One list, two arrangements: a column beside the content from 1024; below it a picker's
                  single line of content-sized labels (scrolling sideways when it must), or a view's
                  list opened from the bar. */}
              <Layout
                as="ul"
                columns={
                  collapsible
                    ? undefined
                    : { base: Array.from({ length: count }, () => 'auto' as const), lg: 1 }
                }
                colGap="block"
                rowGap="text"
                justify="start"
                id={`${uid}-list`}
                key={active.id}
                className={cx(styles.list, switched && styles.entering)}
              >
                {active.items.map((item) => {
                  const isHere = item.current || item.href === `#${current}`;
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={styles.item}
                        aria-current={item.current ? 'page' : isHere ? 'location' : undefined}
                        onClick={() => setOpen(false)}
                      >
                        {/* The name, then its figure at the row's end on the name's baseline: an
                            index's page number, never a bullet before the label. */}
                        <Layout columns={{ base: [1, 'auto'] }} colGap="tight" align="baseline">
                          <span className={styles.name}>{item.label}</span>
                          {item.count !== undefined ? (
                            <span className={styles.count}>{item.count}</span>
                          ) : (
                            <span />
                          )}
                        </Layout>
                      </a>
                    </li>
                  );
                })}
              </Layout>
            </div>
          ) : null}
        </Layout>
      </Layout>
    </nav>
  );

  return (
    <div ref={rootRef} className={styles.frame}>
      <Layout columns={{ lg: [1, 4] }} colGap="column" rowGap="stack" align="start">
        {rail}
        <div className={styles.content}>
          {views
            ? modes.map((m) => (
                <div
                  key={m.id}
                  id={`${uid}-panel-${m.id}`}
                  hidden={m.id !== active.id}
                  className={cx(styles.panel, switched && styles.entering)}
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
