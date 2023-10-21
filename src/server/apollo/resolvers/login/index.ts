import ownerSignIn from './ownerSignIn';
import ownerSignUp from './ownerSignUp';
import whoAmI from './whoAmI';
import updatePwd from './updatePwd';

const loginResolvers = {
  Query: {
    whoAmI,
  },
  Mutation: {
    ownerSignIn,
    ownerSignUp,
    updatePwd,
  },
};

export default loginResolvers;
