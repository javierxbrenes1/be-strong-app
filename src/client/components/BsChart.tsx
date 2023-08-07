import { Box, SxProps, Theme, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartMap = {
  bar: Bar,
  line: Line,
};
function BsChart(props: {
  type: 'bar' | 'line';
  labels: string[];
  sx?: SxProps<Theme>;
  datasets: {
    numbers: number[];
    title?: string;
    borderColor?: string;
    bgColor?: string;
  }[];
}) {
  const { type, labels, datasets, sx } = props;
  const theme = useTheme();
  const Component = chartMap[type];

  return (
    <Box px="24px" width="100%" sx={{ minHeight: '400px', ...(sx ?? {}) }}>
      <Component
        data={{
          labels,
          datasets: datasets.map((d) => ({
            label: d.title,
            data: d.numbers,
            borderWidth: 2,
            borderColor: d.borderColor ?? theme.palette.primary.main,
            backgroundColor: d.bgColor ?? theme.palette.primary.main,
          })),
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top' as const,
            },
            title: {
              display: false,
            },
          },
        }}
      />
    </Box>
  );
}

export default BsChart;
