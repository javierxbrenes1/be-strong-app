import addMeasure from './addMeasure';
import updateMeasure from './updateMeasure';
import deleteMeasure from './deleteMeasure';
import getMeasures from './getMeasures';

const memberMeasuresResolvers = {
  Mutation: {
    addMeasure,
    updateMeasure,
    deleteMeasure,
  },
  Query: {
    getMeasures,
  },
};

export default memberMeasuresResolvers;
