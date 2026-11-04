import { useRef, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AppSheet from '../design-system/AppSheet';
import PageHeader from '../design-system/PageHeader';

// Banco de pruebas visual; la Task 8 lo completa.
function DesignPage() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const trigger = useRef<HTMLButtonElement>(null);
  return (
    <Box sx={{ p: 3 }}>
      <PageHeader title="Diseño" subtitle="Banco de pruebas" />
      <Button ref={trigger} variant="contained" onClick={() => setOpen(true)}>
        Abrir sheet
      </Button>
      <AppSheet
        open={open}
        onClose={() => setOpen(false)}
        title="Nueva medición"
        subtitle="Demo"
        dirty={text !== ''}
        primaryAction={{ label: 'Guardar', onClick: () => setOpen(false) }}
      >
        <TextField
          label="Peso"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />
      </AppSheet>
    </Box>
  );
}

export default DesignPage;
