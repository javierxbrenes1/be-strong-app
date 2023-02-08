import {mergeTypeDefs} from '@graphql-tools/merge';
import memberSchema from "./memberSchema";

const scalarDefinitions = `
scalar Date

type Pagination {
    total: Int
    pageSize: Int 
    nextPageStart: Int
    totalPages: Int
}
`

const typeDefs = mergeTypeDefs([scalarDefinitions, memberSchema]);

export default typeDefs