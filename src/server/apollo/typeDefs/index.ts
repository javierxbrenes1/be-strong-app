import { mergeTypeDefs } from '@graphql-tools/merge';
import memberSchema from './memberSchema';
import memberAttendanceSchema from './memberAttendanceSchema';
import memberMeasuresSchema from './memberMeasuresSchema';
import gymClassSchema from './gymClassSchema';

const scalarDefinitions = `
scalar Date

type Pagination {
    total: Int
    pageSize: Int 
    nextPageStart: Int
    totalPages: Int
}
`;

const typeDefs = mergeTypeDefs([
  scalarDefinitions,
  memberSchema,
  memberAttendanceSchema,
  memberMeasuresSchema,
  gymClassSchema,
]);

export default typeDefs;
