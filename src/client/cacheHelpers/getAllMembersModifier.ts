/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ModifierDetails, Reference } from '@apollo/client/cache';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import Member from '../../common/models/Member';

function compareNames(
  name: string,
  reference: Reference,
  readField: ReadFieldFunction
) {
  const memberNameToCompare = (readField('name', reference) ?? '')
    .toLocaleString()
    .toLocaleLowerCase();

  return name.toLocaleLowerCase().localeCompare(memberNameToCompare) >= 0;
}

function modifyGetAllMembersQuery(data?: Member | null) {
  return function (value: any, details: ModifierDetails): any {
    if (!data) return value;
    const newMemberRef = details.toReference({
      __typename: 'Member',
      code: data.code,
    });

    const members = [...(value?.members ?? [])];

    let insertIndex = 0;
    while (
      insertIndex < members.length &&
      compareNames(
        data.name,
        members[insertIndex] as unknown as Reference,
        details.readField
      )
    ) {
      insertIndex += 1;
    }
    members.splice(insertIndex, 0, newMemberRef);

    return {
      ...value,
      keysToAvoidDuplicates: {
        ...(value?.keysToAvoidDuplicates ?? {}),
        [data.code]: true,
      },
      members,
    };
  };
}

export default modifyGetAllMembersQuery;
