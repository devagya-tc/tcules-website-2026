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
 * frontmatter), and it arranges itself with Cluster, which a primitive may not import. It owns no
 * band (since 5 Oct 2026): it is placed in PageHero's `trail` slot and reads the hero's ground.
 *
 * PageHero is the first of the fourth kind — an OPENING: the one block every page begins with,
 * carrying its single h1 and, in its `trail` slot, the Breadcrumbs. Like SiteNav and SiteFooter it
 * owns its band and takes `surface` as a prop, and for the same reason (a pattern that paints a
 * band has no ancestor to read data-surface from); unlike them, it is a block a page is built out
 * of rather than apparatus around one.
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
 * ProcessFlow is a DIAGRAM OF ORDER: stages the work passes through, each with its items, and an
 * optional lane for what another party holds throughout. A pattern because it takes a content
 * shape and composes Layout, Cluster and Icon; not steps (ListCard rows) and not peers (tiles).
 *
 * ListCard is the fifth kind, and the only one here that is not a block: it is a ROW, and the
 * smallest thing in this tier. It owns no band, takes no `surface`, paints no ground at rest, and renders a
 * bare <li> — the list element belongs to the caller, as a Layout with rowGap="none", because the
 * row finishes itself with its own block-end rule and a gap would break the ladder. It is a pattern
 * for the usual two reasons (it consumes a content shape, and it arranges with Cluster and Layout).
 * BlockCard is its sibling OBJECT: a borderless tile that fills a parent-owned grid track, with no
 * edge and no ground; its title scale, cover media and position make the object. BlockCardSet is its
 * set, the one place that knows the count and so the one place the featured first card is decided.
 * Accordion is a DISCLOSURE SET: one continuous rule ladder of native details/summary pairs. It
 * owns a CMS-shaped question/answer array and composes Layout, Cluster, Icon and Prose while
 * leaving surface and surrounding page rhythm to its caller.
 * Proof is EVIDENCE: an attributed quotation, checked figures, or both. It composes Layout,
 * Prose and Button while leaving the ground and its position in a page argument to the caller.
 * Callout is a SCOPE NOTE: a quiet, unattributed boundary on the claim immediately before it. It
 * composes Prose inside a semantic note while leaving the ground and the claim-to-note seam to
 * its caller. It is not a quotation, alert, card or second rich-text variant.
 *
 * ContentSection is a BAND, and the only pattern here whose reason for existing is a distance:
 * one CMS section — eyebrow, heading, lead, then a run of blocks the caller supplies as children.
 * It takes `surface` like the other band-owning patterns and paints nothing itself. What it owns
 * is the grouping: the head is one group at 24 (eyebrow → heading → lead) so it reads as one
 * object, and the blocks are a separate 48 beat beneath it. One flat Layout cannot say that, which
 * is why this is a component and not three lines at a call site repeated on every route. It has
 * four arrangements of those beats — the head above the blocks; beside them from 1024 up, with an
 * aside or actions in the head track; split across the top as one row (the H-row); or a copy column
 * beside a photograph (the media split) — and a centred alignment of the first. Every one is
 * Layout's props rather than a second component.
 *
 * CtaRow is a band's FOOT: a hairline and one or two actions, with an optional note — the
 * section-level ask the kit's families share (visual-direction § 3.1, § 1.4). It owns no band and
 * no ground, and is placed in ContentSection's `footer` or, with its rule off, its `actions`: a
 * ReactNode slot, because a pattern does not import a pattern. It is a pattern for the usual two
 * reasons — a content shape (`{ label, href }`) and a composition of Button, Icon, Cluster and Layout.
 *
 * Slider is a ROW YOU MOVE: slides in a sideways-scrolling, snapping row (Layout `scroll="always"`),
 * with previous / next controls and a progress rail (fdn-scroll, 6 Oct 2026; visual-direction
 * § 1.4 — an image set of five or more is a Slider showing three). It owns no band and no ground,
 * sits in a band's body and reads data-surface from it. Its slides are the caller's `<li>`s — a
 * BlockCard, or a testimonial wrapped in one — so it takes children rather than records, and it
 * is a pattern because it composes Layout, Cluster and Icon. It is a client component, like SiteNav,
 * TableOfContents and EnquiryForm, for a ref, listeners and the controls' state; the scrolling itself is CSS, so the row
 * swipes and snaps before it hydrates.
 *
 * Figure is the quietest thing in the tier and the first to hold an IMAGE as its subject rather
 * than as a marker: an asset, its caption and an optional quieter note, filling whatever inline
 * space it is handed and asking nothing of the container. It is presentational to the letter —
 * no state, no interactive node, no ARIA, no id — and it is a pattern for the usual two reasons.
 * Its one departure from every sibling above is that the image is NOT sized here: whether a
 * screenshot runs the width of the text or the width of the section is the page's decision, and
 * building it in would give two places the power to disagree.
 *
 * TableOfContents is the newest kind, and the only component in this repo whose rendered output is
 * not a function of its props alone: it is an OUTLINE — an ordered list of one page's own section
 * headings, marking the section the reader is currently in. That mark is the whole reason it is a
 * component; without it a rail of links is a Layout and a list. It is a client component holding one
 * IntersectionObserver, gated to 1024 and up, and it is the first dependency in this system on where
 * the page is scrolled to. Like ListCard it owns no band and takes no `surface` — it is a TRACK, not
 * a band, and reads data-surface from the Section it sits inside. It is a pattern for the usual two
 * reasons and for a third that is stronger than either: it resolves ids that live outside its own
 * subtree, in the page's body, which is the strongest possible form of knowing something above
 * itself.
 *
 * It is not navigation and not the ancestor trail. SiteNav is how you reach another page;
 * Breadcrumbs says where this page sits in the site and ends in this page. This says what is inside
 * the page and ends in its last section, and its `#${string}` href type forbids it from ever
 * leaving the current document.
 *
 * The two are unrelated despite the word they share, and this barrel is where that collision is
 * visible: a `ProofFigure` is a CHECKED STATISTIC — a value, a label and the date it was verified
 * — while `Figure` is a captioned image. Neither renders the other, and nothing but the noun is
 * common to them.
 *
 * DataTable is TABULAR DATA, and the one case in the component audit that qualified as new on
 * markup and behaviour rather than on look: options against dimensions, whose semantics are a
 * `<table>` with scoped header cells that no card can express honestly. It owns no band and no
 * ground, composes Layout and Prose, and changes reading order — row by row, each value under its
 * column head — when the track it is given is narrower than the md content column.
 */
