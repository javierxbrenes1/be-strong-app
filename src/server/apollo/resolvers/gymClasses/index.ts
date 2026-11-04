import getGymClasses from './getGymClasses';
import getGymClassesCount from './getGymClassesCount';
import addGymClass from './addGymClass';
import attendanceList from './attendanceList';
import getGymClassTypes from './getGymClassTypes';
import addTimes from './addTimes';

const gymClassesResolvers = {
  Query: {
    getGymClassesCount,
    getGymClasses,
    getGymClassTypes,
  },
  Mutation: {
    addGymClass,
    addTimes,
  },
  GymClass: {
    attendanceList,
  },
};

export default gymClassesResolvers;
