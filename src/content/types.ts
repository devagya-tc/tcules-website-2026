import type { SiteFooterProps, SiteNavProps } from '@/patterns';

/**
 * View models — the shapes a PAGE consumes, not the shapes a CMS returns.
 *
 * This distinction is the point of the whole seam. If pages type against Strapi's response
 * shape, then every Strapi remodel is a change to every page. Typing against a view model
 * means a remodel is absorbed inside sources/strapi.ts and nothing above it moves.
 *
 * These are deliberately minimal — the real shapes get defined as pages get built, driven by
 * what the patterns need as props rather than by what the CMS happens to store.
 */

/** A resolved page: whatever the route needs to render, already flattened and normalised. */
export type Page = {
  slug: string;
  title: string;
  /** Ordered blocks the page renders top to bottom. Typed properly once patterns exist. */
  blocks: PageBlock[];
  seo?: PageSeo;
};

/**
 * One block in a page's flow. The discriminant maps 1:1 onto a pattern in @/patterns.
 *
 * ── Long-form bodies are a BLOCK LIST, never one rich-text field ─────────────────────────────
 * Decided 24 Aug 2026. An article or case study alternates: rich text, then a figure, then rich
 * text, then a figure. A `prose` block carries an HTML string and renders through `Prose`; an
 * image is its own `figure` block and renders through the `Figure` pattern.
 *
 * **An image never arrives inside a rich-text body string.** That is a contract, not a
 * preference, and three things depend on it — none of which a body string can express:
 *
 *   · the quieter NOTE under the caption. Prose sets one colour for a whole <figcaption>, so a
 *     two-tone legend would need a micro-format the CMS has to emit correctly forever;
 *   · the hairline that ends a light screenshot on a light ground. Prose styles the caption and
 *     leaves the image alone;
 *   · width. Inside .prose an image fills the text measure, and whether a figure runs the text
 *     column or the full section is the template's decision, which a string cannot carry.
 *
 * Enforced where sanitisation already happens — in sources/*, see the note in sources/strapi.ts.
 * A body field that arrives carrying <img> or <figure> is a content-model violation, not
 * something a component should quietly absorb.
 */
export type PageBlock = {
  /** Discriminant — maps 1:1 onto a pattern in @/patterns. */
  type: string;
  [key: string]: unknown;
};

export type PageSeo = {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
};

/**
 * A comparison table — the view model of every CMS `table` block (Audit, Service, Expertise, Tool,
 * Glossary and How-we-work all send the same structured shape). Rendered by `DataTable`; built to
 * docs/specs/DataTable.md.
 *
 * It replaces a flattened `html` string. The seam used to stringify the block into a `<table>`
 * and push every cell through plain text on the way, which discarded the links and inline marks
 * editors had authored — and an opaque string cannot stack below md or carry per-column
 * behaviour. The CMS already sends the structure, so the seam now passes it through instead.
 *
 * · `keyColumn` is the FIRST column — the row headers. It is a separate field, not `columns[0]`,
 *   because it is semantically different (`<th scope="row">`) and cannot be numeric.
 * · `columns` are the DATA columns, in order. The count is data, never a variant.
 * · `rows[].header` is plain text: it is a header cell, named by its own text, and it is what the
 *   stacked reading order uses as the title of each group.
 * · `rows[].cellsHtml` is one TRUSTED, seam-sanitised rich-text string per data column — the same
 *   contract as `Prose`'s `html` prop (escaped text, the six inline marks, safe links, paragraphs).
 *   An empty string is an empty cell. The seam pads or truncates so the length always equals
 *   `columns.length`.
 */
export type ContentTable = {
  caption?: string;
  summary?: string;
  keyColumn: { heading: string };
  columns: { heading: string }[];
  rows: { header: string; cellsHtml: string[] }[];
};

export type AuditAction = {
  label: string;
  href: string;
  external: boolean;
};

export type AuditCard = {
  title: string;
  body: string;
  href?: string;
};

export type AuditLabelledItem = {
  title: string;
  body: string;
  href?: string;
};

export type AuditContentColumn = {
  id: string;
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
  items: AuditLabelledItem[];
  links: AuditAction[];
};

export type AuditBlock =
  | { id: string; type: 'rich-text'; html: string }
  | { id: string; type: 'card-grid'; columns: 1 | 2 | 3 | 4; cards: AuditCard[] }
  | { id: string; type: 'comparison-cards'; cards: AuditCard[] }
  | { id: string; type: 'table'; table: ContentTable }
  | {
      id: string;
      type: 'quote';
      quote: { quoteHtml: string; name: string; role: string; company: string };
      source?: AuditAction;
    }
  | { id: string; type: 'callout'; html: string }
  | {
      id: string;
      type: 'labelled-list';
      displayStyle: string;
      items: AuditLabelledItem[];
    }
  | {
      id: string;
      type: 'two-column';
      left?: AuditContentColumn;
      right?: AuditContentColumn;
    }
  | {
      id: string;
      type: 'link-group';
      heading: string;
      description?: string;
      links: AuditLabelledItem[];
    }
  | {
      id: string;
      type: 'media';
      image?: { src: string; alt: string; width: number; height: number };
      caption: string;
      note?: string;
    };

