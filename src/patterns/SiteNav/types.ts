import type { IconName, SectionSurface } from '@/components';

/**
 * The site navigation's information architecture, as a shape.
 *
 * These types are the CONTRACT between the nav and whatever supplies it — a fixture today, a CMS
 * collection later. They live with the pattern rather than in @/content because the pattern is
 * what has to render them: the view model is driven by what a component needs as props, not by
 * what a source happens to store. @/content imports them and declares the fixture against them,
 * which is the direction the seam runs.
 *
 * The panel is a LIST OF BLOCKS rather than a fixed set of fields, and that is the load-bearing
 * decision in this file. Three block kinds cover every panel the sitemap asks for, and a panel
 * built from them can express depth — grouped rows, a rail of compartments, an index link at the
 * foot — without the nav growing a bespoke case per top-level item. The previous site cut
 * Expertise and the Insights taxonomy out of the header entirely, because with one flat treatment
 * for every kind of content, depth could only read as a dump.
 */

/** A destination and its label. The atom every block is built out of. */
export type SiteNavLink = {
  label: string;
  href: string;
};

/**
 * One row in a `rows` block: a destination, a promise, and optionally a mark.
 *
 * `promise` is required, not optional. A row without one is a link in a list, and a link in a list
 * belongs in the rail — the whole reason a row costs two lines and half a column is that it says
 * what you get, and a panel of rows with empty second lines is worse than a panel of plain links.
 */
export type SiteNavRow = {
  label: string;
  promise: string;
  href: string;
  /**
   * A mark from the glyph set. Optional, and the test is whether it ADDS anything: the six
   * services carry marks because "Design Systems" and "Design Engineering" are hard to tell apart
   * at a glance, while the Insights formats do not, because "Podcasts" needs no help and a glyph
   * that says nothing is noise.
   */
  icon?: IconName;
};

/** Rows — the panel's primary column. Two columns of promise rows, optionally under a label. */
export type SiteNavRowsBlock = {
  kind: 'rows';
  /** A mono label over the set, for a panel with more than one group of rows. */
  label?: string;
  /** How many columns the rows run in. Collapses to one below the md breakpoint regardless. */
  columns?: 1 | 2;
  items: SiteNavRow[];
};

/**
 * A rail compartment — the editorial unit. An eyebrow, a title, a sentence and one action; the
 * shape a panel uses to say "start here" rather than "here is everything".
 */
export type SiteNavRailCompartment = {
  eyebrow: string;
  title: string;
  description: string;
  action: SiteNavLink;
};

/** A rail group — a named list of plain links, for destinations that need no selling. */
export type SiteNavRailGroup = {
  label: string;
  links: SiteNavLink[];
};

/**
 * The rail — the panel's second column, and the reason a panel reads as designed rather than as a
 * table of contents. Either flavour, or both: compartments carry weight, groups carry breadth.
 */
export type SiteNavRailBlock = {
  kind: 'rail';
  compartments?: SiteNavRailCompartment[];
  groups?: SiteNavRailGroup[];
};

/**
 * The bar — one link across the foot of the panel, to the section's own index.
 *
 * This is what lets the top-level item be a DISCLOSURE rather than a link: "Services" opens the
 * panel, and "All services" is where you go. A trigger that both navigates and opens has to
 * choose one on click, and whichever it chooses is wrong for half its users.
 */
export type SiteNavBarBlock = {
  kind: 'bar';
  link: SiteNavLink;
};

export type SiteNavBlock = SiteNavRowsBlock | SiteNavRailBlock | SiteNavBarBlock;

/**
 * A top-level bar item. With a `panel` it is a disclosure; without one it is a plain link — Work
 * and About have nothing to group, and giving them an empty panel to be consistent would put a
 * chevron on a control that opens nothing.
 */
export type SiteNavItem = {
  /** Stable identity for open/closed state. Not derived from the label, which is editorial. */
  key: string;
  label: string;
  href: string;
  /**
   * Paths this item owns that do not sit under its own href — Services also owns `/audits` and
   * `/how-we-work`, About also owns `/team` and `/careers`. Without these, those pages leave the
   * whole bar unlit, which reads as "you are nowhere".
   */
  matchPaths?: string[];
  panel?: SiteNavBlock[];
};

export type SiteNavProps = {
  items: SiteNavItem[];
  /** The one action in the bar. Always solid, always primary — it is the offer. */
  cta: SiteNavLink;
  /**
   * The ground the bar, the panel and the drawer paint. Defaults to `paper`.
   *
   * One prop for all three on purpose: a header whose panel is a different surface from its bar
   * reads as two components that happen to be adjacent.
   */
  surface?: SectionSurface;
};
