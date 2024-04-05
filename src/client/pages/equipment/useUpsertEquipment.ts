/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ApolloError, useMutation } from '@apollo/client';
import { ADD_EQUIPMENT } from '../../mutations/Equipment';

function useUpsertEquipment(
  onComplete: () => void,
  onError: (error: ApolloError) => void
) {
  const [upsertEquipment, { loading }] = useMutation(ADD_EQUIPMENT, {
    onCompleted() {
      onComplete?.();
    },
    onError,
    update(cache, { data }) {
      const newEq = data?.upsertEquipment;
      const newCachedEq = cache.identify({
        uuid: newEq.uuid,
        __typename: 'Equipment',
      });

      cache.modify({
        id: cache.identify({
          uuid: newEq.category.uuid,
          __typename: 'EquipmentCategory',
        }),
        fields: {
          equipment: (existing) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const exists = existing?.find(
              (eq: { __ref: string }) => eq.__ref === newCachedEq
            );
            if (exists) return existing;
            return [
              ...(existing || []),
              {
                __ref: newCachedEq,
              },
            ];
          },
        },
      });
    },
  });

  return { upsertEquipment, addingNewEquipment: loading };
}

export default useUpsertEquipment;
