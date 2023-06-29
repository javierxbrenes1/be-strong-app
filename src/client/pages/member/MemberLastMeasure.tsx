import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ScaleIcon from '@mui/icons-material/Scale';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import CardTitle from '../../components/CardTitle';
import MeasureItem from './MeasureItem';
import { MeasureType } from '../../utils/measureTypes';
import AddMeasures from '../members/AddMeasure';
import Member from '../../../common/models/Member';
import Measure from '../../../common/models/Measure';
import { formatDate } from '../../utils/helpers';
import { MEASURES_TITLES } from '../../labels';

const MeasureContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
});

function MemberLastMeasure(props: {
  member: Member;
  selectedMeasureType: MeasureType | null;
  onSelectMeasureType: (t: MeasureType) => void;
  onNewMeasureAdded: (newMeasure: Measure) => void;
  onEditMeasure: (id: number, measure: MeasureType, value: number) => void;
}) {
  const {
    member,
    selectedMeasureType,
    onSelectMeasureType,
    onNewMeasureAdded,
    onEditMeasure,
  } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const onAddClick = () => {
    setOpenModal(true);
  };
  let { memberMeasures } = member;
  memberMeasures = memberMeasures ?? [];
  const mostRecentMeasure = memberMeasures[0];

  const actions = [
    {
      ActionIcon: AddCircleOutlineIcon,
      onActionIconClick: onAddClick,
      tooltip: 'Agregar',
    },
  ];

  const handleEditMeasure = (measure: MeasureType, value: number) => {
    onEditMeasure(mostRecentMeasure.id, measure, value);
  };

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <CardTitle actions={actions}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <ScaleIcon />
              <Typography variant="h6">
                Últimas Medidas
                {mostRecentMeasure?.date
                  ? ` (${formatDate(mostRecentMeasure.date)})`
                  : ''}
              </Typography>
            </Box>
          </CardTitle>
          {!memberMeasures.length && <Typography>No hay Datos.</Typography>}
          {!!memberMeasures.length && (
            <MeasureContainer>
              <MeasureItem
                id="weight"
                selectedOption={selectedMeasureType}
                onClick={onSelectMeasureType}
                title={MEASURES_TITLES.weight}
                value={String(mostRecentMeasure.weight)}
                suffix="Kg."
                onUpdateMeasure={handleEditMeasure}
              />
              <MeasureItem
                id="bodyMassIndex"
                title={MEASURES_TITLES.bodyMassIndex}
                selectedOption={selectedMeasureType}
                onClick={onSelectMeasureType}
                value={String(mostRecentMeasure.bodyMassIndex)}
                chipText={mostRecentMeasure.bodyMassIndexResult}
                onUpdateMeasure={handleEditMeasure}
              />
              <MeasureItem
                id="corporalFat"
                title={MEASURES_TITLES.corporalFat}
                onClick={onSelectMeasureType}
                selectedOption={selectedMeasureType}
                value={String(mostRecentMeasure.corporalFat)}
                chipText={mostRecentMeasure.corporalFatResult}
                onUpdateMeasure={handleEditMeasure}
              />
              <MeasureItem
                id="calories"
                title={MEASURES_TITLES.calories}
                onClick={onSelectMeasureType}
                selectedOption={selectedMeasureType}
                value={String(mostRecentMeasure.calories)}
                chipText={mostRecentMeasure.caloriesResult}
                onUpdateMeasure={handleEditMeasure}
              />
              <MeasureItem
                id="corporalWaterPct"
                title={MEASURES_TITLES.corporalWaterPct}
                onClick={onSelectMeasureType}
                selectedOption={selectedMeasureType}
                value={String(mostRecentMeasure.corporalWaterPct)}
                chipText={mostRecentMeasure.corporalWaterPctResult}
                onUpdateMeasure={handleEditMeasure}
              />
              <MeasureItem
                id="muscle"
                title={MEASURES_TITLES.muscle}
                onClick={onSelectMeasureType}
                selectedOption={selectedMeasureType}
                value={String(mostRecentMeasure.muscle)}
                chipText={mostRecentMeasure.muscleResult}
                onUpdateMeasure={handleEditMeasure}
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
