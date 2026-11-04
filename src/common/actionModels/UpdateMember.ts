import MemberAttendance from '../models/MemberAttendance';

type UpdateMemberArgs = {
  code: string;
  name?: string;
  genre?: string;
  // LocalDate llega ya parseado a Date (00:00Z); null borra la fecha.
  birthDate?: Date | null;
  height?: number;
  isActive?: boolean;
  phone?: string;
  email?: string;
  avatar?: string;
  observations?: string;
  preferredClassTime?: number;
  memberAttendance?: MemberAttendance;
};

export default UpdateMemberArgs;
