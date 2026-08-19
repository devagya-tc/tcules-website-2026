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
 *
 * Button and Icon are the first CONTROLS in the tier — they arrange nothing, they are things a
 * layout arranges. A row of them belongs in a Cluster, which owns the gap; a button never sets
 * its own outer spacing.
 */
export { Section, type SectionProps } from './Section';
export { Layout, type LayoutProps } from './Layout';
export { Cluster, type ClusterProps } from './Cluster';
export {
  Button,
  type ButtonProps,
  type ButtonEmphasis,
  type ButtonTone,
  type ButtonSize,
} from './Button';
export { Icon, iconNames, type IconProps, type IconName, type IconSize } from './Icon';
