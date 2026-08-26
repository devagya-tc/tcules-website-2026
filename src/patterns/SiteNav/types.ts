import type { SectionSurface } from '@/components';

/**
 * The site navigation's information architecture, as a shape.
 *
 * These types are the CONTRACT between the nav and whatever supplies it — a fixture today, a CMS
 * collection later. They live with the pattern rather than in @/content because the pattern is
 * what has to render them: the view model is driven by what a component needs as props, not by
 * what a source happens to store. @/content imports them and declares the fixture against them,
 * which is the direction the seam runs.
 *
 * ── The load-bearing decision: EVERY item carries its children ──────────────────────────────────
 * Work, Lab and About render as plain links today. Their children are in the data anyway, on
 * `children`, unrendered. Two reasons, both from docs/specs/SiteNav.md §2.1.
 *
 * First, switching Lab to a menu later is a change to ONE FIELD on one record — `form: 'link'`
 * becomes `form: 'compact'` and the groups are already written — rather than a content migration
 * done under time pressure by whoever is on the ticket.
 *
 * Second, these same records are meant to feed the footer, the in-page section navigation and the
 * sitemap. A child that exists in one of those and not another is a bug a build can catch, and it
 * can only catch it if there is one list to compare against.
 *
 * ── Why this replaced a list of blocks ──────────────────────────────────────────────────────────
 * The previous shape was a `SiteNavBlock[]` per item — rows, rail, bar — which let a panel be
 * anything and therefore made every panel a separate design. The revised IA is narrower on
 * purpose: a mega is GROUPS of links, plus at most one rail. Two shapes instead of an open set,
 * which is what lets one plate morph between three sections rather than three panels blink in and
 * out of existence.
 */

/**
 * Does the page behind this link exist yet?
 *
 * `planned` means the route is decided and the page is not built. The link still renders, and it
 * renders IDENTICALLY to a live one — see the note on the type below. This flag is not for the
 * nav: it is for the sitemap generator, which must not submit a holding page to a search engine.
 */
export type SiteNavStatus = 'live' | 'planned';

/**
 * How a bar item behaves.
 *
 *   mega     opens the plate: two groups side by side, optionally a rail
 *   compact  opens the plate at its narrow width — one or two short groups, never a rail
 *   link     navigates. `children` is carried and not rendered
 *
 * `compact` is in the union because §2.1 promises that switching Lab or About to a menu is a
 * one-field edit, and a union member nothing can be set to is not a promise. NO ITEM USES IT
 * TODAY. It renders as a mega held to `--nav-plate-width-sm`, which is what "compact menu" means
 * in this design language — not as a special case with rules of its own.
 */
export type SiteNavForm = 'mega' | 'compact' | 'link';

/**
 * A destination and its label. The atom every group is built out of.
 *
 * `status` is required rather than optional, and on every link rather than only the unbuilt ones.
 * An optional flag makes "no page yet" and "nobody filled this in" the same value, and the second
 * of those is the one that ships by accident.
 */
export type SiteNavLink = {
  label: string;
  href: string;
  status: SiteNavStatus;
};

/** A named list of links — one column of a plate, one block of a sheet pane. */
export type SiteNavGroup = {
  label: string;
  links: readonly SiteNavLink[];
};

/**
 * A rail card. The primary one leads with an image; the secondary is a compact row under it.
 *
 * The secondary is NOT a second card, and that is structural rather than aesthetic: a full card
 * makes the rail taller than the two columns beside it, and then the plate's height is set by the
 * offer instead of by the content — which is the one thing the morph must not depend on.
 *
 * `image` is a RECORD, not a slot, and that changed on purpose. It was a `ReactNode` so the caller
 * could decide what filled it — which read well until the caller turned out to be the content seam,
 * and content is a `.ts` module that cannot hold JSX. The image then had nowhere to live except a
 * component, which is where a nav's artwork least belongs.
 *
 * `{ src, alt, width, height }` is also simply the house contract: `Figure` established it,
 * `PageHero` follows it, and both render a native `<img>`. Being the one pattern with a different
 * image shape was never a virtue.
 *
 * Still optional. Without one the card renders title-only rather than showing an empty frame: an
 * unfilled grey rectangle in a live header reads as a broken image, not as a placeholder.
 */
