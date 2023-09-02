import getGymClasses from './getGymClasses';
import getGymClassesCount from './getGymClassesCount';
import addGymClass from './addGymClass';

const gymClassesResolvers = {
  Query: {
    getGymClassesCount,
    getGymClasses,
  },
  Mutation: {
    addGymClass,
  },
};

export default gymClassesResolvers;
