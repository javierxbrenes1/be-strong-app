import { useState, useCallback } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Divider, Typography, Box, CircularProgress } from '@mui/material';
import { ApolloError } from '@apollo/client';
import { EquipmentCategoryInput } from '../../../common/models/EquipmentCategory';
import EquipmentCategoryForm from './EquipmentCategoryForm';
import useAddEquipmentCategory from './useAddEquipmentCategory';
import { getApolloErrorMessages } from '../../utils/helpers';
import Errors from '../../components/Errors';

type Props = { open: boolean; onClose: () => void };

function AddEquipmentCategoryDialog(props: Props) {
  const { open, onClose } = props;
  const [errors, setErrors] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<EquipmentCategoryInput | null>(
    null
  );
  const { addEquipmentCategory, addingNewCategory } = useAddEquipmentCategory(
    () => {
      onClose();
    },
    (error: ApolloError) => {
      setErrors(getApolloErrorMessages(error));
    }
  );

  const onEquipmentCategoryFormUpdate = useCallback(
    (category: EquipmentCategoryInput) => {
      setNewCategory(category);
    },
    []
  );

  const handleSaveClick = () => {
    setErrors([]);
    addEquipmentCategory({
      variables: {
        name: newCategory?.name || '',
        equipment: newCategory?.equipment || [],
      },
    });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Agregar Categoria y Equipo</DialogTitle>
      <DialogContent>
        <Typography>
          Ingresa una nueva categoria asi como su equipo, esto lo hacemos para
          mantener nuestro equipo organizado.
        </Typography>
        <Divider sx={{ py: '.4rem' }} />
        <EquipmentCategoryForm
          onEquipmentCategoryUpdate={onEquipmentCategoryFormUpdate}
        />
        <Box />
        <Errors errors={errors} addTitle />
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveClick}
          disabled={!newCategory?.name || addingNewCategory}
        >
          {addingNewCategory && (
            <CircularProgress color="primary" size="25px" />
          )}
          Guardar
        </Button>
        <Button
          color="primary"
          variant="contained"
          sx={{ color: '#fff' }}
          autoFocus
          onClick={onClose}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEquipmentCategoryDialog;
