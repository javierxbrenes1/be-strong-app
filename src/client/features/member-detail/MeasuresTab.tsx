import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { toast } from 'react-toastify';
import {
  Box,
  Button,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ArrowUpwardRoundedIcon from '@mui/icons-material/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ShowChartRoundedIcon from '@mui/icons-material/ShowChartRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import {
  Column,
  ConfirmDialog,
  DataTable,
  EmptyState,
  StatusChip,
} from '../../design-system';
import {
  DeleteMeasureDocument,
  MemberDetailDocument,
  MemberMeasuresDocument,
} from './api';
import MeasureChart from '../measures/MeasureChart';
import RangeFilter, { Range } from '../measures/RangeFilter';
import ReferenceTableDialog, {
  REFERENCE_IMAGES,
} from '../measures/ReferenceTableDialog';
import {
  MEASURE_METRICS,
  MeasureValues,
  MetricKey,
  isGoodDelta,
  resultVariant,
} from '../measures/metrics';
import { rangePresets } from '../measures/rangePresets';
import BsShowError from '../../components/BsShowError';
import { formatInstantReadable, todayLocalDate } from '../../../common/dates';

export type MeasureRow = MeasureValues & {
  id: number;
  date?: number | null;
} & Record<string, unknown>;

type Props = {
  code: string;
  onEdit: (measure: MeasureRow, previous?: MeasureRow) => void;
};

const PAGE_SIZE = 10;
const MAX_ROWS = 1000;

function MeasuresTab({ code, onEdit }: Props) {
  const [metricKey, setMetricKey] = useState<MetricKey>('weight');
  const [kind, setKind] = useState<'line' | 'bar'>('line');
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [range, setRange] = useState<Range>(() => {
    const p = rangePresets(todayLocalDate()).find((r) => r.id === '3m');
    return { from: p?.from ?? '', to: p?.to ?? '' };
  });
  const [toDelete, setToDelete] = useState<MeasureRow | null>(null);
  const [referenceOpen, setReferenceOpen] = useState(false);
  const metric =
    MEASURE_METRICS.find((m) => m.key === metricKey) ?? MEASURE_METRICS[0];

  const { data, loading } = useQuery(MemberMeasuresDocument, {
    variables: {
      input: { memberCode: code, offset: 0, limit: MAX_ROWS, filters: range },
    },
    fetchPolicy: 'cache-and-network',
  });
  const [deleteMeasure, deleting] = useMutation(DeleteMeasureDocument, {
    refetchQueries: [MemberDetailDocument, MemberMeasuresDocument],
  });

  const rows = useMemo(
    () =>
      (data?.getMeasures?.measures ?? []).filter(
        (m): m is NonNullable<typeof m> => Boolean(m)
      ) as MeasureRow[],
    [data]
  );
  const points = rows
    .filter((r) => r.date != null && r[metricKey] != null)
    .map((r) => ({ date: r.date as number, value: r[metricKey] as number }));
  // Al borrar la última fila de la última página, la página deja de existir.
  const safePage = Math.min(
    page,
    Math.max(0, Math.ceil(rows.length / PAGE_SIZE) - 1)
  );
  // El servidor devuelve ascendente por fecha; la tabla se invierte, el gráfico no.
  const sorted = dir === 'asc' ? rows : [...rows].reverse();
  const pageRows = sorted.slice(
    safePage * PAGE_SIZE,
    (safePage + 1) * PAGE_SIZE
  );
  const dateOf = (r: MeasureRow) =>
    r.date == null ? '' : formatInstantReadable(r.date);

  const confirmDelete = () => {
    if (!toDelete) return;
    deleteMeasure({ variables: { id: toDelete.id, memberCode: code } })
      .then(() => {
        toast.success('Medición eliminada');
        setToDelete(null);
      })
      .catch((err) => BsShowError(err, 'No se pudo eliminar la medición.'));
  };

  const columns: Column<MeasureRow>[] = [
    { id: 'date', header: 'Fecha', render: dateOf, sortable: true },
    {
      id: 'value',
      header: 'Valor',
      align: 'right',
      render: (r) =>
        r[metricKey] == null ? '—' : `${r[metricKey]} ${metric.unit}`.trim(),
    },
    {
      id: 'delta',
      header: 'Δ',
      align: 'right',
      render: (r) => {
        const d = r[metric.diffKey] as number | null | undefined;
        if (!d) return '—';
        const Arrow = d < 0 ? ArrowDownwardRoundedIcon : ArrowUpwardRoundedIcon;
        return (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              color: isGoodDelta(metricKey, d) ? 'success.main' : 'error.main',
            }}
          >
            <Arrow sx={{ fontSize: 16 }} />
            {Math.abs(d)}
          </Box>
        );
      },
    },
    ...(metric.resultKey
      ? [
          {
            id: 'result',
            header: 'Indicador',
            hideBelow: 'sm' as const,
            render: (r: MeasureRow) => {
              const result = r[metric.resultKey ?? ''] as
                | string
                | null
                | undefined;
              return result ? (
                <StatusChip variant={resultVariant(result)} label={result} />
              ) : (
                '—'
              );
            },
          },
        ]
      : []),
    {
      id: 'actions',
      header: 'Acciones',
      align: 'right',
      render: (r) => {
        const i = rows.indexOf(r);
        return (
          <Stack direction="row" sx={{ justifyContent: 'flex-end' }}>
            <IconButton
              aria-label={`Editar medición del ${dateOf(r)}`}
              onClick={() => onEdit(r, i > 0 ? rows[i - 1] : undefined)}
            >
              <EditRoundedIcon />
            </IconButton>
            <IconButton
              aria-label={`Eliminar medición del ${dateOf(r)}`}
              onClick={() => setToDelete(r)}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={metricKey}
          aria-label="Métrica"
          onChange={(_e, v: MetricKey | null) => {
            if (v) setMetricKey(v);
          }}
          sx={{ flexWrap: 'wrap' }}
        >
          {MEASURE_METRICS.map((m) => (
            <ToggleButton key={m.key} value={m.key}>
              {m.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}
      >
        <RangeFilter
          value={range}
          onChange={(r) => {
            setRange(r);
            setPage(0);
          }}
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={!REFERENCE_IMAGES[metricKey]}
            onClick={() => setReferenceOpen(true)}
          >
            Tabla de referencia
          </Button>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={kind}
            onChange={(_e, v: 'line' | 'bar' | null) => v && setKind(v)}
          >
            <ToggleButton value="line" aria-label="Gráfico de línea">
              <ShowChartRoundedIcon />
            </ToggleButton>
            <ToggleButton value="bar" aria-label="Gráfico de barras">
              <BarChartRoundedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Stack>
      {points.length > 0 && (
        <MeasureChart points={points} kind={kind} label={metric.label} />
      )}
      <DataTable
        columns={columns}
        rows={pageRows}
        getRowId={(r) => r.id}
        sort={{
          dir,
          onToggle: () => {
            setDir((d) => (d === 'asc' ? 'desc' : 'asc'));
            setPage(0);
          },
        }}
        loading={loading && !data}
        empty={
          <EmptyState
            title="Sin mediciones en este rango"
            description="Prueba con otro rango de fechas."
          />
        }
        pagination={{
          page: safePage,
          pageSize: PAGE_SIZE,
          total: rows.length,
          onPageChange: setPage,
        }}
      />
      <ReferenceTableDialog
        open={referenceOpen}
        onClose={() => setReferenceOpen(false)}
        metric={metricKey}
        title={metric.label}
      />
      <ConfirmDialog
        open={Boolean(toDelete)}
        title="¿Eliminar medición?"
        description={
          toDelete && (
            <Typography component="span">
              Se eliminarán todos los valores del {dateOf(toDelete)}.
            </Typography>
          )
        }
        loading={deleting.loading}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
}

export default MeasuresTab;
