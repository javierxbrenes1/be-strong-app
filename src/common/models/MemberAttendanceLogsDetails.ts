import { LocalTime } from '../dates';

interface MemberAttendanceLogsDetails {
  classDate: string;
  classDurationInMinutes: number;
  classType: string;
  localTime: LocalTime;
}

export default MemberAttendanceLogsDetails;
