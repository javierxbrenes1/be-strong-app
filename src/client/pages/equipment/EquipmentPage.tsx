import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PageContainer from '../../components/PageContainer';
import NoEquipment from './NoEquipment';
import AddEquipmentCategoryDialog from './AddEquipmentCategoryDialog';
import useGetEquipment from './useGetEquipment';
import Loading from '../../components/Loading';
import EquipmentCategoryCard from './EquipmentCategoryCard';
import BsButton from '../../components/BsButton';
import useDeleteEquipmentCategory, {
  ModelToDelete,
} from './useDeleteEquipmentCategory';
import BsShowError from '../../components/BsShowError';
import BsShowSuccess from '../../components/BsShowSuccess';
import UpsertEquipmentDialog from './UpsertEquipmentDialog';
import EquipmentModel from '../../../common/models/Equipment';
import { removeTypeName } from '../../utils/helpers';
import BsConfirmDialog from '../../components/BsConfirmDialog';

const CardsContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
  gap: '1rem',
}));

function EquipmentPage() {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [equipmentDialogProps, setEquipmentDialogProps] = useState<{
    categoryUuid: string;
    equipment?: EquipmentModel;
  } | null>(null);
  const { loading, data } = useGetEquipment();
  const [deleteCategory] = useDeleteEquipmentCategory({
    modelToDelete: ModelToDelete.EquipmentCategory,
    onComplete() {
      BsShowSuccess('Categoría eliminada correctamente');
    },
    onError(error) {
      BsShowError(error, 'Error al eliminar la categoria, intente nuevamente');
    },
  });
  const [deleteEquipment] = useDeleteEquipmentCategory({
    modelToDelete: ModelToDelete.Equipment,
    onComplete() {
      BsShowSuccess('Equipo eliminado correctamente');
    },
    onError(error) {
      BsShowError(error, 'Error al eliminar el equipo, intente nuevamente');
    },
  });
  const [confirmationDetails, setConfirmationDetails] = useState<{
    title: string;
    question: string;
    onAccept: () => void;
  } | null>(null);

  if (loading) {
    <PageContainer Icon={FitnessCenterIcon} text="Equipo">
      <Loading />
    </PageContainer>;
  }

  if (!data || data.length === 0) {
    return (
      <>
        <PageContainer Icon={FitnessCenterIcon} text="Equipo">
          <NoEquipment onClick={() => setShowAddCategoryModal(true)} />
        </PageContainer>
        {showAddCategoryModal && (
          <AddEquipmentCategoryDialog
            open={showAddCategoryModal}
            onClose={() => setShowAddCategoryModal(false)}
          />
        )}
      </>
    );
  }

  const handleDeleteCategoryClick = (categoryUuid: string) => {
    setConfirmationDetails({
      title: '¿Desea eliminar esta categoria?',
      question:
        'Al eliminar la categoria, se eliminarán tambien todos los equipos relacionados con esta.',
      onAccept: () => {
        deleteCategory({ variables: { categoryUuid } });
        setConfirmationDetails(null);
      },
    });
  };
  const handleDeleteEquipmentClick = (equipmentUuid: string) => {
    setConfirmationDetails({
      title: '¿Desea eliminar este equipo?',
      question: 'Una vez eliminado no podrá recuperarse.',
      onAccept: () => {
        deleteEquipment({ variables: { equipmentUuid } });
        setConfirmationDetails(null);
      },
    });
  };

  const handleAddEquipmentClick = (categoryUuid: string) => {
    setEquipmentDialogProps({ categoryUuid });
  };

  const handleEditEquipmentClick = (
    CategoryUuid: string,
    equipment: EquipmentModel
  ) => {
    const newEq = removeTypeName<EquipmentModel>(equipment);
    setEquipmentDialogProps({
      categoryUuid: CategoryUuid,
      equipment: newEq,
    });
  };

  return (
    <>
      <PageContainer Icon={FitnessCenterIcon} text="Equipo">
        <Box sx={{ maxWidth: '200px', margin: '1rem 0' }}>
          <BsButton
            text="Nueva Categoria"
            onClick={() => setShowAddCategoryModal(true)}
          />
        </Box>
        <CardsContainer>
          {data.map((category) => (
            <EquipmentCategoryCard
              key={category.uuid}
              category={category}
              onAddEquipmentClick={handleAddEquipmentClick}
              onDeleteCategoryClick={handleDeleteCategoryClick}
              onDeleteEquipmentClick={handleDeleteEquipmentClick}
              onEditEquipmentClick={handleEditEquipmentClick}
            />
          ))}
        </CardsContainer>
      </PageContainer>
      {showAddCategoryModal && (
        <AddEquipmentCategoryDialog
          open={showAddCategoryModal}
          onClose={() => setShowAddCategoryModal(false)}
        />
      )}
      {equipmentDialogProps && (
        <UpsertEquipmentDialog
          open
          onClose={() => setEquipmentDialogProps(null)}
          {...equipmentDialogProps}
        />
      )}
      {confirmationDetails && (
        <BsConfirmDialog
          {...confirmationDetails}
          onCancel={() => setConfirmationDetails(null)}
        />
      )}
    </>
  );
}

export default EquipmentPage;
