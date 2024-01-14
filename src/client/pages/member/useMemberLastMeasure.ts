import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Member from '../../../common/models/Member';
import { GET_MEMBER_LAST_MEASURE } from '../../queries/memberPage';
import { useMemberContext } from './MemberContext';
import Measure from '../../../common/models/Measure';

function useMemberLastMeasure(code: string) {
  const { reloadLastMeasure, setLastMeasureId } = useMemberContext();
  const [lastMeasure, setLastMeasure] = useState<Measure | null>(null);
  const [getLastMeasure, { loading }] = useLazyQuery<{
    getMember: Member;
  }>(GET_MEMBER_LAST_MEASURE, {
    fetchPolicy: 'no-cache',
    variables: {
      code,
      take: 1,
      orderBy: {
        date: 'desc',
      },
    },
    onCompleted(data) {
      const { memberMeasures = [] } = data?.getMember || {};
      const m = memberMeasures[0];
      setLastMeasureId(m ? m.id : -1);
      setLastMeasure(m ?? null);
    },
  });

  const trigger = () => {
    getLastMeasure({
      variables: {
        code,
      },
    });
  };

  useEffect(() => {
    trigger();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reloadLastMeasure) {
      trigger();
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
