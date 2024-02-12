import { useState, ChangeEvent } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  DialogActions,
  styled,
  FormControl,
  TextField,
} from '@mui/material';
import dayjs from 'dayjs';
import BsShowError from '../../components/BsShowError';
import Measure from '../../../common/models/Measure';
import { MEASURES_TITLES } from '../../labels';
import { useUpdateMeasure } from '../../hooks/useUpdateMeasure';
import { GENERAL_ERROR_MESSAGES } from '../../constants';
import { CrudAction } from '../../types';
import { useMemberContext } from '../member/MemberContext';

const FormContainer = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  margin: '16px 0',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

function EditMeasures(props: {
  onClose: () => void;
  memberCode: string;
  measure: Measure;
}) {
  const { onClose, measure, memberCode } = props;

  const { triggerReloadMeasures } = useMemberContext();
  const { executeUpdateMeasure, updatingMeasure } = useUpdateMeasure(
    (error, action) => {
      BsShowError(error, GENERAL_ERROR_MESSAGES[action as CrudAction]);
    },
    () => {
      onClose();
      triggerReloadMeasures();
    }
  );

  const [editableMeasure, setEditableMeasure] = useState<
    Record<string, number>
  >({});

  const handleInputChanges = (ev: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = ev;
    setEditableMeasure((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleClose = (
    _ev: unknown,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') return;
    onClose();
  };

  const handleSaveClick = () => {
    executeUpdateMeasure({
      variables: {
        measure: {
          id: measure.id,
          ...editableMeasure,
          memberCode,
        },
      },
    });
  };

  return (
    <Dialog open onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>
        Medidas tomadas el {dayjs(measure.date).format('DD/MM/YYYY')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Puedes modificar el valor que desees.
        </DialogContentText>
        <FormContainer>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="weight"
              label={MEASURES_TITLES.weight}
              variant="outlined"
              onChange={handleInputChanges}
              value={editableMeasure.weight ?? measure.weight}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="corporalFat"
              label={MEASURES_TITLES.corporalFat}
              variant="outlined"
              onChange={handleInputChanges}
              value={editableMeasure.corporalFat ?? measure.corporalFat}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="muscle"
              label={MEASURES_TITLES.muscle}
              variant="outlined"
              onChange={handleInputChanges}
              value={editableMeasure.muscle ?? measure.muscle}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="bodyMassIndex"
              label={MEASURES_TITLES.bodyMassIndex}
              variant="outlined"
              onChange={handleInputChanges}
              value={editableMeasure.bodyMassIndex ?? measure.bodyMassIndex}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="corporalWaterPct"
              label={MEASURES_TITLES.corporalWaterPct}
              variant="outlined"
              onChange={handleInputChanges}
              value={
                editableMeasure.corporalWaterPct ?? measure.corporalWaterPct
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="calories"
              label={MEASURES_TITLES.calories}
              variant="outlined"
              onChange={handleInputChanges}
              value={editableMeasure.calories ?? measure.calories}
            />
          </FormControl>
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveClick}
          sx={{ color: '#fff' }}
          disabled={updatingMeasure}
        >
          {updatingMeasure ? (
            <CircularProgress color="primary" size="25px" />
          ) : (
            'Actualizar'
          )}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onClose}
          sx={{ color: '#fff' }}
          disabled={updatingMeasure}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditMeasures;
