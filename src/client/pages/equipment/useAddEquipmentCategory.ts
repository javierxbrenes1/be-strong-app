/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ApolloError, gql, useMutation } from '@apollo/client';
import { ADD_EQUIPMENT_CATEGORY } from '../../mutations/Equipment';
import { EQUIPMENT_CATEGORY_ALL } from '../../fragments/equipmentCategoryFragment';

function useAddEquipmentCategory(
  onComplete: () => void,
  onError: (error: ApolloError) => void
) {
  const [addEquipmentCategory, { loading }] = useMutation(
    ADD_EQUIPMENT_CATEGORY,
    {
      onCompleted() {
        onComplete?.();
      },
      onError,
      update(cache, { data }) {
        cache.modify({
          fields: {
            getEquipmentCategories(existingCategories: any) {
              const newCategory = cache.writeFragment({
                data: data?.addEquipmentCategory,
                fragment: EQUIPMENT_CATEGORY_ALL,
                fragmentName: 'equipmentCategoryAllFields',
              });
              return [...existingCategories, newCategory];
            },
          },
        });
      },
    }
  );

  return { addEquipmentCategory, addingNewCategory: loading };
}

export default useAddEquipmentCategory;
