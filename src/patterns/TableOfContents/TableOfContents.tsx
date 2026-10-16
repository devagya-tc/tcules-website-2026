'use client';

import { useEffect, useId, useRef, useState } from 'react';

import { Icon, Layout } from '@/components';

import styles from './TableOfContents.module.css';

/**
 * One entry in the outline: the short label an editor authored, and the fragment it points at.
 *
 * `href` is a TEMPLATE-LITERAL type, and that is the type expressing this component's hardest
 * constraint rather than decoration. Every target is an id on a heading the page has already
 * rendered, so `href: '/services/design-systems'` is a compile error at the call site — there is
 * no registration API, no context and no ref handshake, because there is nothing to register: the
 * ids exist in the document before this component mounts.
 *
 * The shape is what a CMS record already has — `AuditSection.heading`'s `navigationLabel` and
 * `anchorId` — which is half the reason this is a pattern rather than a primitive. The other half
 * is that it resolves ids living OUTSIDE its own subtree, which is the strongest possible form of
 * knowing something above itself.
 */
export type TocItem = {
  label: string;
  href: `#${string}`;
  /**
   * A short derived fact at the entry's end, in the ordinal's mono voice: the number of items an
   * index group holds ("42"), so an index page's outline is also its count (critique 16 Oct 2026:
   * the insights hub's outline replaced a row of format chips that carried the counts). Never
   * authored copy and never a second label; absent on a long-form document.
   */
  meta?: string;
};

/**
 * One prop, and the closed props type is the point rather than an oversight.
 *
 * No index signature and no HTMLAttributes spread, so `surface`, `className`, `style`, `id`,
 * `activeId`, `onChange`, `title`, `depth` and `children` are all excess-property errors at the
 * call site rather than review comments. Each is answered somewhere else:
 *
 *   surface        this component paints no ground. It sits INSIDE the page's Section and reads
 *                  data-surface from an ancestor, exactly as Button, ListCard and Accordion do.
 *                  Breadcrumbs, SiteNav and SiteFooter take `surface` because they own a band and
 *                  have no ancestor to ask; this one owns a track, not a band.
 *   colour, space  the token layer and the primitives.
 *   width          not a caller decision: the rail caps itself, because a route that could widen
 *                  it could break the alignment every other band on the page depends on.
 *   title          "On this page" is one string decided once, and the VISIBLE title is also the
 *                  landmark's accessible name — so a boolean that hid it would silently leave the
 *                  landmark either unnamed or named by a string nobody can see.
 *   activeId       the whole point is that the component observes. A controlled current index
 *                  would move the mechanism into every call site.
 *   depth          a content-model fact rather than a preference: h3s live inside opaque rich-text
 *                  strings that Prose renders with dangerouslySetInnerHTML, carry no ids, and
 *                  nothing generates any. One level.
 */
export type TableOfContentsProps = {
  /**
   * The sections, in document order. Everything is derived from it: membership, order, the labels,
   * the targets, and the ordinals — which are generated from POSITION rather than passed, so an
   * outline can never disagree with itself about which entry is fourth.
   *
   * Two or more entries with labels. Fewer renders nothing.
   */
  items: readonly TocItem[];
};

/** Whitespace-only labels are dropped BEFORE numbering, so the ordinals stay contiguous. */
const hasLabel = (item: TocItem) => item.label.trim().length > 0;

/**
 * The width at and above which the outline is a sticky rail. Below it the same markup is a closed
 * <details> and nothing is ever marked, so the observer does not run at all.
 *
 * This literal is the one duplication in the component, and it is deliberate: `Layout`'s `lg`
 * breakpoint is `min-width: 1024px` and the module's one media query is the same, so the track
 * appearing, the rail sticking and the observer starting are one width by construction. A JS
 * viewport test in place of the media query was rejected — it would need the viewport before
 * hydration, and it would flash.
 */
const RAIL_MEDIA = '(min-width: 1024px)';

/** Beyond this a label has stopped being a navigation label and is a heading in a narrow column. */
const LABEL_MAX = 40;

