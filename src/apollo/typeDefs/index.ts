import {mergeTypeDefs} from '@graphql-tools/merge';
import memberSchema from "./memberSchema";
import memberAttendanceSchema from './memberAttendanceSchema';

const scalarDefinitions = `
scalar Date

type Pagination {
    total: Int
    pageSize: Int 
    nextPageStart: Int
    totalPages: Int
}
`

const typeDefs = mergeTypeDefs([scalarDefinitions, memberSchema, memberAttendanceSchema]);

export default typeDefs