export type AuditSection = {
  id: string;
  heading?: {
    text: string;
    anchorId: string;
    navigationLabel?: string;
  };
  blocks: AuditBlock[];
};

export type ContentSeo = PageSeo & {
  robots?: { index: boolean; follow: boolean };
  structuredData?: Record<string, unknown> | unknown[];
};

export type AboutAction = {
  label: string;
  href: string;
  external: boolean;
};

export type AboutImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type AboutImageSection = {
  id: string;
  heading: string;
  description: string;
  images: AboutImage[];
};

export type AboutCard = {
  id: string;
  title: string;
  body: string;
  eyebrow?: string;
  image?: AboutImage;
  icon?: AboutImage;
  action?: AboutAction;
  surface?: 'paper' | 'tint' | 'ink' | 'blue';
};

export type AboutPage = {
  documentId: string;
  slug: string;
  hero: {
    heading: string;
    description: string;
    image?: AboutImage;
  };
  introduction?: {
    heading: string;
    description: string;
  };
  secondSection?: AboutImageSection;
  thirdSection?: AboutImageSection;
  principles?: {
    id: string;
    heading: string;
    items: AboutCard[];
  };
  voices?: {
    id: string;
    heading: string;
    cards: AboutCard[];
  };
  checklist?: {
    id: string;
    heading: string;
    cards: AboutCard[];
  };
  closing?: {
    id: string;
    heading: string;
    action?: AboutAction;
    cards: AboutCard[];
  };
  updatedAt?: string;
  publishedAt?: string;
  seo?: ContentSeo;
};

export type AboutContentSource = {
  getAboutPage(slug: string): Promise<AboutPage | null>;
};

export type ContactImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ContactAction = {
  id: string;
  label: string;
  href: string;
  description: string;
  external: boolean;
  icon?: ContactImage;
};

export type ContactCard = {
  id: string;
  heading: string;
  icon?: ContactImage;
  action?: ContactAction;
};

