import ownerSignIn from './ownerSignIn';
import ownerSignUp from './ownerSignUp';
import whoAmI from './whoAmI';

const loginResolvers = {
  Query: {
    whoAmI,
  },
  Mutation: {
    ownerSignIn,
    ownerSignUp,
  },
};

export default loginResolvers;
