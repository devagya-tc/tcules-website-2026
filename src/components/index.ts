/**
 * TIER 1 — primitives.
 *
 * Structural building blocks that know nothing about content, routes or the CMS. A primitive
 * takes props and renders; it never reaches upward. Enforced by the tier rule in
 * eslint.config.mjs.
 *
 * Section owns the band and the content column. Layout owns the columnar axis. Cluster owns
 * the inline axis. Between them they express every arrangement, and nothing else in the repo
 * should be doing layout by hand.
 */
export { Section, type SectionProps } from './Section';
export { Layout, type LayoutProps } from './Layout';
export { Cluster, type ClusterProps } from './Cluster';
