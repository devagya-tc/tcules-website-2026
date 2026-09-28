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
 * Button, Icon and Input are CONTROLS in the tier — they arrange nothing above themselves, they
 * are things a layout arranges. Input owns only the native control box; labels and messages stay
 * with the pattern composing it. A row of controls belongs in a Cluster, which owns the gap.
 *
 * Tag is a MARK OF A SECOND KIND, and the pair is worth reading together. Logo is one
 * distinguished object with its own proportions; Tag is one of a row of siblings, sized to the
 * text around it. It ships two variants that share a box and invert their enclosure — an inert
 * taxonomy label with a ground and no edge, and a filter chip with an edge and no ground — so a
 * reader meets the same object whether it can be operated or not. Like Button it takes its one
 * glyph as a ReactNode rather than importing Icon, and like Button it owns no distance outside its
 * own box: the row is a Cluster's.
 *
 * Logo is a third kind: a MARK. Not an Icon, and the line between them is no longer fill versus
 * stroke now that the glyph set is solid too — it is PROPORTION and OWNERSHIP OF COLOUR. An icon
 * is drawn on the system's own 24-unit box and takes currentColor entirely; the wordmark has its
 * own aspect ratio (675×177) and one element, the bar above the "u", that is painted from
 * --logo-bar rather than inherited. Neither of those survives being filed as a glyph.
 *
 * Prose is neither. It is the rich-text flow — the one component that styles markup it did not
 * write, because a CMS body field arrives as a string. It is the documented exception to the
 * no-margins rule, and the exception is argued in the component itself.
 *
 * Media is the one ASSET RENDERER. It places a raster or vector image in whatever box its parent
 * gives it — its own intrinsic ratio, or a ratio the parent owns — and decides only the two things
 * every image slot must get the same: responsive delivery (a native srcset from Strapi's formats,
 * and the `sizes` the placement states) and the brand's edge by kind (capture hairline, cut-out
 * silhouette and panel, illustration never boxed). It arranges nothing and takes no caption; a
 * caption is Figure's.
 *
 * Texture is DECORATION. It arranges nothing and says nothing: a bleed layer that fills the band
 * and shows the pixel grid through shapes the caller places and blurs. Its geometry is read from
 * src/styles/textures/, the same spec the asset exporter reads.
 */
export {
  Section,
  type SectionProps,
  type SectionSurface,
  type SectionDensity,
} from './Section';
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
export { Input, type InputEmphasis, type InputProps } from './Input';
export { Logo, type LogoProps, type LogoSize, type LogoVariant } from './Logo';
export { Prose, type ProseProps } from './Prose';
export {
  Media,
  mediaSrcSet,
  type MediaFit,
  type MediaImage,
  type MediaKind,
  type MediaPanel,
  type MediaProps,
  type MediaSource,
} from './Media';
export { Tag, type TagProps, type TagVariant } from './Tag';
export {
  Texture,
  TextureShape,
  type TextureLength,
  type TextureProps,
  type TextureShapeProps,
} from './Texture';
