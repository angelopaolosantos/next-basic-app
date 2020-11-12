// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type Customer {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String
    phone: String
    address: String
    created: Date
    updated: Date
    notes: String
  }

  type Query {
    customers: [Customer]
    customer(id: ID!): Customer
  }

  input CustomerInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    created: Date
    updated: Date
    notes: String
  }
  type Mutation {
    createCustomer(input: CustomerInput!): Customer
    updateCustomer(id: ID!, input: CustomerInput): Customer
    deleteCustomer(id: ID!): RequestStatus
  }

`