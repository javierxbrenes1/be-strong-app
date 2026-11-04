import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { PageHeader } from '../../design-system';
import { GymClassTimesDocument } from './api';
import AddTimeDialog from './AddTimeDialog';
import { compareLocalTime, formatLocalTime } from '../../../common/dates';

function ConfigPage() {
  const { data } = useQuery(GymClassTimesDocument);
  const [open, setOpen] = useState(false);
  const times = [...(data?.allGymClassTimes ?? [])]
    .filter((t): t is NonNullable<typeof t> => Boolean(t))
    .sort((a, b) => compareLocalTime(a.localTime, b.localTime));

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader title="Configuración" />
      <Card sx={{ p: 3, maxWidth: 720 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h3">Horarios de clase</Typography>
              <Typography variant="body2" color="text.secondary">
                Los horarios disponibles para asignar a las clases.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={() => setOpen(true)}
            >
              Agregar horario
            </Button>
          </Stack>
          <Stack
            component="ul"
            direction="row"
            sx={{ flexWrap: 'wrap', gap: 1, listStyle: 'none', p: 0, m: 0 }}
          >
            {times.map((t) => (
              <li key={t.id}>
                <Chip label={formatLocalTime(t.localTime)} />
              </li>
            ))}
          </Stack>
        </Stack>
      </Card>
      <AddTimeDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default ConfigPage;
