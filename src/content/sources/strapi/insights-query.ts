export const INSIGHTS_PAGE_QUERY = /* GraphQL */ `
  query GetResourcePageData(
    $status: PublicationStatus = PUBLISHED
    $sort: [String] = ["publishedAt:desc"]
    $blogLimit: Int = 100
    $eventLimit: Int = 100
    $interviewLimit: Int = 100
    $podcastLimit: Int = 100
  ) {
    resource(status: $status) {
      documentId
      heading
      description

      cardDetails {
        id
        heading
        cardImage {
          documentId
          url
          alternativeText
        }
      }

      secondSection {
        id
        heading
        description
        link {
          id
          name
          href
          isExternal
        }
      }

      thirdSection {
        id
        heading
        filterResource {
          id
          label
          tags {
            documentId
            name
          }
          categories {
            documentId
            name
            slug
          }
        }
      }

      fourthSection {
        id
        heading
        description
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

    blogResources: blogs(status: $status, sort: $sort, pagination: { limit: $blogLimit }) {
      __typename
      documentId
      title
      slug
      thumbnail {
        documentId
        url
        alternativeText
      }
      tags {
        documentId
        name
      }
      categories {
        documentId
        name
        slug
      }
      mainSection {
        __typename
        ... on ComponentBlogAndCasestudiesIframe {
          id
          title
        }
      }
      publishedAt
    }

    eventResources: events(status: $status, sort: $sort, pagination: { limit: $eventLimit }) {
      __typename
      documentId
      title
      slug
      description
      thumbnail {
        documentId
        url
        alternativeText
      }
      tags {
        documentId
        name
      }
      categories {
        documentId
        name
        slug
      }
      eventWhereAbout {
        id
        descOne
        descTwo
      }
      publishedAt
    }

    interviewResources: interviews(
      status: $status
      sort: $sort
      pagination: { limit: $interviewLimit }
    ) {
      __typename
      documentId
      title
      slug
      description
      thumbnail {
        documentId
        url
        alternativeText
      }
      tags {
        documentId
        name
      }
      categories {
        documentId
        name
        slug
      }
      publishedAt
    }

    podcastResources: podcasts(
      status: $status
      sort: $sort
      pagination: { limit: $podcastLimit }
    ) {
      __typename
      documentId
      title
      slug
      description
      thumbnail {
        documentId
        url
        alternativeText
      }
      tags {
        documentId
        name
      }
      categories {
        documentId
        name
        slug
      }
      publishedAt
    }
  }
`;
