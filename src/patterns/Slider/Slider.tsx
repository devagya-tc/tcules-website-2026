'use client';

import {
  Children,
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';

import { Button, Cluster, Icon, Layout } from '@/components';
import { cx } from '@/lib/cx';

import styles from './Slider.module.css';

/**
 * How many slides are in view at the widest step. The Slider owns the ladder below it, so a
 * caller states one number and every breakpoint follows (visual-direction § 1.4, § 3.7):
 *
 *            base (+ peek)   md 768   lg 1024   xl 1440
 *   1        1 (no peek)     1        1         1         a G testimonial: one featured slide
 *   2        1               2        2         2         pair cards, 365 / 572 wide
 *   3        1               2        3         3         C-image-5+, "a Slider showing 3" — 392
 *   4        1               2        3         4         Card-4 sets, 286 at 1440
 *
 * Below md the row shows one slide and a 24px peek of the next, because at 326 a second card would
 * be 147 wide. From md up the count is exact and there is no peek: the controls say there is more.
 * At one per view there is never a peek (cmp-testimonials, 6 Oct 2026): the slide is a composite,
 * and its neighbour's start edge read as a stray portrait sliver and a loose quote rule.
 */
export type SliderPerView = 1 | 2 | 3 | 4;

/**
 * Where the controls sit under the slides.
 *
 *   start   the progress rail at the start, the two controls at the end — under a left-weighted
 *           head, so the row's ends line up with the column's.
 *   center  the controls either side of a centred rail — under a centred head (§ 3.5: a G
 *           slider, a centred C-image head).
 */
export type SliderAlign = 'start' | 'center';

export type SliderProps = {
  /**
   * What the slides are — "Client stories", "Recent work". The carousel's accessible name, read
   * with "carousel" by a screen reader. Required, because an unnamed carousel is a region nobody
   * can find. Not rendered: the band's heading is the visible name.
   */
  label: string;
  /**
   * The slides, each ONE `<li>`. BlockCard already is one; anything else — a testimonial, a figure —
   * is wrapped in an `<li>` at the call site. The Slider owns the `<ul>`, so a screen reader hears
   * "list, 6 items" and "1 of 6" on each slide for free, and the list stays valid HTML: a
   * BlockCard inside a wrapper `<li>` would be an `<li>` in an `<li>`. In development the Slider
   * warns when a child renders anything else.
   */
  children: ReactNode;
  /** Slides in view at the widest step. Default 3. See `SliderPerView`. */
  perView?: SliderPerView;
  /** Default `start`. See `SliderAlign`. */
  align?: SliderAlign;
};

/** perView → the Layout scroll row's per-breakpoint counts. The table on `SliderPerView`. */
const LADDER: Record<SliderPerView, { base: number; md: number; lg: number; xl: number }> = {
  1: { base: 1, md: 1, lg: 1, xl: 1 },
  2: { base: 1, md: 2, lg: 2, xl: 2 },
  3: { base: 1, md: 2, lg: 3, xl: 3 },
  4: { base: 1, md: 2, lg: 3, xl: 4 },
};

/** The rail's thumb follows the same ladder in CSS, so it is the right length before hydration. */
const VIEW_CLASS: Record<SliderPerView, string | undefined> = {
  1: styles.view1,
  2: styles.view2,
  3: styles.view3,
  4: styles.view4,
};

/** Anything a keyboard can reach. If a slide holds none, the row itself takes a tab stop. */
const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, summary, [tabindex]:not([tabindex="-1"])';

/** Sub-pixel slack for "at the start" / "at the end": scrollLeft is fractional on zoomed pages. */
const EDGE = 2;

type Position = { ready: boolean; atStart: boolean; atEnd: boolean };

/**
 * Slider — a row of slides you scroll sideways, with previous / next controls and a progress rail
 * (fdn-scroll, 6 Oct 2026). Built to docs/specs/Slider.md.
 *
 *   ┌──────────────── Layout scroll="always", colGap gutter (32) ────────────────┐
 *   │ [ slide ]   [ slide ]   [ slide ]   [ slide → off-screen …                 │
 *   └─────────────────────────────────────────────────────────────────────────────┘
 *                                block (24)
 *   ━━━━━━━━ rail (thumb = what is in view)                              (←)  (→)
 *
 * § 1.4 budgets the controls at 24 + 48 = 72 under the tallest slide (48 steppers since fix round 2,
 * cmp-testimonials, 6 Oct 2026); that is exactly this.
 *
 * The scrolling is the BROWSER'S: Layout's scroll mode is a CSS scroll-snap row, so before this
 * component hydrates — and if its script never runs — the row still swipes, snaps, and moves as Tab
 * reaches each linked slide. What the script adds is the two controls, the rail's position, a tab
 * stop when no slide holds anything focusable, and a polite status line. The controls render
 * `disabled` until then, so a press can never be swallowed by a button that does nothing.
 *
 * Accessibility (APG carousel, adapted to a scroll row):
 *   - the root is a `<section aria-roledescription="carousel">` named by `label`;
 *   - slides are list items — position and count come from the list, not from hand-written
 *     "1 of 6" labels that could disagree with it;
 *   - the controls are real `<button>`s named "Previous slide" / "Next slide", with
 *     `aria-controls` on the row (always rendered, so the idref always resolves). At an end a
 *     control is `aria-disabled`, not `disabled`: a disabled button drops focus to the body, and a
 *     keyboard user who pressed Next to the end would be thrown out of the carousel;
 *   - after a control press, a visually hidden `aria-live="polite"` line says which slides are in
 *     view ("Slides 4 to 6 of 8"). It speaks only after a press, never on load or while swiping;
 *   - no autoplay, so no rotation control is needed and nothing moves that the reader did not move;
 *   - reduced motion: the row jumps instead of gliding (Layout's `scroll-behavior` is smooth only
 *     under `no-preference`, and the press uses the row's computed behaviour), and the controls'
 *     fill change is instant.
 *
 * A pattern for the usual two reasons: it takes slides as content and composes Layout, Cluster and
 * Icon. It owns no band and no ground; it sits in a band's body (ContentSection's children) and
 * reads data-surface from that Section. A client component because it holds state, a ref and
 * listeners — the only reasons `'use client'` is earned here.
 */
export function Slider({ label, children, perView = 3, align = 'start' }: SliderProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const rowId = `${useId()}-slides`;
  const rowRef = useRef<HTMLElement>(null);
  const thumbRef = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<Position>({
    ready: false,
    atStart: true,
    atEnd: false,
  });
  const [tabStop, setTabStop] = useState(false);
  const [status, setStatus] = useState('');
  /* Set by a control press, cleared once the row settles and the status line is written — so the
     line speaks after the reader's own action and never on load or mid-swipe. */
  const announce = useRef(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let frame = 0;
    let settle = 0;

    /* Which slides are wholly in view, 1-based. Measured from the rendered boxes rather than
       computed from perView, so it is right at every breakpoint and with the peek. */
    const inView = () => {
      const box = row.getBoundingClientRect();
      const visible: number[] = [];
      Array.from(row.children).forEach((child, index) => {
        const r = child.getBoundingClientRect();
        if (r.left >= box.left - EDGE && r.right <= box.right + EDGE) visible.push(index + 1);
      });
      return visible;
    };

    const measure = () => {
      frame = 0;
      const max = row.scrollWidth - row.clientWidth;
      const x = Math.abs(row.scrollLeft); // RTL reports a negative scrollLeft
      const progress = max > EDGE ? Math.min(1, x / max) : 0;
      /* The rail's thumb moves on every frame, so it is written straight to the element rather than
         through state: a re-render per scroll frame would be work for nothing. */
      thumbRef.current?.style.setProperty('--slider-progress', String(progress));
      const atStart = x <= EDGE;
      const atEnd = x >= max - EDGE;
      setPosition((p) =>
        p.ready && p.atStart === atStart && p.atEnd === atEnd
          ? p
          : { ready: true, atStart, atEnd },
      );
    };

    const speak = () => {
      settle = 0;
      if (!announce.current) return;
      announce.current = false;
      const visible = inView();
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (first == null || last == null) return;
      setStatus(
        first === last
          ? `Slide ${first} of ${count}`
          : `Slides ${first} to ${last} of ${count}`,
      );
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
      /* `scrollend` is not in every engine yet; a quiet period after the last scroll event is the
         fallback, and whichever fires first speaks (the flag makes the second a no-op). */
      window.clearTimeout(settle);
      settle = window.setTimeout(speak, 160);
    };

    /* First measurement in a frame, not synchronously: the effect only subscribes, and every
       state write happens in a callback. */
    frame = requestAnimationFrame(() => {
      measure();
      setTabStop(row.querySelector(FOCUSABLE) == null);
      if (process.env.NODE_ENV !== 'production') {
        const stray = Array.from(row.children).filter((c) => c.tagName !== 'LI');
        if (stray.length > 0) {
          console.warn(
            `Slider "${label}": every slide must render one <li> (got ${stray
              .map((c) => `<${c.tagName.toLowerCase()}>`)
              .join(', ')}). Wrap the slide in an <li> at the call site.`,
          );
        }
      }
    });

    row.addEventListener('scroll', onScroll, { passive: true });
    row.addEventListener('scrollend', speak);
    const resize = new ResizeObserver(onScroll);
    resize.observe(row);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      row.removeEventListener('scroll', onScroll);
      row.removeEventListener('scrollend', speak);
      resize.disconnect();
    };
  }, [count, label]);

  /* One slide per press: the distance between two neighbouring slides' start edges, which is one
     track plus the seam at whatever width this is. Mandatory snapping lands it exactly. No
     `behavior`: the row's own computed scroll-behavior decides, which is smooth only when the
     reader has not asked for reduced motion (Layout.module.css). */
  const go = useCallback((direction: 1 | -1) => {
    const row = rowRef.current;
    if (!row) return;
    const [a, b] = Array.from(row.children) as HTMLElement[];
    const step = a && b ? Math.abs(b.offsetLeft - a.offsetLeft) : row.clientWidth;
    const rtl = getComputedStyle(row).direction === 'rtl' ? -1 : 1;
    announce.current = true;
    row.scrollBy({ left: direction * step * rtl });
  }, []);

  const { ready, atStart, atEnd } = position;
  const control = (direction: 1 | -1) => {
    const blocked = direction === -1 ? atStart : atEnd;
    return (
      <Button
        emphasis="outline"
        /* lg: a 48 circle with a 24 arrow (fix round 2, 6 Oct 2026). At 40 with a 16 glyph the
           steppers read as an afterthought beside a 477 portrait or a row of 392 cards. */
        size="lg"
        iconOnly
        icon={<Icon name={direction === -1 ? 'arrow-left' : 'arrow-right'} />}
        extendHitArea
        aria-label={direction === -1 ? 'Previous slide' : 'Next slide'}
        aria-controls={rowId}
        /* Native `disabled` only before hydration, when the button genuinely cannot act. After it,
           an end is `aria-disabled`, which keeps focus where the reader left it; Button withholds
           the click and keeps the ring. */
        disabled={!ready}
        aria-disabled={ready && blocked ? true : undefined}
        onClick={() => go(direction)}
      />
    );
  };

  const rail = (
    <span className={styles.rail} aria-hidden="true">
      <span ref={thumbRef} className={styles.thumb} />
    </span>
  );

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className={cx(styles.slider, VIEW_CLASS[perView])}
      style={{ '--slider-count': count } as CSSProperties}
    >
      <Layout rowGap="block">
        <Layout
          as="ul"
          id={rowId}
          ref={rowRef}
          scroll="always"
          columns={LADDER[perView]}
          peek={perView !== 1}
          colGap="gutter"
          tabIndex={tabStop ? 0 : undefined}
          className={styles.row}
        >
          {slides}
        </Layout>
        {align === 'center' ? (
          <Cluster colGap="block" align="center" justify="center" nowrap>
            {control(-1)}
            {rail}
            {control(1)}
          </Cluster>
        ) : (
          <Cluster colGap="block" align="center" justify="between" nowrap>
            {rail}
            <Cluster colGap="text" align="center" nowrap>
              {control(-1)}
              {control(1)}
            </Cluster>
          </Cluster>
        )}
      </Layout>
      {/* Out of flow (position: absolute), so it takes no row and no seam in the Layout above. */}
      <p className={styles.status} aria-live="polite" aria-atomic="true">
        {status}
      </p>
    </section>
  );
}
