export const FUTURE_INTERFACES_LAB_QUERY = /* GraphQL */ `
  query GetLabsPage($status: PublicationStatus = PUBLISHED) {
    labSingleType(status: $status) {
      documentId

      heroSection {
        heading
        highlightedDescription
        description
        button {
          id
          name
          href
          description
          isExternal
          icon {
            ...FileFields
          }
        }
      }

      detailSection {
        __typename
        ... on ComponentLabsCardSection {
          id
          heading
          cards {
            id
            heading
            description
            isIconVisible
            icon {
              ...FileFields
            }
            cardImage {
              ...FileFields
            }
            cardTiles {
              heading
              description
            }
            list {
              listText
            }
            details {
              heading
              description {
                listText
              }
            }
            button {
              id
              name
              href
              description
              isExternal
              icon {
                ...FileFields
              }
            }
          }
        }
      }

      miscSection {
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
          icon {
            ...FileFields
          }
        }
      }

      interfaceLabs {
        id
        labsInterfaceCards {
          id
          heading
          icon {
            ...FileFields
          }
          link {
            id
            name
            href
            description
            isExternal
            icon {
              ...FileFields
            }
          }
        }
      }

      seo {
        metaTitle
        metaDescription
        slug
        canonicalURL
        robot
      }
    }
  }

  fragment FileFields on UploadFile {
    documentId
    url
    alternativeText
    width
    height
    formats
    mime
    caption
  }
`;
