/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ApolloError, useMutation } from '@apollo/client';
import { UPDATE_EQUIPMENT_CATEGORY_NAME } from '../../mutations/Equipment';

function useUpdateCategoryName(
  onComplete: () => void,
  onError: (error: ApolloError) => void
) {
  const [updateCategoryName, { loading }] = useMutation(
    UPDATE_EQUIPMENT_CATEGORY_NAME,
    {
      onCompleted() {
        onComplete?.();
      },
      onError,
    }
  );

  return { updateCategoryName, updatingCategoryName: loading };
}

export default useUpdateCategoryName;
