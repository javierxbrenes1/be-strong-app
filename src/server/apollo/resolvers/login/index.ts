import ownerSignIn from './ownerSignIn';
import whoAmI from './whoAmI';
import updatePwd from './updatePwd';

const loginResolvers = {
  Query: {
    whoAmI,
  },
  Mutation: {
    ownerSignIn,
    updatePwd,
  },
};

export default loginResolvers;
