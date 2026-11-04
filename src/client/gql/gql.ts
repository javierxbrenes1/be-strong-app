/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation updatePwd($pwd: String!) {\n    updatePwd(pwd: $pwd)\n  }\n": typeof types.UpdatePwdDocument,
    "\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n": typeof types.WhoAmIProfileDocument,
    "\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n": typeof types.GymClassesByDayDocument,
    "\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n": typeof types.AddAttendancesDocument,
    "\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n": typeof types.RemoveAttendancesDocument,
    "\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n": typeof types.AddGymClassSheetDocument,
    "\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n": typeof types.AddTimesDialogDocument,
    "\n  query gymClassTypes {\n    getGymClassTypes\n  }\n": typeof types.GymClassTypesDocument,
    "\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n": typeof types.GymClassTimesDocument,
    "\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n": typeof types.AddGymClassTimeConfigDocument,
    "\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": typeof types.ActiveMembersDocument,
    "\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": typeof types.InactiveMembersDocument,
    "\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n": typeof types.SearchMembersDocument,
    "\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n": typeof types.AddMemberSheetDocument,
    "\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n": typeof types.UpdateMemberSheetDocument,
};
const documents: Documents = {
    "\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n": types.LoginDocument,
    "\n  mutation updatePwd($pwd: String!) {\n    updatePwd(pwd: $pwd)\n  }\n": types.UpdatePwdDocument,
    "\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n": types.WhoAmIProfileDocument,
    "\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n": types.GymClassesByDayDocument,
    "\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n": types.AddAttendancesDocument,
    "\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n": types.RemoveAttendancesDocument,
    "\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n": types.AddGymClassSheetDocument,
    "\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n": types.AddTimesDialogDocument,
    "\n  query gymClassTypes {\n    getGymClassTypes\n  }\n": types.GymClassTypesDocument,
    "\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n": types.GymClassTimesDocument,
    "\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n": types.AddGymClassTimeConfigDocument,
    "\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": types.ActiveMembersDocument,
    "\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n": types.InactiveMembersDocument,
    "\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n": types.SearchMembersDocument,
    "\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n": types.AddMemberSheetDocument,
    "\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n": types.UpdateMemberSheetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n"): (typeof documents)["\n  mutation login($input: OwnerSignInInput) {\n    ownerSignIn(input: $input) {\n      jwt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updatePwd($pwd: String!) {\n    updatePwd(pwd: $pwd)\n  }\n"): (typeof documents)["\n  mutation updatePwd($pwd: String!) {\n    updatePwd(pwd: $pwd)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n"): (typeof documents)["\n  query whoAmIProfile {\n    whoAmI {\n      username\n      name\n      email\n      role\n      lastPasswordChangeDate\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query gymClassesByDay($gte: LocalDate!, $lt: LocalDate) {\n    getGymClasses(gte: $gte, lt: $lt) {\n      id\n      classDate\n      classType\n      classDurationInMinutes\n      classDescription\n      gymClassOnTimes {\n        gymClassTime {\n          id\n          localTime\n        }\n      }\n      attendanceList {\n        gymClassTimeId\n        members {\n          code\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addAttendances($input: MembersAttendancesInput!) {\n    addMembersAttendances(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation removeAttendances($input: MembersAttendancesInput!) {\n    removeMembersAttendances(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addGymClassSheet($input: AddClassInput) {\n    addGymClass(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation addTimesDialog($classId: Int, $timeIds: [Int]) {\n    addTimes(classId: $classId, timeIds: $timeIds) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gymClassTypes {\n    getGymClassTypes\n  }\n"): (typeof documents)["\n  query gymClassTypes {\n    getGymClassTypes\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n"): (typeof documents)["\n  query gymClassTimes {\n    allGymClassTimes {\n      id\n      localTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n"): (typeof documents)["\n  mutation addGymClassTimeConfig($localTime: LocalTime!) {\n    addGymClassTime(localTime: $localTime) {\n      id\n      localTime\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"): (typeof documents)["\n  query activeMembers($offset: Int, $limit: Int) {\n    getAllMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n        memberAttendance {\n          monday\n          tuesday\n          wednesday\n          thursday\n          friday\n          saturday\n          sunday\n        }\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"): (typeof documents)["\n  query inactiveMembers($offset: Int, $limit: Int) {\n    getAllInactiveMembers(offset: $offset, limit: $limit) {\n      members {\n        code\n        name\n        category\n        isActive\n        lastAttendanceDate\n        currentWeight\n      }\n      pagination {\n        total\n        nextPageStart\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n"): (typeof documents)["\n  query searchMembers($filter: String) {\n    getFilteredMembers(\n      column: \"name\"\n      comparator: \"contains\"\n      filter: $filter\n    ) {\n      code\n      name\n      category\n      isActive\n      lastAttendanceDate\n      currentWeight\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation addMemberSheet($member: AddMemberInput) {\n    addMember(member: $member) {\n      code\n      name\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation updateMemberSheet($member: UpdateMemberInput) {\n    updateMember(member: $member) {\n      code\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;