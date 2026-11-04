import { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import { AddTimesDocument, GymClassesByDayDocument } from './api';
import { GymClassTimesDocument } from '../config/api';
import BsShowError from '../../components/BsShowError';
import { compareLocalTime, formatLocalTime } from '../../../common/dates';

type Props = {
  open: boolean;
  gymClassId: number;
  existingTimeIds: number[];
  onClose: () => void;
};

function AddTimesDialog({ open, gymClassId, existingTimeIds, onClose }: Props) {
  const [selected, setSelected] = useState<number[]>([]);
  const { data } = useQuery(GymClassTimesDocument, { skip: !open });
  const [addTimes, { loading }] = useMutation(AddTimesDocument, {
    refetchQueries: [GymClassesByDayDocument],
  });

  useEffect(() => {
    if (open) setSelected([]);
  }, [open]);

  const missing = [...(data?.allGymClassTimes ?? [])]
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .filter((t) => !existingTimeIds.includes(Number(t.id)))
    .sort((a, b) => compareLocalTime(a.localTime, b.localTime));

  const save = async () => {
    try {
      await addTimes({ variables: { classId: gymClassId, timeIds: selected } });
      toast.success('Horario agregado');
      onClose();
    } catch (err) {
      BsShowError(err, 'No se pudo agregar el horario. Intenta de nuevo.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Agregar horario a la clase</DialogTitle>
      <DialogContent>
        <FormGroup>
          {missing.map((t) => (
            <FormControlLabel
              key={t.id}
              label={formatLocalTime(t.localTime)}
              control={
                <Checkbox
                  checked={selected.includes(Number(t.id))}
                  onChange={(e) =>
                    setSelected((s) =>
                      e.target.checked
                        ? [...s, Number(t.id)]
                        : s.filter((id) => id !== Number(t.id))
                    )
                  }
                />
              }
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          disabled={!selected.length || loading}
          onClick={save}
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTimesDialog;
