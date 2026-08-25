export type StrapiTermsOfUseSection = {
  __typename?: string | null;
  id?: string | null;
  heading?: string | null;
  description?: string | null;
};

export type StrapiTermsOfUseSeo = {
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

export type StrapiTermsOfUse = {
  documentId?: string | null;
  heading?: string | null;
  description?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  legalDescription?: StrapiTermsOfUseSection[] | null;
  seo?: StrapiTermsOfUseSeo | null;
};

export type StrapiTermsOfUseResponse = {
  data?: { termsOfUse?: StrapiTermsOfUse | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
