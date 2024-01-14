import MemberPage from './MemberPage';
import { MemberContextProvider } from './MemberContext';

const Member = () => (
  <MemberContextProvider>
    <MemberPage />
  </MemberContextProvider>
);

export default Member;