const warn = (message: string) => {
  if (process.env.NODE_ENV !== 'production') console.warn(`TableOfContents: ${message}`);
};

/**
 * TableOfContents — the outline of a long-form document, built to docs/specs/TableOfContents.md.
 *
 * An author-curated, ordered list of one page's section headings, marking the section the reader
 * is currently in. It renders exactly what it is handed and never reads the DOM to DISCOVER
 * headings — it resolves the targets it was already given, in order to know which one the reader
 * has reached. That distinction is what keeps the content seam the source of truth and stops this
 * becoming a crawler later.
 *
 * Two arrangements, and neither is a prop. At 1024 and up it is a sticky rail in the first track
 * of the page's two-column shell. Below that it is a native <details>, closed by default, sitting
 * immediately after the hero — one 44px "On this page" row rather than an eleven-row block before
 * the first paragraph (29 Sep 2026, tracker 2.17). The same markup under one media query, with
 * nothing moved in the DOM: the rail is that <details> with its content forced open through
 * ::details-content and its summary hidden, so there is one landmark, one list and no script
 * deciding which arrangement a viewport gets.
 *
 * It contributes no colour and no distance: every value comes from --toc-* in
 * tokens/components/table-of-contents.css, which re-declares the whole colour set once per
 * surface, and every gap comes from Layout. So the same markup is correct on paper, on a tint
 * panel, in an ink band and on the blue pivot — including a tint panel nested inside an ink
 * section — without being told where it is standing.
 *
 * A CLIENT component, and the only one in this repo that depends on where the page is scrolled to.
 * That dependency is the reason it exists: a rail of links with no mark is a Layout and a list, and
 * would need no component at all. Everything else about it is a function of its props.
 *
 * It is NOT navigation — SiteNav is how you reach another page, and the `#${string}` type forbids
 * this one from ever leaving the current document. It is NOT the ancestor trail — Breadcrumbs says
 * where the page sits in the site and ends in the current page; this says what is inside the page
 * and ends in its last section. They answer opposite questions and sit on the same routes without
 * competing.
 *
 * At most one per page, on long-form documents only. Two adjacent would produce two `navigation`
 * landmarks with the identical accessible name and two live observers, and because the name comes
 * from the fixed title there would be nothing to tell them apart with.
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const titleId = useId();
  const railRef = useRef<HTMLElement | null>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const outline = items.filter(hasLabel);

  /* A primitive dependency for the effect, so it re-runs when the TARGETS change and not merely
     when the caller re-created the array. `items` is a new object identity on every render of a
     page that maps its sections inline — which every consumer does — so depending on it directly
     would tear down and rebuild the observer on every parent render. */
  const fragments = outline.map((item) => item.href).join(' ');

  /* ── The mechanism ────────────────────────────────────────────────────────────
     One IntersectionObserver over the elements the hrefs resolve to. An observer rather than a
     scroll listener because it does no per-frame work and fires exactly when the answer can have
     changed: a heading crossing the reading line IS the event, so there is nothing to throttle and
     no layout thrash. The recompute is O(n) with n at most 19, on a crossing.

     GATED TO THE RAIL WIDTH. Below 1024 the outline is a disclosure that marks nothing, so
     without this gate the observer would mount, resolve up to nineteen ids and stay live on every
     phone visit to five page types in order to produce a mark that is never rendered.

     THE READING LINE IS READ, NOT RESTATED. It is the used value of the rail's own
     inset-block-start — which is --toc-sticky-inset, which is the nav bar plus a gutter — so the
     number exists in exactly one place and cannot drift from the bar. Restating 104 here is the
     mistake this avoids. */
  useEffect(() => {
    const rail = railRef.current;
    const hrefs = fragments ? fragments.split(' ') : [];
    if (!rail || hrefs.length < 2) return;

    const targets = hrefs.map((href) => document.getElementById(href.slice(1)));

    /* An href that resolves to nothing still renders and still links: hiding the entry would make
       a content bug invisible, and the outline would then disagree with the page for a reader who
       can see both. What it can never do is become current, which looks merely quiet — so this
       warning is part of the mechanism rather than a nicety. */
    const missing = hrefs.filter((_, i) => targets[i] === null);
    if (missing.length > 0) {
      warn(
        `${missing.length} of ${hrefs.length} hrefs resolve to no element on this page ` +
          `(${missing.join(', ')}). Those entries render and link, but can never be marked ` +
          `current. Check that each section's heading carries id={anchorId}.`,
      );
    }

    const readingLine = () =>
      parseFloat(getComputedStyle(rail).getPropertyValue('inset-block-start')) || 0;

    /* THE LAST TARGET WHOSE START EDGE IS AT OR ABOVE THE READING LINE.
       Above the first heading NO row is current — the reader is in the hero, which is not in the
       outline, and marking row 01 there would be a claim about where they are that is false.
       Below the last heading the LAST row stays current, through the CTA and the footer, because
       it is the last thing the outline knows about and dropping the mark would make it blink off
       at the bottom of every page that has one. Both fall out of "the last one at or above"
       rather than being special-cased. */
    const measure = () => {
      const line = readingLine();
      let mark: number | null = null;
      targets.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line + 1) mark = i;
      });
      setCurrent(mark);
    };

    const media = window.matchMedia(RAIL_MEDIA);
    let observer: IntersectionObserver | null = null;

    const start = () => {
      if (observer) return;
      observer = new IntersectionObserver(measure, {
        /* The one physical value in this component, because the API has no logical spelling:
           rootMargin is top, right, bottom, left, in that order, always. In a right-to-left
           document the block-start margin is still the first value, so the mechanism is
           unaffected by direction and only the string looks physical. */
        rootMargin: `-${readingLine()}px 0px 0px 0px`,
        threshold: [0, 1],
      });
      targets.forEach((el) => el && observer?.observe(el));
      window.addEventListener('resize', measure);
      measure();
    };

    const stop = () => {
      observer?.disconnect();
      observer = null;
      window.removeEventListener('resize', measure);
      setCurrent(null);
    };

    const onChange = () => (media.matches ? start() : stop());
    if (media.matches) start();
    media.addEventListener('change', onChange);

    return () => {
      media.removeEventListener('change', onChange);
      stop();
    };
  }, [fragments]);

  /* Fewer than two entries renders nothing at all — not an empty <nav>, because an empty landmark
     is worse than no landmark: a screen reader user must enter it to discover that it answers
     nothing. A one-entry outline is a statement about nothing.

     This floor is STRUCTURAL and is not the editorial rule. Which pages get an outline is a
     page-type decision the route makes — long-form documents do, standard pages do not — and this
     component does not know about it and must not: a threshold prop would put the same judgement
     in every call site. */
  if (outline.length < 2) {
    warn(
      `needs two or more items with labels, received ${outline.length} ` +
        `(${JSON.stringify(items.map((i) => i.label))}). Rendering nothing.`,
    );
    return null;
  }

  const tooLong = outline.filter((item) => item.label.trim().length > LABEL_MAX);
  if (tooLong.length > 0) {
    warn(
      `${tooLong.length} label(s) exceed ${LABEL_MAX} characters and will clamp to two lines ` +
        `with the tail unrecoverable from the outline (${JSON.stringify(
          tooLong.map((i) => i.label),
        )}). Author a shorter navigationLabel — that field exists for exactly this.`,
    );
  }

  return (
    /* The landmark. Named by its own visible title rather than by an aria-label, so the name an
       editor can see is the name a screen reader says. `aria-labelledby` can never dangle here
       because the title is not a prop and cannot be switched off. */
    <nav ref={railRef} aria-labelledby={titleId} className={styles.rail}>
      {/* ONE DOM, AND CSS DECIDES WHETHER IT DISCLOSES. Below 1024 this is a native <details>,
          closed by default, so the outline costs a phone one 44px row before the first paragraph
          instead of an eleven-row block — no script, the footer directory's idiom. At 1024 and up
          the module forces its content open through ::details-content and hides the summary, so
          the rail is what it always was. That is the honest mechanism because it is the only one
          that keeps ONE landmark, ONE list and ONE set of links for the observer to mark: the
          footer renders its directory twice because it had to (a closed <details> cannot be forced
          open with `display`), and ::details-content is what removed that constraint.

          Where ::details-content is unsupported the desktop keeps the summary and simply stays a
          closed disclosure — a working outline one click away, never a vanished one. The @supports
          gate in the module is what decides that, not a script.

          `open` is never set here and never read: whether it is open is the reader's state on a
          phone and meaningless on the rail, and a prop for it would reintroduce the viewport
          question this component answers in CSS. */}
      <details className={styles.disclosure}>
        {/* The phone's head, and its only control. Sentence case in source, mono in presentation —
            the same string the rail's title carries. aria-hidden is NOT used: the summary is the
            disclosure button and its text is its accessible name. */}
        <summary className={styles.summary}>
          <span className={styles.summaryLabel}>On this page</span>
          <span className={styles.chevron}>
            <Icon name="alt-arrow-down" size="sm" />
          </span>
        </summary>
        {/* The head's air. A real arrangement now that no rule separates the head from the ladder —
            --gap-block, the step that means "head to body inside a block". */}
        <Layout rowGap="block" className={styles.panel}>
          {/* The rail's visible title, and the landmark's name at every width. Hidden below 1024,
              where the summary above says the same thing — aria-labelledby still resolves a hidden
              element's text, so the nav is "On this page" on a phone too. */}
          <p id={titleId} className={styles.title}>
            On this page
          </p>

          {/* Contiguous rows, stated as `none` rather than omitted. The zero is load-bearing twice:
              it is what makes the per-entry rule segments butt into one unbroken line, and it is
              what makes the row pitch equal the touch target.

              No list reset here. reset.css already zeroes an <ol>'s margin, padding and marker. */}
          <Layout as="ol" rowGap="none" className={styles.list}>
            {outline.map((item, index) => (
              /* Keyed on the fragment, which is unique per page by construction: the ids are derived
               and de-duplicated at the content seam (anchorSlug / uniqueAnchor in strapi.ts). */
              <li key={item.href} className={index === current ? styles.current : undefined}>
                {/* A bare anchor rather than a Button, and the sheet decided it rather than taste:
                  Button's label is --text-ui — MONO — with white-space: nowrap, so a sentence-case
                  navigationLabel would be shouted in a role the type system says is not for
                  sentence case, a 24-character label could not wrap in the rail, and there is
                  no slot for the ordinal and no two-line clamp. What this component takes from
                  Button instead is its geometry and its habits: the ring width and offset, the bare
                  focus radius, and the 44px target floor.

                  `aria-current` is ABSENT rather than falsy when the row is not current, and absent
                  from every row below 1024 where nothing is ever marked. "location" rather than
                  "page": SiteNav already marks the current page and Breadcrumbs marks the current
                  crumb, a reader can meet all three at once, and this one marks a position WITHIN
                  the current page. */}
                <a
                  className={styles.link}
                  href={item.href}
                  aria-current={index === current ? 'location' : undefined}
                >
                  {/* Generated from position, zero-padded, and hidden from the accessibility tree:
                    the <ol> already announces "4 of 11", so "zero four" before every label is
                    noise. Hidden is not the same as under-contrasted — a sighted reader navigates
                    by these digits, so the ink is held to the text floor on all four surfaces. */}
                  <span aria-hidden="true" className={styles.ordinal}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Two spans, and the split is the same one Button makes for the same reason: the
                    clamp needs `overflow: hidden`, which would crop an underline drawn at the
                    outer box's edge. So `label` is the underline's positioning context and takes
                    the remaining inline space, and `labelInk` is the box that clips. */}
                  <span className={styles.label}>
                    <span className={styles.labelInk}>{item.label}</span>
                  </span>
                  {item.meta?.trim() ? <span className={styles.meta}>{item.meta}</span> : null}
                </a>
              </li>
            ))}
          </Layout>
        </Layout>
      </details>
    </nav>
  );
}
