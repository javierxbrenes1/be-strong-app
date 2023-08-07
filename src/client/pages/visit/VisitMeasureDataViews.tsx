import Grid from '@mui/material/Grid';
import { useMemo } from 'react';
import VisitMeasureDataView from './VisitMeasureDataView';
import { MEASURES_TITLES } from '../../labels';
import { Measures } from '../../types';
import Measure from '../../../common/models/Measure';
import {
  buildMeasureChartDataForAllMeasures,
  parseMeasureData,
} from '../../utils/helpers';
import VisitMeasureDataViewGroup from './VisitMeasureDataViewGroup';

function VisitMeasureDataViews(props: {
  measures: Measure[];
  showIndividually: boolean;
}) {
  const { measures, showIndividually = true } = props;

  const tableContent = useMemo(() => parseMeasureData(measures), [measures]);

  const chartContent = useMemo(
    () => buildMeasureChartDataForAllMeasures(measures),
    [measures]
  );

  if (!showIndividually) {
    return (
      <Grid container sx={{ margin: '10px 0' }}>
        <Grid item xs={12}>
          <VisitMeasureDataViewGroup
            title="Medidas"
            tableData={tableContent}
            charts={chartContent}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container sx={{ margin: '10px 0' }}>
      <Grid item xs={12} md={6}>
        <VisitMeasureDataView
          title={MEASURES_TITLES.weight}
          measure={Measures.weight}
          tableData={tableContent}
          charts={chartContent}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <VisitMeasureDataView
          title={MEASURES_TITLES.bodyMassIndex}
          measure={Measures.bodyMassIndex}
          tableData={tableContent}
          charts={chartContent}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <VisitMeasureDataView
          title={MEASURES_TITLES.corporalFat}
          measure={Measures.corporalFat}
          tableData={tableContent}
          charts={chartContent}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <VisitMeasureDataView
          title={MEASURES_TITLES.calories}
          measure={Measures.calories}
          tableData={tableContent}
          charts={chartContent}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <VisitMeasureDataView
          title={MEASURES_TITLES.corporalWaterPct}
          measure={Measures.corporalWaterPct}
          tableData={tableContent}
          charts={chartContent}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <VisitMeasureDataView
          title={MEASURES_TITLES.muscle}
          measure={Measures.muscle}
          tableData={tableContent}
          charts={chartContent}
        />
      </Grid>
    </Grid>
  );
}

export default VisitMeasureDataViews;
