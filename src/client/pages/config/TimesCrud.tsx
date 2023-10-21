import { IconButton, Paper, Stack, Typography } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';
import useCatalogsStore from '../../state/catalogState';
import TimePickerDialog from './TimePickerDialog';

function TimesCrud() {
  const gymClassUiLabels = useCatalogsStore((state) => state.gymClassUiLabels);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <Paper elevation={3} sx={{ padding: '10px' }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Horarios de clases</Typography>
          <IconButton onClick={() => setOpenModal(true)}>
            <AddCircleIcon />
          </IconButton>
        </Stack>
        <Typography variant="body2">
          Los horarios de clases son previamente indicados para mantener el
          order de los datos.
        </Typography>
        <Stack
          direction="row"
          gap="1rem"
          flexWrap="wrap"
          sx={{ margin: '10px 0' }}
        >
          {gymClassUiLabels.map((f) => (
            <Paper key={f.value} sx={{ padding: '10px' }}>
              <Typography variant="body2">{f.label}</Typography>
            </Paper>
          ))}
        </Stack>
      </Paper>
      {openModal && <TimePickerDialog onClose={() => setOpenModal(false)} />}
    </>
  );
}

export default TimesCrud;
