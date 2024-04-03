import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

const ConfirmDialog = (props: {
  title: string;
  question: string;
  onAccept: () => void;
  onCancel: () => void;
}) => {
  const { title, question, onAccept, onCancel } = props;

  return (
    <Dialog open>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{question}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAccept} color="success" variant="contained">
          Aceptar
        </Button>
        <Button
          onClick={onCancel}
          color="primary"
          variant="contained"
          sx={{ color: '#fff' }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
