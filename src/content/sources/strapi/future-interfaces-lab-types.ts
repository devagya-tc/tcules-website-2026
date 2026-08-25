export type StrapiFutureInterfacesLabFile = {
  documentId?: string | null;
  url?: string | null;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
  mime?: string | null;
  caption?: string | null;
};

export type StrapiFutureInterfacesLabLink = {
  id?: string | null;
  name?: string | null;
  href?: string | null;
  description?: string | null;
  isExternal?: boolean | null;
  icon?: StrapiFutureInterfacesLabFile | null;
};

export type StrapiFutureInterfacesLabCard = {
  id?: string | null;
  heading?: string | null;
  description?: unknown;
  isIconVisible?: boolean | null;
  icon?: StrapiFutureInterfacesLabFile | null;
  cardImage?: StrapiFutureInterfacesLabFile | null;
  cardTiles?: Array<{
    heading?: string | null;
    description?: unknown;
  }> | null;
  list?: Array<{ listText?: string | null }> | null;
  details?: Array<{
    heading?: string | null;
    description?: Array<{ listText?: string | null }> | null;
  }> | null;
  button?: StrapiFutureInterfacesLabLink | StrapiFutureInterfacesLabLink[] | null;
};

export type StrapiFutureInterfacesLabCardSection = {
  __typename: 'ComponentLabsCardSection';
  id?: string | null;
  heading?: string | null;
  cards?: StrapiFutureInterfacesLabCard[] | null;
};

export type StrapiFutureInterfacesLab = {
  documentId?: string | null;
  heroSection?: {
    heading?: string | null;
    highlightedDescription?: string | null;
    description?: string | null;
    button?: StrapiFutureInterfacesLabLink[] | null;
  } | null;
  detailSection?: Array<
    StrapiFutureInterfacesLabCardSection | { __typename?: string | null; id?: string | null }
  > | null;
  miscSection?: {
    id?: string | null;
    label?: string | null;
    heading?: string | null;
    description?: string | null;
    button?: StrapiFutureInterfacesLabLink | null;
  } | null;
  interfaceLabs?: {
    id?: string | null;
    labsInterfaceCards?: Array<{
      id?: string | null;
      heading?: string | null;
      icon?: StrapiFutureInterfacesLabFile | null;
      link?: StrapiFutureInterfacesLabLink | null;
    }> | null;
  } | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    slug?: string | null;
    canonicalURL?: string | null;
    robot?: string | null;
  } | null;
};

export type StrapiFutureInterfacesLabResponse = {
  data?: { labSingleType?: StrapiFutureInterfacesLab | null } | null;
  errors?: Array<{ message?: string | null }> | null;
};
