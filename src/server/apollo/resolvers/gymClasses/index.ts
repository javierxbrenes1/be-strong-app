import getGymClasses from './getGymClasses';
import getGymClassesCount from './getGymClassesCount';

const gymClassesResolvers = {
  Query: {
    getGymClassesCount,
    getGymClasses,
  },
};

export default gymClassesResolvers;
