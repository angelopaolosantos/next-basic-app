// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type InvoiceItem {
    name: String
    description: String
    quantity: Int
    price: Float
  }

  input InvoiceItemInput {
    name: String
    description: String
    quantity: Int
    price: Float
  }

  type Invoice {
    _id: ID!
    date: Date!
    firstName: String!
    lastName: String
    email: String!
    phone: String
    address: String
    items: [InvoiceItem]
    total: Float
    status: String
    notes: String
  }

  type Query {
    invoices: [Invoice]
    invoice(id: ID!): Invoice
  }

  input InvoiceInput {
    date: Date
    firstName: String
    lastName: String
    email: String
    phone: String
    address: String
    items: [InvoiceItemInput]
    total: Float
    status: String
    notes: String
  }

  type Mutation {
    createInvoice(input: InvoiceInput!): Invoice
    updateInvoice(id: ID!, input: InvoiceInput): Invoice
    deleteInvoice(id: ID!): RequestStatus
  }

`