import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  ButtonBase,
  Card,
  Container,
  CssBaseline,
  MenuItem,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import theme from '../../app/theme';
import { Column, DataTable, EmptyState, MetricCard } from '../../design-system';
import MeasureChart from '../measures/MeasureChart';
import RangeFilter, { Range } from '../measures/RangeFilter';
import { rangePresets } from '../measures/rangePresets';
import {
  FirstAttendanceDocument,
  MemberMeasuresDocument,
} from '../member-detail/api';
import { attendanceYears } from '../member-detail/attendanceYears';
import {
  MEASURE_METRICS,
  MetricKey,
  MeasureValues,
  isGoodDelta,
  resultVariant,
} from '../measures/metrics';
import {
  formatInstant,
  formatInstantReadable,
  formatLocalDate,
  formatLocalTime,
  todayLocalDate,
} from '../../../common/dates';
import {
  VisitAttendanceByYearDocument,
  VisitAttendanceMonthDocument,
  VisitMemberDocument,
} from './api';
import VisitNotFound from './VisitNotFound';
import { decodeVisitCode } from './visitCode';

const MONTHS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

type Row = MeasureValues & {
  id?: string | number | null;
  date?: number | null;
};

function MonthClasses({
  code,
  year,
  month,
}: {
  code: string;
  year: number;
  month: number;
}) {
  const { data, loading } = useQuery(VisitAttendanceMonthDocument, {
    variables: { year, month, memberCode: code },
  });
  const classes = (data?.getMemberAttendanceLogsDetails ?? []).filter(
    (c): c is NonNullable<typeof c> => Boolean(c)
  );
  if (loading) return <Skeleton height={48} />;
  if (!classes.length)
    return <Typography color="text.secondary">Sin clases este mes.</Typography>;
  return (
    <Stack spacing={1}>
      {classes.map((c, i) => (
        <Box key={i}>
          <Typography variant="body1">
            {[
              c.classDate && formatLocalDate(c.classDate),
              c.localTime && formatLocalTime(c.localTime),
            ]
              .filter(Boolean)
              .join(' · ')}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {[
              c.classType,
              c.classDurationInMinutes && `${c.classDurationInMinutes} min`,
            ]
              .filter(Boolean)
              .join(' · ')}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}

function Attendance({ code }: { code: string }) {
  const first = useQuery(FirstAttendanceDocument, {
    variables: { memberCode: code },
  });
  const years = attendanceYears(
    first.data?.getMemberAttendanceClasses?.[0]?.classDate ?? null,
    todayLocalDate()
  );
  const [selectedYear, setYear] = useState<number | null>(null);
  const year = selectedYear ?? years[0];
  const [month, setMonth] = useState<number | null>(null);
  const { data } = useQuery(VisitAttendanceByYearDocument, {
    variables: { year, memberCode: code },
  });
  const counts = Array<number>(12).fill(0);
  data?.getMemberAttendanceLogByYear?.forEach((r) => {
    if (r?.month != null) counts[r.month - 1] = r.total ?? 0;
  });
  const total = counts.reduce((a, b) => a + b, 0);
  return (
    <Card sx={{ p: 2 }}>
      <Stack
        direction="row"
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography variant="h3">Asistencia {year}</Typography>
        {years.length > 1 && (
          <TextField
            select
            size="small"
            label="Año"
            value={year}
            onChange={(e) => {
              setYear(Number(e.target.value));
              setMonth(null);
            }}
            sx={{ minWidth: 100 }}
          >
            {years.map((y) => (
              <MenuItem key={y} value={y}>
                {y}
              </MenuItem>
            ))}
          </TextField>
        )}
      </Stack>
      <Typography variant="metric">{total}</Typography>
      <Typography variant="body2" color="text.secondary">
        clases en el año
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          mt: 2,
        }}
      >
        {counts.map((n, i) => (
          <Card key={MONTHS[i]} sx={{ opacity: n ? 1 : 0.6 }}>
            <ButtonBase
              onClick={() => setMonth(month === i + 1 ? null : i + 1)}
              aria-pressed={month === i + 1}
              aria-label={`${MONTHS[i]}: ${n} clases`}
              sx={{ display: 'block', width: '100%', p: 1, textAlign: 'left' }}
            >
              <Typography variant="body2" color="text.secondary">
                {MONTHS[i]}
              </Typography>
              <Typography variant="metric">{n}</Typography>
            </ButtonBase>
          </Card>
        ))}
      </Box>
      {month != null && (
        <Box sx={{ mt: 2 }}>
          <MonthClasses code={code} year={year} month={month} />
        </Box>
      )}
    </Card>
  );
}

const MAX_ROWS = 1000;

function Measures({
  code,
  last,
  chronological,
}: {
  code: string;
  last: Row & Record<string, unknown>;
  chronological: Row[];
}) {
  const [selected, setSelected] = useState<MetricKey>('weight');
  const [dir, setDir] = useState<'asc' | 'desc'>('desc');
  const metric = MEASURE_METRICS.find((m) => m.key === selected)!;
  const today = todayLocalDate();
  // Arranca donde la vista anterior: desde la más antigua de las últimas 12 mediciones.
  const [range, setRange] = useState<Range>(() => {
    const oldest = chronological[0]?.date;
    return {
      from:
        oldest != null
          ? formatInstant(oldest, 'YYYY-MM-DD')
          : rangePresets(today)[0].from,
      to: today,
    };
  });
  const { data } = useQuery(MemberMeasuresDocument, {
    variables: {
      input: { memberCode: code, offset: 0, limit: MAX_ROWS, filters: range },
    },
    fetchPolicy: 'cache-and-network',
  });
  // getMeasures devuelve ascendente; mientras carga se muestran las 12 iniciales.
  const series = useMemo(
    () =>
      data
        ? ((data.getMeasures?.measures ?? []).filter(Boolean) as Row[])
        : chronological,
    [data, chronological]
  );
  const points = series.flatMap((r) =>
    r.date != null && r[selected] != null
      ? [{ date: r.date, value: r[selected] }]
      : []
  );
  const columns: Column<Row>[] = [
    {
      id: 'date',
      header: 'Fecha',
      render: (r) => (r.date ? formatInstantReadable(r.date) : '—'),
      sortable: true,
    },
    ...MEASURE_METRICS.map((m) => ({
      id: m.key,
      header: m.label,
      align: 'right' as const,
      render: (r: Row) => (r[m.key] == null ? '—' : String(r[m.key])),
    })),
  ];
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {MEASURE_METRICS.map((m) => {
          const value = last[m.key];
          const diff = last[m.diffKey] as number | null | undefined;
          const result = m.resultKey
            ? (last[m.resultKey] as string | null | undefined)
            : undefined;
          return (
            <MetricCard
              key={m.key}
              label={m.label}
              value={value == null ? '—' : String(value)}
              unit={m.unit}
              status={
                result
                  ? { variant: resultVariant(result), label: result }
                  : undefined
              }
              delta={
                diff
                  ? { value: diff, good: isGoodDelta(m.key, diff) }
                  : undefined
              }
              spark={chronological
                .map((r) => r[m.key])
                .filter((v): v is number => v != null)}
              selected={selected === m.key}
              onSelect={() => setSelected(m.key)}
            />
          );
        })}
      </Box>
      <Card sx={{ p: 2 }}>
        <Stack
          direction="row"
          sx={{ mb: 1, alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="h3">{metric.label}</Typography>
          <RangeFilter value={range} onChange={setRange} />
        </Stack>
        <MeasureChart points={points} kind="line" label={metric.label} />
      </Card>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
          <Typography sx={{ fontWeight: 600 }}>
            Ver todas las mediciones
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ p: 0 }}>
          <DataTable
            columns={columns}
            rows={dir === 'asc' ? series : [...series].reverse()}
            sort={{
              dir,
              onToggle: () => setDir((d) => (d === 'asc' ? 'desc' : 'asc')),
            }}
            getRowId={(r) => String(r.id ?? r.date)}
          />
        </AccordionDetails>
      </Accordion>
    </>
  );
}

function VisitContent({ code }: { code: string | null }) {
  const { data, loading, error } = useQuery(VisitMemberDocument, {
    variables: { code: code ?? '' },
    skip: !code,
  });
  if (!code) return <VisitNotFound />;
  if (loading)
    return (
      <Stack spacing={2} aria-label="Cargando">
        <Skeleton variant="text" width="60%" height={40} />
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} variant="rounded" height={132} />
          ))}
        </Box>
        <Skeleton variant="rounded" height={240} />
      </Stack>
    );
  const member = data?.getVisitMember;
  if (error || !member) return <VisitNotFound />;

  // memberMeasures llega desc; los gráficos y sparklines van cronológicos.
  const chronological = [...(member.memberMeasures ?? [])]
    .reverse()
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const last = member.lastMeasure ?? chronological[chronological.length - 1];
  const firstName = member.name?.split(' ')[0] ?? '';
  return (
    <Stack spacing={2}>
      <Box>
        <Typography variant="h2" component="h1">
          Hola, {firstName} 👋
        </Typography>
        {last?.date && (
          <Typography color="text.secondary">
            Tu última medición: {formatInstant(last.date, 'DD/MM/YYYY')}
          </Typography>
        )}
      </Box>
      {last ? (
        <Measures code={code} last={last} chronological={chronological} />
      ) : (
        <EmptyState title="Aún no tienes mediciones registradas." />
      )}
      <Attendance code={code} />
    </Stack>
  );
}

