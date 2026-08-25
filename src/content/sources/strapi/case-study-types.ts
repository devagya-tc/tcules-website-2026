export type StrapiCaseStudyFile = {
  documentId?: string | null;
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string | null;
};

export type StrapiCaseStudySeo = {
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

export type StrapiCaseStudyBlock = StrapiCaseStudySeo & {
  __typename?: string | null;
  id?: string | null;
  blogContent?: string | null;
  layout?: string | null;
  imageSection?: StrapiCaseStudyFile[] | null;
  title?: string | null;
  videoDescription?: string | null;
  autoplay?: boolean | null;
  loop?: boolean | null;
  thumbnail?: StrapiCaseStudyFile | null;
  videoFile?: StrapiCaseStudyFile | null;
  embedCode?: string | null;
  url?: string | null;
  iframeDescription?: string | null;
  width?: number | null;
  height?: number | null;
  codeSnippet?: string | null;
  styles?: string | null;
  color?: string | null;
  thickness?: number | null;
  marginTop?: number | null;
  marginBottom?: number | null;
  body?: unknown;
  name?: string | null;
  href?: string | null;
  linkDescription?: string | null;
  isExternal?: boolean | null;
  icon?: StrapiCaseStudyFile | null;
};

export type StrapiCaseStudy = {
  documentId?: string | null;
  title?: string | null;
  slug?: string | null;
  shortDescription?: string | null;
  publishedAt?: string | null;
  updatedAt?: string | null;
  heroImage?: StrapiCaseStudyFile | null;
  thumbnail?: StrapiCaseStudyFile | null;
  profile?: Array<{
    id?: string | null;
    heading?: string | null;
    description?: string | null;
  }> | null;
  statement?: Array<{
    id?: string | null;
    type?: string | null;
    desc?: string | null;
  }> | null;
  caseStudyContents?: StrapiCaseStudyBlock[] | null;
  categories?: Array<{
    documentId?: string | null;
    name?: string | null;
    slug?: string | null;
  }> | null;
  tags?: Array<{
    documentId?: string | null;
    name?: string | null;
  }> | null;
  ctoSection?: {
    id?: string | null;
    heading?: string | null;
    ctoDescription?: string | null;
    link?: {
      id?: string | null;
      name?: string | null;
      href?: string | null;
      linkDescription?: string | null;
      isExternal?: boolean | null;
    } | null;
  } | null;
  seo?: StrapiCaseStudySeo | null;
};

export type StrapiCaseStudyResponse = {
  data?: { currentCaseStudy?: StrapiCaseStudy[] | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
