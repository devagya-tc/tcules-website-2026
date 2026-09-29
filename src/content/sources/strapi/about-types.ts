export type StrapiAboutFile = {
  documentId?: string | null;
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  /** Strapi's generated derived widths, a JSON scalar; read only by sources/strapi/image.ts. */
  formats?: unknown;
  mime?: string | null;
};

export type StrapiAboutLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
};

export type StrapiAboutImageSection = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  images?: StrapiAboutFile[] | null;
};

export type StrapiAboutProfileCard = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  designation?: string | null;
  isImageVisible?: boolean | null;
  profilePicture?: StrapiAboutFile | null;
};

export type StrapiAboutSeo = {
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

export type StrapiAbout = {
  documentId?: string | null;
  bgImage?: StrapiAboutFile | null;
  heading?: string | null;
  description?: string | null;
  headingTwo?: string | null;
  descriptionTwo?: string | null;
  secondSection?: StrapiAboutImageSection | null;
  thirdSection?: StrapiAboutImageSection | null;
  fourthSection?: {
    id?: string | null;
    label?: string | null;
    accordianDetails?: Array<{
      id?: string | null;
      heading?: string | null;
      description?: string | null;
    }> | null;
  } | null;
  fifthSection?: {
    id?: string | null;
    heading?: string | null;
    cardDetails?: StrapiAboutProfileCard[] | null;
  } | null;
  sixthSection?: {
    id?: string | null;
    heading?: string | null;
    sixthSectionCards?: StrapiAboutProfileCard[] | null;
  } | null;
  seventhSection?: {
    id?: string | null;
    heading?: string | null;
    link?: StrapiAboutLink | null;
    cardDetails?: Array<{
      id?: string | null;
      heading?: string | null;
      description?: string | null;
      bgColor?: string | null;
      icon?: StrapiAboutFile | null;
      link?: StrapiAboutLink | null;
    }> | null;
  } | null;
  seo?: StrapiAboutSeo | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

export type StrapiAboutResponse = {
  data?: { about?: StrapiAbout | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
