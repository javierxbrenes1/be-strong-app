import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import useChartColors from '../../app/useChartColors';
import { formatInstant } from '../../../common/dates';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

type Props = {
  points: { date: number; value: number }[];
  kind: 'line' | 'bar';
  label: string;
};

function MeasureChart({ points, kind, label }: Props) {
  const colors = useChartColors();
  const data = {
    labels: points.map((p) => formatInstant(p.date, 'DD/MM/YY')),
    datasets: [
      {
        label,
        data: points.map((p) => p.value),
        borderWidth: 2,
        borderColor: colors.primaryInk,
        backgroundColor: colors.primary,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { color: colors.grid }, ticks: { color: colors.muted } },
      y: { grid: { color: colors.grid }, ticks: { color: colors.muted } },
    },
  };
  const Component = kind === 'line' ? Line : Bar;
  return (
    <Box
      role="img"
      aria-label={`Gráfico de ${label}`}
      sx={{ height: { xs: 240, md: 320 }, width: '100%' }}
    >
      <Component data={data} options={options} />
    </Box>
  );
}

export default MeasureChart;
