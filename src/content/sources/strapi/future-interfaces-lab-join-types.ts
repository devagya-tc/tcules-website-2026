export type StrapiFutureInterfacesLabJoinFile = {
  documentId?: string | null;
  url?: string | null;
  alternativeText?: string | null;
};

export type StrapiFutureInterfacesLabJoinLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
};

export type StrapiFutureInterfacesLabJoinCard = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  icon?: StrapiFutureInterfacesLabJoinFile | null;
  link?: StrapiFutureInterfacesLabJoinLink | null;
};

export type StrapiFutureInterfacesLabJoinCardSection = {
  id?: string | null;
  heading?: string | null;
  description?: string | null;
  icon?: StrapiFutureInterfacesLabJoinFile | null;
  cards?: StrapiFutureInterfacesLabJoinCard[] | null;
};

export type StrapiFutureInterfacesLabJoin = {
  documentId?: string | null;
  heroSection?: {
    id?: string | null;
    label?: string | null;
    heading?: string | null;
    description?: string | null;
    button?: StrapiFutureInterfacesLabJoinLink[] | null;
  } | null;
  secondSection?: StrapiFutureInterfacesLabJoinCardSection | null;
  thirdSection?: StrapiFutureInterfacesLabJoinCardSection | null;
  fourthSection?: {
    id?: string | null;
    description?: string | null;
    fourthSection?: StrapiFutureInterfacesLabJoinCardSection | null;
  } | null;
  fifthSection?: StrapiFutureInterfacesLabJoinCardSection | null;
  sixthSection?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
    leftCard?: {
      id?: string | null;
      heading?: string | null;
      bottomText?: string | null;
      description?: string | null;
    } | null;
    rightCard?: Array<{
      id?: string | null;
      heading?: string | null;
      description?: string | null;
    }> | null;
  } | null;
  seventhSection?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
    faqs?: Array<{
      documentId?: string | null;
      question?: string | null;
      answer?: string | null;
      slug?: string | null;
      isActive?: boolean | null;
    }> | null;
  } | null;
  eighthSection?: {
    id?: string | null;
    heading?: string | null;
    description?: string | null;
    icon?: StrapiFutureInterfacesLabJoinFile | null;
  } | null;
  seo?: {
    id?: string | null;
    metaTitle?: string | null;
    metaDescription?: string | null;
    slug?: string | null;
    canonicalURL?: string | null;
    robot?: string | null;
  } | null;
  updatedAt?: string | null;
  publishedAt?: string | null;
};

export type StrapiFutureInterfacesLabJoinResponse = {
  data?: { labsFilLandingPage?: StrapiFutureInterfacesLabJoin | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
