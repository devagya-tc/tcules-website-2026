export const CAREERS_QUERY = /* GraphQL */ `
  query GetCareersPage(
    $status: PublicationStatus = PUBLISHED
    $page: Int = 1
    $pageSize: Int = 100
    $sort: [String] = ["updatedAt:desc"]
  ) {
    career(status: $status) {
      documentId
      heading
      description

      secondSection {
        id
        heading
        cardDetails {
          id
          heading
          icon {
            documentId
            url
            alternativeText
          }
        }
      }

      thirdSection {
        id
        heading
        description
      }

      fourthSection {
        id
        heading
        icon {
          documentId
          url
          alternativeText
        }
        link {
          id
          name
          href
          isExternal
        }
        cards {
          id
          heading
          icon {
            documentId
            url
            alternativeText
          }
          link {
            id
            name
            href
            isExternal
          }
        }
        bottomHeading
        bottomLink {
          id
          name
          href
          isExternal
        }
      }

      seo {
        id
        metaTitle
        metaDescription
        slug
        canonicalURL
        robot
      }
    }

    roles: openings_connection(
      status: $status
      sort: $sort
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      pageInfo {
        total
        page
        pageSize
        pageCount
      }
      nodes {
        documentId
        roleName
        roleDomain
        roleLocation
        roleDescription
        link {
          id
          name
          href
          isExternal
        }
        publishedAt
      }
    }
  }
`;
