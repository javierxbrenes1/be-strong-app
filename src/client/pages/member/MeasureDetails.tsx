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
  [Measures.muscle]: '/images/muscle.jpeg',
};

function MeasureDetails(props: {
  measure: Measure;
  onSelectMeasureType: (t: Measures) => void;
  selectedMeasureType: Measures | null;
  handleEditMeasure: (measure: Measures, value: number) => void;
}) {
  const [explainingTable, setExplainingTable] = useState<Measures | null>();
  const {
    measure,
    onSelectMeasureType,
    selectedMeasureType,
    handleEditMeasure,
  } = props;

  return (
    <>
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
          showExplanation
          onShowExplanationClick={setExplainingTable}
        />
        <MeasureItem
          id={Measures.corporalFat}
          title={MEASURES_TITLES.corporalFat}
          onClick={onSelectMeasureType}
          selectedOption={selectedMeasureType}
          value={String(measure.corporalFat)}
          chipText={measure.corporalFatResult}
          onUpdateMeasure={handleEditMeasure}
          showExplanation
          onShowExplanationClick={setExplainingTable}
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
