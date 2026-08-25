export const MATTER_DESIGN_SYSTEM_QUERY = /* GraphQL */ `
  query GetMatterDesignSystemPage($status: PublicationStatus = PUBLISHED) {
    matterDesignSystem(status: $status) {
      documentId

      heroSection {
        id
        label
        headingOne
        headingTwo
        description
        link {
          id
          name
          href
          description
          isExternal
        }
        featureImage {
          documentId
          url
          alternativeText
          width
          height
        }
      }

      secondSection {
        id
        heading
        icon {
          documentId
          url
          alternativeText
          width
          height
        }
        cardDetails {
          id
          heading
          description
          icon {
            documentId
            url
            alternativeText
            width
            height
          }
          cardImage {
            documentId
            url
            alternativeText
            width
            height
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
        cards {
          id
          heading
          description
          icon {
            documentId
            url
            alternativeText
            width
            height
          }
          cardImage {
            documentId
            url
            alternativeText
            width
            height
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

      stripOne {
        id
        heading
        description
        bgIcon {
          documentId
          url
          alternativeText
          width
          height
        }
        link {
          id
          name
          href
          description
          isExternal
        }
      }

      fourthSection {
        id
        displayCards {
          id
          heading
          d
          icon {
            documentId
            url
            alternativeText
            width
            height
          }
          images {
            documentId
            url
            alternativeText
            width
            height
          }
        }
      }

      fifthSection {
        id
        heading
        cards {
          id
          heading
          description
          icon {
            documentId
            url
            alternativeText
            width
            height
          }
          cardImage {
            documentId
            url
            alternativeText
            width
            height
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

      stripTwo {
        id
        heading
        description
        bgIcon {
          documentId
          url
          alternativeText
          width
          height
        }
        link {
          id
          name
          href
          description
          isExternal
        }
      }

      contactUs {
        id
        headingOne
        headingTwo
        description
        icon {
          documentId
          url
          alternativeText
          width
          height
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

      updatedAt
      publishedAt
    }
  }
`;
