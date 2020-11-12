import bookingType from './bookingType'
import customerType from './customerType'
import invoiceType from './invoiceType'
import reservationType from './reservationType'
import roomType from './roomType'
import globalType from './globalType'
import { mergeTypeDefs } from '@graphql-tools/merge'

const types = [
  bookingType,
  customerType,
  invoiceType,
  reservationType,
  roomType,
  globalType
]

export default mergeTypeDefs(types)