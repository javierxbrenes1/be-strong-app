import { Stack } from '@mui/material';
import Measure from '../../../common/models/Measure';
import BsMeasure from '../../components/BsMeasure';
import { MEASURES_TITLES } from '../../labels';

function LastMeasureDetails(props: { measure: Measure }) {
  const { measure } = props;

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ margin: '10px 0' }}>
      <BsMeasure
        title={MEASURES_TITLES.weight}
        value={measure.weight}
        suffix="Kg."
      />

      <BsMeasure
        title={MEASURES_TITLES.bodyMassIndex}
        value={measure.bodyMassIndex}
        label={measure.bodyMassIndexResult}
      />

      <BsMeasure
        title={MEASURES_TITLES.corporalFat}
        value={measure.corporalFat}
        label={measure.corporalFatResult}
      />

      <BsMeasure
        title={MEASURES_TITLES.calories}
        value={measure.calories}
        label={measure.caloriesResult}
      />

      <BsMeasure
        title={MEASURES_TITLES.corporalWaterPct}
        value={measure.corporalWaterPct}
        label={measure.corporalWaterPctResult}
      />

      <BsMeasure
        title={MEASURES_TITLES.muscle}
        value={measure.muscle}
        label={measure.muscleResult}
      />
    </Stack>
  );
}

export default LastMeasureDetails;
