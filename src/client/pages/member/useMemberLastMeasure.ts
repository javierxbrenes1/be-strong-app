import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Member from '../../../common/models/Member';
import { GET_MEMBER_LAST_MEASURE } from '../../queries/memberPage';
import { useMemberContext } from './MemberContext';
import Measure from '../../../common/models/Measure';

function useMemberLastMeasure(code: string) {
  const { setLastMeasureId, reloadLastMeasure } = useMemberContext();
  const [lastMeasure, setLastMeasure] = useState<Measure | null>(null);
  const {
    loading,
    data: pickingData,
    refetch,
  } = useQuery<{
    getMember: Member;
  }>(GET_MEMBER_LAST_MEASURE, {
    fetchPolicy: 'cache-and-network',
    variables: {
      code,
      take: 1,
      orderBy: {
        date: 'desc',
      },
    },
  });

  useEffect(() => {
    const { lastMeasure: m } = pickingData?.getMember || {};
    // const m = memberMeasures[0];
    setLastMeasureId(m ? m.id : -1);
    setLastMeasure(m ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickingData]);

  useEffect(() => {
    if (reloadLastMeasure) {
      refetch({ fetchPolicy: 'network-only' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadLastMeasure]);

  if (loading) {
    return {
      loading,
    };
  }

  return {
    loading,
    lastMeasure,
  };
}

export default useMemberLastMeasure;
