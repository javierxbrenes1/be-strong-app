/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AddClassInput = {
  classDate?: string | null | undefined;
  classDescription?: string | null | undefined;
  classDurationInMinutes?: number | null | undefined;
  classTimeIds?: Array<number | null | undefined> | null | undefined;
  classType?: string | null | undefined;
};

export type AddMemberInput = {
  avatar?: string | null | undefined;
  birthDate?: string | null | undefined;
  category?: string | null | undefined;
  genre?: string | null | undefined;
  height?: number | null | undefined;
  name: string;
  observations?: string | null | undefined;
};

export type MemberAttendanceInput = {
  friday?: boolean | null | undefined;
  monday?: boolean | null | undefined;
  saturday?: boolean | null | undefined;
  sunday?: boolean | null | undefined;
  thursday?: boolean | null | undefined;
  tuesday?: boolean | null | undefined;
  wednesday?: boolean | null | undefined;
};

export type MembersAttendancesInput = {
  gymClassId: number;
  gymClassTimeId: number;
  memberCodes: Array<string | null | undefined>;
};

export type OwnerSignInInput = {
  pwd: string;
  username: string;
};

export type UpdateMemberInput = {
  avatar?: string | null | undefined;
  birthDate?: string | null | undefined;
  category?: string | null | undefined;
  code: string;
  email?: string | null | undefined;
  genre?: string | null | undefined;
  height?: number | null | undefined;
  isActive?: boolean | null | undefined;
  memberAttendance?: MemberAttendanceInput | null | undefined;
  name?: string | null | undefined;
  observations?: string | null | undefined;
  phone?: string | null | undefined;
  preferredClassTime?: number | null | undefined;
};

export type LoginMutationVariables = Exact<{
  input?: OwnerSignInInput | null | undefined;
}>;


export type LoginMutation = { ownerSignIn: { jwt: string | null } | null };

export type UpdatePwdMutationVariables = Exact<{
  pwd: string;
}>;


export type UpdatePwdMutation = { updatePwd: boolean | null };

export type WhoAmIProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIProfileQuery = { whoAmI: { username: string | null, name: string | null, email: string | null, role: string | null, lastPasswordChangeDate: number | null } | null };

export type GymClassesByDayQueryVariables = Exact<{
  gte: string;
  lt?: string | null | undefined;
}>;


export type GymClassesByDayQuery = { getGymClasses: Array<{ id: number | null, classDate: string | null, classType: string | null, classDurationInMinutes: number | null, classDescription: string | null, gymClassOnTimes: Array<{ gymClassTime: { id: number, localTime: string } | null } | null> | null, attendanceList: Array<{ gymClassTimeId: number | null, members: Array<{ code: string, name: string | null } | null> | null } | null> | null } | null> | null };

export type AddAttendancesMutationVariables = Exact<{
  input: MembersAttendancesInput;
}>;


export type AddAttendancesMutation = { addMembersAttendances: { id: number | null } | null };

export type RemoveAttendancesMutationVariables = Exact<{
  input: MembersAttendancesInput;
}>;


export type RemoveAttendancesMutation = { removeMembersAttendances: { id: number | null } | null };

export type AddGymClassSheetMutationVariables = Exact<{
  input?: AddClassInput | null | undefined;
}>;


export type AddGymClassSheetMutation = { addGymClass: { id: number | null } | null };

export type AddTimesDialogMutationVariables = Exact<{
  classId?: number | null | undefined;
  timeIds?: Array<number | null | undefined> | number | null | undefined;
}>;


export type AddTimesDialogMutation = { addTimes: { id: number | null } | null };

export type GymClassTimesQueryVariables = Exact<{ [key: string]: never; }>;


export type GymClassTimesQuery = { allGymClassTimes: Array<{ id: number, localTime: string } | null> | null };

export type AddGymClassTimeConfigMutationVariables = Exact<{
  localTime: string;
}>;


export type AddGymClassTimeConfigMutation = { addGymClassTime: { id: number, localTime: string } | null };

