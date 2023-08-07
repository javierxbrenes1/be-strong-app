import { useState } from 'react';

import Grid from '@mui/material/Grid';
import BsDataViewSelector from '../../../components/BsDataViewSelector';
import BsChart from '../../../components/BsChart';

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

  const onIconClick = (type: ChartComponent) => () => {
    setComponent(type);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <BsDataViewSelector
          line={{
            onClick: onIconClick(ChartComponent.line),
            selected: component === ChartComponent.line,
          }}
          bar={{
            onClick: onIconClick(ChartComponent.bar),
            selected: component === ChartComponent.bar,
          }}
        />
      </Grid>
      <BsChart
        type={component}
        labels={labels}
        datasets={[{ numbers, title: chartTitle }]}
      />
    </Grid>
  );
}

export default Chart;
