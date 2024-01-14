import { useMutation } from '@apollo/client';
import { DELETE_MEASURE } from '../../../mutations/Measures';
import BsShowError from '../../../components/BsShowError';

function useDeleteMeasure(onCompleted: () => void) {
  const [deleteMeasure, { loading }] = useMutation(DELETE_MEASURE, {
    refetchQueries: ['getMemberMeasures'],
    onError(err) {
      BsShowError(
        err,
        'Hubo un error cargando los datos, intenta nuevamente, o refresca el browser'
      );
    },
    onCompleted,
  });

  return { deleteMeasure, deletingMeasure: loading };
}

export default useDeleteMeasure;
