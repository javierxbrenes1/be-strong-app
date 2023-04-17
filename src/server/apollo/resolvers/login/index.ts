import ownerSignIn from './ownerSignIn';
import ownerSignUp from './ownerSignUp';

const loginResolvers = {
  Mutation: {
    ownerSignIn,
    ownerSignUp,
  },
};

export default loginResolvers;
