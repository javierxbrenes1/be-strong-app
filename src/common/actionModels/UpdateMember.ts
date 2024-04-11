import MemberAttendance from '../models/MemberAttendance';

type UpdateMemberArgs = {
  code: string;
  name?: string;
  genre?: string;
  birthDate?: Date;
  birthDateAsString?: string;
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
