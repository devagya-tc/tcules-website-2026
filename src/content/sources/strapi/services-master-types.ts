export type StrapiServicesMasterFile = {
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

export type StrapiServicesMasterLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
  icon?: StrapiServicesMasterFile | null;
};

export type StrapiServicesMasterHero = {
  __typename?: 'ComponentServiceHeroSection' | string | null;
  id?: string | null;
  capabilitiesHeroHeading?: string | null;
  capabilitiesHeroDescription?: string | null;
  capabilitiesHeroDescriptionTwo?: string | null;
  label?: Array<{ id?: string | null; listText?: string | null }> | null;
  heroSectionButton?: StrapiServicesMasterLink[] | null;
};

export type StrapiServicesMasterCard = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  link?: StrapiServicesMasterLink | null;
  icon?: StrapiServicesMasterFile | null;
  cardPoints?: Array<{ id?: string | null; listText?: string | null }> | null;
};

export type StrapiServicesMasterCardSection = {
  __typename?: 'ComponentCapablitiesCapablitiesCardSection' | string | null;
  id?: string | null;
  cardSectionHeading?: string | null;
  cardSectionDescription?: string | null;
  serviceName?: string | null;
  icon?: StrapiServicesMasterFile | null;
  subRouteLink?: StrapiServicesMasterLink | null;
  sectionCards?: StrapiServicesMasterCard[] | null;
};

export type StrapiServicesMasterBlock =
  StrapiServicesMasterHero | StrapiServicesMasterCardSection;

export type StrapiServicesMasterSeo = {
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

export type StrapiServicesMaster = {
  documentId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  capablitiesSingleType?: StrapiServicesMasterBlock[] | null;
  seo?: StrapiServicesMasterSeo | null;
};

export type StrapiServicesMasterResponse = {
  data?: { newCapabilities?: StrapiServicesMaster | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
