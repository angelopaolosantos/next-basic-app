// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`

  type Booking {
    _id: ID!
    reservation: Reservation!
    status: String!
    checkedIn: Date
    checkedOut: Date
    invoice_id: ID
    notes: String
  }

  type Query {
    bookings: [Booking]
    booking(id: ID!): Booking
  }

  input BookingInput {
    reservation: ReservationInput
    status: String
    checkedIn: Date
    checkedOut: Date
    invoice_id: ID
    notes: String
  }

  type Mutation {
    createBooking(input: BookingInput!): Booking
    updateBooking(id: ID!, input: BookingInput): Booking
    deleteBooking(id: ID!): RequestStatus
  }

`