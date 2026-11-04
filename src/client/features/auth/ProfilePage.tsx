import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { PageHeader } from '../../design-system';
import { WhoAmIDocument } from './api';
import ChangePasswordSheet from './ChangePasswordSheet';
import { formatInstant } from '../../../common/dates';

function Field({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </Box>
  );
}

function ProfilePage() {
  const { data } = useQuery(WhoAmIDocument);
  const [open, setOpen] = useState(false);
  const me = data?.whoAmI;

  return (
    <Box sx={{ p: { xs: 2, md: 4 } }}>
      <PageHeader title="Mi perfil" />
      <Card sx={{ p: 3, maxWidth: 560 }}>
        <Stack spacing={2.5}>
          <Field label="Nombre" value={me?.name || 'No definido'} />
          <Field label="Usuario" value={me?.username || 'No definido'} />
          <Field label="Correo" value={me?.email || 'No definido'} />
          <Field label="Rol" value={me?.role || 'No definido'} />
          <Field
            label="Último cambio de contraseña"
            value={
              me?.lastPasswordChangeDate
                ? formatInstant(me.lastPasswordChangeDate)
                : 'Nunca'
            }
          />
          <Box>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Cambiar contraseña
            </Button>
          </Box>
        </Stack>
      </Card>
      <ChangePasswordSheet open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default ProfilePage;
