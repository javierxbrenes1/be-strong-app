import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import BsLocalizationProvider from '../../components/BsLocalizationProvider';
import ADD_GYM_CLASS_TIME from '../../mutations/addGymClassTime';
import useCatalogsStore from '../../state/catalogState';
import BsShowError from '../../components/BsShowError';

type Props = {
  onClose: () => void;
};
function TimePickerDialog(props: Props) {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [blockButton, setBlockButton] = useState<boolean>(false);
  const reloadCatalogs = useCatalogsStore((state) => state.reloadCatalogs);
  const [addTime, { loading }] = useMutation(ADD_GYM_CLASS_TIME, {
    onCompleted() {
      reloadCatalogs();
      onClose();
    },
    onError(err) {
      BsShowError(
        err,
        'Hubo un error almacenando el tiempo, intenta nuevamente, o refresca el browser'
      );
    },
  });

  const { onClose } = props;
  const handleSaveClick = () => {
    const isoTime = date?.toISOString().split('T')[1];
    if (!isoTime) {
      return;
    }
    addTime({
      variables: {
        isoTime: `T${isoTime}`,
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
        <Box sx={{ margin: '10px 0', width: '100%' }}>
          <BsLocalizationProvider>
            <TimePicker
              value={date}
              sx={{ width: '100%' }}
              ampm
              ampmInClock
              onAccept={(v) => setDate(v)}
              onOpen={() => setBlockButton(true)}
              onClose={() => setBlockButton(false)}
            />
          </BsLocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={handleSaveClick}
          sx={{ color: '#fff' }}
          disabled={loading || blockButton || !date}
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

export default TimePickerDialog;
