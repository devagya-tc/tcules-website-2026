import type { MediaImage, SectionSurface } from '@/components';
import type { SketchName } from '@/lib/sketches';

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
  /**
   * The preview scene for this row, drawn in the plate's feature column while the row is under the
   * pointer or focus (revision 2, docs/specs/SiteNav.md R2.1). Services only today: the kit's
   * `Sketch` has one scene per service and nothing for an audit or an industry, and a row with no
   * scene simply leaves the last one showing. Named in the fixture rather than looked up here, so a
   * pattern does not learn the route map.
   */
  sketch?: SketchName;
};

/** A named list of links — one column of a plate, one block of a sheet pane. */
export type SiteNavGroup = {
  label: string;
  links: readonly SiteNavLink[];
};

/**
 * A rail card: an offer in the Services feature column. The primary renders as a serif title row;
 * the secondary is a compact link under a rule.
 *
 * The secondary is NOT a second card, and that is structural rather than aesthetic: a full card
 * makes the rail taller than the two columns beside it, and then the plate's height is set by the
 * offer instead of by the content — which is the one thing the morph must not depend on.
 *
 * NO IMAGE ANY MORE (revision 2). The primary used to lead with an image slot that only ever held a
 * named placeholder. The service preview now gives the column its picture in the plate, and in the
 * sheet an empty diagram was worse than a title row.
 */
export type SiteNavCard = {
  title: string;
  href: string;
  status: SiteNavStatus;
  role: 'primary' | 'secondary';
};

/**
 * The plate's feature column: the visual reason to go further. One per mega, and a DIFFERENT FORM
 * per section on purpose (docs/specs/SiteNav.md R2.1): three plates should read as three ideas in a
 * squint, not as one list at three widths.
 *
 *   offers  Services. The preview of the service under the pointer (from `SiteNavLink.sketch`),
 *           then the "Working together" offers as cards.
 *   proof   Expertise. One case reduced to its figure: the number, what it means, whose it was,
 *           and the way to the case.
 *   story   Insights. The latest piece: a photograph, its title in the serif, its format.
 *
 * A union rather than one bag of optional fields, so a proof without its figure or a story without
 * its title is a type error rather than a quietly empty column.
 */
export type SiteNavRailOffers = {
  kind: 'offers';
  label: string;
  cards: readonly SiteNavCard[];
};

export type SiteNavRailProof = {
  kind: 'proof';
  label: string;
  /** The figure, verbatim: "75+". Rendered by `Stat`, so its rules apply. A symbol is part of it. */
  value: string;
  /** What it counts, as a word: "applications". */
  unit?: string;
  /** What the number means. One sentence, 12 words or fewer. */
  caption: string;
  /** Whose work it was. A quiet sans line, never a logo the fixture does not have. */
  client: string;
  /** The case. Its label is the control's text: "Read the case". */
  link: SiteNavLink;
};

export type SiteNavRailStory = {
  kind: 'story';
  label: string;
  title: string;
  /** The piece's format, short: "Article". Set in the mono label voice. */
  meta: string;
  href: string;
  status: SiteNavStatus;
  /** A photograph through `Media`, so it takes the shared tone layer. The column crops it 16:9. */
  image: MediaImage;
};

export type SiteNavRail = SiteNavRailOffers | SiteNavRailProof | SiteNavRailStory;

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
   * How the plate's two link columns divide the space between them. Omit for equal tracks.
   *
   * DECLARED, for the same reason `panelWidth` is: a pattern cannot count words. And here the
   * direction of the need is not even consistent between sections, which is what rules out one
   * shared ratio. Measured at the shipping copy — Services runs 148 against 230, so its second
   * column wants the larger share; Expertise runs 293 against 259 and wants the OPPOSITE; Insights
   * runs 60 against 133 and matches Services. A single `[3, 4]` left Expertise's first column with
   * 0.1px of clearance on "Content, Knowledge and Discovery Platforms" — a wrap waiting for a font
   * to render a hair wider.
   *
   * So: state it where the copy asks for it, leave it off where equal is right, and re-measure when
   * a label changes. Two numbers, not two pixel widths, so the ratio survives the plate resizing.
   */
  columnRatio?: readonly [number, number];
  /**
   * How wide the plate opens for this item.
   *
   * The plate shrinks to its content — 1120 for Services and Expertise, 880 for Insights since
   * revision 2's feature columns — because a plate held at the full content width beside four short
   * rows shows hundreds of px of empty ground, and that reads as a mistake rather than as restraint.
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
