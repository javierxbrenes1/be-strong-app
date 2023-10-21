import { useLazyQuery } from '@apollo/client';
import { ReactNode, useEffect } from 'react';
import { CATALOGS_QUERY } from '../queries/catalogs';
import GymClassTime from '../../common/models/GymClassTime';
import useCatalogsStore from '../state/catalogState';
import { getApolloErrorMessages } from '../utils/helpers';

function CatalogsLoader(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const setGymClassTimes = useCatalogsStore((state) => state.setGymClassTimes);
  const reload = useCatalogsStore((state) => state.reload);

  const [getCatalogs] = useLazyQuery<{
    allGymClassTimes: GymClassTime[];
  }>(CATALOGS_QUERY, {
    fetchPolicy: 'network-only',
    onError(er) {
      const errors = getApolloErrorMessages(er);
      console.error(errors);
    },
    onCompleted(data) {
      setGymClassTimes(data.allGymClassTimes ?? []);
    },
  });

  useEffect(() => {
    getCatalogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reload) {
      getCatalogs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default CatalogsLoader;
