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
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';
import MultipleSelectChip from '../../components/BsMultiSelect';
import useCatalogsStore from '../../state/catalogState';

const initialForm = {
  classDescription: '',
  classDurationInMinutes: '',
  classType: '',
  classTimeIds: [],
};

function AddClassModal(props: { open: boolean; onClose: () => void }) {
  const { open, onClose } = props;
  const gymClassesTimes = useCatalogsStore((state) => state.gymClassUiLabels);
  const [form, setForm] = useState({ ...initialForm });

  const updateForm = (name: string, val: string | number | string[]) => {
    setForm((prev) => ({ ...prev, [name]: val }));
  };

  const isValidForm = () => {
    const valid = Object.values(form).every((v) =>
      Array.isArray(v) ? v.length > 0 : !!v
    );
    return valid;
  };
  const handleClose = (
    _ev: unknown,
    reason: 'backdropClick' | 'escapeKeyDown'
  ) => {
    if (reason === 'backdropClick') return;
    setForm({ ...initialForm });
    onClose();
  };

  console.log({ form, isValid: isValidForm() });

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
                label="Tipo de clase"
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
                  selectLabel="Horarios"
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
          disabled={!isValidForm()}
        >
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
