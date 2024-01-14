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
  const [getMeasuresFromServer, { loading }] = useLazyQuery<GetMeasures>(
    GET_MEMBER_MEASURES,
    {
      fetchPolicy: 'cache-and-network',
      onError(err) {
        BsShowError(
          err,
          'Hubo un error cargando los datos, intenta nuevamente, o refresca el browser'
        );
      },
      onCompleted,
    }
  );

  return { getMeasuresFromServer, loading };
}

export default useGetMeasuresFromServer;
