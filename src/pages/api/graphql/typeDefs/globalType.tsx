// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  scalar Date
  type RequestStatus {
    status: String!
    message: String
    isSuccess: Boolean!
  }
`