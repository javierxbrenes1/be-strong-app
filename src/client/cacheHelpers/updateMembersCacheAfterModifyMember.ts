/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { ApolloCache } from '@apollo/client';
import { ModifierDetails } from '@apollo/client/cache';
import Member from '../../common/models/Member';

type RefType = { __ref?: string };
function updateMembersCacheAfterModifyMember(
  cache: ApolloCache<any>,
  data?: { updateMember: Member }
) {
  return (value: any, details: ModifierDetails) => {
    if (!data) return value;
    const { code: memberCode, isActive, name } = data.updateMember;

    const id = cache.identify({
      code: memberCode,
      __typename: 'Member',
    });

    if (!isActive) {
      return {
        ...value,
        members: value?.members.filter((t: RefType) => t.__ref !== id),
      };
    }

    const exists = value?.members.find((t: RefType) => t.__ref === id);

    if (exists) {
      return value;
    }

    const { members } = value;
    let index = 0;
    for (const m of members) {
      const currentName = details.readField(
        'name',
        details.toReference(m.__ref)
      );
      if (name < (currentName ?? '')) break;
      index += 1;
    }

    const newMembers: RefType[] = [];
    for (let i = 0; i < members.length; i += 1) {
      if (i === index) {
        newMembers.push({ __ref: id });
      }
      newMembers.push(members[i]);
    }

    return {
      ...value,
      members: newMembers,
    };
  };
}

export default updateMembersCacheAfterModifyMember;
