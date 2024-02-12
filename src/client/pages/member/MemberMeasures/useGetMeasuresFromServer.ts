import { useLazyQuery } from '@apollo/client';
import { GET_MEMBER_MEASURES } from '../../../queries/memberPage';
import BsShowError from '../../../components/BsShowError';
import Pagination from '../../../../common/models/Pagination';
import Measure from '../../../../common/models/Measure';

type GetMeasures = {
  getMeasures: {
    measures: Measure[];
    pagination: Pagination;
  };
};

function useGetMeasuresFromServer(onCompleted: (data: GetMeasures) => void) {
  const [getMeasuresFromServer, { loading, refetch }] =
    useLazyQuery<GetMeasures>(GET_MEMBER_MEASURES, {
      fetchPolicy: 'cache-and-network',
      notifyOnNetworkStatusChange: true,
      onError(err) {
        BsShowError(
          err,
          'Hubo un error cargando los datos, intenta nuevamente, o refresca el browser'
        );
      },
      onCompleted,
      refetchWritePolicy: 'overwrite',
    });

  return { getMeasuresFromServer, loading, refetchMeasures: refetch };
}

export default useGetMeasuresFromServer;
