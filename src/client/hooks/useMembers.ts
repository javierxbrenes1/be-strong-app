import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Pagination from '../../common/models/Pagination';
import Member from '../../common/models/Member';
import {
  GET_ACTIVE_MEMBERS,
  GET_INACTIVE_MEMBERS,
} from '../queries/membersPage';

const queryMap = {
  active: GET_ACTIVE_MEMBERS,
  inactive: GET_INACTIVE_MEMBERS,
};

const returnQueryProp = {
  active: 'getAllMembers',
  inactive: 'getAllInactiveMembers',
};

function useMembers(limit: number, status: 'active' | 'inactive') {
  const [currentPagination, setCurrentPagination] = useState<Pagination | null>(
    null
  );
  const [members, setMembers] = useState<Member[]>([]);

  const [query, { loading, fetchMore, data: membersReturn }] = useLazyQuery<
    Record<
      string,
      {
        members: Member[];
        pagination: Pagination;
      }
    >
  >(queryMap[status], {
    fetchPolicy: 'cache-and-network',
    variables: {
      offset: 0,
      limit,
    },
  });

  useEffect(() => {
    setCurrentPagination(null);
    setMembers([]);
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (membersReturn) {
      const { pagination, members: newMembers } =
        membersReturn[returnQueryProp[status]];
      setCurrentPagination(pagination);
      setMembers(newMembers);
    }
  }, [membersReturn, status]);

  const loadMoreMembers = () => {
    if (!currentPagination || currentPagination?.nextPageStart === -1) return;

    fetchMore({
      variables: {
        offset: currentPagination.nextPageStart,
      },
    });
  };

  const canLoadMore =
    currentPagination && currentPagination.nextPageStart !== -1;

  return {
    loading,
    members,
    loadMoreMembers,
    canLoadMore,
  };
}
export default useMembers;
