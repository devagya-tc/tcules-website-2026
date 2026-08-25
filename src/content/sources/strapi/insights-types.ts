export type StrapiInsightsImage = {
  documentId?: string | null;
  url?: string | null;
  alternativeText?: string | null;
};

export type StrapiInsightsLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  isExternal?: boolean | null;
};

export type StrapiInsightsTaxonomy = {
  documentId?: string | null;
  name?: string | null;
  slug?: string | null;
};

export type StrapiInsightsSeo = {
  id?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  canonicalURL?: string | null;
  robot?: string | null;
};

export type StrapiInsightsResource = {
  __typename?: string | null;
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  description?: string | null;
  thumbnail?: StrapiInsightsImage | null;
  tags?: StrapiInsightsTaxonomy[] | null;
  categories?: StrapiInsightsTaxonomy[] | null;
  mainSection?: Array<{
    __typename?: string | null;
    id?: string | null;
    title?: string | null;
  }> | null;
  eventWhereAbout?: Array<{
    id?: string | null;
    descOne?: string | null;
    descTwo?: string | null;
  }> | null;
  publishedAt?: string | null;
};

export type StrapiInsightsPage = {
  documentId?: string | null;
  heading?: string | null;
  description?: string | null;
  cardDetails?: Array<{
    id?: string | null;
    heading?: string | null;
    cardImage?: StrapiInsightsImage | null;
  }> | null;
  secondSection?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
    link?: StrapiInsightsLink | null;
  } | null;
  thirdSection?: {
    id?: string | null;
    heading?: string | null;
    filterResource?: Array<{
      id?: string | null;
      label?: string | null;
      tags?: StrapiInsightsTaxonomy[] | null;
      categories?: StrapiInsightsTaxonomy[] | null;
    }> | null;
  } | null;
  fourthSection?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
  } | null;
  seo?: StrapiInsightsSeo | null;
};

export type StrapiInsightsResponse = {
  data?: {
    resource?: StrapiInsightsPage | null;
    blogResources?: StrapiInsightsResource[] | null;
    eventResources?: StrapiInsightsResource[] | null;
    interviewResources?: StrapiInsightsResource[] | null;
    podcastResources?: StrapiInsightsResource[] | null;
  } | null;
  errors?: Array<{ message?: string | null }> | null;
};
