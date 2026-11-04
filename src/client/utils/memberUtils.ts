import { formatLocalTime } from '../../common/dates';
import { DAYS } from '../labels';
import GymClassTime from '../../common/models/GymClassTime';
import MemberAttendance from '../../common/models/MemberAttendance';
import { MemberCategories } from '../types';

export const getGymClassTimeForUI = (gymClassTime?: GymClassTime) =>
  gymClassTime ? formatLocalTime(gymClassTime.localTime) : '';

export const getClassAttendanceForUI = (
  memberAttendance?: MemberAttendance,
  asValue?: boolean
) => {
  if (!memberAttendance) return [];

  const { memberCode, ...days } = memberAttendance;
  const attendance: string[] = [];
  Object.keys(days).forEach((day) => {
    if (day !== '__typename' && days[day as keyof typeof days]) {
      if (!asValue) {
        attendance.push(DAYS[day as keyof typeof DAYS]);
      } else {
        attendance.push(day);
      }
    }
  });
  return attendance;
};

export const memberStateOptions = [
  {
    value: 'true',
    label: 'Activo',
  },
  {
    value: 'false',
    label: 'Inactivo',
  },
];

export const memberCategoriesOptions = Object.entries(MemberCategories).map(
  ([key, value]) => ({
    value,
    label: key,
  })
);

export const genreOptions = [
  {
    value: 'male',
    label: 'Masculino',
  },
  {
    value: 'female',
    label: 'Femenino',
  },
  {
    value: 'other',
    label: 'Otro',
  },
];

export const daysOptions = Object.entries(DAYS).reduce<
  { value: string; label: string }[]
>((curr, entry) => {
  const [value, label] = entry;
  return [...curr, { value, label }];
}, []);
