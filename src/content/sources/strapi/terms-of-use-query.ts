export const TERMS_OF_USE_QUERY = /* GraphQL */ `
  query GetTermsOfUsePage($status: PublicationStatus = PUBLISHED) {
    termsOfUse(status: $status) {
      documentId
      heading
      description
      updatedAt
      publishedAt

      legalDescription {
        __typename
        ... on ComponentLegalDetails {
          id
          heading
          description
        }
      }

      seo {
        id
        metaTitle
        metaDescription
        slug
        canonicalURL
        robot
        structuredData
        codeJson
        focusString
        graphCode
      }
    }
  }
`;
