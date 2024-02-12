import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import Measure from '../../../../common/models/Measure';
import useDeleteMeasure from './useDeleteMeasure';
import { formatDate } from '../../../utils/helpers';
import { useMemberContext } from '../MemberContext';

function DeleteConfirmationModal(props: {
  onClose: () => void;
  measure: Measure;
  memberCode: string;
}) {
  const { lastMeasureId, triggerReloadLastMeasure, triggerReloadMeasures } =
    useMemberContext();
  const { deleteMeasure, deletingMeasure } = useDeleteMeasure(() => {
    onClose();
    triggerReloadMeasures();
    if (lastMeasureId === measure.id) {
      triggerReloadLastMeasure();
    }
  });
  const { onClose, measure, memberCode } = props;
  return (
    <Dialog
      open
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Eliminar Medida</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Seguro que deseas eliminar el registro de medición ?
          <br />
          <Typography component="span" variant="subtitle1">
            Al hacerlo eliminarás todos los datos de medidas para la fecha{' '}
            {formatDate(measure.date)}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          onClick={() => {
            deleteMeasure({
              variables: {
                id: measure.id,
                memberCode,
              },
            });
          }}
          sx={{ color: '#fff' }}
          disabled={deletingMeasure}
        >
          {deletingMeasure ? (
            <CircularProgress color="primary" size="25px" />
          ) : (
            'Aceptar'
          )}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onClose}
          sx={{ color: '#fff' }}
          disabled={deletingMeasure}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationModal;
