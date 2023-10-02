import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Pagination from '../../common/models/Pagination';
import Member from '../../common/models/Member';
import { GET_ACTIVE_MEMBERS } from '../queries/membersPage';

function useMembers(limit: number) {
  const [currentPagination, setCurrentPagination] = useState<Pagination | null>(
    null
  );

  const {
    loading,
    fetchMore,
    data: activeMembers,
  } = useQuery<{
    getAllMembers: {
      members: Member[];
      pagination: Pagination;
    };
  }>(GET_ACTIVE_MEMBERS, {
    variables: {
      offset: 0,
      limit,
    },
    onCompleted(onCompletedData) {
      const { getAllMembers } = onCompletedData;
      setCurrentPagination(getAllMembers.pagination);
    },
    onError(error) {
      // do something
      console.error(error);
    },
  });

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

  const members = activeMembers?.getAllMembers?.members || [];

  return {
    loading,
    members,
    loadMoreMembers,
    canLoadMore,
  };
}
export default useMembers;
