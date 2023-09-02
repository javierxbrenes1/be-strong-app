import allGymClassTimes from './allGymClassTimes';
import gymClassTime from './gymClassTime';
import addGymClassTime from './addGymClassTime';

export default {
  Query: {
    allGymClassTimes,
    gymClassTime,
  },

  Mutation: {
    addGymClassTime,
  },
};