export type ActiveMembersQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type ActiveMembersQuery = { getAllMembers: { members: Array<{ code: string, name: string | null, category: string | null, isActive: boolean | null, lastAttendanceDate: string | null, currentWeight: number | null } | null> | null, pagination: { total: number | null, nextPageStart: number | null } | null } | null };

export type InactiveMembersQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type InactiveMembersQuery = { getAllInactiveMembers: { members: Array<{ code: string, name: string | null, category: string | null, isActive: boolean | null, lastAttendanceDate: string | null, currentWeight: number | null } | null> | null, pagination: { total: number | null, nextPageStart: number | null } | null } | null };

export type SearchMembersQueryVariables = Exact<{
  filter?: string | null | undefined;
}>;


export type SearchMembersQuery = { getFilteredMembers: Array<{ code: string, name: string | null, category: string | null, isActive: boolean | null, lastAttendanceDate: string | null, currentWeight: number | null } | null> | null };

export type AddMemberSheetMutationVariables = Exact<{
  member?: AddMemberInput | null | undefined;
}>;


export type AddMemberSheetMutation = { addMember: { code: string, name: string | null } | null };

export type UpdateMemberSheetMutationVariables = Exact<{
  member?: UpdateMemberInput | null | undefined;
}>;


export type UpdateMemberSheetMutation = { updateMember: { code: string, name: string | null } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OwnerSignInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerSignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdatePwdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePwd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pwd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePwd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pwd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pwd"}}}]}]}}]} as unknown as DocumentNode<UpdatePwdMutation, UpdatePwdMutationVariables>;
export const WhoAmIProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"whoAmIProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"lastPasswordChangeDate"}}]}}]}}]} as unknown as DocumentNode<WhoAmIProfileQuery, WhoAmIProfileQueryVariables>;
export const GymClassesByDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gymClassesByDay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gte"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGymClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gte"}}},{"kind":"Argument","name":{"kind":"Name","value":"lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"classDate"}},{"kind":"Field","name":{"kind":"Name","value":"classType"}},{"kind":"Field","name":{"kind":"Name","value":"classDurationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"classDescription"}},{"kind":"Field","name":{"kind":"Name","value":"gymClassOnTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gymClassTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendanceList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gymClassTimeId"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GymClassesByDayQuery, GymClassesByDayQueryVariables>;
export const AddAttendancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAttendances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembersAttendancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMembersAttendances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddAttendancesMutation, AddAttendancesMutationVariables>;
export const RemoveAttendancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeAttendances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembersAttendancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMembersAttendances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveAttendancesMutation, RemoveAttendancesMutationVariables>;
export const AddGymClassSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGymClassSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddClassInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGymClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddGymClassSheetMutation, AddGymClassSheetMutationVariables>;
export const AddTimesDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTimesDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTimesDialogMutation, AddTimesDialogMutationVariables>;
export const GymClassTimesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gymClassTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allGymClassTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<GymClassTimesQuery, GymClassTimesQueryVariables>;
export const AddGymClassTimeConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGymClassTimeConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"localTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGymClassTime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"localTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"localTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<AddGymClassTimeConfigMutation, AddGymClassTimeConfigMutationVariables>;
export const ActiveMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"activeMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentWeight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageStart"}}]}}]}}]}}]} as unknown as DocumentNode<ActiveMembersQuery, ActiveMembersQueryVariables>;
export const InactiveMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"inactiveMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllInactiveMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentWeight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageStart"}}]}}]}}]}}]} as unknown as DocumentNode<InactiveMembersQuery, InactiveMembersQueryVariables>;
export const SearchMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilteredMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"column"},"value":{"kind":"StringValue","value":"name","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"comparator"},"value":{"kind":"StringValue","value":"contains","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentWeight"}}]}}]}}]} as unknown as DocumentNode<SearchMembersQuery, SearchMembersQueryVariables>;
export const AddMemberSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMemberSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMemberInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"member"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddMemberSheetMutation, AddMemberSheetMutationVariables>;
export const UpdateMemberSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMemberSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"member"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateMemberSheetMutation, UpdateMemberSheetMutationVariables>;