export type SiteNavCardImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type SiteNavCard = {
  title: string;
  href: string;
  status: SiteNavStatus;
  role: 'primary' | 'secondary';
  image?: SiteNavCardImage;
};

/** The plate's third column. Services alone has one. */
export type SiteNavRail = {
  label: string;
  cards: readonly SiteNavCard[];
};

/**
 * A top-level bar item.
 *
 * `href` is required in practice when `form` is `'link'` and meaningless otherwise — a mega's
 * trigger opens rather than navigates, because a control that does both has to pick one on click
 * and is wrong for half its users. It is typed optional rather than as a discriminated union
 * deliberately: the union would make `form` unchangeable without also restructuring the record,
 * and being able to flip that one field is the whole point of §2.1.
 */
export type SiteNavItem = {
  /** Stable identity for open/closed state. Not derived from the label, which is editorial. */
  key: string;
  label: string;
  form: SiteNavForm;
  /** Where the item goes when `form` is `'link'`. Ignored by a mega. */
  href?: string;
  /**
   * Paths this item owns that do not sit under its own href — Services also owns `/audits` and
   * `/how-we-work`, About also owns `/team` and `/careers`. Without these, those pages leave the
   * whole bar unlit, which reads as "you are nowhere".
   *
   * Not in the spec's type. It is here because the spec still asks the bar item to carry `active`
   * (§3), and an item can only know it is current if it is told which paths it covers.
   */
  matchPaths?: readonly string[];
  /** The plate's columns. `mega` and `compact`. */
  groups?: readonly SiteNavGroup[];
  /** The plate's third column. `mega` only, and only where there is something to put in it. */
  rail?: SiteNavRail;
  /**
   * The way through to the section's own index — "All services" at the foot of the plate.
   *
   * OPTIONAL, and it is not an oversight where it is missing. A mega's trigger opens rather than
   * navigates, so without one of these a section with an index page has no route to it; but not
   * every section HAS an index worth sending anyone to, and a bar that promises one and lands on a
   * thin page is worse than no promise. Services and Insights carry one today; Expertise does not.
   */
  hub?: SiteNavLink;
  /**
   * How wide the plate opens for this item.
   *
   * The plate shrinks to its content — 1120 for Services, 780 for Expertise, 560 for Insights —
   * because a plate held at the full content width beside four short rows shows 500px of empty
   * ground, and that reads as a mistake rather than as restraint.
   *
   * It is DECLARED rather than derived. A pattern cannot count words: deriving the width from
   * link counts would silently re-lay out the plate the day a group gains a seventh item, and the
   * cause would be invisible in both the data and the markup. Defaults to `lg` with a rail and
   * `md` without.
   */
  panelWidth?: 'sm' | 'md' | 'lg';
  /**
   * The children of a `link` item — carried, not rendered. See the header.
   *
   * Typed on every item rather than only on links so that flipping `form` needs no other edit,
   * but only a `link` has anywhere to put them today.
   */
  children?: readonly SiteNavLink[];
};

export type SiteNavProps = {
  items: readonly SiteNavItem[];
  /**
   * The offer. Solid primary, always — it is the one thing the bar asks for.
   *
   * Rendered in the bar above the breakpoint and at the right of the sheet's sticky foot below it,
   * where the primary belongs under the right thumb.
   */
  cta: SiteNavLink;
  /**
   * The lighter way in — "Request audit". Ghost neutral, and MOBILE ONLY.
   *
   * It has no place in the bar: a bar with two actions has no offer, it has a choice, and the
   * whole reason the desktop rail carries "Request Free Audit" as a compact row is that the same
   * offer twice in one view is one offer too many. The sheet is the opposite case — its foot is
   * the only chrome a thumb can reach without scrolling, so both ways in belong there.
   */
  ctaSecondary: SiteNavLink;
  /**
   * The ground the bar, the plate and the sheet paint. Defaults to `paper`.
   *
   * One prop for all three on purpose: a header whose plate is a different surface from its bar
   * reads as two components that happen to be adjacent.
   */
  surface?: SectionSurface;
};
