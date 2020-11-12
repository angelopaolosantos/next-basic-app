// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type ReservationDetail {
    room: String
    reservedDate: Date
    rate: Float
  }

  input ReservationDetailInput {
    room: String
    reservedDate: Date
    rate: Float
  }

  type Reservation {
    _id: ID!
    customer_id: ID
    firstName: String!
    lastName: String
    email: String!
    phone: String
    created: Date
    modified: Date
    notes: String
    reserves: [ReservationDetail]
    status: String
    booking_id: ID
    coupons: [String]
  }

  type Query {
    reservations: [Reservation]
    reservation(id: ID!): Reservation
  }

  input ReservationInput {
    customer_id: ID
    firstName: String
    lastName: String
    email: String
    phone: String
    created: Date
    modified: Date
    notes: String
    reserves: [ReservationDetailInput]
    status: String
    booking_id: ID
    coupons: [String]
  }

  type Mutation {
    createReservation(input: ReservationInput!): Reservation
    updateReservation(id: ID!, input: ReservationInput): Reservation
    deleteReservation(id: ID!): RequestStatus
  }

`