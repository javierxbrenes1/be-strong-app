import Box from '@mui/material/Box';
import { Theme, useTheme } from '@mui/material/styles';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import TableChartIcon from '@mui/icons-material/TableChart';
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
import SimpleTable, { ColumnType, RowType } from '../../components/SimpleTable';

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

const getIconStyleWhenSelected = (
  isSelected: boolean,
  theme: Theme,
  color: string
) => ({
  '&:hover': { cursor: 'pointer' },
  ...(isSelected
    ? { borderBottom: `3px solid ${color || theme.palette.primary.main}` }
    : {}),
});

enum ChartComponent {
  line = 'line',
  bar = 'bar',
  table = 'table',
}

function Chart(props: {
  labels: string[];
  numbers: number[];
  columns: ColumnType[];
  rows: RowType[];
  color: string;
}) {
  const { labels, numbers, columns, rows, color } = props;
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
              theme,
              color
            )}
            onClick={onIconClick(ChartComponent.line)}
          />
          <BarChartIcon
            onClick={onIconClick(ChartComponent.bar)}
            sx={getIconStyleWhenSelected(
              component === ChartComponent.bar,
              theme,
              color
            )}
          />
          <TableChartIcon
            onClick={onIconClick(ChartComponent.table)}
            sx={getIconStyleWhenSelected(
              component === ChartComponent.table,
              theme,
              color
            )}
          />
        </Box>
      </Grid>
      <Box py="20px" width="100%">
        {component !== ChartComponent.table && (
          <Component
            data={{
              labels,
              datasets: [
                {
                  data: numbers,
                  borderWidth: 2,
                  borderColor: color || theme.palette.primary.main,
                  backgroundColor: color || theme.palette.primary.main,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        )}
        {component === ChartComponent.table && (
          <SimpleTable columns={columns} rows={rows} headBgColor={color} />
        )}
      </Box>
    </Grid>
  );
}

export default Chart;
