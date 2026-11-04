import { useQuery } from '@apollo/client';
import { Box, Button, Card, Typography } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import dayjs from 'dayjs';
import { EmptyState, MetricCard } from '../../design-system';
import { AttendanceByYearDocument } from './api';
import {
  MEASURE_METRICS,
  MeasureValues,
  isGoodDelta,
  resultVariant,
} from '../measures/metrics';
import { todayLocalDate } from '../../../common/dates';

type Props = {
  code: string;
  lastMeasure?: (MeasureValues & Record<string, unknown>) | null;
  recent: (MeasureValues & { date?: number | null })[];
  onAddMeasure: () => void;
};

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

function AttendanceSummary({ code }: { code: string }) {
  const year = dayjs(todayLocalDate()).year();
  const { data } = useQuery(AttendanceByYearDocument, {
    variables: { year, memberCode: code },
  });
  const counts = Array<number>(12).fill(0);
  data?.getMemberAttendanceLogByYear?.forEach((r) => {
    if (r?.month != null) counts[r.month - 1] = r.total ?? 0;
  });
  const total = counts.reduce((a, b) => a + b, 0);
  const max = Math.max(...counts, 1);
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h3">Asistencia {year}</Typography>
      <Typography variant="metric">{total}</Typography>
      <Typography variant="body2" color="text.secondary">
        clases en el año
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(6, 1fr)', md: 'repeat(12, 1fr)' },
          gap: 1,
          mt: 2,
        }}
      >
        {counts.map((n, i) => (
          <Box key={MONTHS[i]} sx={{ textAlign: 'center' }}>
            <Box
              role="img"
              aria-label={`${MONTHS[i]}: ${n} clases`}
              sx={{
                height: 36,
                borderRadius: 1,
                bgcolor: n ? 'primary.main' : 'action.hover',
                opacity: n ? 0.25 + 0.75 * (n / max) : 1,
              }}
            />
            <Typography variant="caption" color="text.secondary">
              {MONTHS[i]}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

function SummaryTab({ code, lastMeasure, recent, onAddMeasure }: Props) {
  if (!lastMeasure) {
    return (
      <EmptyState
        icon={<MonitorWeightOutlinedIcon fontSize="large" />}
        title="Sin mediciones"
        description="Registra la primera medición para ver el progreso."
        action={
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            onClick={onAddMeasure}
          >
            Medición
          </Button>
        }
      />
    );
  }
  // memberMeasures llega en orden descendente; el sparkline va cronológico.
  const chronological = [...recent].reverse();
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(3, 1fr)' },
        }}
      >
        {MEASURE_METRICS.map((m) => {
          const value = lastMeasure[m.key];
          const diff = lastMeasure[m.diffKey] as number | null | undefined;
          const result = m.resultKey
            ? (lastMeasure[m.resultKey] as string | null | undefined)
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
            />
          );
        })}
      </Box>
      <AttendanceSummary code={code} />
    </Box>
  );
}

export default SummaryTab;
