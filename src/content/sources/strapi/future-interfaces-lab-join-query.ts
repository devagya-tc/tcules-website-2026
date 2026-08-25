export const FUTURE_INTERFACES_LAB_JOIN_QUERY = /* GraphQL */ `
  query GetLabsFilLandingPage(
    $status: PublicationStatus = PUBLISHED
    $faqLimit: Int = 20
    $faqSort: [String] = ["updatedAt:desc"]
  ) {
    labsFilLandingPage(status: $status) {
      documentId

      heroSection {
        id
        label
        heading
        description
        button {
          id
          name
          href
          description
          isExternal
        }
      }

      secondSection {
        id
        heading
        icon {
          documentId
          url
          alternativeText
        }
        cards {
          id
          heading
          description
          icon {
            documentId
            url
            alternativeText
          }
          link {
            id
            name
            href
            description
            isExternal
          }
        }
      }

      thirdSection {
        id
        heading
        description
        icon {
          documentId
          url
          alternativeText
        }
        cards {
          id
          heading
          description
          icon {
            documentId
            url
            alternativeText
          }
          link {
            id
            name
            href
            description
            isExternal
          }
        }
      }

      fourthSection {
        id
        description
        fourthSection {
          id
          heading
          icon {
            documentId
            url
            alternativeText
          }
          cards {
            id
            heading
            description
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
        }
      }

      fifthSection {
        id
        heading
        description
        cards {
          id
          heading
          description
          icon {
            documentId
            url
            alternativeText
          }
          link {
            id
            name
            href
            description
            isExternal
          }
        }
      }

      sixthSection {
        id
        heading
        description
        leftCard {
          id
          heading
          bottomText
          description
        }
        rightCard {
          id
          heading
          description
        }
      }

      seventhSection {
        id
        heading
        description
        faqs(
          filters: { isActive: { eq: true } }
          pagination: { limit: $faqLimit }
          sort: $faqSort
        ) {
          documentId
          question
          answer
          slug
          isActive
        }
      }

      eighthSection {
        id
        heading
        description
        icon {
          documentId
          url
          alternativeText
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

      updatedAt
      publishedAt
    }
  }
`;
