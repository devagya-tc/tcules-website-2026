export type StrapiExpertiseFile = {
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

export type StrapiExpertiseLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
  icon?: StrapiExpertiseFile | null;
};

export type StrapiExpertiseLabelledItem = {
  id?: string | null;
  label?: string | null;
  title?: string | null;
  body?: unknown;
  link?: StrapiExpertiseLink | null;
};

export type StrapiExpertiseContentColumn = {
  id?: string | null;
  eyebrow?: string | null;
  heading?: string | null;
  body?: unknown;
  labelledItems?: StrapiExpertiseLabelledItem[] | null;
  links?: StrapiExpertiseLink[] | null;
};

export type StrapiExpertiseBlock = {
  __typename?: string | null;
  id?: string | null;
  sectionHeading?: string | null;
  anchorId?: string | null;
  navigationLabel?: string | null;
  richTextBody?: unknown;
  gridColumns?: string | null;
  gridCards?: Array<{
    id?: string | null;
    eyebrow?: string | null;
    title?: string | null;
    body?: unknown;
    labelledItems?: StrapiExpertiseLabelledItem[] | null;
    link?: StrapiExpertiseLink | null;
  }> | null;
  comparisonItems?: Array<{
    id?: string | null;
    title?: string | null;
    summary?: unknown;
    badge?: string | null;
    isRecommended?: boolean | null;
    details?: StrapiExpertiseLabelledItem[] | null;
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
  sourceLink?: StrapiExpertiseLink | null;
  label?: string | null;
  calloutHeading?: string | null;
  calloutBody?: unknown;
  tone?: string | null;
  displayStyle?: string | null;
  items?: StrapiExpertiseLabelledItem[] | null;
  left?: StrapiExpertiseContentColumn | null;
  right?: StrapiExpertiseContentColumn | null;
  linkGroupHeading?: string | null;
  description?: string | null;
  groupLinks?: StrapiExpertiseLink[] | null;
  file?: StrapiExpertiseFile | null;
};

export type StrapiExpertiseSeo = {
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
};

export type StrapiExpertise = {
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
    actions?: StrapiExpertiseLink[] | null;
  } | null;
  content?: StrapiExpertiseBlock[] | null;
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
    heroSectionButton?: StrapiExpertiseLink[] | null;
  } | null;
  cta?: {
    heading?: string | null;
    description?: string | null;
    disclaimer?: string | null;
  } | null;
  seo?: StrapiExpertiseSeo | null;
};

export type StrapiExpertiseResponse = {
  data?: { expertisePage?: StrapiExpertise[] | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
