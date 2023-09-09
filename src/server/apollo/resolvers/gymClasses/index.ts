import getGymClasses from './getGymClasses';
import getGymClassesCount from './getGymClassesCount';
import addGymClass from './addGymClass';
import attendanceList from './attendanceList';

const gymClassesResolvers = {
  Query: {
    getGymClassesCount,
    getGymClasses,
  },
  Mutation: {
    addGymClass,
  },
  GymClass: {
    attendanceList,
  },
};

export default gymClassesResolvers;
