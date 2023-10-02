import React, { useState, useEffect, ReactNode } from 'react';
import { useLazyQuery } from '@apollo/client';
import { LinearProgress } from '@mui/material';
import Member from '../../common/models/Member';
import { GET_FILTERED_MEMBERS } from '../queries/membersPage';
import { apolloClient } from '../GraphqlClient';
import modifyGetAllMembersQuery from '../cacheHelpers/getAllMembersModifier';

function BsFilteredMembers(props: {
  filter: string;
  allMembers: Member[];
  showWithoutFilter?: boolean;
  children: ReactNode;
}) {
  const { filter, allMembers, showWithoutFilter, children } = props;
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
      return;
    }
    if (!filter && showWithoutFilter) {
      setFilteredMembers(allMembers);
      return;
    }
    setFilteredMembers([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, allMembers, validFilter]);

  if (!validFilter && !showWithoutFilter) {
    return null;
  }

  const childrenWithMembers = React.Children.map(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    children,
    (child: React.ReactElement<any>) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      React.cloneElement(child, {
        ...child.props,
        members: filteredMembers,
      })
  );

  return (
    <>
      {loading && <LinearProgress />}
      {childrenWithMembers}
    </>
  );
}

export default BsFilteredMembers;
