export const HOW_WE_WORK_QUERY = /* GraphQL */ `
  query GetNewHowWeWork($status: PublicationStatus = PUBLISHED) {
    newHowWeWork(status: $status) {
      documentId
      title
      slug
      createdAt
      updatedAt
      publishedAt

      hero {
        id
        eyebrow
        highlightedText
        description

        tags {
          id
          listText
        }

        actions {
          ...HowWeWorkButtonFields
        }
      }

      content {
        __typename

        ... on ComponentAuditSectionHeading {
          id
          sectionHeading: heading
          anchorId
          navigationLabel
        }

        ... on ComponentAuditRichText {
          id
          richTextBody: body
        }

        ... on ComponentAuditCardGrid {
          id
          gridColumns: columns

          gridCards: cards {
            id
            eyebrow
            title
            body

            labelledItems {
              ...HowWeWorkLabelledItemFields
            }

            link {
              ...HowWeWorkLinkFields
            }
          }
        }

        ... on ComponentAuditComparisonCards {
          id

          comparisonItems: cards {
            id
            title
            summary
            badge
            isRecommended

            details {
              ...HowWeWorkLabelledItemFields
            }
          }
        }

        ... on ComponentAuditTable {
          id
          caption
          summary

          tableColumns: columns {
            id
            heading
          }

          tableRows: rows {
            id
            rowHeading

            cells {
              id
              content
            }
          }
        }

        ... on ComponentAuditQuote {
          id
          quote
          attribution
          role

          sourceLink {
            ...HowWeWorkLinkFields
          }
        }

        ... on ComponentAuditCallout {
          id
          label
          calloutHeading: heading
          calloutBody: body
          tone
        }

        ... on ComponentAuditLabelledList {
          id
          displayStyle

          items {
            ...HowWeWorkLabelledItemFields
          }
        }

        ... on ComponentAuditTwoColumnContent {
          id

          left {
            ...HowWeWorkContentColumnFields
          }

          right {
            ...HowWeWorkContentColumnFields
          }
        }

        ... on ComponentAuditLinkGroup {
          id
          linkGroupHeading: heading
          description

          groupLinks: links {
            ...HowWeWorkLinkFields
          }
        }

        ... on ComponentSharedMedia {
          id

          file {
            ...HowWeWorkFileFields
          }
        }
      }

      faqSection {
        id
        eyebrow
        heading
        description

        faqs(filters: { isActive: { eq: true } }, pagination: { limit: 100 }) {
          documentId
          question
          answer
          slug
          isActive
        }
      }

      capabilitiesCta {
        id
        heading
        description
        descriptionTwo

        label {
          id
          listText
        }

        heroSectionButton {
          ...HowWeWorkButtonFields
        }
      }

      seo {
        id
        metaTitle
        metaDescription
        slug
        canonicalURL
        structuredData
        codeJson
        focusString
        graphCode
        robot
      }
    }
  }

  fragment HowWeWorkLabelledItemFields on ComponentAuditLabelledItem {
    id
    label
    title
    body

    link {
      ...HowWeWorkLinkFields
    }
  }

  fragment HowWeWorkContentColumnFields on ComponentAuditContentColumn {
    id
    eyebrow
    heading
    body

    labelledItems {
      ...HowWeWorkLabelledItemFields
    }

    links {
      ...HowWeWorkLinkFields
    }
  }

  fragment HowWeWorkLinkFields on ComponentElementsLink {
    id
    name
    href
    description
    isExternal

    icon {
      ...HowWeWorkFileFields
    }
  }

  fragment HowWeWorkButtonFields on ComponentElementsButtons {
    id
    name
    href
    description
    isExternal

    icon {
      ...HowWeWorkFileFields
    }
  }

  fragment HowWeWorkFileFields on UploadFile {
    documentId
    name
    alternativeText
    caption
    width
    height
    formats
    url
    mime
    size
  }
`;
