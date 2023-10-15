import getGymClasses from './getGymClasses';
import getGymClassesCount from './getGymClassesCount';
import addGymClass from './addGymClass';
import attendanceList from './attendanceList';
import addTimes from './addTimes';

const gymClassesResolvers = {
  Query: {
    getGymClassesCount,
    getGymClasses,
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
