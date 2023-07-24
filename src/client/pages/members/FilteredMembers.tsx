import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LinearProgress } from '@mui/material';
import Member from '../../../common/models/Member';
import { GET_FILTERED_MEMBERS } from '../../queries/membersPage';
import MemberCardsVisualization from './MemberCardsVisualization';
import { apolloClient } from '../../GraphqlClient';
import modifyGetAllMembersQuery from '../../cacheHelpers/getAllMembersModifier';

function FilteredMembers(props: { filter: string; allMembers: Member[] }) {
  const { filter, allMembers } = props;
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const validFilter = filter.length >= 3;

  const [getFilteredMembers, { loading }] = useLazyQuery<{
    getFilteredMembers: Member[];
  }>(GET_FILTERED_MEMBERS, {
    onCompleted(data) {
      const { getFilteredMembers: res } = data;
      if (res.length) {
        apolloClient.cache.modify({
          fields: {
            getAllMembers: modifyGetAllMembersQuery(res),
          },
        });
      }
      setFilteredMembers(res);
    },
    onError(error) {
      setFilteredMembers([]);
      console.error(error);
    },
  });

  useEffect(() => {
    if (validFilter) {
      // look for it locally
      const filtered = allMembers.filter((m) =>
        m.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())
      );

      if (filtered && filtered.length) {
        setFilteredMembers(filtered);
        return;
      }
      getFilteredMembers({
        variables: {
          column: 'name',
          comparator: 'startsWith',
          filter,
        },
      });
    } else {
      setFilteredMembers([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, allMembers, validFilter]);

  if (!validFilter) {
    return null;
  }

  return (
    <>
      {loading && <LinearProgress />}
      <MemberCardsVisualization members={filteredMembers} />
    </>
  );
}

export default FilteredMembers;
