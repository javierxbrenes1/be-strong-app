/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type OwnerSignInInput = {
  pwd: string;
  username: string;
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

export type GymClassTimesQueryVariables = Exact<{ [key: string]: never; }>;


export type GymClassTimesQuery = { allGymClassTimes: Array<{ id: number, localTime: string } | null> | null };

export type AddGymClassTimeConfigMutationVariables = Exact<{
  localTime: string;
}>;


export type AddGymClassTimeConfigMutation = { addGymClassTime: { id: number, localTime: string } | null };


export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OwnerSignInInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ownerSignIn"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jwt"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const UpdatePwdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updatePwd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pwd"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updatePwd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pwd"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pwd"}}}]}]}}]} as unknown as DocumentNode<UpdatePwdMutation, UpdatePwdMutationVariables>;
export const WhoAmIProfileDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"whoAmIProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"whoAmI"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"lastPasswordChangeDate"}}]}}]}}]} as unknown as DocumentNode<WhoAmIProfileQuery, WhoAmIProfileQueryVariables>;
export const GymClassTimesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gymClassTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allGymClassTimes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<GymClassTimesQuery, GymClassTimesQueryVariables>;
export const AddGymClassTimeConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addGymClassTimeConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"localTime"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LocalTime"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addGymClassTime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"localTime"},"value":{"kind":"Variable","name":{"kind":"Name","value":"localTime"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"localTime"}}]}}]}}]} as unknown as DocumentNode<AddGymClassTimeConfigMutation, AddGymClassTimeConfigMutationVariables>;