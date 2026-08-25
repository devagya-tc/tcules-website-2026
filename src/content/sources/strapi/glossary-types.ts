import type { StrapiContentColumn, StrapiFile, StrapiLabelledItem, StrapiLink } from './types';

export type StrapiGlossaryBlock = {
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
    labelledItems?: StrapiLabelledItem[] | null;
    link?: StrapiLink | null;
  }> | null;
  comparisonItems?: Array<{
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
  calloutBody?: unknown;
  tone?: string | null;
  displayStyle?: string | null;
  items?: StrapiLabelledItem[] | null;
  left?: StrapiContentColumn | null;
  right?: StrapiContentColumn | null;
  linkGroupHeading?: string | null;
  description?: string | null;
  groupLinks?: StrapiLink[] | null;
  file?: StrapiFile | null;
};

export type StrapiGlossary = {
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
  content?: StrapiGlossaryBlock[] | null;
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

export type StrapiGlossaryResponse = {
  data?: { glossaryPage?: StrapiGlossary[] | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
