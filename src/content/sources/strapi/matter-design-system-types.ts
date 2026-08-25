import type { StrapiFile, StrapiLink } from './types';

export type StrapiMatterDesignSystemCard = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  icon?: StrapiFile | null;
  cardImage?: StrapiFile | null;
  link?: StrapiLink | StrapiLink[] | null;
};

export type StrapiMatterDesignSystemSection = {
  id?: string | null;
  heading?: string | null;
  icon?: StrapiFile | null;
  cardDetails?: StrapiMatterDesignSystemCard[] | null;
  cards?: StrapiMatterDesignSystemCard[] | null;
};

export type StrapiMatterDesignSystemStrip = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  bgIcon?: StrapiFile | null;
  link?: StrapiLink | null;
};

export type StrapiMatterDesignSystemSeo = {
  id?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  canonicalURL?: string | null;
  robot?: string | null;
  structuredData?: unknown;
  codeJson?: unknown;
  focusString?: string | null;
  graphCode?: unknown;
};

export type StrapiMatterDesignSystem = {
  documentId?: string | null;
  heroSection?: {
    id?: string | null;
    label?: string | null;
    headingOne?: string | null;
    headingTwo?: string | null;
    description?: string | null;
    link?: StrapiLink | null;
    featureImage?: StrapiFile | null;
  } | null;
  secondSection?: StrapiMatterDesignSystemSection | null;
  thirdSection?: StrapiMatterDesignSystemSection | null;
  stripOne?: StrapiMatterDesignSystemStrip | null;
  fourthSection?: {
    id?: string | null;
    displayCards?: Array<{
      id?: string | null;
      heading?: string | null;
      d?: string | null;
      icon?: StrapiFile | null;
      images?: StrapiFile[] | null;
    }> | null;
  } | null;
  fifthSection?: StrapiMatterDesignSystemSection | null;
  stripTwo?: StrapiMatterDesignSystemStrip | null;
  contactUs?: {
    id?: string | null;
    headingOne?: string | null;
    headingTwo?: string | null;
    description?: string | null;
    icon?: StrapiFile | null;
  } | null;
  seo?: StrapiMatterDesignSystemSeo | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

export type StrapiMatterDesignSystemResponse = {
  data?: { matterDesignSystem?: StrapiMatterDesignSystem | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
