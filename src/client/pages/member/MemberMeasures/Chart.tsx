import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
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
import { useState } from 'react';

import { Line, Bar } from 'react-chartjs-2';
import Grid from '@mui/material/Grid';

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

const getIconStyleWhenSelected = (isSelected: boolean, theme: Theme) => ({
  '&:hover': { cursor: 'pointer' },
  ...(isSelected
    ? { borderBottom: `3px solid ${theme.palette.primary.main}` }
    : {}),
});

enum ChartComponent {
  line = 'line',
  bar = 'bar',
}

function Chart(props: {
  labels: string[];
  numbers: number[];
  chartTitle: string;
}) {
  const { labels, numbers, chartTitle } = props;
  const [component, setComponent] = useState<ChartComponent>(
    ChartComponent.line
  );
  const theme = useTheme();

  const Component = component === ChartComponent.bar ? Bar : Line;

  const onIconClick = (type: ChartComponent) => () => {
    setComponent(type);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
          }}
        >
          <TimelineIcon
            sx={getIconStyleWhenSelected(
              component === ChartComponent.line,
              theme
            )}
            onClick={onIconClick(ChartComponent.line)}
          />
          <BarChartIcon
            onClick={onIconClick(ChartComponent.bar)}
            sx={getIconStyleWhenSelected(
              component === ChartComponent.bar,
              theme
            )}
          />
        </Box>
      </Grid>
      <Box px="24px" width="100%">
        <Component
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
    </Grid>
  );
}

export default Chart;
