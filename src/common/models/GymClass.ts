import GymClassTime from './GymClassTime';
import Member from './Member';

export interface AttendanceList {
  gymClassTimeId: number;
  members: Member[];
}

interface GymClass {
  id: number;
  classDate?: string;
  classDurationInMinutes?: number;
  classType?: string;
  classDescription?: string;
  gymClassOnTimes?: {
    gymClassTime: GymClassTime;
  }[];
  attendanceList: AttendanceList[];
}

export default GymClass;
