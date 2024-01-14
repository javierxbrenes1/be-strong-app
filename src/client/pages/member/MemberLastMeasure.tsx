import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import ScaleIcon from '@mui/icons-material/Scale';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import dayjs from 'dayjs';
import CardTitle from '../../components/CardTitle';
import MeasureItem from './MeasureItem';
import AddMeasures from '../members/AddMeasure';
import Member from '../../../common/models/Member';
import Measure from '../../../common/models/Measure';
import { formatDate } from '../../utils/helpers';
import { MEASURES_TITLES } from '../../labels';
import { Measures } from '../../types';
import useMemberLastMeasure from './useMemberLastMeasure';
import Loading from '../../components/Loading';
import { useMemberContext } from './MemberContext';

const MeasureContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
});

function MeasureDetails(props: {
  measure: Measure;
  onSelectMeasureType: (t: Measures) => void;
  selectedMeasureType: Measures | null;
  handleEditMeasure: (measure: Measures, value: number) => void;
}) {
  const {
    measure,
    onSelectMeasureType,
    selectedMeasureType,
    handleEditMeasure,
  } = props;

  return (
    <MeasureContainer>
      <MeasureItem
        id={Measures.weight}
        selectedOption={selectedMeasureType}
        onClick={onSelectMeasureType}
        title={MEASURES_TITLES.weight}
        value={String(measure.weight)}
        suffix="Kg."
        onUpdateMeasure={handleEditMeasure}
        triggerClickOnMount
      />
      <MeasureItem
        id={Measures.bodyMassIndex}
        title={MEASURES_TITLES.bodyMassIndex}
        selectedOption={selectedMeasureType}
        onClick={onSelectMeasureType}
        value={String(measure.bodyMassIndex)}
        chipText={measure.bodyMassIndexResult}
        onUpdateMeasure={handleEditMeasure}
      />
      <MeasureItem
        id={Measures.corporalFat}
        title={MEASURES_TITLES.corporalFat}
        onClick={onSelectMeasureType}
        selectedOption={selectedMeasureType}
        value={String(measure.corporalFat)}
        chipText={measure.corporalFatResult}
        onUpdateMeasure={handleEditMeasure}
      />
      <MeasureItem
        id={Measures.calories}
        title={MEASURES_TITLES.calories}
        onClick={onSelectMeasureType}
        selectedOption={selectedMeasureType}
        value={String(measure.calories)}
        chipText={measure.caloriesResult}
        onUpdateMeasure={handleEditMeasure}
      />
      <MeasureItem
        id={Measures.corporalWaterPct}
        title={MEASURES_TITLES.corporalWaterPct}
        onClick={onSelectMeasureType}
        selectedOption={selectedMeasureType}
        value={String(measure.corporalWaterPct)}
        chipText={measure.corporalWaterPctResult}
        onUpdateMeasure={handleEditMeasure}
      />
      <MeasureItem
        id={Measures.muscle}
        title={MEASURES_TITLES.muscle}
        onClick={onSelectMeasureType}
        selectedOption={selectedMeasureType}
        value={String(measure.muscle)}
        chipText={measure.muscleResult}
        onUpdateMeasure={handleEditMeasure}
      />
    </MeasureContainer>
  );
}

function MemberLastMeasure(props: {
  member: Member;
  selectedMeasureType: Measures | null;
  onSelectMeasureType: (t: Measures | null) => void;
  onEditMeasure: (id: number, measure: Measures, value: number) => void;
}) {
  const { member, selectedMeasureType, onSelectMeasureType, onEditMeasure } =
    props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { lastMeasure, loading } = useMemberLastMeasure(member.code);
  const { triggerReloadLastMeasure } = useMemberContext();

  const onAddClick = () => {
    setOpenModal(true);
  };

  const actions = [
    {
      ActionIcon: AddCircleOutlineIcon,
      onActionIconClick: onAddClick,
      tooltip: 'Agregar',
    },
  ];

  const handleEditMeasure = (measure: Measures, value: number) => {
    if (!lastMeasure) return;
    onEditMeasure(lastMeasure.id, measure, value);
  };

  let details;
  if (loading) {
    details = <Loading />;
  } else if (!lastMeasure) {
    details = <Typography>No hay Datos.</Typography>;
    onSelectMeasureType(null);
  } else {
    details = (
      <MeasureDetails
        measure={lastMeasure}
        onSelectMeasureType={onSelectMeasureType}
        selectedMeasureType={selectedMeasureType}
        handleEditMeasure={handleEditMeasure}
      />
    );
  }

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <CardTitle actions={actions}>
            <Box sx={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              <ScaleIcon />
              <Typography variant="h6" component="p">
                Últimas Medidas
                <Typography variant="body2" component="span">
                  {lastMeasure?.date ? ` ${formatDate(lastMeasure.date)}` : ''}
                </Typography>
              </Typography>
            </Box>
          </CardTitle>
          {details}
        </CardContent>
      </Card>
      {openModal ? (
        <AddMeasures
          open
          onClose={() => {
            setOpenModal(false);
          }}
          member={member}
          onSuccess={(newMeasure: Measure) => {
            if (
              !lastMeasure ||
              dayjs(newMeasure.date).isAfter(lastMeasure?.date)
            ) {
              triggerReloadLastMeasure();
            }
          }}
        />
      ) : null}
    </>
  );
}

export default MemberLastMeasure;
