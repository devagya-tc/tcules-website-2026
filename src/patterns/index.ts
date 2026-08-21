/**
 * TIER 2 — patterns.
 *
 * Composed blocks built FROM primitives: a reusable commercial close, page heroes, content
 * sections, and cards.
 * Content-shaped but route-blind and data-blind — a pattern receives everything it renders as
 * props, so the same pattern serves a fixture today and a CMS response later.
 *
 * A pattern may import from @/components. It may not import a template or @/content.
 *
 * Breadcrumbs is the third kind here: not chrome like the nav and the footer, and not a block a
 * page is built out of, but a STATEMENT OF POSITION — an ordered list of the pages above this one.
 * It is a pattern for two independent reasons: it consumes a content shape (`{ label, href }` from
 * frontmatter), and it arranges itself with Cluster, which a primitive may not import.
 *
 * PageHero is the first of the fourth kind — an OPENING: the one block every page begins with,
 * carrying its single h1. Like Breadcrumbs it owns its band and takes `surface` as a prop, and for
 * the same reason (a pattern that paints a band has no ancestor to read data-surface from); unlike
 * it, it is a block a page is built out of rather than apparatus around one.
 */
export { SiteNav } from './SiteNav';
export type {
  SiteNavProps,
  SiteNavItem,
  SiteNavLink,
  SiteNavBlock,
  SiteNavRowsBlock,
  SiteNavRow,
  SiteNavRailBlock,
  SiteNavRailCompartment,
  SiteNavRailGroup,
  SiteNavBarBlock,
} from './SiteNav';

export { Breadcrumbs } from './Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs';

export { CtaSection } from './CtaSection';
export type { CtaSectionProps, CtaPoint, CtaAction } from './CtaSection';

export { PageHero } from './PageHero';
export type {
  PageHeroProps,
  HeroCredit,
  HeroCreditRole,
  HeroDates,
  HeroAction,
} from './PageHero';

export { SiteFooter } from './SiteFooter';
export type {
  SiteFooterProps,
  SiteFooterBrand,
  SiteFooterGroup,
  SiteFooterLink,
  SiteFooterMetaItem,
  SiteFooterNewsletter,
  SiteFooterSocial,
} from './SiteFooter';
