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
 *
 * Prose is neither. It is the rich-text flow — the one component that styles markup it did not
 * write, because a CMS body field arrives as a string. It is the documented exception to the
 * no-margins rule, and the exception is argued in the component itself.
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
export { Prose, type ProseProps } from './Prose';
