import { useRef, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormDatePicker,
  FormNumberField,
  FormTextField,
  zLocalDate,
  zNumber,
} from '../design-system/form';
import AppSheet from '../design-system/AppSheet';
import PageHeader from '../design-system/PageHeader';

const demoSchema = z.object({
  weight: zNumber({ min: 20, max: 300 }),
  date: zLocalDate(),
  email: z.string().email('Correo inválido'),
});
type DemoValues = z.input<typeof demoSchema>;

function DemoForm() {
  const { control, handleSubmit, watch } = useForm<
    DemoValues,
    unknown,
    z.output<typeof demoSchema>
  >({
    resolver: zodResolver(demoSchema),
    defaultValues: { weight: '82', date: '2026-11-03', email: 'no-es-correo' },
  });
  return (
    <Stack
      component="form"
      spacing={2}
      sx={{ maxWidth: 360, my: 3 }}
      onSubmit={handleSubmit(() => undefined)}
    >
      <FormNumberField control={control} name="weight" label="Peso (kg)" />
      <FormDatePicker control={control} name="date" label="Fecha" />
      <FormTextField control={control} name="email" label="Correo" />
      <Button type="submit" variant="contained">
        Validar
      </Button>
      <output data-testid="weight-raw">{watch('weight')}</output>
    </Stack>
  );
}

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
      <DemoForm />
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
