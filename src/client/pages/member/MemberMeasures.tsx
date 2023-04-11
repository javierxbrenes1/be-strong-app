import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ScaleIcon from '@mui/icons-material/Scale';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Measure from '../../models/Measure';
import CardTitle from '../../components/CardTitle';
import MeasureItem from './MeasureItem';

const MeasureContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  justifyContent: 'center',
});

function MemberMeasures(props: { memberMeasures: Measure[] }) {
  const { memberMeasures } = props;

  const onAddClick = () => {};

  const mostRecentMeasure = memberMeasures[0];

  return (
    <Card sx={{ margin: '24px 0' }} elevation={3}>
      <CardContent>
        <CardTitle ActionIcon={AddIcon} onActionIconClick={onAddClick}>
          <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <ScaleIcon />
            <Typography variant="h6">Últimas Medidas</Typography>
          </Box>
        </CardTitle>
        {!memberMeasures.length && <Typography>No hay Datos.</Typography>}
        <MeasureContainer>
          <MeasureItem
            selected
            title="Peso"
            value={`${mostRecentMeasure.weight} Kg.`}
          />
          <MeasureItem
            title="Indice de masa corporal"
            value={String(mostRecentMeasure.bodyMassIndex)}
            chipText={mostRecentMeasure.bodyMassIndexResult}
            chipColor="tomato"
          />
          <MeasureItem
            title="Grasa Corporal"
            value={String(mostRecentMeasure.corporalFat)}
            chipText={mostRecentMeasure.corporalFatResult}
            chipColor="tomato"
          />
          <MeasureItem
            title="Calorias"
            value={String(mostRecentMeasure.calories)}
            chipText={mostRecentMeasure.caloriesResult}
            chipColor="tomato"
          />
          <MeasureItem
            title="Porcentaje de Agua"
            value={String(mostRecentMeasure.corporalWaterPct)}
            chipText={mostRecentMeasure.corporalWaterPctResult}
            chipColor="tomato"
          />
          <MeasureItem
            title="Musculo"
            value={String(mostRecentMeasure.muscle)}
            chipText={mostRecentMeasure.muscleResult}
            chipColor="tomato"
          />
        </MeasureContainer>
      </CardContent>
    </Card>
  );
}

export default MemberMeasures;
