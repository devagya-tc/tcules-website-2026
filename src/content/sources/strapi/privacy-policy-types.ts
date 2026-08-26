export type StrapiPrivacyPolicySection = {
  __typename?: string | null;
  id?: string | null;
  heading?: string | null;
  description?: string | null;
};

export type StrapiPrivacyPolicySeo = {
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

export type StrapiPrivacyPolicy = {
  documentId?: string | null;
  heading?: string | null;
  description?: string | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
  legalDescription?: StrapiPrivacyPolicySection[] | null;
  seo?: StrapiPrivacyPolicySeo | null;
};

export type StrapiPrivacyPolicyResponse = {
  data?: { privacyPolicy?: StrapiPrivacyPolicy | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
