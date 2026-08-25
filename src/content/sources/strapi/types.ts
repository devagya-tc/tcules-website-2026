export type StrapiLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
};

export type StrapiLabelledItem = {
  id?: string | null;
  label?: string | null;
  title?: string | null;
  body?: unknown;
  link?: StrapiLink | null;
};

export type StrapiContentColumn = {
  id?: string | null;
  eyebrow?: string | null;
  heading?: string | null;
  body?: unknown;
  labelledItems?: StrapiLabelledItem[] | null;
  links?: StrapiLink[] | null;
};

export type StrapiFile = {
  documentId?: string | null;
  name?: string | null;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number | null;
  height?: number | null;
  formats?: unknown;
  url?: string | null;
  mime?: string | null;
  size?: number | null;
};

export type StrapiAuditBlock = {
  __typename?: string | null;
  id?: string | null;
  sectionHeading?: string | null;
  anchorId?: string | null;
  navigationLabel?: string | null;
  body?: unknown;
  cardGridColumns?: string | null;
  cardGridCards?: Array<{
    id?: string | null;
    eyebrow?: string | null;
    title?: string | null;
    body?: unknown;
    labelledItems?: StrapiLabelledItem[] | null;
    link?: StrapiLink | null;
  }> | null;
  comparisonCards?: Array<{
    id?: string | null;
    title?: string | null;
    summary?: unknown;
    badge?: string | null;
    isRecommended?: boolean | null;
    details?: StrapiLabelledItem[] | null;
  }> | null;
  caption?: string | null;
  summary?: string | null;
  tableColumns?: Array<{ id?: string | null; heading?: string | null }> | null;
  tableRows?: Array<{
    id?: string | null;
    rowHeading?: string | null;
    cells?: Array<{ id?: string | null; content?: unknown }> | null;
  }> | null;
  quote?: string | null;
  attribution?: string | null;
  role?: string | null;
  sourceLink?: StrapiLink | null;
  label?: string | null;
  calloutHeading?: string | null;
  tone?: string | null;
  displayStyle?: string | null;
  items?: StrapiLabelledItem[] | null;
  left?: StrapiContentColumn | null;
  right?: StrapiContentColumn | null;
  linkGroupHeading?: string | null;
  description?: string | null;
  links?: StrapiLink[] | null;
  file?: StrapiFile | null;
};

export type StrapiAudit = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  hero?: {
    id?: string | null;
    eyebrow?: string | null;
    highlightedText?: string | null;
    description?: string | null;
    tags?: Array<{ id?: string | null; listText?: string | null }> | null;
    actions?: StrapiLink[] | null;
  } | null;
  content?: StrapiAuditBlock[] | null;
  faqSection?: {
    id?: string | null;
    eyebrow?: string | null;
    heading?: string | null;
    description?: string | null;
    faqs?: Array<{
      documentId?: string | null;
      question?: string | null;
      answer?: unknown;
      slug?: string | null;
      isActive?: boolean | null;
    }> | null;
  } | null;
  capabilitiesCta?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
    descriptionTwo?: string | null;
    label?: Array<{ id?: string | null; listText?: string | null }> | null;
    heroSectionButton?: StrapiLink[] | null;
  } | null;
  seo?: {
    id?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    slug?: string | null;
    canonicalURL?: string | null;
    structuredData?: unknown;
    codeJson?: unknown;
    focusString?: string | null;
    graphCode?: unknown;
    robot?: string | null;
  } | null;
};

export type StrapiAuditResponse = {
  data?: { auditPage?: StrapiAudit[] | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
