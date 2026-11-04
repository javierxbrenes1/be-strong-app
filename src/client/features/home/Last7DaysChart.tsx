import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Box, Card, Typography } from '@mui/material';
import useChartColors from '../../app/useChartColors';
import { LocalDate } from '../../../common/dates';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const DAY_LABELS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'];
const dayLabel = (d: LocalDate) =>
  DAY_LABELS[new Date(`${d}T00:00:00Z`).getUTCDay()];

type Props = { days: { date: LocalDate; count: number }[] };

function Last7DaysChart({ days }: Props) {
  const colors = useChartColors();
  const data = {
    labels: days.map((d) => dayLabel(d.date)),
    datasets: [
      {
        label: 'Asistencias',
        data: days.map((d) => d.count),
        // el último día es hoy
        backgroundColor: days.map((_, i) =>
          i === days.length - 1 ? colors.primary : colors.grid
        ),
        borderRadius: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: colors.muted } },
      y: {
        beginAtZero: true,
        grid: { color: colors.grid },
        ticks: { color: colors.muted, precision: 0 },
      },
    },
  };
  return (
    <Card sx={{ p: 2 }}>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Asistencia, últimos 7 días
      </Typography>
      <Box
        role="img"
        aria-label="Gráfico de asistencias de los últimos 7 días"
        sx={{ height: 220 }}
      >
        <Bar data={data} options={options} />
      </Box>
    </Card>
  );
}

export default Last7DaysChart;
