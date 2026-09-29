import { Cluster, Section, type SectionSurface } from '@/components';

import { cx } from '@/lib/cx';

import styles from './Breadcrumbs.module.css';

/**
 * One level of the trail. The shape a frontmatter record already has, which is half the reason
 * this is a pattern rather than a primitive: it consumes content, it does not merely arrange.
 *
 * `href` is required on EVERY item including the last, and the last one's is deliberately ignored
 * at render — the current page is a <span>, never a link, because a link to the page you are on is
 * a control that does nothing. Requiring it anyway keeps the frontmatter mapper uniform and saves
 * it a special case for the leaf.
 */
export type BreadcrumbItem = { label: string; href: string };

/**
 * Two props, and the closed props type is the point rather than an oversight.
 *
 * There is no index signature and no HTMLAttributes spread, so `className`, `style`, `separator`,
 * `size`, `density` and `children` are all excess-property errors at the call site rather than
 * review comments. Each is answered somewhere else: colour and distance by the token layer and the
 * primitives, the divider by one decision made once, the band's air by this component because the
 * band is now its own, and outer spacing by nobody — there is none.
 *
 * `pathname` is absent for the hardest reason: the trail comes from frontmatter, and a component
 * that COULD derive a trail from a URL would eventually be asked to.
 */
export type BreadcrumbsProps = {
  /**
   * The ancestors, in order, ending with this page. Everything is derived from it: which item is
   * current (always the last), how many dividers there are (always one fewer than the rendered
   * items), and whether the middle collapses (at four or more).
   *
   * Two or more items, and depth beyond four is free — the collapse holds the rendered count at
   * four whether the route is six levels deep or sixteen. Fewer than two renders nothing.
   */
  items: readonly BreadcrumbItem[];
  /**
   * The ground this component's own band paints. Defaults to `paper`.
   *
   * A prop here rather than an inherited attribute, and that is not an exception to the surface
   * model — it is the same answer `SiteNav` and `SiteFooter` already give. A control reads
   * `data-surface` from an ancestor because it sits inside somebody else's band; a pattern that
   * OWNS a band has to be told which ground to paint, because there is no ancestor to ask.
   *
   * It must match the `surface` of the hero band immediately below, or the seam between the two
   * bands reads as a two-tone split. That is the one thing this component cannot check for itself.
   */
  surface?: SectionSurface;
};

/** Whitespace-only labels are dropped, so a bad frontmatter record cannot skew the divider count. */
const hasLabel = (item: BreadcrumbItem) => item.label.trim().length > 0;

/**
 * Breadcrumbs — the ancestor trail, built to docs/specs/Breadcrumbs.md.
 *
 * An ordered list of the pages above this one, ending in this one. It states position; it is not a
 * way of getting elsewhere — SiteNav does that, and the trail's links are a by-product of saying
 * where you are rather than the point of it.
 *
 * It contributes no colour and no distance: every value comes from `--crumb-*` in
 * tokens/components/breadcrumbs.css, which re-declares the whole set once per surface, and every
 * gap comes from `Cluster`. So the same markup is correct on paper, on a tint panel, in an ink
 * band and on the blue pivot — including a tint panel nested inside an ink section — without being
 * told where it is standing.
 *
 * It renders its OWN band — a flush `Section`, with 64 of air above the trail and only the focus
 * ring's reach below it — which is what makes the placement unforgeable: there is one way a trail
 * can sit on a page and this is it. That band is why `surface` is a prop: a pattern that owns a band has no ancestor to read `data-surface`
 * from. Its value must match the hero band immediately below, or the seam between the two reads as
 * a two-tone split, and that is the one thing this component cannot check for itself.
 *
 * Because it is a band it can only be a direct child of the page. It must not be put inside a
 * `Section` (the content column would inset twice) or inside a `Layout` (a band is not a row).
 *
 * A server component. No state, no effect, no ref, no DOM handler — hover, press and focus are the
 * stylesheet's business and take no props, and nothing in this component ever opens.
 */
