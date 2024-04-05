import { useQuery } from '@apollo/client';
import { EQUIPMENT_QUERY } from '../../queries/equipmentPage';
import EquipmentCategory from '../../../common/models/EquipmentCategory';

function useGetEquipment() {
  const { loading, data } = useQuery<{
    getEquipmentCategories: EquipmentCategory[];
  }>(EQUIPMENT_QUERY);
  return { loading, data: data?.getEquipmentCategories };
}

export default useGetEquipment;
