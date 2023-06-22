import { useMemo } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Measure from '../../../common/models/Measure';
import CardTitle from '../../components/CardTitle';
import { formatDate } from '../utils/helpers';
import Chart from './Chart';
import { MeasureType } from '../member/utils/measureTypes';
import { MEASURES_TITLES, MONTHS } from '../../labels';

type MeasuresTitlesProp = keyof typeof MEASURES_TITLES;

const columnsIds: Record<MeasureType, string[]> = {
  weight: ['weight'],
  bodyMassIndex: ['bodyMassIndex', 'bodyMassIndexResult'],
  calories: ['calories', 'caloriesResult'],
  corporalFat: ['corporalFat', 'corporalFatResult'],
  corporalWaterPct: ['corporalWaterPct', 'corporalWaterPctResult'],
  muscle: ['muscle', 'muscleResult'],
};

const parseData = (measures: Measure[]) =>
  measures.map((m) => {
    const date = formatDate(m.date);
    const newObj: Record<string, string> = {};
    type Mtype = keyof typeof m;
    Object.keys(m).forEach((x) => {
      newObj[x] = String(m[x as Mtype]);
    });
    newObj.date = date;
    return newObj;
  });

const buildChartData = (measures: Measure[], selectedMeasure: MeasureType) => {
  const aux = [...measures];
  const labels: string[] = [];
  const numbers: number[] = [];
  type MonthType = keyof typeof MONTHS;

  aux.reverse().forEach((measure) => {
    const date = new Date(measure.date);
    const month = MONTHS[date.getMonth() as MonthType];
    const year = date.getFullYear();
    labels.push(`${month} ${year}`);
    type MeasureT = keyof typeof measure;
    numbers.push(Number(measure[selectedMeasure as MeasureT]) || 0);
  });

  return { labels, numbers };
};

function MeasureDetails(props: {
  memberMeasures: Measure[];
  selectedMeasure: MeasureType;
  color: string;
}) {
  const { memberMeasures, selectedMeasure, color } = props;

  const columns = useMemo(() => {
    const cIds = columnsIds[selectedMeasure];
    return [
      {
        id: 'date',
        text: 'Fecha (Desc)',
      },
      ...cIds.map((id) => ({
        id,
        text: MEASURES_TITLES[id as MeasuresTitlesProp] || 'Indicador',
      })),
    ];
  }, [selectedMeasure]);

  const chartDetails = useMemo(() => {
    if (!selectedMeasure) return null;
    return buildChartData(memberMeasures, selectedMeasure);
  }, [selectedMeasure, memberMeasures]);

  const parsedMemberMeasures = useMemo(
    () => parseData(memberMeasures),
    [memberMeasures]
  );

  if (!selectedMeasure) return null;

  return (
    <Card elevation={3}>
      <CardContent>
        <CardTitle title={MEASURES_TITLES[selectedMeasure]} />
        {chartDetails && (
          <Grid item xs={12}>
            <Chart
              labels={chartDetails.labels}
              numbers={chartDetails.numbers}
              columns={columns}
              color={color}
              rows={parsedMemberMeasures}
            />
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default MeasureDetails;
