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

export type AddMeasureInput = {
  bodyMassIndex: number;
  calories: number;
  corporalFat: number;
  corporalWaterPct: number;
  date: number;
  memberCode: string;
  muscle: number;
  weight: number;
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

export type GetMeasuresInput = {
  filters?: MeasureFiltersInput | null | undefined;
  limit?: number | null | undefined;
  memberCode?: string | null | undefined;
  offset?: number | null | undefined;
};

export type MeasureFiltersInput = {
  from?: string | null | undefined;
  to?: string | null | undefined;
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

export type UpdateMeasureInput = {
  bodyMassIndex?: number | null | undefined;
  calories?: number | null | undefined;
  corporalFat?: number | null | undefined;
  corporalWaterPct?: number | null | undefined;
  id: number;
  memberCode: string;
  muscle?: number | null | undefined;
  weight?: number | null | undefined;
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

export type UpsertEquipmentInput = {
  brand?: string | null | undefined;
  description?: string | null | undefined;
  equipmentCategoryUuid?: string | null | undefined;
  total?: number | null | undefined;
  uuid?: string | null | undefined;
};

export type LoginMutationVariables = Exact<{
  input?: OwnerSignInInput | null | undefined;
}>;


export type LoginMutation = { ownerSignIn: { jwt: string | null } | null };

export type UpdatePwdMutationVariables = Exact<{
  currentPwd: string;
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

export type GymClassTypesQueryVariables = Exact<{ [key: string]: never; }>;


export type GymClassTypesQuery = { getGymClassTypes: Array<string> };

export type GymClassTimesQueryVariables = Exact<{ [key: string]: never; }>;


export type GymClassTimesQuery = { allGymClassTimes: Array<{ id: number, localTime: string } | null> | null };

export type AddGymClassTimeConfigMutationVariables = Exact<{
  localTime: string;
}>;


export type AddGymClassTimeConfigMutation = { addGymClassTime: { id: number, localTime: string } | null };

export type EquipmentCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type EquipmentCategoriesQuery = { getEquipmentCategories: Array<{ uuid: string | null, name: string | null, equipment: Array<{ uuid: string | null, description: string | null, brand: string | null, total: number | null } | null> | null } | null> | null };

export type AddEquipmentCategoryMutationVariables = Exact<{
  name: string;
  equipment?: Array<UpsertEquipmentInput | null | undefined> | UpsertEquipmentInput | null | undefined;
}>;


export type AddEquipmentCategoryMutation = { addEquipmentCategory: { uuid: string | null, name: string | null } | null };

export type UpdateEquipmentCategoryNameMutationVariables = Exact<{
  uuid: string;
  name: string;
}>;


export type UpdateEquipmentCategoryNameMutation = { updateEquipmentCategoryName: { uuid: string | null, name: string | null } | null };

export type UpsertEquipmentMutationVariables = Exact<{
  input: UpsertEquipmentInput;
}>;


export type UpsertEquipmentMutation = { upsertEquipment: { uuid: string | null, description: string | null, brand: string | null, total: number | null } | null };

export type DeleteEquipmentMutationVariables = Exact<{
  equipmentUuid: string;
}>;


export type DeleteEquipmentMutation = { deleteEquipment: { uuid: string | null } | null };

export type DeleteEquipmentCategoryMutationVariables = Exact<{
  categoryUuid: string;
}>;


export type DeleteEquipmentCategoryMutation = { deleteEquipmentCategory: { uuid: string | null, name: string | null } | null };

export type HomeSummaryQueryVariables = Exact<{
  today: string;
}>;


export type HomeSummaryQuery = { getHomeSummary: { activeMembers: number, newMembersThisMonth: number, attendancesThisWeek: number, attendancesLastWeek: number, last7Days: Array<{ date: string, count: number }>, birthdays: Array<{ code: string, name: string }>, atRisk: Array<{ code: string, name: string }>, unmeasured: Array<{ code: string, name: string }> } };

export type MemberDetailQueryVariables = Exact<{
  code: string;
}>;


export type MemberDetailQuery = { getMember: { code: string, name: string | null, genre: string | null, birthDate: string | null, height: number | null, isActive: boolean | null, phone: string | null, email: string | null, observations: string | null, preferredClassTime: number | null, category: string | null, lastAttendanceDate: string | null, memberAttendance: { memberCode: string, monday: boolean | null, tuesday: boolean | null, wednesday: boolean | null, thursday: boolean | null, friday: boolean | null, saturday: boolean | null, sunday: boolean | null } | null, lastMeasure: { id: number, date: number | null, weight: number | null, weightDiff: number | null, corporalFat: number | null, corporalFatDiff: number | null, muscle: number | null, muscleDiff: number | null, bodyMassIndex: number | null, bodyMassIndexDiff: number | null, corporalWaterPct: number | null, corporalWaterPctDiff: number | null, calories: number | null, caloriesDiff: number | null, muscleResult: string | null, bodyMassIndexResult: string | null, corporalFatResult: string | null, corporalWaterPctResult: string | null, caloriesResult: string | null } | null, memberMeasures: Array<{ id: number, date: number | null, weight: number | null, corporalFat: number | null, muscle: number | null, bodyMassIndex: number | null, corporalWaterPct: number | null, calories: number | null } | null> | null } | null };

export type MemberMeasuresQueryVariables = Exact<{
  input?: GetMeasuresInput | null | undefined;
}>;


export type MemberMeasuresQuery = { getMeasures: { measures: Array<{ id: number, date: number | null, weight: number | null, weightDiff: number | null, corporalFat: number | null, corporalFatDiff: number | null, muscle: number | null, muscleDiff: number | null, bodyMassIndex: number | null, bodyMassIndexDiff: number | null, corporalWaterPct: number | null, corporalWaterPctDiff: number | null, calories: number | null, caloriesDiff: number | null, muscleResult: string | null, bodyMassIndexResult: string | null, corporalFatResult: string | null, corporalWaterPctResult: string | null, caloriesResult: string | null } | null> | null, pagination: { total: number | null, pageSize: number | null } | null } | null };

export type AttendanceByYearQueryVariables = Exact<{
  year: number;
  memberCode: string;
}>;


export type AttendanceByYearQuery = { getMemberAttendanceLogByYear: Array<{ year: number | null, month: number | null, total: number | null } | null> | null };

export type AttendanceMonthDetailsQueryVariables = Exact<{
  year: number;
  month: number;
  memberCode: string;
}>;


export type AttendanceMonthDetailsQuery = { getMemberAttendanceLogsDetails: Array<{ classDate: string | null, classDurationInMinutes: number | null, classType: string | null, localTime: string | null } | null> | null };

export type FirstAttendanceQueryVariables = Exact<{
  memberCode: string;
}>;


export type FirstAttendanceQuery = { getMemberAttendanceClasses: Array<{ classDate: string | null } | null> | null };

export type AddMeasureSheetMutationVariables = Exact<{
  measure?: AddMeasureInput | null | undefined;
}>;


export type AddMeasureSheetMutation = { addMeasure: { id: number } | null };

export type UpdateMeasureSheetMutationVariables = Exact<{
  measure?: UpdateMeasureInput | null | undefined;
}>;


export type UpdateMeasureSheetMutation = { updateMeasure: { id: number } | null };

export type DeleteMeasureRowMutationVariables = Exact<{
  id: number;
  memberCode: string;
}>;


export type DeleteMeasureRowMutation = { deleteMeasure: { id: number } | null };

export type ActiveMembersQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type ActiveMembersQuery = { getAllMembers: { members: Array<{ code: string, name: string | null, category: string | null, isActive: boolean | null, lastAttendanceDate: string | null, currentWeight: number | null, memberAttendance: { monday: boolean | null, tuesday: boolean | null, wednesday: boolean | null, thursday: boolean | null, friday: boolean | null, saturday: boolean | null, sunday: boolean | null } | null } | null> | null, pagination: { total: number | null, nextPageStart: number | null } | null } | null };

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

export type VisitMemberQueryVariables = Exact<{
  code: string;
}>;


export type VisitMemberQuery = { getVisitMember: { name: string | null, lastMeasure: { id: number, date: number | null, weight: number | null, weightDiff: number | null, corporalFat: number | null, corporalFatDiff: number | null, muscle: number | null, muscleDiff: number | null, bodyMassIndex: number | null, bodyMassIndexDiff: number | null, corporalWaterPct: number | null, corporalWaterPctDiff: number | null, calories: number | null, caloriesDiff: number | null, muscleResult: string | null, bodyMassIndexResult: string | null, corporalFatResult: string | null, corporalWaterPctResult: string | null, caloriesResult: string | null } | null, memberMeasures: Array<{ id: number, date: number | null, weight: number | null, bodyMassIndex: number | null, corporalFat: number | null, muscle: number | null, corporalWaterPct: number | null, calories: number | null } | null> | null } | null };

export type VisitAttendanceByYearQueryVariables = Exact<{
  year: number;
  memberCode: string;
}>;


export type VisitAttendanceByYearQuery = { getMemberAttendanceLogByYear: Array<{ year: number | null, month: number | null, total: number | null } | null> | null };

export type VisitAttendanceMonthQueryVariables = Exact<{
  year: number;
  month: number;
  memberCode: string;
}>;


export type VisitAttendanceMonthQuery = { getMemberAttendanceLogsDetails: Array<{ classDate: string | null, classDurationInMinutes: number | null, classType: string | null, localTime: string | null } | null> | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OwnerSignInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerSignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdatePwdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePwd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currentPwd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pwd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePwd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"currentPwd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currentPwd"}}},{"kind":"Argument","name":{"kind":"Name","value":"pwd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pwd"}}}]}]}}]} as unknown as DocumentNode<UpdatePwdMutation, UpdatePwdMutationVariables>;
export const WhoAmIProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"whoAmIProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"lastPasswordChangeDate"}}]}}]}}]} as unknown as DocumentNode<WhoAmIProfileQuery, WhoAmIProfileQueryVariables>;
export const GymClassesByDayDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gymClassesByDay"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gte"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lt"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGymClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gte"}}},{"kind":"Argument","name":{"kind":"Name","value":"lt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lt"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"classDate"}},{"kind":"Field","name":{"kind":"Name","value":"classType"}},{"kind":"Field","name":{"kind":"Name","value":"classDurationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"classDescription"}},{"kind":"Field","name":{"kind":"Name","value":"gymClassOnTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gymClassTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"attendanceList"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gymClassTimeId"}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GymClassesByDayQuery, GymClassesByDayQueryVariables>;
export const AddAttendancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addAttendances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembersAttendancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMembersAttendances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddAttendancesMutation, AddAttendancesMutationVariables>;
export const RemoveAttendancesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"removeAttendances"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MembersAttendancesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMembersAttendances"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<RemoveAttendancesMutation, RemoveAttendancesMutationVariables>;
export const AddGymClassSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGymClassSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddClassInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGymClass"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddGymClassSheetMutation, AddGymClassSheetMutationVariables>;
export const AddTimesDialogDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addTimesDialog"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"classId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timeIds"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addTimes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"classId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"classId"}}},{"kind":"Argument","name":{"kind":"Name","value":"timeIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timeIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddTimesDialogMutation, AddTimesDialogMutationVariables>;
export const GymClassTypesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gymClassTypes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getGymClassTypes"}}]}}]} as unknown as DocumentNode<GymClassTypesQuery, GymClassTypesQueryVariables>;
export const GymClassTimesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gymClassTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allGymClassTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<GymClassTimesQuery, GymClassTimesQueryVariables>;
export const AddGymClassTimeConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGymClassTimeConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"localTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGymClassTime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"localTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"localTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<AddGymClassTimeConfigMutation, AddGymClassTimeConfigMutationVariables>;
export const EquipmentCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EquipmentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getEquipmentCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"equipment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<EquipmentCategoriesQuery, EquipmentCategoriesQueryVariables>;
export const AddEquipmentCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddEquipmentCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addEquipmentCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"equipment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipment"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddEquipmentCategoryMutation, AddEquipmentCategoryMutationVariables>;
export const UpdateEquipmentCategoryNameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateEquipmentCategoryName"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateEquipmentCategoryName"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"uuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uuid"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateEquipmentCategoryNameMutation, UpdateEquipmentCategoryNameMutationVariables>;
export const UpsertEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpsertEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpsertEquipmentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"upsertEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"brand"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<UpsertEquipmentMutation, UpsertEquipmentMutationVariables>;
export const DeleteEquipmentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEquipment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"equipmentUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEquipment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"equipmentUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"equipmentUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}}]}}]}}]} as unknown as DocumentNode<DeleteEquipmentMutation, DeleteEquipmentMutationVariables>;
export const DeleteEquipmentCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteEquipmentCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"categoryUuid"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UUID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteEquipmentCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"categoryUuid"},"value":{"kind":"Variable","name":{"kind":"Name","value":"categoryUuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uuid"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DeleteEquipmentCategoryMutation, DeleteEquipmentCategoryMutationVariables>;
export const HomeSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"homeSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"today"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalDate"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getHomeSummary"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"today"},"value":{"kind":"Variable","name":{"kind":"Name","value":"today"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"activeMembers"}},{"kind":"Field","name":{"kind":"Name","value":"newMembersThisMonth"}},{"kind":"Field","name":{"kind":"Name","value":"attendancesThisWeek"}},{"kind":"Field","name":{"kind":"Name","value":"attendancesLastWeek"}},{"kind":"Field","name":{"kind":"Name","value":"last7Days"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"birthdays"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"atRisk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"unmeasured"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<HomeSummaryQuery, HomeSummaryQueryVariables>;
export const MemberDetailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"memberDetail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"genre"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"observations"}},{"kind":"Field","name":{"kind":"Name","value":"preferredClassTime"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"memberAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberCode"}},{"kind":"Field","name":{"kind":"Name","value":"monday"}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"}},{"kind":"Field","name":{"kind":"Name","value":"thursday"}},{"kind":"Field","name":{"kind":"Name","value":"friday"}},{"kind":"Field","name":{"kind":"Name","value":"saturday"}},{"kind":"Field","name":{"kind":"Name","value":"sunday"}}]}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"lastMeasure"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"weightDiff"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFat"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFatDiff"}},{"kind":"Field","name":{"kind":"Name","value":"muscle"}},{"kind":"Field","name":{"kind":"Name","value":"muscleDiff"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndex"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndexDiff"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPct"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPctDiff"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"caloriesDiff"}},{"kind":"Field","name":{"kind":"Name","value":"muscleResult"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndexResult"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFatResult"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPctResult"}},{"kind":"Field","name":{"kind":"Name","value":"caloriesResult"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberMeasures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"6"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"StringValue","value":"desc","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFat"}},{"kind":"Field","name":{"kind":"Name","value":"muscle"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndex"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPct"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}}]}}]}}]}}]} as unknown as DocumentNode<MemberDetailQuery, MemberDetailQueryVariables>;
export const MemberMeasuresDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"memberMeasures"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"GetMeasuresInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMeasures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"measures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"weightDiff"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFat"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFatDiff"}},{"kind":"Field","name":{"kind":"Name","value":"muscle"}},{"kind":"Field","name":{"kind":"Name","value":"muscleDiff"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndex"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndexDiff"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPct"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPctDiff"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"caloriesDiff"}},{"kind":"Field","name":{"kind":"Name","value":"muscleResult"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndexResult"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFatResult"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPctResult"}},{"kind":"Field","name":{"kind":"Name","value":"caloriesResult"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"pageSize"}}]}}]}}]}}]} as unknown as DocumentNode<MemberMeasuresQuery, MemberMeasuresQueryVariables>;
export const AttendanceByYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"attendanceByYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberAttendanceLogByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<AttendanceByYearQuery, AttendanceByYearQueryVariables>;
export const AttendanceMonthDetailsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"attendanceMonthDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberAttendanceLogsDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classDate"}},{"kind":"Field","name":{"kind":"Name","value":"classDurationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"classType"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<AttendanceMonthDetailsQuery, AttendanceMonthDetailsQueryVariables>;
export const FirstAttendanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"firstAttendance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberAttendanceClasses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"memberCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}}},{"kind":"Argument","name":{"kind":"Name","value":"order"},"value":{"kind":"StringValue","value":"asc","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classDate"}}]}}]}}]} as unknown as DocumentNode<FirstAttendanceQuery, FirstAttendanceQueryVariables>;
export const AddMeasureSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMeasureSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"measure"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMeasureInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMeasure"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"measure"},"value":{"kind":"Variable","name":{"kind":"Name","value":"measure"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddMeasureSheetMutation, AddMeasureSheetMutationVariables>;
export const UpdateMeasureSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMeasureSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"measure"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMeasureInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMeasure"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"measure"},"value":{"kind":"Variable","name":{"kind":"Name","value":"measure"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateMeasureSheetMutation, UpdateMeasureSheetMutationVariables>;
export const DeleteMeasureRowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteMeasureRow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteMeasure"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteMeasureRowMutation, DeleteMeasureRowMutationVariables>;
export const ActiveMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"activeMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentWeight"}},{"kind":"Field","name":{"kind":"Name","value":"memberAttendance"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"monday"}},{"kind":"Field","name":{"kind":"Name","value":"tuesday"}},{"kind":"Field","name":{"kind":"Name","value":"wednesday"}},{"kind":"Field","name":{"kind":"Name","value":"thursday"}},{"kind":"Field","name":{"kind":"Name","value":"friday"}},{"kind":"Field","name":{"kind":"Name","value":"saturday"}},{"kind":"Field","name":{"kind":"Name","value":"sunday"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageStart"}}]}}]}}]}}]} as unknown as DocumentNode<ActiveMembersQuery, ActiveMembersQueryVariables>;
export const InactiveMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"inactiveMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllInactiveMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentWeight"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"nextPageStart"}}]}}]}}]}}]} as unknown as DocumentNode<InactiveMembersQuery, InactiveMembersQueryVariables>;
export const SearchMembersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchMembers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getFilteredMembers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"column"},"value":{"kind":"StringValue","value":"name","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"comparator"},"value":{"kind":"StringValue","value":"contains","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"category"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"lastAttendanceDate"}},{"kind":"Field","name":{"kind":"Name","value":"currentWeight"}}]}}]}}]} as unknown as DocumentNode<SearchMembersQuery, SearchMembersQueryVariables>;
export const AddMemberSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addMemberSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AddMemberInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"member"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<AddMemberSheetMutation, AddMemberSheetMutationVariables>;
export const UpdateMemberSheetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateMemberSheet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"member"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateMemberInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"member"},"value":{"kind":"Variable","name":{"kind":"Name","value":"member"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<UpdateMemberSheetMutation, UpdateMemberSheetMutationVariables>;
export const VisitMemberDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"visitMember"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVisitMember"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"lastMeasure"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"weightDiff"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFat"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFatDiff"}},{"kind":"Field","name":{"kind":"Name","value":"muscle"}},{"kind":"Field","name":{"kind":"Name","value":"muscleDiff"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndex"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndexDiff"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPct"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPctDiff"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}},{"kind":"Field","name":{"kind":"Name","value":"caloriesDiff"}},{"kind":"Field","name":{"kind":"Name","value":"muscleResult"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndexResult"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFatResult"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPctResult"}},{"kind":"Field","name":{"kind":"Name","value":"caloriesResult"}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberMeasures"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"take"},"value":{"kind":"IntValue","value":"12"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"date"},"value":{"kind":"StringValue","value":"desc","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"bodyMassIndex"}},{"kind":"Field","name":{"kind":"Name","value":"corporalFat"}},{"kind":"Field","name":{"kind":"Name","value":"muscle"}},{"kind":"Field","name":{"kind":"Name","value":"corporalWaterPct"}},{"kind":"Field","name":{"kind":"Name","value":"calories"}}]}}]}}]}}]} as unknown as DocumentNode<VisitMemberQuery, VisitMemberQueryVariables>;
export const VisitAttendanceByYearDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"visitAttendanceByYear"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberAttendanceLogByYear"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"month"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<VisitAttendanceByYearQuery, VisitAttendanceByYearQueryVariables>;
export const VisitAttendanceMonthDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"visitAttendanceMonth"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getMemberAttendanceLogsDetails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}},{"kind":"Argument","name":{"kind":"Name","value":"memberCode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"memberCode"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"classDate"}},{"kind":"Field","name":{"kind":"Name","value":"classDurationInMinutes"}},{"kind":"Field","name":{"kind":"Name","value":"classType"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<VisitAttendanceMonthQuery, VisitAttendanceMonthQueryVariables>;