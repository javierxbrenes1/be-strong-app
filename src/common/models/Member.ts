import GymClassTime from './GymClassTime';
import Measure from './Measure';
import MemberAttendance from './MemberAttendance';

interface Member {
  code: string;
  name: string;
  phone?: string;
  avatar?: string;
  birthDate?: Date;
  email?: string;
  genre: string;
  height: number;
  isActive: boolean;
  preferredClassTime: number;
  observations?: string;
  memberMeasures?: Measure[];
  gymClassTime?: GymClassTime;
  memberAttendance?: MemberAttendance;
}

export default Member;
