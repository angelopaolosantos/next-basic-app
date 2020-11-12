// data/schema.js
import { gql } from 'apollo-server-micro'

// Define our schema using the GraphQL schema language
export default gql`
  type SpecialRate {
    name: String!
    description: String
    date: Date
    rate: Float
  }

  input SpecialRateInput {
    name: String!
    description: String
    date: Date
    rate: Float
  }

  type Room {
    _id: ID!
    name: String!
    description: String
    reservedDates: [Date]
    rate: Float
    specialRate: [SpecialRate]
  }

  type Query {
    rooms: [Room]
    room(id: ID!): Room
  }
  input RoomInput {
    name: String
    description: String
    reservedDates: [Date]
    rate: Float
    specialRate: [SpecialRateInput]
  }

  type Mutation {
    createRoom(input: RoomInput!): Room
    updateRoom(id: ID!, input: RoomInput): Room
    deleteRoom(id: ID!): RequestStatus
  }

`