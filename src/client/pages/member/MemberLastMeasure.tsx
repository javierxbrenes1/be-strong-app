import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ScaleIcon from '@mui/icons-material/Scale';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import CardTitle from '../../components/CardTitle';
import MeasureItem from './MeasureItem';
import { MeasureType, MEASURES_TITLES } from './utils/measureTypes';
import AddMeasures from '../members/AddMeasure';
import Member from '../../models/Member';
import Measure from '../../models/Measure';
import { formatDate } from '../utils/helpers';

const MeasureContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
});

function MemberLastMeasure(props: {
  member: Member;
  selectedMeasure: MeasureType | null;
  onSelectMeasure: (t: MeasureType) => void;
  onNewMeasureAdded: (newMeasure: Measure) => void;
}) {
  const { member, selectedMeasure, onSelectMeasure, onNewMeasureAdded } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onAddClick = () => {
    setOpenModal(true);
  };
  const { memberMeasures = [] } = member;
  const mostRecentMeasure = memberMeasures[0];

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <CardTitle
            actions={[{ ActionIcon: AddIcon, onActionIconClick: onAddClick }]}
          >
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <ScaleIcon />
              <Typography variant="h6">
                Últimas Medidas
                {mostRecentMeasure?.date
                  ? `(${formatDate(mostRecentMeasure.date)})`
                  : ''}
              </Typography>
            </Box>
          </CardTitle>
          {!memberMeasures.length && <Typography>No hay Datos.</Typography>}
          {!!memberMeasures.length && (
            <MeasureContainer>
              <MeasureItem
                id="weight"
                selectedOption={selectedMeasure}
                onClick={onSelectMeasure}
                title={MEASURES_TITLES.weight}
                value={`${mostRecentMeasure.weight} Kg.`}
              />
              <MeasureItem
                id="bodyMassIndex"
                title={MEASURES_TITLES.bodyMassIndex}
                selectedOption={selectedMeasure}
                onClick={onSelectMeasure}
                value={String(mostRecentMeasure.bodyMassIndex)}
                chipText={mostRecentMeasure.bodyMassIndexResult}
              />
              <MeasureItem
                id="corporalFat"
                title={MEASURES_TITLES.corporalFat}
                onClick={onSelectMeasure}
                selectedOption={selectedMeasure}
                value={String(mostRecentMeasure.corporalFat)}
                chipText={mostRecentMeasure.corporalFatResult}
              />
              <MeasureItem
                id="calories"
                title={MEASURES_TITLES.calories}
                onClick={onSelectMeasure}
                selectedOption={selectedMeasure}
                value={String(mostRecentMeasure.calories)}
                chipText={mostRecentMeasure.caloriesResult}
              />
              <MeasureItem
                id="corporalWaterPct"
                title={MEASURES_TITLES.corporalWaterPct}
                onClick={onSelectMeasure}
                selectedOption={selectedMeasure}
                value={String(mostRecentMeasure.corporalWaterPct)}
                chipText={mostRecentMeasure.corporalWaterPctResult}
              />
              <MeasureItem
                id="muscle"
                title={MEASURES_TITLES.muscle}
                onClick={onSelectMeasure}
                selectedOption={selectedMeasure}
                value={String(mostRecentMeasure.muscle)}
                chipText={mostRecentMeasure.muscleResult}
              />
            </MeasureContainer>
          )}
        </CardContent>
      </Card>
      <AddMeasures
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        member={member}
        onSuccess={onNewMeasureAdded}
      />
    </>
  );
}

export default MemberLastMeasure;
