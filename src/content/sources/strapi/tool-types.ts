export type StrapiToolLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
};

export type StrapiToolLabelledItem = {
  label?: string | null;
  title?: string | null;
  body?: unknown;
};

export type StrapiToolContentColumn = {
  eyebrow?: string | null;
  heading?: string | null;
  body?: unknown;
  labelledItems?: StrapiToolLabelledItem[] | null;
};

export type StrapiToolBlock = {
  __typename?: string | null;
  id?: string | null;
  sectionHeading?: string | null;
  anchorId?: string | null;
  navigationLabel?: string | null;
  body?: unknown;
  cardGridColumns?: string | null;
  cardGridCards?: Array<{
    eyebrow?: string | null;
    title?: string | null;
    body?: unknown;
    labelledItems?: StrapiToolLabelledItem[] | null;
  }> | null;
  comparisonCards?: Array<{
    title?: string | null;
    summary?: unknown;
    badge?: string | null;
    isRecommended?: boolean | null;
    details?: StrapiToolLabelledItem[] | null;
  }> | null;
  caption?: string | null;
  summary?: string | null;
  tableColumns?: Array<{ heading?: string | null }> | null;
  tableRows?: Array<{
    rowHeading?: string | null;
    cells?: Array<{ content?: unknown }> | null;
  }> | null;
  quote?: string | null;
  attribution?: string | null;
  role?: string | null;
  label?: string | null;
  calloutHeading?: string | null;
  tone?: string | null;
  displayStyle?: string | null;
  items?: StrapiToolLabelledItem[] | null;
  left?: StrapiToolContentColumn | null;
  right?: StrapiToolContentColumn | null;
  linkGroupHeading?: string | null;
  description?: string | null;
  groupLinks?: StrapiToolLink[] | null;
  file?: {
    documentId?: string | null;
    name?: string | null;
    alternativeText?: string | null;
    caption?: string | null;
    width?: number | null;
    height?: number | null;
    url?: string | null;
    mime?: string | null;
  } | null;
};

export type StrapiTool = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  publishedAt?: string | null;
  hero?: {
    eyebrow?: string | null;
    highlightedText?: string | null;
    description?: string | null;
  } | null;
  content?: StrapiToolBlock[] | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    canonicalURL?: string | null;
    structuredData?: unknown;
    codeJson?: unknown;
    graphCode?: unknown;
    robot?: string | null;
  } | null;
};

export type StrapiToolResponse = {
  data?: { tools?: StrapiTool[] | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
