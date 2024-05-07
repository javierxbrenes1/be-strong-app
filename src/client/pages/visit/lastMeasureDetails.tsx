import { Stack } from '@mui/material';
import Measure from '../../../common/models/Measure';
import BsMeasure from '../../components/BsMeasure';
import { MEASURES_TITLES } from '../../labels';
import measuresDecorator from '../member/measuresDiffsDecorator';
import { Measures } from '../../types';

function LastMeasureDetails(props: { measure: Measure }) {
  const { measure } = props;

  return (
    <Stack direction="row" flexWrap="wrap" sx={{ margin: '10px 0' }}>
      <BsMeasure
        title={MEASURES_TITLES.weight}
        value={measure.weight}
        suffix="Kg."
        measureDiff={measuresDecorator(Measures.weightDiff, measure.weightDiff)}
      />

      <BsMeasure
        title={MEASURES_TITLES.bodyMassIndex}
        value={measure.bodyMassIndex}
        label={measure.bodyMassIndexResult}
        measureDiff={measuresDecorator(
          Measures.bodyMassIndexDiff,
          measure.bodyMassIndexDiff
        )}
      />

      <BsMeasure
        title={MEASURES_TITLES.corporalFat}
        value={measure.corporalFat}
        label={measure.corporalFatResult}
        measureDiff={measuresDecorator(
          Measures.corporalFatDiff,
          measure.corporalFatDiff
        )}
      />

      <BsMeasure
        title={MEASURES_TITLES.calories}
        value={measure.calories}
        label={measure.caloriesResult}
        measureDiff={measuresDecorator(
          Measures.caloriesDiff,
          measure.caloriesDiff
        )}
      />

      <BsMeasure
        title={MEASURES_TITLES.corporalWaterPct}
        value={measure.corporalWaterPct}
        label={measure.corporalWaterPctResult}
        measureDiff={measuresDecorator(
          Measures.corporalWaterPctDiff,
          measure.corporalWaterPctDiff
        )}
      />

      <BsMeasure
        title={MEASURES_TITLES.muscle}
        value={measure.muscle}
        label={measure.muscleResult}
        measureDiff={measuresDecorator(Measures.muscleDiff, measure.muscleDiff)}
      />
    </Stack>
  );
}

export default LastMeasureDetails;
