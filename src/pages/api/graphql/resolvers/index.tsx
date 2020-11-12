import bookingResolver from './bookingResolver'
import customerResolver from './customerResolver'
import invoiceResolver from './invoiceResolver'
import reservationResolver from './reservationResolver'
import roomResolver from './roomResolver'
import globalResolver from './globalResolver'
import { mergeResolvers } from '@graphql-tools/merge'

const resolvers = [
  bookingResolver,
  customerResolver,
  invoiceResolver,
  reservationResolver,
  roomResolver,
  globalResolver
]

export default mergeResolvers(resolvers)
