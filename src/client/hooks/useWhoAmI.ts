import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { WHO_AM_I } from '../queries/global';
import OwnerUser from '../models/OwnerUser';

const useWhoAmI = (): OwnerUser | null => {
  const [details, setDetails] = useState<OwnerUser | null>(null);
  const [getWhoAmI] = useLazyQuery<{ whoAmI: OwnerUser }>(WHO_AM_I, {
    onCompleted(data) {
      setDetails(data.whoAmI);
    },
  });

  useEffect(() => {
    getWhoAmI();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return details;
};

export default useWhoAmI;
