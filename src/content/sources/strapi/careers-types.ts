export type StrapiCareersFile = {
  documentId?: string | null;
  url?: string | null;
  alternativeText?: string | null;
};

export type StrapiCareersLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  isExternal?: boolean | null;
};

export type StrapiCareersCard = {
  id?: string | null;
  heading?: string | null;
  icon?: StrapiCareersFile | null;
  link?: StrapiCareersLink | null;
};

export type StrapiCareersSeo = {
  id?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  canonicalURL?: string | null;
  robot?: string | null;
};

export type StrapiCareersPage = {
  documentId?: string | null;
  heading?: string | null;
  description?: string | null;
  secondSection?: {
    id?: string | null;
    heading?: string | null;
    cardDetails?: StrapiCareersCard[] | null;
  } | null;
  thirdSection?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
  } | null;
  fourthSection?: {
    id?: string | null;
    heading?: string | null;
    icon?: StrapiCareersFile | null;
    link?: StrapiCareersLink | null;
    cards?: StrapiCareersCard[] | null;
    bottomHeading?: string | null;
    bottomLink?: StrapiCareersLink | null;
  } | null;
  seo?: StrapiCareersSeo | null;
};

export type StrapiCareersOpening = {
  documentId?: string | null;
  roleName?: string | null;
  roleDomain?: string | null;
  roleLocation?: string | null;
  roleDescription?: string | null;
  link?: StrapiCareersLink | null;
  publishedAt?: string | null;
};

export type StrapiCareersResponse = {
  data?: {
    career?: StrapiCareersPage | null;
    roles?: {
      pageInfo?: {
        total?: number | null;
        page?: number | null;
        pageSize?: number | null;
        pageCount?: number | null;
      } | null;
      nodes?: StrapiCareersOpening[] | null;
    } | null;
  } | null;
  errors?: Array<{ message?: string | null }> | null;
};
