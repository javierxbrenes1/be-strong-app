import { useState, ChangeEvent, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useMutation } from '@apollo/client';
import Member from '../../models/Member';
import { getApolloErrorMessages, isValid } from '../utils/helpers';
import ADD_MEASURE from '../../mutations/addMeasure';
import Errors from '../../components/Errors';
import Measure from '../../models/Measure';

const FormContainer = styled('form')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '20px',
  margin: '16px 0',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: '1fr 1fr',
  },
}));

function AddMeasures(props: {
  open: boolean;
  onClose: () => void;
  member: Member | null;
  onSuccess?: (newMeasure: Measure) => void;
}) {
  const { open, onClose, member, onSuccess } = props;
  const [errors, setErrors] = useState<string[]>([]);
  const [measures, setMeasures] = useState<{
    weight?: number;
    corporalFat?: number;
    muscle?: number;
    bodyMassIndex?: number;
    corporalWaterPct?: number;
    calories?: number;
    date: Date;
  }>({
    date: new Date(),
  });
  const [readyToSave, setReadyToSave] = useState(false);

  const [addMeasure, { loading }] = useMutation<{ addMeasure: Measure }>(
    ADD_MEASURE,
    {
      onCompleted(data) {
        if (onSuccess) {
          onSuccess(data.addMeasure);
        }
        onClose();
        toast.success('Medida agregada satisfactoriamente.', {
          position: 'top-right',
        });
      },
      onError(error) {
        setErrors(getApolloErrorMessages(error));
      },
    }
  );

  useEffect(() => {
    const {
      weight,
      corporalFat,
      muscle,
      bodyMassIndex,
      corporalWaterPct,
      calories,
    } = measures;
    setReadyToSave(
      isValid(weight) &&
        isValid(corporalFat) &&
        isValid(muscle) &&
        isValid(bodyMassIndex) &&
        isValid(corporalWaterPct) &&
        isValid(calories)
    );
  }, [measures]);

  const handleInputChanges = (ev: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = ev;
    setMeasures((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleDateChange = (ev: unknown) => {
    const parseEv = ev as { $d: Date };
    setMeasures((prev) => ({ ...prev, date: parseEv.$d }));
  };

  const handleClose = (
    _ev: unknown,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') return;
    onClose();
  };

  const handleSaveClick = () => {
    addMeasure({
      variables: {
        measure: {
          ...measures,
          date: measures.date.getTime(),
          memberCode: member?.code,
        },
      },
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>Nuevas Medidas Corporales</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingresa las medidas corporales que arrojó la balanza para{' '}
          {member?.name}.
        </DialogContentText>
        <FormContainer>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dayjs(measures.date)}
                label="Fecha"
                format="DD/MM/YYYY"
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="weight"
              label="Peso"
              variant="outlined"
              onChange={handleInputChanges}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="corporalFat"
              label="Grasa Corporal"
              variant="outlined"
              onChange={handleInputChanges}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="muscle"
              label="Músculo"
              variant="outlined"
              onChange={handleInputChanges}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="bodyMassIndex"
              label="Indice de masa corporal"
              variant="outlined"
              onChange={handleInputChanges}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="corporalWaterPct"
              label="Pct de agua corporal"
              variant="outlined"
              onChange={handleInputChanges}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              type="number"
              name="calories"
              label="Calorias"
              variant="outlined"
              onChange={handleInputChanges}
            />
          </FormControl>
        </FormContainer>
        <Errors errors={errors} addTitle />
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveClick}
          sx={{ color: '#fff' }}
          disabled={!readyToSave}
        >
          {loading ? (
            <CircularProgress color="primary" size="25px" />
          ) : (
            'Agregar'
          )}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onClose}
          sx={{ color: '#fff' }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMeasures;
