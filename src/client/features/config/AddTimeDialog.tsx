import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { AddGymClassTimeDocument, GymClassTimesDocument } from './api';
import { FormTimePicker, zLocalTime } from '../../design-system/form';
import useCatalogsStore from '../../state/catalogState';
import BsShowError from '../../components/BsShowError';

const schema = z.object({ localTime: zLocalTime() });
type Values = z.infer<typeof schema>;

type Props = { open: boolean; onClose: () => void };

const isDuplicate = (err: unknown) =>
  /P2002|Unique/i.test(JSON.stringify(err, Object.getOwnPropertyNames(err)));

function AddTimeDialog({ open, onClose }: Props) {
  const reloadCatalogs = useCatalogsStore((s) => s.reloadCatalogs);
  const { control, handleSubmit, setError, reset } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { localTime: '' },
  });
  const [addTime, { loading }] = useMutation(AddGymClassTimeDocument, {
    refetchQueries: [GymClassTimesDocument],
  });

  useEffect(() => {
    if (open) reset({ localTime: '' });
  }, [open, reset]);

  const onSubmit = async (values: Values) => {
    try {
      await addTime({ variables: values });
      reloadCatalogs(); // otros módulos aún leen el store de catálogos
      onClose();
    } catch (err) {
      if (isDuplicate(err)) {
        setError('localTime', { message: 'Ese horario ya existe.' });
      } else {
        BsShowError(err, 'No se pudo agregar el horario. Intenta de nuevo.');
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Agregar horario</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Agrega un horario disponible para las clases.
          </DialogContentText>
          <FormTimePicker control={control} name="localTime" label="Hora" />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Agregar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddTimeDialog;
