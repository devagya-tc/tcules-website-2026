/**
 * TIER 2 — patterns.
 *
 * Composed blocks built FROM primitives: a page hero, a content section, a CTA block, a card.
 * Content-shaped but route-blind and data-blind — a pattern receives everything it renders as
 * props, so the same pattern serves a fixture today and a CMS response later.
 *
 * A pattern may import from @/components. It may not import a template or @/content.
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
