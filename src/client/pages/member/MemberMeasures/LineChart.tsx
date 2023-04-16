import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart(props: {
  labels: string[];
  numbers: number[];
  chartTitle: string;
}) {
  const { labels, numbers, chartTitle } = props;
  const theme = useTheme();

  return (
    <Box px="24px" width="100%" height="350px">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: chartTitle,
              data: numbers,
              borderWidth: 2,
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: true,
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

export default LineChart;