export function Breadcrumbs({ items, surface = 'paper' }: BreadcrumbsProps) {
  const trail = items.filter(hasLabel);
  const first = trail[0];
  const current = trail[trail.length - 1];

  /* Fewer than two levels renders nothing at all — not an empty <nav>, because an empty landmark
     is worse than no landmark: a screen reader lists it and it answers nothing. A trail of one is
     a statement about nothing, and a lone "Home" above a hero is noise.

     This is the defence against a bad frontmatter record, not a supported call. `/` does not
     render the component. The warning cannot name the route — reading the URL is the one thing
     this component may never do — so it names the labels it was handed, which is what identifies
     the offending record anyway.

     The two truthiness checks are not a second condition: with noUncheckedIndexedAccess an
     indexed read is `T | undefined` whatever the length says, and this guard is what narrows
     them for the render below. A non-empty tuple prop type would move all of this into the type
     system and make the branch unreachable — the spec asks for that in the frontmatter loader,
     in its own change. */
  if (!first || !current || trail.length < 2) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `Breadcrumbs: needs two or more items with labels, received ${trail.length} ` +
          `(${JSON.stringify(items.map((i) => i.label))}). Rendering nothing. ` +
          `Check navigation.breadcrumb in the page's frontmatter.`,
      );
    }
    return null;
  }

  /* The collapse is DEPTH-DRIVEN, and it has two depths — one per side of the md breakpoint.

     From 768 up, four or more authored levels render as four: first, collapse, parent, current.
     Below 768 the same trail renders as THREE: first, collapse, current — the parent goes into the
     collapse too. On a phone a four-crumb trail wrapped onto a second line 44.85px below the first,
     led by a divider, and read as two elements rather than one phrase (29 Sep 2026, tracker 2.17).
     The rowGap that caused that distance is not the thing to change — it is what keeps the 44px
     targets of two wrapped lines from overlapping — so the fix is to stop the trail wrapping by
     holding it to three crumbs where the column is narrow.

     A trail of three or fewer levels is the same at both widths: three crumbs is already the phone's
     count, and collapsing a three-level trail would trade a real link for a mark and save nothing.

     No client JS and no prop. Both renderings are ONE list: the parent <li> and the two count
     strings carry a breakpoint class, and the stylesheet removes the one that does not apply with
     `display: none`, which takes it out of the accessibility tree as well as out of the layout. So at
     any width a screen reader walks exactly one trail with one count in it — never both counts,
     never a parent the eye cannot see. Depth is still free after four, which is why there is no
     `maxItems`. */
  const collapsed = trail.length >= 4;
  const parent = trail[trail.length - 2];

  /* Everything between the first item and the current page when the trail is short. Once collapsed
     the middle is the parent alone, rendered separately below because it carries the wide-only
     class. */
  const middle = collapsed ? [] : trail.slice(1, -1);

  /* Levels the collapse stands for: from 768 up it hides everything but the parent; below 768 it
     hides the parent too. */
  const omittedWide = trail.length - 3;
  const omittedNarrow = trail.length - 2;

  return (
    /* ── The band ────────────────────────────────────────────────────────────────
       The trail owns its band, which is what makes the composition unforgeable: there is exactly
       one way a trail can be placed on a page, and it is this one. Previously the band was the
       caller's, which meant 128 route files each had a chance to get the padding, the surface or
       the ordering wrong, and no check could see it.

       `flush` because the air here is asymmetric and Section's three densities are not — flush is
       documented for exactly this, "a composition that supplies its own". This component supplies
       it on the <nav> INSIDE the band rather than on the Section, which is why no className appears
       here; the module explains why that placement rather than a longhand override.

       Each half has its own reason. ABOVE, 64 holds the trail clear of the sticky nav, and it has
       to: the hit extension reaches 23.15px above the label, and a band with nothing added would
       put that under a bar which stacks over it. BELOW, the focus ring's reach and nothing more —
       the air between the trail and the hero is the HERO band's to give, and contributing a seam's
       worth here would make the two paddings add.

       `as="div"` because the landmark is the <nav> inside. Section takes no aria-label and should
       not: it paints bands, it does not name regions. */
    <Section as="div" surface={surface} flush>
      {/* The landmark, and the band's vertical air — no colour and no box. The name is a constant:
          one trail per page means there is nothing to disambiguate. */}
      <nav aria-label="Breadcrumb" className={styles.root}>
        {/* Both axes stated. colGap on the inline seam either side of every solidus, so the trail
          reads as one phrase rather than as four separated items; rowGap between WRAPPED lines,
          which is Cluster's largest step and is there for the touch targets. */}
        <Cluster
          as="ol"
          colGap="inline"
          rowGap="block"
          align="baseline"
          className={styles.trail}
        >
          {/* The first crumb has one child and no divider, so it needs no arrangement and stays a
            bare <li>. Every other crumb is a nowrap Cluster: the trail wraps BETWEEN crumbs and
            never inside one, so a divider can never be stranded at the end of a line from the
            label it belongs to. A single label longer than the track still breaks inside itself —
            nowrap governs the flex children, not the text inside one of them. */}
          <li>
            <a className={styles.link} href={first.href}>
              {first.label}
            </a>
          </li>

          {collapsed ? (
            <Cluster as="li" colGap="inline" align="baseline" nowrap>
              <Divider />
              {/* Inert, deliberately. It says levels were dropped without pretending to be a
                control — so there is no aria-expanded, no aria-controls naming a list that is not
                rendered, no keyboard contract and no focus to place after a state change. The
                meaning is carried by the hidden sibling, not by the character.
                Two siblings, one per side of the breakpoint, because the count differs by the
                parent. The stylesheet removes the one that does not apply, so exactly one is ever
                in the accessibility tree. */}
              <span aria-hidden="true" className={styles.collapse}>
                {'\u2026'}
              </span>
              <span className={cx(styles.collapseCount, styles.wideOnly)}>
                {levelsOmitted(omittedWide)}
              </span>
              <span className={cx(styles.collapseCount, styles.narrowOnly)}>
                {levelsOmitted(omittedNarrow)}
              </span>
            </Cluster>
          ) : null}

          {middle.map((item) => (
            <Cluster key={item.href} as="li" colGap="inline" align="baseline" nowrap>
              <Divider />
              <a className={styles.link} href={item.href}>
                {item.label}
              </a>
            </Cluster>
          ))}

          {/* The parent of a collapsed trail — shown from 768 up, folded into the collapse below it.
            `display: none` below 768 rather than a visually hidden clip, because a link the eye
            cannot see must not be a tab stop or an announced crumb either. */}
          {collapsed && parent ? (
            <Cluster as="li" colGap="inline" align="baseline" nowrap className={styles.wideOnly}>
              <Divider />
              <a className={styles.link} href={parent.href}>
                {parent.label}
              </a>
            </Cluster>
          ) : null}

          <Cluster as="li" colGap="inline" align="baseline" nowrap>
            <Divider />
            {/* Never an <a>, and never a link that has merely been marked: currency here is
              STRUCTURAL — it is the last item — so it is a different element with its own token,
              which is why no --crumb-link-ink-current exists. It differs from its ancestors by ink
              alone and does not need more: it is not focusable, it gains no rule on hover, and it
              carries aria-current, so nothing about it is carried by colour only. */}
            <span aria-current="page" className={styles.current}>
              {current.label}
            </span>
          </Cluster>
        </Cluster>
      </nav>
    </Section>
  );
}

/** The collapse's announced meaning. A sans sentence, so it is authored in sentence case. */
function levelsOmitted(n: number) {
  return n === 1 ? '1 level omitted' : `${n} levels omitted`;
}

/**
 * The separator: U+002F, in the label's own face.
 *
 * A text character rather than an Icon, so it aligns on the baseline and scales with the type for
 * free, needs no glyph request, and does not imply a direction or a control the way a chevron does
 * everywhere else in this system. `aria-hidden` because a solidus announced as "slash" three times
 * is noise — the ordered list already carries the structure.
 */
function Divider() {
  return (
    <span aria-hidden="true" className={styles.divider}>
      /
    </span>
  );
}
