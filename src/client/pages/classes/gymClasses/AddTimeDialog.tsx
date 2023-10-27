import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import useCatalogsStore from '../../../state/catalogState';
import { ADD_TIMES } from '../../../mutations/addClass';
import BsShowError from '../../../components/BsShowError';

type Props = {
  classId: number;
  timeIdsToIgnore: number[];
  onClose: () => void;
};
function AddTimeDialog(props: Props) {
  const { onClose, timeIdsToIgnore, classId } = props;
  const [ids, setIds] = useState<number[]>([]);
  const gymClassUiLabels = useCatalogsStore((state) => state.gymClassUiLabels);

  const [addTimes, { loading }] = useMutation(ADD_TIMES, {
    onError(err) {
      BsShowError(
        err,
        'Hubo un error actualizando la clase, intenta nuevamente, o refresca el browser'
      );
    },
    onCompleted() {
      onClose();
    },
  });

  const timesToRender = gymClassUiLabels.filter(
    (g) => !timeIdsToIgnore.includes(parseInt(g.value))
  );

  const handleCheck = (id: string) => () => {
    setIds((state) => {
      const pars = parseInt(id);
      if (state.includes(pars)) {
        return state.filter((r) => r !== pars);
      }
      return [...state, pars];
    });
  };

  const handleSaveClick = () => {
    addTimes({
      variables: {
        classId,
        timeIds: ids,
      },
    });
  };

  return (
    <Dialog
      open
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Agrega un nuevo horario a la clase.</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Selecciona los horarios que desees agregar a esta clase.
        </DialogContentText>
        <Box sx={{ margin: '10px 0' }}>
          {!timesToRender.length ? (
            <Typography>No hay Horarios disponibles</Typography>
          ) : (
            <FormGroup>
              <Stack direction="row" flexWrap="wrap">
                {timesToRender.map((t) => (
                  <FormControlLabel
                    key={t.value}
                    control={
                      <Checkbox
                        checked={ids.includes(parseInt(t.value))}
                        onChange={handleCheck(t.value)}
                      />
                    }
                    label={t.label}
                  />
                ))}
              </Stack>
            </FormGroup>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveClick}
          sx={{ color: '#fff' }}
          disabled={!ids.length || loading}
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

export default AddTimeDialog;