function VisitPage() {
  const [params] = useSearchParams();
  const code = decodeVisitCode(params.get('code'));
  // El proveedor cuelga de este nodo (no de <html>) para no pisar el modo del admin.
  const [node, setNode] = useState<HTMLElement | null>(null);
  return (
    <Box ref={setNode} sx={{ minHeight: '100vh' }}>
      {node && (
        <ThemeProvider
          theme={theme}
          defaultMode="system"
          modeStorageKey="bs-visit-mode"
          colorSchemeStorageKey="bs-visit-color-scheme"
          // shortcut: colorSchemeNode y disableNestedContext están en runtime pero no en los tipos de MUI; quitar al tiparse.
          {...{ colorSchemeNode: node, disableNestedContext: true }}
        >
          <CssBaseline />
          <Box
            sx={{
              minHeight: '100vh',
              bgcolor: 'background.default',
              color: 'text.primary',
            }}
          >
            <Box
              component="header"
              sx={{
                bgcolor: 'nav.bg',
                color: 'nav.text',
                py: 1.5,
                px: 2,
              }}
            >
              <Container
                maxWidth="md"
                disableGutters
                sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}
              >
                <Avatar src="/images/logo.jpeg" alt="Be Strong" />
                <Typography variant="h3" component="span" color="inherit">
                  Be Strong
                </Typography>
              </Container>
            </Box>
            <Container maxWidth="md" sx={{ py: 3 }}>
              <VisitContent code={code} />
            </Container>
            <Typography
              component="footer"
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center', pb: 3 }}
            >
              Be Strong · {new Date().getFullYear()}
            </Typography>
          </Box>
        </ThemeProvider>
      )}
    </Box>
  );
}

export default VisitPage;
