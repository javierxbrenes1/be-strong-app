import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { MEASURES_TITLES } from '../../labels';
import MeasureItem from './MeasureItem';
import Measure from '../../../common/models/Measure';
import { Measures } from '../../types';
import BsImageShower from '../../components/BsImageShower';

const MeasureContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
});

const explainingTableMap: Record<string, string> = {
  [Measures.bodyMassIndex]: '/images/body-mass-index.jpeg',
  [Measures.corporalFat]: '/images/corporal-fat.jpeg',
  [Measures.corporalWaterPct]: '/images/corporal-fat.jpeg',
  [Measures.muscle]: '/images/muscle.jpeg',
  [Measures.calories]: '/images/muscle.jpeg',
};

function MeasureDetails(props: {
  measure: Measure;
  onSelectMeasureType: (t: Measures) => void;
  selectedMeasureType: Measures | null;
}) {
  const [explainingTable, setExplainingTable] = useState<Measures | null>();
  const { measure, onSelectMeasureType, selectedMeasureType } = props;

  return (
    <>
      <MeasureContainer>
        <MeasureItem
          id={Measures.weight}
          idDiff={Measures.weightDiff}
          selectedOption={selectedMeasureType}
          onClick={onSelectMeasureType}
          title={MEASURES_TITLES.weight}
          value={String(measure.weight)}
          valueDiff={measure.weightDiff}
          suffix="Kg."
          newMeasureId={measure.id}
        />
        <MeasureItem
          id={Measures.bodyMassIndex}
          idDiff={Measures.bodyMassIndexDiff}
          title={MEASURES_TITLES.bodyMassIndex}
          selectedOption={selectedMeasureType}
          onClick={onSelectMeasureType}
          value={String(measure.bodyMassIndex)}
          valueDiff={measure.bodyMassIndexDiff}
          chipText={measure.bodyMassIndexResult}
          showExplanation
          onShowExplanationClick={setExplainingTable}
        />
        <MeasureItem
          id={Measures.corporalFat}
          idDiff={Measures.corporalFatDiff}
          title={MEASURES_TITLES.corporalFat}
          onClick={onSelectMeasureType}
          selectedOption={selectedMeasureType}
          value={String(measure.corporalFat)}
          valueDiff={measure.corporalFatDiff}
          chipText={measure.corporalFatResult}
          showExplanation
          onShowExplanationClick={setExplainingTable}
        />
        <MeasureItem
          id={Measures.calories}
          idDiff={Measures.caloriesDiff}
          title={MEASURES_TITLES.calories}
          onClick={onSelectMeasureType}
          selectedOption={selectedMeasureType}
          value={String(measure.calories)}
          valueDiff={measure.caloriesDiff}
          chipText={measure.caloriesResult}
          showExplanation
          onShowExplanationClick={setExplainingTable}
        />
        <MeasureItem
          id={Measures.corporalWaterPct}
          idDiff={Measures.corporalWaterPctDiff}
          title={MEASURES_TITLES.corporalWaterPct}
          onClick={onSelectMeasureType}
          selectedOption={selectedMeasureType}
          value={String(measure.corporalWaterPct)}
          valueDiff={measure.corporalWaterPctDiff}
          chipText={measure.corporalWaterPctResult}
          showExplanation
          onShowExplanationClick={setExplainingTable}
        />
        <MeasureItem
          id={Measures.muscle}
          idDiff={Measures.muscleDiff}
          title={MEASURES_TITLES.muscle}
          onClick={onSelectMeasureType}
          selectedOption={selectedMeasureType}
          value={String(measure.muscle)}
          valueDiff={measure.muscleDiff}
          chipText={measure.muscleResult}
          showExplanation
          onShowExplanationClick={setExplainingTable}
        />
      </MeasureContainer>
      {explainingTable && (
        <BsImageShower
          src={explainingTableMap[explainingTable ?? '']}
          alt="explaining table"
          onClose={() => setExplainingTable(null)}
        />
      )}
    </>
  );
}

export default MeasureDetails;
