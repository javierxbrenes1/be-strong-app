import { useMemo } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { Stack, Typography } from '@mui/material';
import Measure from '../../../../common/models/Measure';
import CardTitle from '../../../components/CardTitle';
import { MeasureType } from '../../../utils/measureTypes';
import SimpleTable from '../../../components/SimpleTable';
import { formatDate } from '../../../utils/helpers';
import Chart from './Chart';
import { MEASURES_TITLES, MONTHS } from '../../../labels';
import Filters from './Filters';

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

const buildChartData = (
  measures: Measure[],
  selectedMeasureType: MeasureType
) => {
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
    numbers.push(Number(measure[selectedMeasureType as MeasureT]) || 0);
  });

  return { labels, numbers };
};

function MemberMeasuresData(props: {
  selectedMeasureType: MeasureType | null;
}) {
  const { selectedMeasureType } = props;
  const memberMeasures: Measure[] = [];

  const columns = useMemo(() => {
    if (!selectedMeasureType) return null;

    const cIds = columnsIds[selectedMeasureType];
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
  }, [selectedMeasureType]);

  const chartDetails = useMemo(() => {
    if (!selectedMeasureType) return null;
    return buildChartData(memberMeasures, selectedMeasureType);
  }, [selectedMeasureType, memberMeasures]);

  const parsedMemberMeasures = useMemo(
    () => parseData(memberMeasures),
    [memberMeasures]
  );

  if (!selectedMeasureType) return null;

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack
          direction="row"
          gap={1}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginBottom: ' 16px' }}
        >
          <CardTitle title="Detalles" sx={{ marginBottom: 0 }} />
          <Filters />
        </Stack>
        <Grid container spacing={1} sx={{ marginTop: '12px' }}>
          {columns && (
            <Grid item xs={12}>
              <SimpleTable columns={columns} rows={parsedMemberMeasures} />
            </Grid>
          )}
          {chartDetails && (
            <Grid item xs={12}>
              <Chart
                labels={chartDetails.labels}
                numbers={chartDetails.numbers}
                chartTitle={
                  MEASURES_TITLES[selectedMeasureType as MeasuresTitlesProp]
                }
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default MemberMeasuresData;
