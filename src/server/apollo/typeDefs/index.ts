import { mergeTypeDefs } from '@graphql-tools/merge';
import memberSchema from './memberSchema';
import memberAttendanceSchema from './memberAttendanceSchema';
import memberMeasuresSchema from './memberMeasuresSchema';
import gymClassSchema from './gymClassSchema';
import loginSchema from './loginSchema';

const scalarDefinitions = `
directive @auth on FIELD_DEFINITION

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
  loginSchema,
]);

export default typeDefs;
