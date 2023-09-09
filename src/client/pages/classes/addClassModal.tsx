/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
  DialogContentText,
  FormControl,
  TextField,
  Stack,
  InputLabel,
  Grid,
  CircularProgress,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import MultipleSelectChip from '../../components/BsMultiSelect';
import useCatalogsStore from '../../state/catalogState';
import { ADD_CLASS } from '../../mutations/addClass';
import GymClass from '../../../common/models/GymClass';
import { isoFormatDate } from '../../utils/helpers';

const initialForm: {
  classDescription?: string;
  classDurationInMinutes?: string;
  classType: string;
  classTimeIds: string[];
} = { classType: '', classTimeIds: [] };

function AddClassModal(props: {
  open: boolean;
  onClose: () => void;
  date: number | null;
}) {
  const { open, onClose, date } = props;
  const gymClassesTimes = useCatalogsStore((state) => state.gymClassUiLabels);
  const [form, setForm] = useState({ ...initialForm });

  const [addClass, { loading }] = useMutation<{ addGymClass: GymClass }>(
    ADD_CLASS,
    {
      refetchQueries: ['getGymClasses'],
      onCompleted() {
        handleClose(null, 'escapeKeyDown');
      },
      onError(err) {
        console.error(err);
        toast.error(
          'Hubo un error creando la clase, intenta nuevamente, o refresca el browser',
          {
            position: 'top-right',
          }
        );
      },
    }
  );

  const updateForm = (name: string, val: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const isValidForm = () => form.classType && form.classTimeIds.length;

  const handleClose = (
    _ev: unknown,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') return;
    setForm({ ...initialForm });
    onClose();
  };

  const handleAddClick = () => {
    if (!date) return;

    addClass({
      variables: {
        input: {
          ...form,
          ...(form.classDurationInMinutes
            ? { classDurationInMinutes: Number(form.classDurationInMinutes) }
            : {}),
          classTimeIds: form.classTimeIds.map(Number),
          classDate: isoFormatDate(new Date(date)),
        },
      },
    });
  };

  return (
    <Dialog fullScreen open={open} onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>Nueva Clase</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingresa los detalles necesarios para crear una nueva clase.
        </DialogContentText>
        <Stack sx={{ margin: '10px 0' }} gap="1rem">
          <Grid container spacing="1rem">
            <FormControl fullWidth component={Grid} item md={4}>
              <TextField
                name="classType"
                label="Tipo de clase *"
                variant="outlined"
                value={form.classType}
                onChange={(ev) => {
                  updateForm('classType', ev.target.value);
                }}
              />
            </FormControl>
            <FormControl fullWidth component={Grid} item md={4}>
              <TextField
                name="classDurationInMinutes"
                label="Duración (en Mins)"
                variant="outlined"
                value={form.classDurationInMinutes}
                type="number"
                onChange={(ev) => {
                  updateForm('classDurationInMinutes', Number(ev.target.value));
                }}
              />
            </FormControl>
            <Grid item md={4} sx={{ width: '100%' }}>
              <FormControl fullWidth sx={{ '& label': { background: '#fff' } }}>
                <MultipleSelectChip
                  options={gymClassesTimes}
                  value={form.classTimeIds}
                  onChange={(vals) => {
                    updateForm('classTimeIds', vals);
                  }}
                  selectLabel="Horarios *"
                />
              </FormControl>
            </Grid>
          </Grid>
          <div data-color-mode="light" style={{ height: '350px' }}>
            <InputLabel>Describe la clase</InputLabel>
            <MDEditor
              height="100%"
              value={form.classDescription}
              onChange={(ev) => {
                updateForm('classDescription', ev ?? '');
              }}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
              }}
            >
              <MDEditor.Markdown
                source={form.classDescription}
                style={{ whiteSpace: 'pre-wrap', background: '#fff' }}
              />
            </MDEditor>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          variant="contained"
          sx={{ color: '#fff' }}
          onClick={handleAddClick}
          disabled={!isValidForm() || loading}
        >
          {loading && <CircularProgress color="primary" size="25px" />}
          Agregar
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            handleClose(null, 'escapeKeyDown');
          }}
          sx={{ color: '#fff' }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddClassModal;