export { SiteNav } from './SiteNav';
export type {
  SiteNavProps,
  SiteNavItem,
  SiteNavLink,
  SiteNavGroup,
  SiteNavCard,
  SiteNavCardImage,
  SiteNavRail,
  SiteNavForm,
  SiteNavStatus,
} from './SiteNav';

export { Breadcrumbs } from './Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs';

export { TableOfContents } from './TableOfContents';
export type { TableOfContentsProps, TocItem } from './TableOfContents';

export { CtaSection } from './CtaSection';
export type {
  CtaSectionProps,
  CtaPoint,
  CtaIconPoint,
  CtaPointMarker,
  CtaAction,
  CtaMedia,
  CtaMediaSide,
} from './CtaSection';

export { EnquiryForm } from './EnquiryForm';
export type {
  AuditUrlLabel,
  EnquiryContextBase,
  EnquiryFormProps,
  EnquiryUrlLabel,
} from './EnquiryForm';

export { ProcessFlow } from './ProcessFlow';
export type {
  ProcessFlowProps,
  ProcessFlowStage,
  ProcessFlowLane,
  ProcessFlowStageHeading,
} from './ProcessFlow';
export { ListCard } from './ListCard';
export type {
  ListCardProps,
  ListCardMarker,
  ListCardArrangement,
  ListCardForm,
  ListCardSize,
  ListCardTitleElement,
} from './ListCard';

export { BlockCard, BlockCardSet, FEATURED_FROM, SMALL_FROM } from './BlockCard';
export type {
  BlockCardProps,
  BlockCardMedia,
  BlockCardImage,
  BlockCardImageSide,
  BlockCardOrientation,
  BlockCardSize,
  BlockCardTitleElement,
  BlockCardTracks,
  BlockCardSetProps,
  BlockCardSetItem,
} from './BlockCard';

export { Accordion } from './Accordion';
export type { AccordionProps, AccordionItem, AccordionQuestionElement } from './Accordion';

export { Proof } from './Proof';
export type { ProofProps, ProofQuote, ProofFigure, ProofPortrait } from './Proof';

export { ContentSection, ContentSectionText } from './ContentSection';
export type {
  ContentSectionAlign,
  ContentSectionArrangement,
  ContentSectionMedia,
  ContentSectionMediaSide,
  ContentSectionProps,
  ContentSectionTextProps,
} from './ContentSection';

export { CtaRow } from './CtaRow';
export type {
  CtaRowProps,
  CtaRowAction,
  CtaRowAlign,
  CtaRowEmphasis,
  CtaRowTone,
} from './CtaRow';

export { Slider } from './Slider';
export type { SliderProps, SliderPerView, SliderAlign } from './Slider';

export { Callout } from './Callout';
export type { CalloutProps } from './Callout';

export { DataTable } from './DataTable';
export type {
  DataTableProps,
  DataTableKeyColumn,
  DataTableColumn,
  DataTableRow,
  DataTableNodeCell,
  DataTableKeyBehaviour,
  DataTableColumnBehaviour,
} from './DataTable';

export { Figure } from './Figure';
export type { FigureProps, FigureImage } from './Figure';

export { PageHero } from './PageHero';
export type {
  PageHeroProps,
  HeroCredit,
  HeroCreditRole,
  HeroDates,
  HeroAction,
  HeroArrangement,
  HeroMedia,
  HeroImage,
  HeroVideo,
  HeroTrail,
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
