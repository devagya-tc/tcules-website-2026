export const CASE_STUDY_BY_SLUG_QUERY = /* GraphQL */ `
  query GetCaseStudyInternalPage($slug: String!, $status: PublicationStatus = PUBLISHED) {
    currentCaseStudy: caseStudies(
      status: $status
      filters: { slug: { eq: $slug } }
      pagination: { limit: 1 }
    ) {
      documentId
      title
      slug
      shortDescription: description
      publishedAt
      updatedAt

      heroImage {
        ...FileFields
      }

      thumbnail {
        ...FileFields
      }

      profile {
        id
        heading
        description
      }

      statement {
        id
        type
        desc
      }

      caseStudyContents {
        __typename

        ... on ComponentBlogAndCasestudiesBlogOrCasestudyText {
          id
          blogContent
        }

        ... on ComponentBlogAndCasestudiesSectionImage {
          id
          layout
          imageSection {
            ...FileFields
          }
        }

        ... on ComponentBlogAndCasestudiesVideo {
          id
          title
          videoDescription: description
          autoplay
          loop
          thumbnail {
            ...FileFields
          }
          videoFile {
            ...FileFields
          }
        }

        ... on ComponentBlogAndCasestudiesIframe {
          id
          title
          embedCode
          url
          iframeDescription: description
          width
          height
          thumbnail {
            ...FileFields
          }
        }

        ... on ComponentBlogAndCasestudiesCodeSection {
          id
          codeSnippet
        }

        ... on ComponentBlogAndCasestudiesSepration {
          id
          title
          styles
          color
          thickness
          marginTop
          marginBottom
        }

        ... on ComponentSharedQuote {
          id
          title
          body
        }

        ... on ComponentElementsLink {
          id
          name
          href
          linkDescription: description
          isExternal
          icon {
            ...FileFields
          }
        }

        ... on ComponentSharedSeo {
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

      categories {
        documentId
        name
        slug
      }

      tags {
        documentId
        name
      }

      ctoSection {
        id
        heading
        ctoDescription: description
        link {
          id
          name
          href
          linkDescription: description
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
        structuredData
        codeJson
        focusString
        graphCode
      }
    }
  }

  fragment FileFields on UploadFile {
    documentId
    url
    alternativeText
    width
    height
    mime
  }
`;
