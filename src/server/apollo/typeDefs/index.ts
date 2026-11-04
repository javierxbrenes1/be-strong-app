import { mergeTypeDefs } from '@graphql-tools/merge';
import memberSchema from './memberSchema';
import memberAttendanceSchema from './memberAttendanceSchema';
import memberMeasuresSchema from './memberMeasuresSchema';
import gymClassSchema from './gymClassSchema';
import loginSchema from './loginSchema';
import gymClassTimeSchema from './gymClassTimeSchema';
import equipmentSchema from './equipmentSchema';
import homeSchema from './homeSchema';

const scalarDefinitions = `
directive @auth on FIELD_DEFINITION

scalar Date

scalar LocalDate

scalar LocalTime

scalar UUID

type Pagination {
    total: Int
    pageSize: Int 
    nextPageStart: Int
    totalPages: Int
    currentPage: Int
}
`;

const typeDefs = mergeTypeDefs([
  scalarDefinitions,
  memberSchema,
  memberAttendanceSchema,
  memberMeasuresSchema,
  gymClassSchema,
  loginSchema,
  gymClassTimeSchema,
  equipmentSchema,
  homeSchema,
]);

export default typeDefs;
