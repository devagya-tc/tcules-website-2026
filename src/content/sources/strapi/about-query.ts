export const ABOUT_QUERY = /* GraphQL */ `
  query GetAboutPage($status: PublicationStatus = PUBLISHED) {
    about(status: $status) {
      documentId

      bgImage {
        ...FileFields
      }

      heading
      description
      headingTwo
      descriptionTwo

      secondSection {
        ...AboutImageSection
      }

      thirdSection {
        ...AboutImageSection
      }

      fourthSection {
        id
        label
        accordianDetails {
          id
          heading
          description
        }
      }

      fifthSection {
        id
        heading
        cardDetails {
          ...AboutProfileCard
        }
      }

      sixthSection {
        id
        heading
        sixthSectionCards {
          ...AboutProfileCard
        }
      }

      seventhSection {
        id
        heading
        link {
          ...LinkFields
        }
        cardDetails {
          id
          heading
          description
          bgColor
          icon {
            ...FileFields
          }
          link {
            ...LinkFields
          }
        }
      }

      seo {
        ...SeoFields
      }

      updatedAt
      publishedAt
    }
  }

  fragment AboutImageSection on ComponentAboutAboutSecondSection {
    id
    heading
    description
    images {
      ...FileFields
    }
  }

  fragment AboutProfileCard on ComponentAboutAboutFifthSectionCards {
    id
    heading
    description
    designation
    isImageVisible
    profilePicture {
      ...FileFields
    }
  }

  fragment LinkFields on ComponentElementsLink {
    id
    name
    href
    description
    isExternal
  }

  fragment FileFields on UploadFile {
    documentId
    url
    alternativeText
    width
    height
    mime
  }

  fragment SeoFields on ComponentSharedSeo {
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
`;
