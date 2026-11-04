import { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  AppSheet,
  Column,
  ConfirmDialog,
  DataTable,
  EmptyState,
  KpiCard,
  MemberAvatar,
  MetricCard,
  PageHeader,
  StatusChip,
} from '../design-system';
import {
  FormDatePicker,
  FormNumberField,
  FormTextField,
  FormTimePicker,
  zLocalDate,
  zNumber,
} from '../design-system/form';
import ThemeModeToggle from './ThemeModeToggle';
import useChartColors from './useChartColors';

const demoSchema = z.object({
  weight: zNumber({ min: 20, max: 300 }),
  date: zLocalDate(),
  time: z.string(),
  email: z.string().email('Correo inválido'),
});
type DemoValues = z.input<typeof demoSchema>;

function DemoForm({ formId }: { formId?: string }) {
  const { control, handleSubmit, watch } = useForm<
    DemoValues,
    unknown,
    z.output<typeof demoSchema>
  >({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      weight: '82',
      date: '2026-11-03',
      time: '17:30',
      email: 'no-es-correo',
    },
  });
  return (
    <Box
      component="form"
      id={formId}
      sx={{ display: 'grid', gap: 2, maxWidth: 360 }}
      onSubmit={handleSubmit(() => undefined)}
    >
      <FormNumberField control={control} name="weight" label="Peso (kg)" />
      <FormDatePicker control={control} name="date" label="Fecha" />
      <FormTimePicker control={control} name="time" label="Hora" />
      <FormTextField control={control} name="email" label="Correo" />
      <Button type="submit" variant="contained">
        Validar
      </Button>
      <output data-testid="weight-raw" hidden>
        {watch('weight')}
      </output>
    </Box>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Box component="section" sx={{ mb: 5 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
}

type MemberRow = {
  code: string;
  name: string;
  category: string;
  last: string;
  active: boolean;
  weight: string;
};

const MEMBERS: MemberRow[] = [
  {
    code: 'BS-fd55o1b',
    name: 'Carlos Jiménez Mora',
    category: 'A2',
    last: 'Hoy',
    active: true,
    weight: '78.0',
  },
  {
    code: 'BS-1a2cxkx',
    name: 'Ana Lucía Vargas',
    category: 'B1',
    last: 'Ayer',
    active: true,
    weight: '61.2',
  },
  {
    code: 'BS-ggewev1',
    name: 'Andrés Quesada Pérez',
    category: 'A1',
    last: 'Hace 16 días',
    active: false,
    weight: '90.5',
  },
  {
    code: 'BS-17buw7a',
    name: 'Gabriela Núñez Soto',
    category: 'B2',
    last: 'Hace 3 días',
    active: true,
    weight: '58.9',
  },
];

const COLUMNS: Column<MemberRow>[] = [
  {
    id: 'name',
    header: 'Miembro',
    render: (m) => (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <MemberAvatar name={m.name} />
        <Box>
          <Typography sx={{ fontWeight: 600 }}>{m.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {m.code}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    id: 'cat',
    header: 'Categoría',
    render: (m) => m.category,
    hideBelow: 'sm',
  },
  {
    id: 'last',
    header: 'Última asistencia',
    render: (m) => m.last,
    hideBelow: 'md',
  },
  {
    id: 'state',
    header: 'Estado',
    render: (m) => (
      <StatusChip
        variant={m.active ? 'success' : 'neutral'}
        label={m.active ? 'Activo' : 'Inactivo'}
      />
    ),
  },
  { id: 'w', header: 'Peso', align: 'right', render: (m) => m.weight },
];

const SPARK = [80.4, 79.6, 78.8, 78.0];

function WeekBars() {
  const c = useChartColors();
  const data = [3, 5, 2, 6, 4, 1, 2];
  return (
    <Box
      role="img"
      aria-label="Asistencia de los últimos 7 días"
      sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, height: 80 }}
    >
      {data.map((v, i) => (
        <Box
          key={i}
          sx={{
            flex: 1,
            height: `${v * 14}%`,
            bgcolor: c.primary,
            borderRadius: '4px 4px 0 0',
          }}
        />
      ))}
    </Box>
  );
}

type SheetKind = 'measure' | 'member' | 'attendance' | null;

function DesignPage() {
  const [sheet, setSheet] = useState<SheetKind>(null);
  const [confirm, setConfirm] = useState(false);
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState('Peso');
  const [dirtyText, setDirtyText] = useState('');
  const closeSheet = () => {
    setSheet(null);
    setDirtyText('');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100 }}>
      <PageHeader
        title="Diseño"
        subtitle="Banco de pruebas visual (solo desarrollo)"
        actions={<ThemeModeToggle force />}
      />

      <Section title="Login">
        <Card sx={{ p: 3, maxWidth: 360, display: 'grid', gap: 2 }}>
          <Typography variant="h2">Be Strong</Typography>
          <Typography color="text.secondary">
            Ingresa para administrar tu gimnasio
          </Typography>
          <TextField label="Usuario" />
          <TextField label="Contraseña" type="password" />
          <Typography variant="body2" color="error">
            Usuario o contraseña incorrectos.
          </Typography>
          <Button variant="contained">Ingresar</Button>
        </Card>
      </Section>

      <Section title="Inicio · Hoy">
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, sm: 4 }}>
            <KpiCard
              label="Miembros activos"
              value={9}
              delta={{ text: '↑ 1 este mes', good: true }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <KpiCard
              label="Asistencias esta semana"
              value={23}
              delta={{ text: '↓ 4 vs. anterior', good: false }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 4 }}>
            <KpiCard label="Clases hoy" value={2} hint="6 asistentes" />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Card sx={{ p: 2 }}>
              <Typography variant="h4" sx={{ mb: 1 }}>
                Clases de hoy
              </Typography>
              {[
                ['5:30 PM', 'Funcional', '60 min · 4 de 9 en plan'],
                ['7:00 PM', 'Boxeo', '45 min · 2 de 9 en plan'],
              ].map(([time, name, meta]) => (
                <Box
                  key={name}
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}
                >
                  <Typography variant="metric" sx={{ minWidth: 96 }}>
                    {time}
                  </Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {meta}
                    </Typography>
                  </Box>
                  <Button
                    variant="outlined"
                    onClick={() => setSheet('attendance')}
                  >
                    Pasar lista
                  </Button>
                </Box>
              ))}
              <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Asistencia últimos 7 días
              </Typography>
              <WeekBars />
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card sx={{ p: 2, display: 'grid', gap: 1.5 }}>
              <Typography variant="h4">Recordatorios</Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <StatusChip variant="info" label="Cumpleaños" />
                <Typography variant="body2">
                  Ana Lucía Vargas cumple hoy
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <StatusChip variant="warning" label="Ausencia" />
                <Typography variant="body2">
                  3 miembros sin venir hace +14 días
                </Typography>
                <Button size="small">Ver</Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <StatusChip variant="danger" label="Medición" />
                <Typography variant="body2">
                  5 miembros sin medirse hace +90 días
                </Typography>
                <Button size="small">Ver</Button>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Section>

      <Section title="Miembros · lista densa">
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setSheet('member')}
          >
            Nuevo miembro
          </Button>
        </Box>
        <Card>
          <DataTable
            columns={COLUMNS}
            rows={MEMBERS}
            getRowId={(m) => m.code}
            onRowClick={() => undefined}
            pagination={{
              page: 0,
              pageSize: 10,
              total: MEMBERS.length,
              onPageChange: () => undefined,
            }}
          />
        </Card>
        <Card sx={{ mt: 2 }}>
          <DataTable
            columns={COLUMNS}
            rows={[]}
            getRowId={(m) => m.code}
            loading
          />
        </Card>
        <Card sx={{ mt: 2 }}>
          <DataTable
            columns={COLUMNS}
            rows={[]}
            getRowId={(m) => m.code}
            empty={
              <EmptyState
                icon={<PeopleAltRoundedIcon fontSize="large" />}
                title="Sin miembros"
                description="Aún no hay miembros con este filtro."
              />
            }
          />
        </Card>
      </Section>

      <Section title="Detalle de miembro">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 2,
          }}
        >
          <MemberAvatar name="Carlos Jiménez Mora" size={56} />
          <Box sx={{ flex: 1, minWidth: 180 }}>
            <Typography variant="h2">Carlos Jiménez Mora</Typography>
            <Typography variant="body2" color="text.secondary">
              BS-fd55o1b · A2
            </Typography>
          </Box>
          <StatusChip variant="success" label="Activo" />
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={() => setSheet('measure')}
          >
            Medición
          </Button>
        </Box>
        <Tabs
          variant="scrollable"
          allowScrollButtonsMobile
          value={tab}
          onChange={(_e, v: number) => setTab(v)}
          sx={{ mb: 2 }}
        >
          {['Resumen', 'Medidas', 'Asistencia', 'Datos'].map((t) => (
            <Tab key={t} label={t} />
          ))}
        </Tabs>
        <Grid container spacing={2}>
          {[
            [
              'Peso',
              '78.0',
              'kg',
              { variant: 'success' as const, label: 'Peso normal' },
            ],
            [
              'IMC',
              '24.1',
              '',
              { variant: 'success' as const, label: 'Normal' },
            ],
            [
              'Grasa',
              '21.5',
              '%',
              { variant: 'warning' as const, label: 'Regular' },
            ],
            ['Agua', '54', '%', { variant: 'info' as const, label: 'Bueno' }],
            [
              'Músculo',
              '40.2',
              'kg',
              { variant: 'danger' as const, label: 'Sobrepeso' },
            ],
            [
              'Calorías',
              '2150',
              'kcal',
              { variant: 'neutral' as const, label: 'Indefinido' },
            ],
          ].map(([label, value, unit, status]) => (
            <Grid key={label as string} size={{ xs: 6, md: 4 }}>
              <MetricCard
                label={label as string}
                value={value as string}
                unit={unit as string}
                status={status as { variant: 'success'; label: string }}
                delta={{ value: -0.8, good: true }}
                spark={SPARK}
                selected={selected === label}
                onSelect={() => setSelected(label as string)}
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Botones y chips">
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Button variant="contained">Guardar</Button>
          <Button variant="outlined">Cancelar</Button>
          <Button>Ghost</Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => setConfirm(true)}
          >
            Eliminar…
          </Button>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <StatusChip variant="success" label="Peso normal" />
          <StatusChip variant="warning" label="Regular" />
          <StatusChip variant="danger" label="Sobrepeso" />
          <StatusChip variant="info" label="Bueno" />
          <StatusChip variant="neutral" label="Indefinido" />
        </Box>
      </Section>

      <Section title="Tipografía">
        <Typography
          variant="h1"
          sx={{ fontSize: { xs: '2.5rem', md: '6rem' } }}
        >
          Barlow Condensed — titulares
        </Typography>
        <Typography variant="metric">78.0 kg</Typography>
        <Typography>
          Inter para el cuerpo de texto, formularios y tablas. Legible a
          13–14px.
        </Typography>
      </Section>

      <Section title="Formulario">
        <DemoForm />
      </Section>

      <AppSheet
        open={sheet === 'measure'}
        onClose={closeSheet}
        title="Nueva medición"
        subtitle="Carlos Jiménez Mora"
        dirty={dirtyText !== ''}
        primaryAction={{ label: 'Guardar', onClick: closeSheet }}
      >
        <TextField
          label="Peso (kg)"
          value={dirtyText}
          onChange={(e) => setDirtyText(e.target.value)}
          fullWidth
        />
      </AppSheet>
      <AppSheet
        open={sheet === 'member'}
        onClose={closeSheet}
        title="Nuevo miembro"
        size="wide"
        primaryAction={{ label: 'Crear', type: 'submit', form: 'member-form' }}
      >
        <DemoForm formId="member-form" />
      </AppSheet>
      <AppSheet
        open={sheet === 'attendance'}
        onClose={closeSheet}
        title="Pasar lista"
        subtitle="Funcional · 5:30 PM"
        primaryAction={{ label: 'Listo', onClick: closeSheet }}
      >
        {MEMBERS.map((m) => (
          <Box
            key={m.code}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}
          >
            <MemberAvatar name={m.name} />
            <Typography>{m.name}</Typography>
          </Box>
        ))}
      </AppSheet>
      <ConfirmDialog
        open={confirm}
        title="¿Eliminar medición?"
        description="Se eliminarán todos los valores del 03/08/2026. Esta acción no se puede deshacer."
        onCancel={() => setConfirm(false)}
        onConfirm={() => setConfirm(false)}
      />
    </Box>
  );
}

export default DesignPage;
