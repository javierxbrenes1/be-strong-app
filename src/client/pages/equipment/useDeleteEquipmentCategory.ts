/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  ApolloCache,
  ApolloError,
  DefaultContext,
  MutationFunctionOptions,
  OperationVariables,
  useMutation,
} from '@apollo/client';
import {
  DELETE_EQUIPMENT_CATEGORY,
  DELETE_EQUIPMENT,
} from '../../mutations/Equipment';

export enum ModelToDelete {
  'EquipmentCategory' = 'EquipmentCategory',
  'Equipment' = 'Equipment',
}

function useAddEquipmentCategory(args: {
  modelToDelete: ModelToDelete;
  onComplete?: () => void;
  onError?: (error: ApolloError) => void;
}) {
  const { modelToDelete, onComplete, onError } = args;
  const query =
    modelToDelete === ModelToDelete.EquipmentCategory
      ? DELETE_EQUIPMENT_CATEGORY
      : DELETE_EQUIPMENT;

  const [deleteModel, { loading }] = useMutation(query, {
    onCompleted() {
      onComplete?.();
    },
    onError,
    update(cache, { data }) {
      const id = cache.identify({
        uuid:
          (modelToDelete === ModelToDelete.EquipmentCategory
            ? data?.deleteEquipmentCategory?.uuid
            : data?.deleteEquipment?.uuid) || '',
        __typename: modelToDelete,
      });
      cache.evict({ id });
      cache.gc();
    },
  });

  const result: [
    (
      options?:
        | MutationFunctionOptions<
            any,
            OperationVariables,
            DefaultContext,
            ApolloCache<any>
          >
        | undefined
    ) => Promise<any>,
    boolean
  ] = [deleteModel, loading];
  return result;
}

export default useAddEquipmentCategory;
