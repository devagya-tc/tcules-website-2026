export const CONTACT_QUERY = /* GraphQL */ `
  query GetContactPage($status: PublicationStatus = PUBLISHED) {
    contactUs(status: $status) {
      documentId
      heading
      description
      createdAt
      updatedAt
      publishedAt

      cards {
        id
        heading
        icon {
          documentId
          url
          alternativeText
          width
          height
          mime
        }
        link {
          id
          name
          href
          description
          isExternal
          icon {
            documentId
            url
            alternativeText
          }
        }
      }

      socialMedia {
        id
        name
        href
        description
        isExternal
        icon {
          documentId
          url
          alternativeText
        }
      }

      seo {
        metaTitle
        metaDescription
        slug
        canonicalURL
        robot
        focusString
        graphCode
      }
    }
  }
`;

export const CREATE_CLIENT_CONTACT_MUTATION = /* GraphQL */ `
  mutation CreateClientContact(
    $data: ClientContactInput!
    $status: PublicationStatus = PUBLISHED
  ) {
    createClientContact(data: $data, status: $status) {
      documentId
      clientName
      clientCompany
      clientEmail
      clientContact
      clientComments
      clientProfilePicture {
        documentId
        url
        alternativeText
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;
