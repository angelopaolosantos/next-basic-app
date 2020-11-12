import { mergeSchemas } from '@graphql-tools/merge';
import resolvers from '../resolvers'
import typeDefs from '../typeDefs'

export default mergeSchemas({
    schemas: [
        // add additional schemas if needed
    ],
    typeDefs,
    resolvers
});