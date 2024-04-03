import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Divider, Typography, Box, CircularProgress } from '@mui/material';
import { ApolloError } from '@apollo/client';
import { getApolloErrorMessages } from '../../utils/helpers';
import Errors from '../../components/Errors';
import EquipmentForm from './EquipmentForm';
import Equipment, { EquipmentInput } from '../../../common/models/Equipment';
import useUpsertEquipment from './useUpsertEquipment';

type Props = {
  open: boolean;
  categoryUuid: string;
  onClose: () => void;
  equipment?: Equipment;
};

function AddEquipmentDialog(props: Props) {
  const { open, categoryUuid, onClose, equipment } = props;
  const [errors, setErrors] = useState<string[]>([]);
  const [newEquipment, setNewEquipment] = useState<Equipment | EquipmentInput>(
    equipment || {
      description: '',
      brand: '',
    }
  );
  const { upsertEquipment, addingNewEquipment } = useUpsertEquipment(
    () => {
      onClose();
    },
    (error: ApolloError) => {
      setErrors(getApolloErrorMessages(error));
    }
  );

  const handleSaveClick = () => {
    setErrors([]);
    upsertEquipment({
      variables: {
        input: {
          ...newEquipment,
          equipmentCategoryUuid: categoryUuid,
        },
      },
    });
  };

  const handleFormChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewEquipment((old) => {
      const newState = {
        ...old,
        [ev.target.name]:
          ev.target.type === 'number' ? +ev.target.value : ev.target.value,
      };
      return newState;
    });
  };

  const enableSaveButton =
    newEquipment.description &&
    (newEquipment?.total || -1) >= 0 &&
    !addingNewEquipment;

  const title = equipment ? 'Editar Equipo' : 'Agregar Equipo';
  const description = equipment
    ? 'Edita los datos de un equipo'
    : 'Ingresa los detalles de un nuevo equipo.';

  return (
    <Dialog open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{description}</Typography>
        <Divider sx={{ py: '.4rem' }} />
        <EquipmentForm values={newEquipment} onChange={handleFormChange} />
        <Box />
        <Errors errors={errors} addTitle />
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveClick}
          disabled={!enableSaveButton}
        >
          {addingNewEquipment && (
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

export default AddEquipmentDialog;
