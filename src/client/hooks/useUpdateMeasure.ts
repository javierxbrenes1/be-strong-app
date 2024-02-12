import { useMutation } from '@apollo/client';
import { UPDATE_MEASURE } from '../mutations/Measures';
import Measure from '../../common/models/Measure';

export type DataType = { updateMeasure: Measure };

export function useUpdateMeasure(
  onError: (error: unknown, action: string) => void,
  onCompleted: (data: DataType) => void
) {
  const [executeUpdateMeasure, { loading }] = useMutation<DataType>(
    UPDATE_MEASURE,
    {
      // refetchQueries: ['getMemberMeasures'],
      onError(error) {
        onError(error, 'updating');
      },
      onCompleted,
    }
  );

  return { executeUpdateMeasure, updatingMeasure: loading };
}