export type ContactPage = {
  documentId: string;
  slug: string;
  heading: string;
  description: string;
  cards: ContactCard[];
  socialMedia: ContactAction[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  seo?: ContentSeo;
};

export type ContactFormSubmission = {
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientContact: string;
  clientComments: string;
};

export type ContactSubmissionResult = {
  documentId: string;
  createdAt?: string;
  publishedAt?: string;
};

export type ContactContentSource = {
  getContactPage(slug: string): Promise<ContactPage | null>;
  createClientContact(data: ContactFormSubmission): Promise<ContactSubmissionResult>;
};

export type CareerAction = {
  label: string;
  href: string;
  external: boolean;
};

export type CareerImage = {
  src: string;
  alt: string;
};

export type CareerCard = {
  id: string;
  heading: string;
  icon?: CareerImage;
  action?: CareerAction;
};

export type CareerOpening = {
  documentId: string;
  roleName: string;
  roleDomain: string;
  roleLocation: string;
  roleDescription: string;
  action?: CareerAction;
  publishedAt?: string;
};

export type CareerPage = {
  documentId: string;
  slug: string;
  hero: {
    heading: string;
    description: string;
  };
  secondSection?: {
    id: string;
    heading: string;
    cards: CareerCard[];
  };
  thirdSection?: {
    id: string;
    heading: string;
    description: string;
    openings: CareerOpening[];
    pageInfo: {
      total: number;
      page: number;
      pageSize: number;
      pageCount: number;
    };
  };
  fourthSection?: {
    id: string;
    heading: string;
    icon?: CareerImage;
    action?: CareerAction;
    cards: CareerCard[];
    bottomHeading: string;
    bottomAction?: CareerAction;
  };
  seo?: ContentSeo;
};

export type CareerContentSource = {
  getCareerPage(slug: string): Promise<CareerPage | null>;
};

export type AuditSeo = ContentSeo;

export type AuditPage = {
  documentId: string;
  slug: string;
  title: string;
  hero: {
    eyebrow?: string;
    highlightedText?: string;
    description: string;
    tags: string[];
    actions: AuditAction[];
  };
  sections: AuditSection[];
  faq?: {
    eyebrow?: string;
    heading: string;
    description?: string;
    items: Array<{ question: string; answerHtml: string }>;
  };
  cta?: {
    eyebrow?: string;
    heading: string;
    body: readonly [string] | readonly [string, string];
    points: Array<{ label: string }>;
    actions: readonly [AuditAction] | readonly [AuditAction, AuditAction];
  };
  seo?: AuditSeo;
};

export type AuditContentSource = {
  getAuditPage(slug: string): Promise<AuditPage | null>;
};

export type ToolCard = {
  title: string;
  body: string;
  eyebrow?: string;
};

export type ToolLabelledItem = {
  title: string;
  body: string;
  href?: string;
  external?: boolean;
};

export type ToolContentColumn = {
  id: string;
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
  items: ToolLabelledItem[];
};

export type ToolBlock =
  | { id: string; type: 'rich-text'; html: string }
  | { id: string; type: 'card-grid'; columns: 1 | 2 | 3 | 4; cards: ToolCard[] }
  | { id: string; type: 'comparison-cards'; cards: ToolCard[] }
  | { id: string; type: 'table'; table: ContentTable }
  | {
      id: string;
      type: 'quote';
      quote: { quoteHtml: string; name: string; role: string; company: string };
    }
  | { id: string; type: 'callout'; html: string }
  | {
      id: string;
      type: 'labelled-list';
      displayStyle: string;
      items: ToolLabelledItem[];
    }
  | {
      id: string;
      type: 'two-column';
      left?: ToolContentColumn;
      right?: ToolContentColumn;
    }
  | {
      id: string;
      type: 'link-group';
      heading: string;
      description?: string;
      links: ToolLabelledItem[];
    }
  | {
      id: string;
      type: 'media';
      image?: { src: string; alt: string; width: number; height: number };
      caption: string;
      download?: { label: string; href: string };
    };

export type ToolSection = {
  id: string;
  heading?: {
    text: string;
    anchorId: string;
    navigationLabel?: string;
  };
  blocks: ToolBlock[];
};

export type ToolSeo = ContentSeo;

export type ToolPage = {
  documentId: string;
  slug: string;
  title: string;
  publishedAt?: string;
  hero: {
    eyebrow?: string;
    highlightedText?: string;
    description: string;
  };
  sections: ToolSection[];
  seo?: ToolSeo;
};

export type ToolContentSource = {
  getToolPage(slug: string): Promise<ToolPage | null>;
};

/**
 * How We Work uses the same ordered content-block vocabulary as an audit page in Strapi. Keeping
 * the page-facing model aligned lets both route families compose the same established patterns
 * while their CMS queries and cache identities remain independent.
 */
export type HowWeWorkAction = AuditAction;
export type HowWeWorkBlock = AuditBlock;
export type HowWeWorkContentColumn = AuditContentColumn;
export type HowWeWorkPage = AuditPage & {
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type HowWeWorkContentSource = {
  getHowWeWorkPage(slug: string): Promise<HowWeWorkPage | null>;
};

export type ServiceAction = {
  label: string;
  href: string;
  external: boolean;
};

export type ServiceCard = {
  title: string;
  body: string;
  href?: string;
};

export type ServiceLabelledItem = {
  title: string;
  body: string;
  href?: string;
};

export type ServiceContentColumn = {
  id: string;
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
  items: ServiceLabelledItem[];
  links: ServiceAction[];
};

export type ServiceBlock =
  | { id: string; type: 'rich-text'; html: string }
  | { id: string; type: 'card-grid'; columns: 1 | 2 | 3 | 4; cards: ServiceCard[] }
  | { id: string; type: 'comparison-cards'; cards: ServiceCard[] }
  | { id: string; type: 'table'; table: ContentTable }
  | {
      id: string;
      type: 'quote';
      quote: { quoteHtml: string; name: string; role: string; company: string };
      source?: ServiceAction;
    }
  | { id: string; type: 'callout'; html: string }
  | {
      id: string;
      type: 'labelled-list';
      displayStyle: string;
      items: ServiceLabelledItem[];
    }
  | {
      id: string;
      type: 'two-column';
      left?: ServiceContentColumn;
      right?: ServiceContentColumn;
    }
  | {
      id: string;
      type: 'link-group';
      heading: string;
      description?: string;
      links: ServiceLabelledItem[];
    }
  | {
      id: string;
      type: 'media';
      image?: { src: string; alt: string; width: number; height: number };
      caption: string;
      download?: ServiceAction;
    };

export type ServiceSection = {
  id: string;
  heading?: {
    text: string;
    anchorId: string;
    navigationLabel?: string;
  };
  /**
   * One sentence under the heading, before the blocks that argue it. Named for the type role it
   * takes — `--text-lead`, the same role and the same word `PageHero` and `CtaSection` use for
   * their own opening line.
   *
   * There is no `lead` field on ComponentServiceSectionHeading yet, so today this is LIFTED by
   * the Strapi mapper out of the italic first paragraph authors have been writing at the top of
   * a section's first rich-text block — which is what a missing field looks like from the
   * outside. The view model states the shape it wants regardless; when the CMS grows the field,
   * the mapper stops inferring and reads it, and nothing above here changes.
   */
  lead?: string;
  blocks: ServiceBlock[];
};

export type ServiceSeo = ContentSeo;

export type ServicePage = {
  documentId: string;
  slug: string;
  title: string;
  hero: {
    eyebrow?: string;
    highlightedText?: string;
    description: string;
    tags: string[];
    actions: ServiceAction[];
  };
  sections: ServiceSection[];
  faq?: {
    eyebrow?: string;
    heading: string;
    description?: string;
    items: Array<{ question: string; answerHtml: string }>;
  };
  capabilitiesCta?: {
    heading: string;
    body: readonly [string] | readonly [string, string];
    points: Array<{ label: string }>;
    actions: readonly [ServiceAction] | readonly [ServiceAction, ServiceAction];
  };
  cta?: {
    heading: string;
    descriptionHtml: string;
    disclaimerHtml: string;
  };
  seo?: ServiceSeo;
};

export type ServiceContentSource = {
  getServicePage(slug: string): Promise<ServicePage | null>;
};

export type ServicesMasterAction = {
  label: string;
  href: string;
  external: boolean;
};

export type ServicesMasterImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ServicesMasterCard = {
  id: string;
  title: string;
  description: string;
  pointsHtml: string;
  action?: ServicesMasterAction;
  icon?: ServicesMasterImage;
};

export type ServicesMasterSection = {
  id: string;
  heading: string;
  body: string[];
  serviceName?: string;
  action?: ServicesMasterAction;
  icon?: ServicesMasterImage;
  cards: ServicesMasterCard[];
};

export type ServicesMasterPage = {
  documentId: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  hero: {
    heading: string;
    body: readonly [string, ...string[]];
    labels: string[];
    actions: ServicesMasterAction[];
  };
  sections: ServicesMasterSection[];
  closingCta?: {
    heading: string;
    body: readonly [string] | readonly [string, string];
    points: Array<{ label: string }>;
    actions: ServicesMasterAction[];
  };
  seo?: ContentSeo;
};

export type ServicesMasterContentSource = {
  getServicesMasterPage(slug: string): Promise<ServicesMasterPage | null>;
};

export type FutureInterfacesLabAction = {
  label: string;
  href: string;
  external: boolean;
  description?: string;
  icon?: FutureInterfacesLabImage;
};

export type FutureInterfacesLabImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type FutureInterfacesLabCard = {
  id: string;
  title: string;
  body: string;
  showIcon: boolean;
  icon?: FutureInterfacesLabImage;
  image?: FutureInterfacesLabImage;
  tiles: Array<{ id: string; title: string; body: string }>;
  pointsHtml: string;
  details: Array<{ id: string; heading: string; bodyHtml: string }>;
  action?: FutureInterfacesLabAction;
};

export type FutureInterfacesLabSection = {
  id: string;
  heading: string;
  cards: FutureInterfacesLabCard[];
};

export type FutureInterfacesLabPage = {
  documentId: string;
  slug: string;
  hero: {
    heading: string;
    body: readonly [string, ...string[]];
    actions: FutureInterfacesLabAction[];
  };
  sections: FutureInterfacesLabSection[];
  misc?: {
    id: string;
    eyebrow: string;
    heading: string;
    body: readonly [string];
    action?: FutureInterfacesLabAction;
  };
  interfaceLabs?: {
    id: string;
    cards: Array<{
      id: string;
      title: string;
      icon?: FutureInterfacesLabImage;
      action?: FutureInterfacesLabAction;
    }>;
  };
  seo?: ContentSeo;
};

export type FutureInterfacesLabContentSource = {
  getFutureInterfacesLabPage(slug: string): Promise<FutureInterfacesLabPage | null>;
};

export type FutureInterfacesLabJoinAction = {
  label: string;
  href: string;
  external: boolean;
  description?: string;
};

export type FutureInterfacesLabJoinImage = {
  src: string;
  alt: string;
};

export type FutureInterfacesLabJoinCard = {
  id: string;
  title: string;
  body: string;
  icon?: FutureInterfacesLabJoinImage;
  action?: FutureInterfacesLabJoinAction;
};

export type FutureInterfacesLabJoinCardSection = {
  id: string;
  heading: string;
  description?: string;
  icon?: FutureInterfacesLabJoinImage;
  cards: FutureInterfacesLabJoinCard[];
};

export type FutureInterfacesLabJoinPage = {
  documentId: string;
  slug: string;
  hero: {
    id: string;
    eyebrow?: string;
    heading: string;
    body: readonly [string, ...string[]];
    actions: FutureInterfacesLabJoinAction[];
  };
  secondSection?: FutureInterfacesLabJoinCardSection;
  thirdSection?: FutureInterfacesLabJoinCardSection;
  fourthSection?: {
    id: string;
    body: string[];
    content?: FutureInterfacesLabJoinCardSection;
  };
  fifthSection?: FutureInterfacesLabJoinCardSection;
  sixthSection?: {
    id: string;
    heading: string;
    description?: string;
    leftCard?: {
      id: string;
      heading: string;
      description: string;
      bottomText?: string;
    };
    rightCards: Array<{ id: string; heading: string; description: string }>;
  };
  seventhSection?: {
    id: string;
    heading: string;
    description?: string;
    faqs: Array<{
      id: string;
      question: string;
      answerHtml: string;
      slug?: string;
    }>;
  };
  eighthSection?: {
    id: string;
    heading: string;
    description?: string;
    icon?: FutureInterfacesLabJoinImage;
  };
  updatedAt?: string;
  publishedAt?: string;
  seo?: ContentSeo;
};

export type FutureInterfacesLabJoinContentSource = {
  getFutureInterfacesLabJoinPage(slug: string): Promise<FutureInterfacesLabJoinPage | null>;
};

export type ExpertiseAction = {
  label: string;
  href: string;
  external: boolean;
};

export type ExpertiseCard = {
  title: string;
  body: string;
  eyebrow?: string;
  href?: string;
  ctaLabel?: string;
};

export type ExpertiseLabelledItem = {
  title: string;
  body: string;
  href?: string;
};

export type ExpertiseContentColumn = {
  id: string;
  eyebrow?: string;
  heading: string;
  bodyHtml: string;
  items: ExpertiseLabelledItem[];
  links: ExpertiseAction[];
};

export type ExpertiseBlock =
  | { id: string; type: 'rich-text'; html: string }
  | { id: string; type: 'card-grid'; columns: 1 | 2 | 3 | 4; cards: ExpertiseCard[] }
  | { id: string; type: 'comparison-cards'; cards: ExpertiseCard[] }
  | { id: string; type: 'table'; table: ContentTable }
  | {
      id: string;
      type: 'quote';
      quote: { quoteHtml: string; name: string; role: string; company: string };
      source?: ExpertiseAction;
    }
  | { id: string; type: 'callout'; html: string }
  | {
      id: string;
      type: 'labelled-list';
      displayStyle: string;
      items: ExpertiseLabelledItem[];
    }
  | {
      id: string;
      type: 'two-column';
      left?: ExpertiseContentColumn;
      right?: ExpertiseContentColumn;
    }
  | {
      id: string;
      type: 'link-group';
      heading?: string;
      description?: string;
      links: ExpertiseLabelledItem[];
    }
  | {
      id: string;
      type: 'media';
      image?: { src: string; alt: string; width: number; height: number };
      caption: string;
      download?: ExpertiseAction;
    };

export type ExpertiseSection = {
  id: string;
  heading?: {
    text: string;
    anchorId: string;
    navigationLabel?: string;
  };
  blocks: ExpertiseBlock[];
};

export type ExpertiseSeo = ContentSeo;

export type ExpertisePage = {
  documentId: string;
  slug: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  hero: {
    eyebrow?: string;
    highlightedText?: string;
    description: string;
    tags: string[];
    actions: ExpertiseAction[];
  };
  sections: ExpertiseSection[];
  faq?: {
    eyebrow?: string;
    heading: string;
    description?: string;
    items: Array<{ question: string; answerHtml: string }>;
  };
  capabilitiesCta?: {
    heading: string;
    body: readonly [string] | readonly [string, string];
    points: Array<{ label: string }>;
    actions: readonly [ExpertiseAction] | readonly [ExpertiseAction, ExpertiseAction];
  };
  cta?: {
    heading: string;
    descriptionHtml: string;
    disclaimerHtml: string;
  };
  seo?: ExpertiseSeo;
};

export type ExpertiseContentSource = {
  getExpertisePage(slug: string): Promise<ExpertisePage | null>;
};

export type GlossaryAction = AuditAction;

export type GlossaryCard = AuditCard & {
  eyebrow?: string;
};

export type GlossaryLabelledItem = AuditLabelledItem;

export type GlossaryContentColumn = AuditContentColumn;

export type GlossaryBlock =
  | { id: string; type: 'rich-text'; html: string }
  | { id: string; type: 'card-grid'; columns: 1 | 2 | 3 | 4; cards: GlossaryCard[] }
  | { id: string; type: 'comparison-cards'; cards: GlossaryCard[] }
  | { id: string; type: 'table'; table: ContentTable }
  | {
      id: string;
      type: 'quote';
      quote: { quoteHtml: string; name: string; role: string; company: string };
      source?: GlossaryAction;
    }
  | { id: string; type: 'callout'; html: string; tone?: string }
  | {
      id: string;
      type: 'labelled-list';
      displayStyle: string;
      items: GlossaryLabelledItem[];
    }
  | {
      id: string;
      type: 'two-column';
      left?: GlossaryContentColumn;
      right?: GlossaryContentColumn;
    }
  | {
      id: string;
      type: 'link-group';
      heading: string;
      description?: string;
      links: GlossaryLabelledItem[];
    }
  | {
      id: string;
      type: 'media';
      image?: { src: string; alt: string; width: number; height: number };
      caption: string;
      href?: string;
      mime?: string;
    };

export type GlossarySection = {
  id: string;
  heading?: {
    text: string;
    anchorId: string;
    navigationLabel?: string;
  };
  blocks: GlossaryBlock[];
};

export type GlossarySeo = ContentSeo;

export type GlossaryPage = {
  documentId: string;
  slug: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  hero: {
    eyebrow?: string;
    highlightedText?: string;
    description: string;
    tags: string[];
    actions: GlossaryAction[];
  };
  sections: GlossarySection[];
  faq?: {
    eyebrow?: string;
    heading: string;
    description?: string;
    items: Array<{ question: string; answerHtml: string }>;
  };
  cta?: {
    eyebrow?: string;
    heading: string;
    body: readonly [string] | readonly [string, string];
    points: Array<{ label: string }>;
    actions: readonly [GlossaryAction] | readonly [GlossaryAction, GlossaryAction];
  };
  seo?: GlossarySeo;
};

export type GlossaryContentSource = {
  getGlossaryPage(slug: string): Promise<GlossaryPage | null>;
};

export type CaseStudyAction = {
  label: string;
  href: string;
  external: boolean;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mime: string;
};

export type CaseStudyBlock =
  | { id: string; type: 'prose'; html: string }
  | {
      id: string;
      type: 'figures';
      figures: Array<{ image: CaseStudyImage; caption: string }>;
    }
  | {
      id: string;
      type: 'video';
      title?: string;
      description?: string;
      video?: {
        src: string;
        mime: string;
        poster?: string;
        width?: number;
        height?: number;
        autoplay: boolean;
        loop: boolean;
      };
      thumbnail?: CaseStudyImage;
    }
  | {
      id: string;
      type: 'embed';
      title: string;
      description?: string;
      url?: string;
      width?: number;
      height?: number;
      thumbnail?: CaseStudyImage;
    }
  | { id: string; type: 'code'; html: string }
  | { id: string; type: 'separator'; html: string }
  | {
      id: string;
      type: 'quote';
      quote: { quoteHtml: string; name: string; role: string; company: string };
    }
  | { id: string; type: 'link'; action: CaseStudyAction; description?: string };

export type CaseStudyPage = {
  documentId: string;
  slug: string;
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  heroImage?: CaseStudyImage;
  socialImage?: CaseStudyImage;
  profile: Array<{ id: string; label: string; value: string }>;
  statements: Array<{ id: string; title: string; body: string }>;
  categories: string[];
  tags: string[];
  blocks: CaseStudyBlock[];
  /** The level-2 outline of `blocks`, in reading order. Empty when the body has none. */
  outline: PageOutlineEntry[];
  cta?: {
    heading: string;
    body: readonly [string];
    actions: readonly [CaseStudyAction];
  };
  seo?: ContentSeo;
};

export type CaseStudyContentSource = {
  getCaseStudyPage(slug: string): Promise<CaseStudyPage | null>;
  getCaseStudyListingPage(slug: string): Promise<CaseStudyListingPage | null>;
};

export type InsightAction = {
  label: string;
  href: string;
  external: boolean;
};

export type InsightImage = {
  src: string;
  alt: string;
};

export type InsightFormatCard = {
  id: string;
  title: string;
  image?: InsightImage;
};

export type InsightFilterOption = {
  id: string;
  name: string;
  kind: 'category' | 'tag';
};

export type InsightFilterGroup = {
  id: string;
  label: string;
  options: InsightFilterOption[];
};

export type InsightTaxonomy = {
  documentId: string;
  name: string;
  slug?: string;
};

export type InsightResourceKind = 'article' | 'event' | 'interview' | 'podcast';

export type InsightResource = {
  documentId: string;
  kind: InsightResourceKind;
  title: string;
  slug: string;
  description: string;
  image?: InsightImage;
  tags: InsightTaxonomy[];
  categories: InsightTaxonomy[];
  filterIds: string[];
  publishedAt?: string;
};

export type InsightsPage = {
  documentId: string;
  slug: string;
  hero: {
    heading: string;
    description: string;
  };
  formatCards: InsightFormatCard[];
  lab?: {
    id: string;
    heading: string;
    description: string;
    action?: InsightAction;
  };
  resources: {
    id: string;
    heading: string;
    filters: InsightFilterGroup[];
    items: InsightResource[];
  };
  closing?: {
    id: string;
    heading: string;
    description: string;
  };
  seo?: ContentSeo;
};

export type InsightsContentSource = {
  getInsightsPage(slug: string): Promise<InsightsPage | null>;
};

export type CaseStudyListingImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type CaseStudyListingItem = {
  documentId: string;
  title: string;
  slug: string;
  description: string;
  thumbnail?: CaseStudyListingImage;
  tags: Array<{ documentId: string; name: string }>;
  categories: Array<{ documentId: string; name: string; slug: string }>;
  publishedAt?: string;
};

export type CaseStudyListingPage = {
  documentId: string;
  slug: string;
  hero: {
    heading: string;
    description: string;
    action?: CaseStudyAction;
  };
  items: CaseStudyListingItem[];
  pageInfo: {
    total: number;
    page: number;
    pageSize: number;
    pageCount: number;
  };
  misc?: {
    id: string;
    label: string;
    heading: string;
    description: string;
    action?: CaseStudyAction;
  };
  seo?: ContentSeo;
};

export type PodcastAction = CaseStudyAction;

export type PodcastImage = CaseStudyImage;

export type PodcastBlock =
  | { id: string; type: 'prose'; html: string }
  | {
      id: string;
      type: 'figures';
      figures: Array<{ image: PodcastImage; caption: string }>;
    }
  | {
      id: string;
      type: 'video';
      title?: string;
      description?: string;
      video?: {
        src: string;
        mime: string;
        poster?: string;
        width?: number;
        height?: number;
        autoplay: boolean;
        loop: boolean;
      };
      thumbnail?: PodcastImage;
    }
  | {
      id: string;
      type: 'shadow-card';
      heading?: string;
      descriptionHtml?: string;
      youtubeId?: string;
      mediaUrl?: string;
      action?: PodcastAction;
      emphasized: boolean;
    }
  | { id: string; type: 'callout'; html: string }
  | { id: string; type: 'separator'; html: string };

export type PodcastResource = {
  documentId: string;
  slug: string;
  title: string;
  publishedAt?: string;
  image?: PodcastImage;
};

export type PodcastPage = {
  documentId: string;
  slug: string;
  title: string;
  description: string;
  createdAt?: string;
  publishedAt?: string;
  heroVideo?: { id: string; title: string };
  socialImage?: PodcastImage;
  tags: string[];
  categories: string[];
  blocks: PodcastBlock[];
  /** The level-2 outline of `blocks`, in reading order. Empty when the body has none. */
  outline: PageOutlineEntry[];
  resources: PodcastResource[];
  seo?: ContentSeo;
};

export type PodcastContentSource = {
  getPodcastPage(slug: string): Promise<PodcastPage | null>;
};

export type EventAction = PodcastAction;

export type EventImage = PodcastImage;

export type EventBlock = PodcastBlock;

export type EventResource = PodcastResource;

export type EventDetail = {
  id: string;
  location?: string;
  date?: string;
};

export type EventPage = {
  documentId: string;
  slug: string;
  title: string;
  description: string;
  createdAt?: string;
  publishedAt?: string;
  featureImage?: EventImage;
  socialImage?: EventImage;
  details: EventDetail[];
  tags: string[];
  categories: string[];
  blocks: EventBlock[];
  /** The level-2 outline of `blocks`, in reading order. Empty when the body has none. */
  outline: PageOutlineEntry[];
  resources: EventResource[];
  seo?: ContentSeo;
};

export type EventContentSource = {
  getEventPage(slug: string): Promise<EventPage | null>;
};

/**
 * One entry in a long-form page's outline, in reading order.
 *
 * The seam derives these from the level-2 headings inside a body's markdown; a page hands them to
 * `TableOfContents` as `{ label, href: '#' + anchorId }`. `anchorId` is opaque and stable — see
 * docs/guides/long-form-outline.md.
 *
 * A page with fewer than two of these renders no outline. That floor lives in the component and in
 * the route, not here: this type only says what an entry IS.
 */
export type PageOutlineEntry = { label: string; anchorId: string };

export type BlogAction = CaseStudyAction;

export type BlogImage = CaseStudyImage;

export type BlogAuthor = {
  id: string;
  name: string;
  designation?: string;
  image?: BlogImage;
};

export type BlogBlock =
  | { id: string; type: 'prose'; html: string }
  | { id: string; type: 'callout'; html: string }
  | { id: string; type: 'separator'; html: string }
  | { id: string; type: 'code'; html: string }
  | {
      id: string;
      type: 'figures';
      figures: Array<{ image: BlogImage; caption: string }>;
    }
  | {
      id: string;
      type: 'video';
      title?: string;
      description?: string;
      youtubeId?: string;
      video?: {
        src: string;
        mime: string;
        poster?: string;
        width?: number;
        height?: number;
        autoplay: boolean;
        loop: boolean;
      };
      thumbnail?: BlogImage;
    }
  | {
      id: string;
      type: 'embed';
      title: string;
      description?: string;
      url?: string;
      width?: number;
      height?: number;
      thumbnail?: BlogImage;
    };

export type BlogResource = {
  documentId: string;
  slug: string;
  title: string;
  publishedAt?: string;
  image?: BlogImage;
  tags: string[];
  categories: string[];
};

export type BlogPage = {
  documentId: string;
  slug: string;
  title: string;
  description: string;
  createdAt?: string;
  publishedAt?: string;
  publishedContent?: string;
  updatedAt?: string;
  heroVideo?: { id: string; title: string };
  featureImage?: BlogImage;
  socialImage?: BlogImage;
  authors: BlogAuthor[];
  tags: string[];
  categories: string[];
  blocks: BlogBlock[];
  /** The level-2 outline of `blocks`, in reading order. Empty when the body has none. */
  outline: PageOutlineEntry[];
  resources: BlogResource[];
  cta?: {
    heading: string;
    body: readonly [string];
    actions: readonly [BlogAction];
  };
  seo?: ContentSeo;
};

export type BlogContentSource = {
  getBlogPage(slug: string): Promise<BlogPage | null>;
};

export type PrivacyPolicySection = {
  id: string;
  heading: string;
  bodyHtml: string;
};

export type PrivacyPolicyPage = {
  documentId: string;
  slug: string;
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  sections: PrivacyPolicySection[];
  seo?: ContentSeo;
};

export type PrivacyPolicyContentSource = {
  getPrivacyPolicyPage(slug: string): Promise<PrivacyPolicyPage | null>;
};

export type TermsOfUseSection = {
  id: string;
  heading: string;
  bodyHtml: string;
};

export type TermsOfUsePage = {
  documentId: string;
  slug: string;
  title: string;
  description: string;
  publishedAt?: string;
  updatedAt?: string;
  sections: TermsOfUseSection[];
  seo?: ContentSeo;
};

export type TermsOfUseContentSource = {
  getTermsOfUsePage(slug: string): Promise<TermsOfUsePage | null>;
};

export type MatterDesignSystemAction = {
  label: string;
  href: string;
  external: boolean;
  description?: string;
};

export type MatterDesignSystemImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type MatterDesignSystemCard = {
  id: string;
  title: string;
  body: string;
  icon?: MatterDesignSystemImage;
  image?: MatterDesignSystemImage;
  action?: MatterDesignSystemAction;
};

export type MatterDesignSystemSection = {
  id: string;
  heading: string;
  icon?: MatterDesignSystemImage;
  cards: MatterDesignSystemCard[];
};

export type MatterDesignSystemDisplayCard = {
  id: string;
  heading: string;
  description: string;
  icon?: MatterDesignSystemImage;
  images: MatterDesignSystemImage[];
};

export type MatterDesignSystemStrip = {
  id: string;
  heading: string;
  description: string;
  backgroundImage?: MatterDesignSystemImage;
  action?: MatterDesignSystemAction;
};

export type MatterDesignSystemPage = {
  documentId: string;
  slug: string;
  hero: {
    id: string;
    eyebrow: string;
    headingOne: string;
    headingTwo: string;
    description: string;
    action?: MatterDesignSystemAction;
    image?: MatterDesignSystemImage & { width: number; height: number };
  };
  secondSection?: MatterDesignSystemSection;
  thirdSection?: MatterDesignSystemSection;
  stripOne?: MatterDesignSystemStrip;
  fourthSection?: {
    id: string;
    heading: string;
    icon?: MatterDesignSystemImage;
    cards: MatterDesignSystemDisplayCard[];
  };
  fifthSection?: MatterDesignSystemSection;
  stripTwo?: MatterDesignSystemStrip;
  contactUs?: {
    id: string;
    headingOne: string;
    headingTwo: string;
    description: string;
    icon?: MatterDesignSystemImage;
  };
  updatedAt?: string;
  publishedAt?: string;
  seo?: ContentSeo;
};

export type MatterDesignSystemContentSource = {
  getMatterDesignSystemPage(slug: string): Promise<MatterDesignSystemPage | null>;
};

/**
 * The site chrome — the header's and footer's information architecture.
 *
 * Content, not configuration, and the distinction matters. Every label, promise, rail compartment
 * and footer group is an editorial decision, so it belongs behind the seam and arrives at the two
 * patterns as props. Put it in @/lib instead and it becomes code, which means a copy change is a
 * deploy rather than an edit — and lib is a leaf, so it could not even reference the pattern shapes
 * it has to satisfy.
 *
 * The two shapes come FROM the patterns, which is the direction this seam runs: a view model is
 * defined by what a component needs in order to render, not by what a source happens to store. When
 * this moves to a CMS collection, sources/strapi.ts maps that response into these and nothing above
 * it learns that Strapi exists.
 */
export type Navigation = {
  nav: SiteNavProps;
  footer: SiteFooterProps;
};

/**
 * The contract every source implements. Adding Strapi later means writing one more object
 * that satisfies this — no page changes, no pattern changes.
 */
export type ContentSource = {
  getPage(slug: string): Promise<Page | null>;
  listPages(): Promise<Pick<Page, 'slug' | 'title'>[]>;
  /**
   * The header and footer IA. One call rather than two, because the root layout needs both on
   * every render and a source that fetches them will want one request.
   */
  getNavigation(): Promise<Navigation>;
};
