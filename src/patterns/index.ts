/**
 * TIER 2 — patterns.
 *
 * Composed blocks built FROM primitives: a reusable commercial close, page heroes, an enquiry
 * form, and cards.
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
 *
 * CtaSection is its bookend — a CLOSE, the page's ask made once, carrying an h2 and never an h1.
 * It is the third pattern here to take `surface` as a prop, for the same reason as the other two,
 * with one distinction worth knowing: it hands the value to Section and paints nothing itself, so
 * taking the prop is not the same as owning the ground. It is also the only pattern that appears
 * TWICE on a route — a mid-page offer and a closing block are both this component.
 *
 * EnquiryForm is a BEHAVIOURAL FORM: route-blind in what it renders, but responsible for the
 * blur-validation and asynchronous lifecycle shared by every page that collects an enquiry.
 *
 * ListCard is the fifth kind, and the only one here that is not a block: it is a ROW, and the
 * smallest thing in this tier. It owns no band, takes no `surface`, paints no ground, and renders a
 * bare <li> — the list element belongs to the caller, as a Layout with rowGap="none", because the
 * row finishes itself with its own block-end rule and a gap would break the ladder. It is a pattern
 * for the usual two reasons (it consumes a content shape, and it arranges with Cluster and Layout).
 * BlockCard is its bounded sibling: an edge-defined TILE that fills a parent-owned grid track. It
 * still paints no ground; the complete four-sided edge, media scale and h4 title make the object.
 * Accordion is a DISCLOSURE SET: one continuous rule ladder of native details/summary pairs. It
 * owns a CMS-shaped question/answer array and composes Layout, Cluster, Icon and Prose while
 * leaving surface and surrounding page rhythm to its caller.
 * Proof is EVIDENCE: an attributed quotation, checked figures, or both. It composes Layout,
 * Prose and Button while leaving the ground and its position in a page argument to the caller.
 * Callout is a SCOPE NOTE: a quiet, unattributed boundary on the claim immediately before it. It
 * composes Prose inside a semantic note while leaving the ground and the claim-to-note seam to
 * its caller. It is not a quotation, alert, card or second rich-text variant.
 *
 * Figure is the quietest thing in the tier and the first to hold an IMAGE as its subject rather
 * than as a marker: an asset, its caption and an optional quieter note, filling whatever inline
 * space it is handed and asking nothing of the container. It is presentational to the letter —
 * no state, no interactive node, no ARIA, no id — and it is a pattern for the usual two reasons.
 * Its one departure from every sibling above is that the image is NOT sized here: whether a
 * screenshot runs the width of the text or the width of the section is the page's decision, and
 * building it in would give two places the power to disagree.
 *
 * The two are unrelated despite the word they share, and this barrel is where that collision is
 * visible: a `ProofFigure` is a CHECKED STATISTIC — a value, a label and the date it was verified
 * — while `Figure` is a captioned image. Neither renders the other, and nothing but the noun is
 * common to them.
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

export { EnquiryForm } from './EnquiryForm';
export type {
  AuditUrlLabel,
  EnquiryContextBase,
  EnquiryFormProps,
  EnquiryUrlLabel,
} from './EnquiryForm';

export { ListCard } from './ListCard';
export type {
  ListCardProps,
  ListCardMarker,
  ListCardArrangement,
  ListCardTitleElement,
} from './ListCard';

export { BlockCard } from './BlockCard';
export type { BlockCardProps, BlockCardMedia, BlockCardTitleElement } from './BlockCard';

export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem } from './Accordion';

export { Proof } from './Proof';
export type { ProofProps, ProofQuote, ProofFigure } from './Proof';

export { Callout } from './Callout';
export type { CalloutProps } from './Callout';

export { Figure } from './Figure';
export type { FigureProps, FigureImage } from './Figure';

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
