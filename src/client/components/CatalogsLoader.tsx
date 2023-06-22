import { useQuery } from '@apollo/client';
import { ReactNode } from 'react';
import { CATALOGS_QUERY } from '../queries/catalogs';
import GymClassTime from '../../common/models/GymClassTime';
import useCatalogsStore from '../state/catalogState';
import { getApolloErrorMessages } from '../pages/utils/helpers';

function CatalogsLoader(props: { children: ReactNode | ReactNode[] }) {
  const { children } = props;
  const setGymClassTimes = useCatalogsStore((state) => state.setGymClassTimes);
  const { loading } = useQuery<{
    allGymClassTimes: GymClassTime[];
  }>(CATALOGS_QUERY, {
    onError(er) {
      const errors = getApolloErrorMessages(er);
      console.error(errors);
    },
    onCompleted(data) {
      console.log(data);
      setGymClassTimes(data.allGymClassTimes ?? []);
    },
  });

  if (loading) return null;
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default CatalogsLoader;
