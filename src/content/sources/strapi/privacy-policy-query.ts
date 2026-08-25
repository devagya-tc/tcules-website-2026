export const PRIVACY_POLICY_QUERY = /* GraphQL */ `
  query GetPrivacyPolicyPage($status: PublicationStatus = PUBLISHED) {
    privacyPolicy(status: $status) {
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
